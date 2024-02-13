import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { auth, firestore } from "../../config/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";

/**
 * Componente para mostrar información del usuario autenticado y opciones de sesión.
 * Muestra el nombre y correo electrónico del usuario autenticado.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.onLogout - Función para manejar el cierre de sesión.
 * @param {Function} props.setUsuarioActivo - Función para cambiar el estado de usuario activo.
 * @returns {JSX.Element} Elemento JSX que representa la información del usuario y opciones de sesión.
 */
const UsuarioActivo = ({ onLogout, setUsuarioActivo }) => {
  // Estados para almacenar información del usuario y datos adicionales
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efecto para cargar datos del usuario al montar el componente
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Obtiene los datos adicionales del usuario desde Firestore
        const fetchUserData = async () => {
          try {
            const userRef = doc(firestore, "usuarios", user.uid);
            const userDataSnapshot = await getDoc(userRef);
            if (userDataSnapshot.exists()) {
              const userData = userDataSnapshot.data();
              setUserData(userData);
            }
          } catch (error) {
            console.error("Error al obtener datos de usuario:", error);
          } finally {
            setLoading(false); // Marcar carga como completada independientemente del resultado
          }
        };
        
        fetchUserData();
      } else {
        setUser(null);
        setUserData(null);
        setLoading(false); // Marcar carga como completada ya que no hay usuario autenticado
      }
    });

    // Devolver la función de limpieza para cancelar la suscripción al desmontar el componente
    return () => unsubscribe();
  }, []);

  // Función para manejar el cierre de sesión
  const handleSignOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      setUsuarioActivo(false);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  };

  // Renderizar el componente de carga si los datos del usuario aún se están cargando
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Renderizar la información del usuario y opciones de sesión
  return (
    <div className="p-5 div-morado rounded-lg font-sans bg-slate-100">
      <div>
        <h2 className="text-center text-2xl font-bold mb-4 text-gray-600">
          ¡Bienvenido, {user ? (userData ? `${userData.nombre} ${userData.apePaterno} ${userData.apeMaterno}` : user.email) : 'Usuario'}!
        </h2>
      </div>
      {/* Mostrar el correo electrónico del usuario */}
      <div className="mb-1 flex gap-x-2">
        <EnvelopeIcon className="w-6 jpyrsa-color" />
        <p>{user ? user.email : 'Correo electrónico'}</p>
      </div>
      {/* Opciones de sesión */}
      <div className="text-right">
        <button className="jpyrsa-color hover:underline font-semibold" onClick={handleSignOut}>
          Cerrar Sesión
        </button>
      </div>
      <div className="text-right">
        <Link to="/cambiarcontrasena" className="jpyrsa-color hover:underline font-semibold">
          Cambiar Contraseña
        </Link>
      </div>
    </div>
  );
};

export default UsuarioActivo;
