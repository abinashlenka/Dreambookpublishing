import Link from "next/link"
// import Avatar from "../../public/icons/Avatar"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Button from "@/components/Button";
import useFirebaseAuth from "@/services/firebase-services/useFirebaseAuth";
import Author from "../../public/icons/author";
import { permissionHandler } from "@/Utilities/permissions";
export default function Navbar({role}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const {logOut} = useFirebaseAuth();
  
  const yesConfirmation = async () => {
    setLoading(true);
    const res = await logOut();
    if(res.status){
      router.push("/");
    }
  }
  
  const isActiveHandler = (url="") => {
    if(router.asPath.includes(url)) return true;
    else return false;
  }

  
  return (
    <>
      <div className="sticky top-0 left-0 w-full h-dvh bg-neutral1 flex flex-wrap flex-col justify-between bg-green shadow-lg">
        <div className="py-7 px-4 relative h-full max-h-screen">
          <div className="w-full bg-white h-24 px-5 items-center justify-center flex flex-wrap ">
              <img className="" src="/images/dream-book-logo.png" alt="Dream book Logo" />
          </div>
          <div className="sidebar flex flex-col justify-between">
            <ul className="py-0 m-0 flex flex-wrap mt-6">
              {permissionHandler("dashboard", role) && <li className={`group flex flex-wrap text-xxs w-full mt-1.5  rounded-lg ${ isActiveHandler("/dashboard")?'bg-primary':"bg-white"} `}>
                <Link href="/dashboard" className="w-full flex items-center py-3 px-5 gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M8.125 3.125H4.375C4.04348 3.125 3.72554 3.2567 3.49112 3.49112C3.2567 3.72554 3.125 4.04348 3.125 4.375V8.125C3.125 8.45652 3.2567 8.77446 3.49112 9.00888C3.72554 9.2433 4.04348 9.375 4.375 9.375H8.125C8.45652 9.375 8.77446 9.2433 9.00888 9.00888C9.2433 8.77446 9.375 8.45652 9.375 8.125V4.375C9.375 4.04348 9.2433 3.72554 9.00888 3.49112C8.77446 3.2567 8.45652 3.125 8.125 3.125ZM8.125 8.125H4.375V4.375H8.125V8.125ZM15.625 3.125H11.875C11.5435 3.125 11.2255 3.2567 10.9911 3.49112C10.7567 3.72554 10.625 4.04348 10.625 4.375V8.125C10.625 8.45652 10.7567 8.77446 10.9911 9.00888C11.2255 9.2433 11.5435 9.375 11.875 9.375H15.625C15.9565 9.375 16.2745 9.2433 16.5089 9.00888C16.7433 8.77446 16.875 8.45652 16.875 8.125V4.375C16.875 4.04348 16.7433 3.72554 16.5089 3.49112C16.2745 3.2567 15.9565 3.125 15.625 3.125ZM15.625 8.125H11.875V4.375H15.625V8.125ZM8.125 10.625H4.375C4.04348 10.625 3.72554 10.7567 3.49112 10.9911C3.2567 11.2255 3.125 11.5435 3.125 11.875V15.625C3.125 15.9565 3.2567 16.2745 3.49112 16.5089C3.72554 16.7433 4.04348 16.875 4.375 16.875H8.125C8.45652 16.875 8.77446 16.7433 9.00888 16.5089C9.2433 16.2745 9.375 15.9565 9.375 15.625V11.875C9.375 11.5435 9.2433 11.2255 9.00888 10.9911C8.77446 10.7567 8.45652 10.625 8.125 10.625ZM8.125 15.625H4.375V11.875H8.125V15.625ZM15.625 10.625H11.875C11.5435 10.625 11.2255 10.7567 10.9911 10.9911C10.7567 11.2255 10.625 11.5435 10.625 11.875V15.625C10.625 15.9565 10.7567 16.2745 10.9911 16.5089C11.2255 16.7433 11.5435 16.875 11.875 16.875H15.625C15.9565 16.875 16.2745 16.7433 16.5089 16.5089C16.7433 16.2745 16.875 15.9565 16.875 15.625V11.875C16.875 11.5435 16.7433 11.2255 16.5089 10.9911C16.2745 10.7567 15.9565 10.625 15.625 10.625ZM15.625 15.625H11.875V11.875H15.625V15.625Z" fill={isActiveHandler("/dashboard")?'#fff':"#757D83"}/>
                  </svg>
                  <span className={`text-center font-medium text-sm ${isActiveHandler("/dashboard")?"text-white":"text-grey"}`}>
                    Dashboard
                  </span>
                </Link>
              </li>}
              
              {permissionHandler("books", role) && <li className={`group flex flex-wrap text-xxs w-full mt-1.5  rounded-lg ${ isActiveHandler("/books")?'bg-primary':"bg-white"} `}>
                <Link href="/books" className="w-full flex items-center gap-2 py-3 px-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.475 5.16792L10.6 1.4062C10.4163 1.3047 10.2099 1.25146 10 1.25146C9.79013 1.25146 9.58369 1.3047 9.4 1.4062L2.525 5.16948C2.32866 5.27691 2.16477 5.43508 2.05043 5.62747C1.93609 5.81987 1.87551 6.03943 1.875 6.26323V13.7351C1.87551 13.9589 1.93609 14.1785 2.05043 14.3709C2.16477 14.5633 2.32866 14.7214 2.525 14.8289L9.4 18.5921C9.58369 18.6936 9.79013 18.7469 10 18.7469C10.2099 18.7469 10.4163 18.6936 10.6 18.5921L17.475 14.8289C17.6713 14.7214 17.8352 14.5633 17.9496 14.3709C18.0639 14.1785 18.1245 13.9589 18.125 13.7351V6.26401C18.1249 6.03981 18.0645 5.81976 17.9502 5.62692C17.8358 5.43407 17.6717 5.27554 17.475 5.16792ZM10 2.49995L16.2766 5.93745L13.9508 7.21089L7.67344 3.77339L10 2.49995ZM10 9.37495L3.72344 5.93745L6.37187 4.48745L12.6484 7.92495L10 9.37495ZM3.125 7.0312L9.375 10.4515V17.1539L3.125 13.7359V7.0312ZM16.875 13.7328L10.625 17.1539V10.4546L13.125 9.08667V11.875C13.125 12.0407 13.1908 12.1997 13.3081 12.3169C13.4253 12.4341 13.5842 12.5 13.75 12.5C13.9158 12.5 14.0747 12.4341 14.1919 12.3169C14.3092 12.1997 14.375 12.0407 14.375 11.875V8.4023L16.875 7.0312V13.732V13.7328Z" fill={isActiveHandler("/books")?'#fff':"#757D83"} />
                  </svg>
                  <span className={`text-center font-medium text-sm ${isActiveHandler("/books")?"text-white":"text-grey"}`}>
                    Books
                  </span>
                </Link>
              </li>}

              {permissionHandler("authors", role) && <li className={`group flex flex-wrap text-xxs w-full mt-1.5  rounded-lg ${ isActiveHandler("/authors")?'bg-primary':"bg-white"} `}>
                <Link href="/authors" className="w-full flex items-center py-3 px-5 gap-2">
                  {/* <img src={"/icons/author.svg"} alt="author icon" /> */}
                  <Author color={isActiveHandler("/authors")?"#FFF":"#757D83"} />
                  <span className={`text-center font-medium text-sm ${isActiveHandler("/authors")? 'text-white':"text-grey"}`}>
                    Authors
                  </span>
                </Link>
              </li>}

              {permissionHandler("dashboard", role) && role === "admin" && (
  <li className={`group flex flex-wrap text-xxs w-full mt-1.5 rounded-lg ${ isActiveHandler("/flipkart") ? 'bg-primary' : "bg-white"}`}>
    <Link href="/flipkart" className="w-full flex items-center py-3 px-5 gap-2">
      <img src="/images/flipkart.png" alt="Flipkart" className="w-5 h-5 object-contain" />
      <span className={`text-center font-medium text-sm ${isActiveHandler("/flipkart") ? 'text-white' : 'text-grey'}`}>
        Flipkart Data
      </span>
    </Link>
  </li>
)}



              {permissionHandler("settings", role) && <li className={`group flex flex-wrap text-xxs w-full mt-1.5  hover:bg-yellow rounded-lg ${ isActiveHandler("/settings")?'bg-primary':"bg-white"}`}>
                <Link href="/settings" className="w-full flex items-center py-3 px-5 gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.99996 6.875C8.27407 6.875 6.87496 8.27411 6.87496 10C6.87496 11.7259 8.27407 13.125 9.99996 13.125C11.7259 13.125 13.125 11.7259 13.125 10C13.125 8.27411 11.7259 6.875 9.99996 6.875ZM5.62496 10C5.62496 7.58376 7.58372 5.625 9.99996 5.625C12.4162 5.625 14.375 7.58376 14.375 10C14.375 12.4162 12.4162 14.375 9.99996 14.375C7.58372 14.375 5.62496 12.4162 5.62496 10Z" fill={isActiveHandler("/settings")?'#fff':"#757D83"} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.32359 1.66304C7.49524 1.60762 7.68247 1.62908 7.83715 1.72188L9.66409 2.81805C9.88803 2.80804 10.1123 2.80805 10.3362 2.81807L12.1556 1.72932C12.309 1.63752 12.4943 1.61581 12.6648 1.66966C13.8587 2.04687 14.9564 2.67904 15.8819 3.52243C16.0145 3.64333 16.0888 3.81543 16.0858 3.9949L16.0501 6.11852C16.1734 6.30797 16.2866 6.50385 16.3892 6.70533L18.2412 7.735C18.3971 7.8217 18.5086 7.97092 18.5474 8.14506C18.8199 9.36543 18.8228 10.6306 18.5559 11.8522C18.5175 12.0278 18.4053 12.1784 18.2481 12.2655L16.3889 13.2952C16.2864 13.4965 16.1733 13.6922 16.0501 13.8815L16.0858 16.0051C16.0888 16.1846 16.0145 16.3567 15.8819 16.4776C14.9584 17.3191 13.8653 17.9531 12.6763 18.337C12.5047 18.3924 12.3175 18.3709 12.1628 18.2781L10.3358 17.182C10.1119 17.192 9.88762 17.192 9.66369 17.1819L7.84434 18.2707C7.69094 18.3625 7.50558 18.3842 7.33511 18.3303C6.14118 17.9531 5.04349 17.321 4.11804 16.4776C3.98537 16.3567 3.91108 16.1845 3.91411 16.0051L3.9499 13.8863C3.82726 13.6948 3.71418 13.4975 3.61107 13.2949L1.75876 12.265C1.60281 12.1783 1.49136 12.0291 1.45248 11.8549C1.18001 10.6346 1.17713 9.36943 1.44406 8.14783C1.48243 7.97221 1.59457 7.82161 1.75184 7.73451L3.61099 6.70482C3.71348 6.50352 3.8266 6.30781 3.94986 6.11852L3.91411 3.9949C3.91109 3.81542 3.98538 3.64331 4.11806 3.52241C5.04156 2.68087 6.13458 2.04686 7.32359 1.66304ZM5.1688 4.26302L5.203 6.29417C5.20521 6.42576 5.16583 6.55469 5.09047 6.66258C4.92283 6.90259 4.77607 7.15652 4.65178 7.42158C4.59591 7.54074 4.50384 7.63923 4.38871 7.703L2.61101 8.68757C2.45551 9.5557 2.45767 10.4448 2.61739 11.3122L4.38961 12.2975C4.50387 12.361 4.59533 12.4588 4.65113 12.577C4.77814 12.8462 4.92628 13.1048 5.09416 13.3506C5.16715 13.4574 5.20518 13.5843 5.203 13.7137L5.16882 15.7369C5.84437 16.3076 6.61689 16.7524 7.44959 17.0502L9.18684 16.0106C9.29686 15.9447 9.42447 15.9143 9.55237 15.9235C9.85038 15.9448 10.1495 15.9448 10.4476 15.9235C10.5757 15.9143 10.7035 15.9448 10.8137 16.0109L12.5566 17.0567C13.3865 16.7542 14.1566 16.3074 14.8311 15.737L14.7969 13.7058C14.7947 13.5742 14.8341 13.4453 14.9095 13.3374C15.0771 13.0974 15.2239 12.8435 15.3481 12.5784C15.404 12.4593 15.4961 12.3608 15.6112 12.297L17.3889 11.3124C17.5444 10.4443 17.5423 9.55521 17.3825 8.68783L15.6103 7.7025C15.4956 7.63872 15.4039 7.54043 15.3481 7.42158C15.2239 7.15652 15.0771 6.90259 14.9095 6.66258C14.8341 6.55469 14.7947 6.42576 14.7969 6.29417L14.8311 4.26311C14.1556 3.69242 13.383 3.24759 12.5503 2.94982L10.8131 3.98943C10.7031 4.05527 10.5755 4.08568 10.4476 4.07653C10.1495 4.05522 9.85038 4.05522 9.55237 4.07653C9.42423 4.0857 9.29637 4.05516 9.18621 3.98906L7.44337 2.94335C6.61339 3.24585 5.84335 3.69261 5.1688 4.26302Z" fill={isActiveHandler("/settings")?'#fff':"#757D83"} />
                  </svg>
                  <span className={`text-center font-medium text-sm ${isActiveHandler("/settings")? 'text-white':"text-grey"}`}>
                    Settings
                  </span>
                </Link>
              </li>}
            </ul>
            <div onClick={()=> setConfirmation(true)} className={`group flex flex-wrap text-xxs w-full mt-1.5 bg-[#F3F3F3] py-3 px-5 rounded-lg cursor-pointer ${router.asPath == '/manage-jobs' && 'bg-yellow'} ${router.asPath == '/manage-jobs/create' && 'bg-yellow'} ${router.asPath == `/manage-jobs/${router.query.job}` && 'bg-yellow'} ${router.asPath == `/manage-jobs/${router.query.job}`+"/edit" && 'bg-yellow'}`}>
              <div className="w-full flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.1518 6.27681C13.3959 6.03273 13.7916 6.03273 14.0357 6.27681L17.3169 9.55806C17.561 9.80214 17.561 10.1979 17.3169 10.4419L14.0357 13.7232C13.7916 13.9673 13.3959 13.9673 13.1518 13.7232C12.9077 13.4791 12.9077 13.0834 13.1518 12.8393L15.9911 10L13.1518 7.16069C12.9077 6.91661 12.9077 6.52089 13.1518 6.27681Z" fill="#8C8D8C"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.5 10C7.5 9.65482 7.77982 9.375 8.125 9.375H16.875C17.2202 9.375 17.5 9.65482 17.5 10C17.5 10.3452 17.2202 10.625 16.875 10.625H8.125C7.77982 10.625 7.5 10.3452 7.5 10Z" fill="#8C8D8C"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.86612 2.86612C3.10054 2.6317 3.41848 2.5 3.75 2.5H8.125C8.47018 2.5 8.75 2.77982 8.75 3.125C8.75 3.47018 8.47018 3.75 8.125 3.75L3.75 3.75L3.75 16.25H8.125C8.47018 16.25 8.75 16.5298 8.75 16.875C8.75 17.2202 8.47018 17.5 8.125 17.5H3.75C3.41848 17.5 3.10054 17.3683 2.86612 17.1339C2.6317 16.8995 2.5 16.5815 2.5 16.25V3.75C2.5 3.41848 2.6317 3.10054 2.86612 2.86612Z" fill="#8C8D8C"/>
                </svg>
                <span className={`text-center font-medium text-sm text-grey`}>
                  Logout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {confirmation && <div className='z-50 fixed top-0 left-0 w-screen bg-[rgba(0,0,0,0.5)] h-screen flex items-center justify-center backdrop-blur'>
        <div className='w-[300px] md:w-[450px] bg-white px-5 py-7 rounded-xl flex flex-wrap shadow '>
          <h2 className='font-sora text-2xl text-center w-full font-semibold'>
            Do you want to logout?
          </h2>
          <h3 className='w-full text-sm text-center my-3 text-neutral-700 font-sora'>
            By clicking on Yes the current session will be expire. All the cookies used during the session will be clear as well.
          </h3>
          <div className='w-full grid grid-cols-2 mt-5 gap-3'>
            <Button variant="outline-primary" onClick={()=> setConfirmation(false)}>No</Button>
            <Button variant="primary" loading={loading} onClick={yesConfirmation}>Yes</Button>
          </div>
        </div>
      </div>}
    </> 
  )
}
