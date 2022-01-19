import { createContext, useEffect, useState } from "react";
import firebase from "../../firebase/config";
import Cookies from 'js-cookie'
import User from "../../model/User";
import route from 'next/router'

interface AuthContextProps {
   user?: User
   loading?: boolean
   login?: (email: string, password: string) => Promise<void>
   signup?: (email: string, password: string) => Promise<void>
   loginGoogle?: () => Promise<void>
   logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function userAuthenticated(firebaseUser: firebase.User): Promise<User> {
   const token = await firebaseUser.getIdToken()
   return {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email,
      token,
      provider: firebaseUser.providerData[0].providerId,
      imageUrl: firebaseUser.photoURL
   }
}

function handleCookie(logged: boolean) {
   if(logged) {
      Cookies.set('my-page-admin', logged, {
         expires: 7
      })
   } else {
      Cookies.remove('my-page-admin')
   }
}

export function AuthProvider(props) {
   const [loading, setLoading] = useState(true)
   const [user, setUser] = useState<User>(null)

   async function setSession(firebaseUser) {
      if (firebaseUser?.email) {
         const user = await userAuthenticated(firebaseUser)
         setUser(user)
         handleCookie(true)
         setLoading(false)
         return user.email
      } else {
         setUser(null)
         handleCookie(false)
         setLoading(false)
         return false
      }
   }

   async function login(email, password) {
      try {
         setLoading(true)
         const resp = await firebase.auth().signInWithEmailAndPassword(email, password)
         await setSession(resp.user)
         route.push('/')      
      } finally {
         setLoading(false)
      }
   }

   async function signup(email, password) {
      try {
         setLoading(true)
         const resp = await firebase.auth().createUserWithEmailAndPassword(email, password)
         await setSession(resp.user)
         route.push('/')      
      } finally {
         setLoading(false)
      }
   }

   async function loginGoogle() {
      try {
         setLoading(true)
         const resp = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
         )
         await setSession(resp.user)
         route.push('/')      
      } finally {
         setLoading(false)
      }
   }

   async function logout() {
      try {
         setLoading(true)
         await firebase.auth().signOut()
         await setSession(null)
      } finally {
         setLoading(false)
      }
   }
  
   useEffect(() => {
      if(Cookies.get('my-page-admin')) {
         const cancel = firebase.auth().onIdTokenChanged(setSession)
         return () => cancel()
      } else {
         setLoading(false)
      }
   }, [])

   return (
    <AuthContext.Provider value={{user, loading, login, signup, loginGoogle, logout}}>
       {props.children}
    </AuthContext.Provider>  
   )
}

export default AuthContext