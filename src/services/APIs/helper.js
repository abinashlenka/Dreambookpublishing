import { errorMessage, successMessage } from "@/Utilities/toasters";
import { getToken, getUser, removeRole, removeToken, removeUser, setToken } from "../firebase-services/cookies";
import { toast } from 'react-toastify';
import { auth } from "../../config/firebase";
import dayjs from "dayjs";

export const URL = 'https://dream-book-backend-mu.vercel.app/v1';

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000;
const LOGIN_PATH = '/';

export const getAuthCurrentUser = async (retryCount = 0) => {
    return new Promise((resolve, reject) => {
        if (auth.currentUser) {
            resolve(auth.currentUser);
            return;
        }

        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            if (user) {
                resolve(user);
            } else if (retryCount < MAX_RETRIES) {
                setTimeout(async () => {
                    try {
                        const result = await getAuthCurrentUser(retryCount + 1);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                }, RETRY_DELAY);
            } else {
                removeToken();
                removeRole();
                removeUser();
                window.location.href = LOGIN_PATH;
                reject(new Error('Authentication failed'));
            }
        });
    });
};

export const refreshTokenIfNeeded = async () => {
    try {
        const currentUser = await getAuthCurrentUser();
        if (!currentUser) {
            throw new Error('No authenticated user');
        }

        const token = await currentUser.getIdToken(true);
        const expiryTime = new Date(Date.now() + 3600 * 1000);
        setToken(token, expiryTime);
        return token;
    } catch (error) {
        console.error('Token refresh failed:', error);
        window.location.href = LOGIN_PATH;
        throw error;
    }
};

export const getAuthToken = async () => {
    const cookieString = getToken();

    if (cookieString) {
        const { value, expiry } = JSON.parse(cookieString);

        const expiryDate = dayjs(expiry); // When the token will expire
        const currentDate = dayjs(); // Current date and time
        const differenceInMinutes = expiryDate.diff(currentDate, 'minute');

        if (differenceInMinutes <= 15) {
            // Refresh token if it's close to expiration (within 15 mins)
            const refreshedToken = await refreshTokenIfNeeded();
            return refreshedToken || value; // return refreshed token if available, otherwise return current
        }

        return value; // return the current token if not near expiry
    }

    return false; // No token found
};

export const responseValidator = async (response, isToaster = false, message = null) => {
    try {
        if (response.status === 204) {
            if (isToaster) {
                successMessage("Deleted Successfully.");
            }
            return { status: true };
        }
        else if (response.ok) {
            const res = await response.json();
            if (Array.isArray(res.data)) {
                if (isToaster) {
                    successMessage((!message || message.length === 0) ? res.message : message);
                }
                return { status: true, data: [...res.data] };
            } else if (typeof res.data === 'object' || typeof res.data === 'string') {
                if (isToaster) {
                    successMessage((!message || message.length === 0) ? res.message : message);
                }
                return { status: true, data: res.data };
            } else {
                if (isToaster) {
                    successMessage((!message || message.length === 0) ? res.message : message);
                }
                return { status: true, message: res.message };
            }
        }
        else if (response.status === 401) {
            const res = await response.json();
            errorMessage(res.message || "Authentication failed");
            return { status: false, code: 401, message: res.message || "Session Expired." };
        }
        else {
            console.error('Response validation error:', error);
            errorMessage("Unable to connect to server. Please try again later.");
            return { status: false, message: "Server connection error" };
        }
    } catch (error) {
        console.error('Response validation error:', error);
        errorMessage("Unable to connect to server. Please try again later.");
        return { status: false, message: "Server connection error" };
    }
};

export const apiError = (error) => {
    console.error('API Error:', error);
    if (error.name === "AbortError") {
        errorMessage("Connection timed out. Please check your internet and try again.");
    } else if (error.message === "Failed to fetch") {
        errorMessage("Unable to connect to server. Please check your internet connection.");
    } else {
        errorMessage(error.message || "Something went wrong. Please try again.");
    }
    return { status: false, message: error.message || 'Request failed' };
};