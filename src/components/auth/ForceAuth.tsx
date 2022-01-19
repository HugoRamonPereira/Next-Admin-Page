import Head from "next/head"
import Image from "next/image"
import Router from "next/router"
import loader from '../../../public/images/loader.gif'
import useAuth from "../../data/hook/useAuth"

export default function ForceAuthentication(props) {

   const { loading, user } = useAuth()

   function renderContent() {
      return (
         <>
            <Head>
               <script 
                  dangerouslySetInnerHTML={{
                     __html: `
                        if(!document.cookie?.includes('my-page-admin')) {
                           window.location.href = "/authenticate"
                        }
                     `
                  }}
               />
            </Head>
            {props.children}
         </>
      )
   }

   function renderLoading() {
      return (
         <div className={`flex justify-center items-center h-screen`}>
            <Image src={loader} />
         </div>
      )
   }

   if(!loading && user?.email) {
      return renderContent()
   } else if (loading) {
      return renderLoading()
   } else {
      Router.push('/authentication')
      return null
   }
   
}