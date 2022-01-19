import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { ErrorIcon } from "../components/icons";
import useAuth from "../data/hook/useAuth";

export default function Authentication() {
   const { signup, login, loginGoogle } = useAuth()
   const [method, setMethod] = useState<'login' | 'signup' >('login')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState(null)

   function displayError(msg, time = 5000) {
      setError(msg)
      setTimeout(() => {
         setError(null)
      }, time)
   }

   async function submit() {
      try {
         if(method === 'login') {
            await login(email, password)
         } else {
            await signup(email, password)
         } 
      } catch(e) {
         displayError(e?.message ?? 'Unknown Error!')
      }
   }

   return (
      <div className={`flex h-screen items-center justify-center`}>
         <div className={`hidden md:w-1/2 md:block lg:w-2/3`}>
            <img 
               src="https://source.unsplash.com/random" 
               alt="Image of the Authentication screen" 
               className={`h-screen w-full object-stretch`}
            />
         </div>
         <div className="m-10 w-full md:w-1/2 lg:w-1/3">
            <h1 className={`
               text-3xl font-medium mb-4
            `}>
               {method === 'login' ? 'Please log in to your account' : 'Please create your account'}
            </h1>

            {error && 
               <div className={`
               flex items-center justify-center bg-red-500 text-white 
               py-2 px-2 rounded-md my-2
            `}>
               {ErrorIcon}
               <pre className={`ml-2.5`}>{error}</pre>
            </div> 
            }
            
            <AuthInput
               label="Email"
               type="email"
               value={email}
               changedValue={setEmail}
               required
            />
            <AuthInput
               label="Password"
               value={password}
               type="password"
               changedValue={setPassword}
               required
            />

            <button onClick={submit} className={`w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-md px-4 py-3 mt-6`}>
               {method === 'login' ? 'Log in' : 'Sign up'}
            </button>
            <hr className={`my-6 border-gray-300 w-full`}/>
            <button onClick={loginGoogle} className={`w-full bg-red-500 hover:bg-red-400 text-white rounded-md px-4 py-3`}>
               Log in with Google
            </button>
               {method === 'login' ? (
                     <p className="mt-8">
                        Don't have an account?
                        <a onClick={() => setMethod('signup')} className={`
                           text-blue-500 hover:text-blue-700 font-medium cursor-pointer
                        `}>
                           Create a free account
                        </a>
                     </p>
                  ) : (  
                     <p className="mt-8">
                        Already a member?
                        <a onClick={() => setMethod('login')} className={`
                           text-blue-500 hover:text-blue-700 font-medium cursor-pointer
                        `}>
                           Log in with your credentials
                        </a>
                     </p> 
                  )}
            </div>
      </div>
   )
}