import Link from "next/link";

interface MenuItemProps {
   text: string
   icon: any
   classname?: string
   url?: string
   onClick?: (event: any) => void
}

export default function MenuItem(props: MenuItemProps) {
   function renderLink() {
      return (
         <a className={`flex flex-col justify-center items-center h-20 w-20 dark:text-gray-300 ${props.classname}`}>
            {props.icon}
            <span className={`text-sm`}>
               {props.text}
            </span>
         </a>
      )
   }
   return (
      <li onClick={props.onClick} className={`hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer`}>
         {props.url ? (
            <Link href={props.url}>
               {renderLink()}
            </Link>  
         ) : (
            renderLink()
         )}
      </li>
   )
}