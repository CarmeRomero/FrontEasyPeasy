import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useMutation, UseMutationResult } from "react-query";
import { ITokenConfirmacion } from "../interfaces/token-confirmacion";
import { IUsuarioCredenciales } from "../interfaces/usuario-credenciales";

const ingresarUsuario = async (credencialesUsuario: IUsuarioCredenciales) => {
  const { data } = await axios.post(
    `http://localhost:3000/autenticacion/ingreso`,
    credencialesUsuario,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateIngresar() {
  const mutation: UseMutationResult<
    IUsuarioCredenciales,
    any,
    IUsuarioCredenciales
  > = useMutation(ingresarUsuario, {
    onSuccess: (data) => {
      localStorage.setItem("usuario", JSON.stringify(data));
    },
    onError: (error) => {
      // showNotification({
      //   title: "Error al identificarse",
      //   message: error.response?.data.message,
      //   color: "red",
      //   autoClose: 6000,
      // });
      console.log(error);
    },
  });

  return mutation;
}

const confirmarEmail = async (token: ITokenConfirmacion) => {
  const { data } = await axios.post(
    `http://localhost:3000/autenticacion/confirmar-email`,
    token
  );

  return data;
};

export function useMutateConfirmarEmail() {
  const mutation: UseMutationResult<null, any, ITokenConfirmacion> =
    useMutation(confirmarEmail, {
      onSuccess: (data) => {
        console.log(data);
        // showNotification({
        //   title: "Confirmación realizada",
        //   message: "Su cuenta ha sido activada",
        //   color: "green",
        //   autoClose: 6000,
        // });
      },
      onError: (error) => {
        console.log(error);
        // showNotification({
        //   title: "Error al intentar confirmar el e-mail",
        //   message: error.response?.data.message,
        //   color: "red",
        //   autoClose: 7000,
        // });
      },
    });

  return mutation;
}

const cerrarSesion = async () => {
  const { data } = await axios.post(
    `http://localhost:3000/autenticacion/cerrar-sesion`,
    null,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateLogout() {
  const mutation: UseMutationResult<null, any, null> = useMutation(
    cerrarSesion,
    {
      onSuccess: () => {
        localStorage.removeItem("usuario");
      },
      onError: (error) => {
        console.log(error);
        // showNotification({
        //   title: "Error al cerrar sesión",
        //   message: error.response?.data.message,
        //   color: "red",
        //   autoClose: 6000,
        // });
      },
    }
  );

  return mutation;
}

const recuperar = async (recuperar: any) => {
  const { data } = await axios.post(
    `http://localhost:3000/autenticacion/recuperar`,
    recuperar,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateRecuperar() {
  const mutation: UseMutationResult<null, any, any> = useMutation(recuperar, {
    onSuccess: () => {
      console.log("enviado");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}

const cambiarPass = async (datos: any) => {
  const { data } = await axios.post(
    `http://localhost:3000/autenticacion/cambiar-password`,
    datos,
    {
      withCredentials: true,
    }
  );
  return data;
};

export function useMutateCambiarPassword() {
  const mutation: UseMutationResult<null, any, any> = useMutation(cambiarPass, {
    onSuccess: () => {
      showNotification({
        title: "Contraseña modificada",
        message: "Ya puede ingresar con la nueva contraseña",
        autoClose: true,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
