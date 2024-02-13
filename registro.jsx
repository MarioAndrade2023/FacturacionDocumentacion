import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Componente para el inicio de sesión de usuarios existentes.
 * Permite a los usuarios iniciar sesión con su correo electrónico y contraseña.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onLogin - Función para manejar el inicio de sesión exitoso.
 * @param {Function} props.setUsuarioActivo - Función para cambiar el estado de usuario activo.
 * @returns {JSX.Element} Elemento JSX que representa el formulario de inicio de sesión.
 */
const Registro = ({ onLogin, setUsuarioActivo }) => {
  // Estados para almacenar el correo electrónico y la contraseña ingresados por el usuario
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, correo, password)
      .then((userCredential) => {
        // Inicio de sesión exitoso
        const user = userCredential.user;
        // Verificar si el correo electrónico está verificado
        if (!user.emailVerified) {
          // Mostrar mensaje de notificación
          toast.error("Debes verificar tu correo electrónico antes de iniciar sesión.");
          // Detener el proceso de inicio de sesión
          return;
        }
        // Notificar al componente padre sobre el inicio de sesión exitoso
        onLogin();
        // Cambiar el estado para que se renderice el componente UsuarioActivo
        setUsuarioActivo(true);
      })
      .catch((error) => {
        // Manejo de errores
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error al iniciar sesión:", errorMessage);

        // Manejar los diferentes errores
        switch (errorCode) {
          case "auth/user-not-found":
            // Mostrar mensaje de notificación sugiriendo registro
            toast.info("No tienes una cuenta. ¿Por qué no te registras?");
            break;
          case "auth/invalid-email":
            // Mostrar mensaje de error de email inválido
            toast.error("El correo electrónico proporcionado no es válido.");
            break;
          case "auth/wrong-password":
            // Mostrar mensaje de error de contraseña incorrecta
            toast.error("La contraseña proporcionada es incorrecta.");
            break;
          default:
            // Mostrar mensaje de error genérico de inicio de sesión
            toast.error("Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.");
            break;
        }
      });
  };

  return (
    <div className="p-5 div-morado rounded-lg font-sans bg-slate-100">
      {/* Contenedor para mostrar las notificaciones */}
      <ToastContainer />
      <div>
        <h2 className="text-center text-2xl font-bold mb-4 text-gray-600">
          ¿Ya estás registrado?<br></br>
          ingresa
        </h2>
      </div>
      <form onSubmit={handleLogin}>
        {/* Campo de entrada para el correo electrónico */}
        <div className="mb-1 flex gap-x-2">
          <input
            id="IdCorreo"
            type="email"
            placeholder="Correo Electronico"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={correo}
            required
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        {/* Campo de entrada para la contraseña */}
        <div className="mb-1 flex gap-x-2">
          <input
            id="IdPassword"
            type="password"
            placeholder="Contraseña"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          className="w-full bg-jpyrsa hover:bg-jpyrsa transition-all duration-500 text-white font-bold p-2 rounded-md"
        >
          Entrar
        </button>
        {/* Enlace para recuperar la contraseña */}
        <div className="text-right">
          <Link
            to="/recuperarpassword"
            className="jpyrsa-color hover:underline font-semibold"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        {/* Mensaje sobre registro */}
        <div>
          <p className="jpyrsa-color mt-10">
            Si aún no tienes cuenta{" "}
            <Link
              to="/registro"
              className="font-bold underline hover:text-indigo-500"
            >
              Regístrate
            </Link>{" "}
            para ahorrar tiempo en tus facturas
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registro;
