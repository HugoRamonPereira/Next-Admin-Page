import { createContext, useEffect, useState } from "react";

type Theme = 'dark' | ''

interface AppContextProps {
   theme?: string
   changeTheme?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props) {
   const [theme, setTheme] = useState<Theme>('dark')

   function changeTheme() {
      const newTheme = theme === '' ? 'dark' : ''
      setTheme(newTheme)
      localStorage.setItem('theme', newTheme)
   }

   useEffect(() => {
      const savedTheme = localStorage.getItem('theme')
      // setTheme: {savedTheme}
      setTheme(savedTheme)
   }, [])

   return (
      <AppContext.Provider value={{
         theme,
         changeTheme
      }}>
         {props.children}
      </AppContext.Provider>
   ) 
}

export default AppContext
export const AppConsumer = AppContext.Consumer

// The AppConsumer is gonna be the one who is gonna consume data in other components
// we have to wrap AppConsumer around the element we wish to render the info from the ContextAPI that is in this file we are 
