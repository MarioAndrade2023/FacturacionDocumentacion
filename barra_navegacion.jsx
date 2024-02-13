import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars4Icon, PrinterIcon, QuestionMarkCircleIcon, BookOpenIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

/**
 * Componente de barra de navegación para la aplicación de facturación.
 * Permite al usuario navegar entre diferentes secciones de la aplicación.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {function} props.setaNavSeleccionado - Función para establecer la opción de navegación seleccionada.
 * @returns {JSX.Element} Elemento JSX que representa la barra de navegación.
 */
const BarraNavegacion = ({ setaNavSeleccionado }) => {
  // Estado para controlar la visibilidad del menú
  const [menuVisible, setMenuVisible] = useState(true);

  // Función para alternar la visibilidad del menú
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }

  // Función para manejar el enlace seleccionado
  const EnlaceSeleccionado = (enlace) => {
    setaNavSeleccionado(enlace);
  }

  return (
    <nav className="md:flex md:justify-between items-center justify-center p-2 bg-jpyrsa font-sans">
      {/* Logo y título de la aplicación */}
      <Link to="/" className="flex items-center cursor-pointer enlace__nav justify-center transition-all duration-300 hover:text-gray-300" onClick={() => EnlaceSeleccionado('inicio')}>
        <img
          src="/img/J-pyrsa.png"
          alt="logo Jpyrsa"
          className="w-14 mr-3"
        />
        <h1 className="text-2xl text-white">JPYRSA Facturación</h1>
      </Link>
      
      {/* Menú de navegación */}
      <ul className="items-center md:flex sm:justify-center text-white">
        {/* Botón para abrir/cerrar el menú en dispositivos móviles */}
        <li className="md:invisible block text-center">
          <button className="enlace__nav p-2" onClick={toggleMenu}>
            <Bars4Icon className="w-6 h-6" />
          </button>
        </li>
        
        {/* Enlaces de navegación */}
        <li className={`${menuVisible ? 'hidden md:block' : 'block md:hidden'}`} >
          <Link
            to="/ReimprimeFactura"
            className="flex items-center p-2 enlace__nav justify-center transition-all duration-300 hover:text-white"
            onClick={() => EnlaceSeleccionado('ReimprimeFactura')}
          >
            <PrinterIcon className="w-6 h-6" />
            Reimprime tu Factura
          </Link>
        </li>
        <li className={`${menuVisible ? 'hidden md:block' : 'block md:hidden'}`} >
          <Link
            to="/Ayuda"
            className="flex items-center p-2 enlace__nav justify-center transition-all duration-300 hover:text-white "
            onClick={() => EnlaceSeleccionado('Ayuda')}
          >
            <QuestionMarkCircleIcon className="w-6 h-6" />
            Ayuda
          </Link>
        </li>
        <li className={`${menuVisible ? 'hidden md:block' : 'block md:hidden'}`} >
          <Link
            to="/Guia"
            className="flex items-center p-2 enlace__nav justify-center transition-all duration-300 hover:text-white"
            onClick={() => EnlaceSeleccionado('Guia')}
          >
            <BookOpenIcon className="w-6 h-6" />
            Guía de Usuario
          </Link>
        </li>
        <li className={`${menuVisible ? 'hidden md:block' : 'block md:hidden'}`} >
          <Link
            to="/Contactanos"
            className="flex items-center p-2 enlace__nav justify-center transition-all duration-300 hover:text-white"
            onClick={() => EnlaceSeleccionado('Contactanos')}
          >
            <EnvelopeIcon className="w-6 h-6" />
            Contáctanos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BarraNavegacion;
