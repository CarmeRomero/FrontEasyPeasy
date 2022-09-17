import { NextPage } from "next";
import { AuthLayout } from "../components/layouts/AuthBoard";
import { DashboardLayout } from "../components/layouts/DashBoard";
import RegistrarUsuarioPage from "./usuarios";

const Home: NextPage = () => {
  return (
    <AuthLayout title="Dashboard">
      <RegistrarUsuarioPage />
    </AuthLayout>
  );
};

export default Home;
