import React from 'react';

/**
 * Componente Footer para la aplicación de facturación.
 * Muestra información de contacto y detalles sobre la empresa.
 *
 * @returns {JSX.Element} Elemento JSX que representa el pie de página.
 */
const Footer = () => {
  return (
    <footer className="bg-jpyrsa text-white py-3">
      <div className="container mx-auto flex flex-wrap justify-center md:justify-between">
        {/* Sección de Ubicación */}
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6 md:mb-0">
          <h3 className="text-base md:text-xl font-bold mb-2">Nuestra Ubicación</h3>
          <p className="text-xs md:text-sm">Constitución de 1917 Mz 9 Lt 3</p>
          <p className="text-xs md:text-sm">Col. Prof. Arturo López</p>
          <p className="text-xs md:text-sm">CP 01620 Delegación Álvaro Obregón, CDMX</p>
        </div>

        {/* Sección de Contacto */}
        <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-6 md:mb-0">
          <h3 className="text-base md:text-xl font-bold mb-2">Contacto</h3>
          <p className="text-xs md:text-sm">Teléfono: 55 8421 4681</p>
          <p className="text-xs md:text-sm">Email: info@jpyrsa.mx</p>
        </div>

        {/* Sección "Sobre Nosotros" */}
        <div className="w-full md:w-1/2 lg:w-1/2 px-4 mb-6 md:mb-0">
          <h3 className="text-base md:text-xl font-bold mb-2">Sobre Nosotros</h3>
          <p className="text-xs md:text-sm">
            Jesús Palma & Romero, SA de CV, es una empresa internacional de
            servicios con profesionales altamente capacitados en México y
            Alemania. Nos especializamos en los campos de Tecnología de la
            Información, Comunicación y Telecomunicaciones.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
