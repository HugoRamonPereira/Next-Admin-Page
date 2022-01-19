import { DarkThemeIcon, LightThemeIcon } from "../icons";

interface ButtonChangeThemeProps {
   theme: string
   changeTheme: () => void
}

export default function ButtonChangeTheme(props: ButtonChangeThemeProps) {
   return props.theme === 'dark' ? (
      <div onClick={props.changeTheme} className={`
         hidden sm:flex items-center 
         bg-gradient-to-r from-yellow-300 
         to-yellow-600 h-8 cursor-pointer
         w-14 lg:w-20 p-1 rounded-full
      `}>
         <div className={`
            flex items-center justify-center
            bg-white text-yellow-600 w-6 h-6 rounded-full
         `}>
            {LightThemeIcon}
         </div>
         <div className={`hidden lg:flex items-center ml-1.5 text-white`}>
            <span>Light</span>   
         </div>
      </div>
   ) : (
      <div onClick={props.changeTheme} className={`
         hidden sm:flex items-center 
         bg-gradient-to-r from-gray-900 
         to-gray-600 h-8 cursor-pointer
         w-14 lg:w-20 p-1 rounded-full
      `}>
         <div className={`hidden lg:flex items-center ml-1.5 mr-1.5 text-gray-300`}>
            <span>Dark</span>   
         </div>
         <div className={`
            flex items-center justify-center
            bg-black text-yellow-300 w-6 h-6 rounded-full
         `}>
            {DarkThemeIcon}
         </div>
      </div>
   )
}