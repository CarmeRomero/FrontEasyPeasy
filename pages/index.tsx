import { NextPage } from "next";
import { AuthLayout } from "../Components/Layouts/AuthBoard";
import { DashboardLayout } from "../Components/Layouts/DashBoard";
import RegistrarUsuarioPage from "./usuarios";

const Home: NextPage = () => {
  return (
    <AuthLayout title="Dashboard">
      <RegistrarUsuarioPage />
    </AuthLayout>
  );
};

export default Home;
