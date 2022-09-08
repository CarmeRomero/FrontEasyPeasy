import { NextPage } from "next"
import { DashboardLayout } from "../Components/Layouts/DashBoard"


const Home: NextPage = () => {

  return (
    <DashboardLayout title="Dashboard">
      <h1> Hola</h1>
    </DashboardLayout>
  )
}

export default Home
