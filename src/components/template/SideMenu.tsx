import useAuth from "../../data/hook/useAuth";
import { HomeIcon, LogOut, Schooling, SettingsIcon } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function SideMenu() {
   const { logout } = useAuth()
   return (
      <aside className={`
         flex flex-col 
         bg-gray-200 text-gray-700
         dark:bg-gray-900
      `}>
         <div className={`
            flex flex-col items-center justify-center
            bg-gradient-to-r from-indigo-500 to-purple-800
            h-20 w-20
         `}>
            <Logo />
         </div>
         <ul className={`flex-grow`}>
            <MenuItem url="/" text="Home" icon={HomeIcon} />
            <MenuItem url="/settings" text="Settings" icon={SettingsIcon} />
            <MenuItem url="/school" text="School" icon={Schooling} />  
         </ul>
         <ul>
            <MenuItem text="Log out" icon={LogOut} onClick={logout} />   
         </ul>
      </aside>
   )
} 