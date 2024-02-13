import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, firestore } from "../../config/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";

/**
 * Componente para el formulario de registro de nuevos usuarios.
 * Permite a los usuarios ingresar su información y registrarse en la plataforma.
 *
 * @returns {JSX.Element} Elemento JSX que representa el formulario de registro.
 */
const FormularioRegistro = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apePaterno: "",
    apeMaterno: "",
    correo: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  /**
   * Maneja el cambio en los campos de entrada del formulario.
   * Actualiza el estado del usuario con los nuevos valores ingresados.
   *
   * @param {Event} e Evento del campo de entrada.
   */
  const handleInputChange = (e) => {
    setUsuario({ ...usuario, [e.target.id]: e.target.value });
    // Limpiar mensajes de error cuando el usuario modifica la contraseña
    setPasswordError("");
  };

  /**
   * Maneja el envío del formulario de registro.
   * Realiza la validación de los campos y registra al usuario en la plataforma.
   *
   * @param {Event} e Evento del formulario de registro.
   */
  const handleSubmitRegistrarse = async (e) => {
    e.preventDefault();

    // Validación de formularios: verifica que los campos requeridos no estén vacíos
    if (!usuario.nombre || !usuario.correo || !usuario.password) {
      toast.error("Por favor, complete todos los campos.", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Verifica que las contraseñas sean iguales
    if (usuario.password !== usuario.confirmPassword) {
      toast.error("Las contraseñas no coinciden", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Verifica que la contraseña tenga al menos 8 caracteres
    if (usuario.password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    // Validación de reglas de contraseña
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    // Verifica que la contraseña tenga al menos un carácter especial, letras y números
    if (!passwordRegex.test(usuario.password)) {
      // Mostrar mensaje de error en el div
      setPasswordError(
        "La contraseña debe contener al menos 8 caracteres, incluyendo letras, números y al menos un carácter especial como !@#$%^&*()"
      );

      // Limpiar el mensaje después de 10 segundos
      setTimeout(() => {
        setPasswordError("");
      }, 10000);
      return;
    }

    try {
      setLoading(true);

      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        usuario.correo,
        usuario.password
      );

      // Enviar correo de verificación
      await sendEmailVerification(userCredential.user);

      // Almacenar información en Firestore con referencia al usuario
      const userRef = doc(firestore, "usuarios", userCredential.user.uid); // Referencia al documento del usuario
      await setDoc(userRef, {
        nombre: usuario.nombre,
        apePaterno: usuario.apePaterno,
        apeMaterno: usuario.apeMaterno,
        correo: usuario.correo,
      });

      setLoading(false);

      const mensaje =
        "Usuario registrado correctamente. Se ha enviado un correo electrónico de verificación.";
      toast.success(mensaje, { position: toast.POSITION.TOP_RIGHT });

      // Limpiar el estado del usuario después del registro exitoso
      setUsuario({
        nombre: "",
        apePaterno: "",
        apeMaterno: "",
        correo: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setLoading(false);

      // Verificar el tipo de error y mostrar un mensaje adecuado al usuario
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "El correo electrónico ya está en uso. Por favor, utiliza otro correo electrónico.",
          { position: toast.POSITION.TOP_RIGHT }
        );
      } else if (error.code === "auth/weak-password") {
        toast.error(
          "La contraseña es demasiado débil. Debe tener al menos 6 caracteres.",
          { position: toast.POSITION.TOP_RIGHT }
        );
      } else {
        // Mostrar mensaje de error genérico si el código de error no está definido
        const errorMessage = error.message || "Error al procesar la solicitud.";
        toast.error(errorMessage, { position: toast.POSITION.TOP_RIGHT });
      }
    }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto my-10 p-5 bg-slate-100 rounded-md">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-600">
          REGÍSTRATE
        </h1>
      </div>
      <p className="jpyrsa-color text-center font-semibold">
        Bienvenido al sitio de Facturación de Jpyrsa. Por favor, ingresa todos
        los datos necesarios para completar tu registro.
      </p>
      <form action="#" className="block" onSubmit={handleSubmitRegistrarse}>
        {/* Campos de entrada para nombre, apellido paterno, apellido materno, correo electrónico y contraseña */}
        {/* Manejo de cambios en los campos */}
        {/* Validación de campos */}
        {/* Mensajes de error */}
        <div className="text-right mt-3">
          {/* Botón de envío del formulario */}
          <input
            type="submit"
            value="Registrarme"
            className="bg-jpyrsa hover:bg-jpyrsa rounded-md p-2 text-white transition-all duration-300"
          />
        </div>
      </form>
      {/* Contenedor para mostrar notificaciones Toast */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default FormularioRegistro;
