import Layout from "../components/template/Layout";
import useAppData from "../data/hook/useAppData";

export default function Schooling() {
   const { changeTheme } = useAppData()
   return (
      <Layout title="Schooling" subtitle="Here you can the admin graduation achievements">
         <button onClick={changeTheme}>Change Theme</button>
      </Layout>
   )
}