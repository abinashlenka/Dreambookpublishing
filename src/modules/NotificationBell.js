// src/modules/NotificationBell.js
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import axios from "axios";

export default function NotificationBell({ role }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    const response = await fetch(`/api/notifications?role=${role}`);
    const json = await response.json();
    if (json.status) {
      setNotifications(json.data);
    }
  };
  

  useEffect(() => {
    fetchNotifications();
  }, [role]);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell className="text-gray-600 w-5 h-5" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-72 z-50">
          <div className="px-4 py-2 border-b font-semibold">Notifications</div>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.map((n) => (
              <li key={n.id} className="px-4 py-2 text-sm border-b text-gray-800">
                {n.message}
                <div className="text-[10px] text-gray-400">{n.date}</div>
              </li>
            ))}
            {notifications.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-500">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
