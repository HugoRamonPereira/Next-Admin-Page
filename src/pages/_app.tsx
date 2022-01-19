import '../styles/globals.css'
import { AppProvider } from '../data/context/AppContext'
import { AuthProvider } from '../data/context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  ) 
}

export default MyApp

// Wrapped AppProvider around the main/root component so that I can share information via props.children across all components
// in the AppContext.tsx 