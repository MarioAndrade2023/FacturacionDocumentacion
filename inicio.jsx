import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registro from "../inicio/registro";
import UsuarioActivo from "../inicio/usuario_activo";
import Opciones from "../inicio/opciones";
import Factura from "../inicio/factura";

/**
 * Componente de la página de inicio de la aplicación de facturación.
 * Permite a los usuarios iniciar sesión, ver opciones y crear facturas.
 *
 * @returns {JSX.Element} Elemento JSX que representa la página de inicio.
 */
const Inicio = () => {
  // Estado para controlar si el usuario está activo (logueado)
  const [usuarioActivo, setUsuarioActivo] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setUsuarioActivo(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setUsuarioActivo(false);
  };

  // Función para manejar el clic en la opción de factura
  const handleFacturaClick = () => {
    if (!usuarioActivo) {
      toast.error("Necesitas iniciar sesión para crear tu factura");
    }
  };

  // Función para manejar el clic en el mensaje
  const handleMensajeClick = () => {
    if (!usuarioActivo) {
      toast.error("Necesitas iniciar sesión para crear tu factura");
    }
  };

  return (
    <>
      <div className="container mx-auto flex flex-col md:flex-row shadow-2xl shadow-gray-400">
        {/* Sección izquierda */}
        <div className="w-full md:w-2/6 p-3">
          {/* Renderizar el componente Registro si el usuario no está activo,
              de lo contrario, renderizar el componente UsuarioActivo */}
          {!usuarioActivo ? (
            <Registro
              onLogin={handleLogin}
              setUsuarioActivo={setUsuarioActivo}
            />
          ) : (
            <UsuarioActivo
              onLogout={handleLogout}
              setUsuarioActivo={setUsuarioActivo}
            />
          )}
          <div className="mt-4">
            <Opciones />
          </div>
        </div>
        {/* Sección derecha */}
        <div
          className={`w-full md:w-2/3 p-3 relative ${
            usuarioActivo ? "" : "opacity-40"
          }`}
        >
          {/* Mostrar mensaje y factura solo si el usuario no está activo */}
          {!usuarioActivo && (
            <>
              <div
                className="bg-gray-200 text-gray-950 font-bold p-4 rounded cursor-pointer"
                onClick={handleMensajeClick}
              >
                Necesitas estar logueado para crear tu factura
              </div>
              <img
                src="/src/assets/img/guia/factura_campos.png"
                alt="factura_campos"
                onClick={handleFacturaClick}
              />
            </>
          )}
          {/* Renderizar el componente Factura si el usuario está activo */}
          {usuarioActivo && <Factura />}
          {/* Contenedor de notificaciones Toast */}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Inicio;
