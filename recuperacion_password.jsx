import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Componente para enviar un correo electrónico de recuperación de contraseña.
 * Permite al usuario ingresar su correo electrónico y envía un enlace para restablecer la contraseña.
 *
 * @returns {JSX.Element} Elemento JSX que representa el formulario de recuperación de contraseña.
 */
const RecuperarPassword = () => {
  const [email, setEmail] = useState("");

  /**
   * Maneja el cambio en el campo de correo electrónico.
   * Actualiza el estado del correo electrónico.
   *
   * @param {Event} e Evento del campo de entrada de correo electrónico.
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Maneja el envío del formulario de recuperación de contraseña.
   * Envía un correo electrónico de recuperación al correo electrónico proporcionado por el usuario.
   *
   * @param {Event} e Evento del formulario de recuperación de contraseña.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(
        "Se ha enviado un correo de recuperación. Por favor, verifica tu bandeja de entrada."
      );

      // Limpiar el input después de enviar el formulario
      setEmail("");
    } catch (error) {
      console.error(error);
      toast.error(
        "Error al enviar el correo de recuperación. Por favor, verifica el correo electrónico proporcionado."
      );
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="bg-slate-100 p-4 md:p-8 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-600">
          RECUPERAR CONTRASEÑA
        </h2>
        <p className="text-gray-500 mb-4 md:mb-6">
          Introduce tu correo electrónico. Te enviaremos un enlace para cambiar
          tu contraseña.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 transition-all duration-300"
              required
            />
          </div>
          <input
            type="submit"
            value="Enviar Correo"
            className="bg-jpyrsa text-white px-4 py-2 rounded-md hover:bg-jpyrsa transition-all duration-300 w-full"
          />
        </form>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </div>
  );
};

export default RecuperarPassword;
