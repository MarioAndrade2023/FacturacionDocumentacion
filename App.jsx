import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BarraNavegacion from './components/globales/barra_navegacion';
import Inicio from './components/vistas/inicio';
import Ayuda from './components/vistas/ayuda';
import Contactanos from './components/vistas/contactanos';
import Guia from './components/vistas/guia';
import ReimprimirFactura from './components/vistas/reimprimefactura';
import Footer from './components/globales/footer';
import Error404 from './components/vistas/error404';
import Registro from './components/formularios/formulario_registro';
import RecuperarPassword from './components/formularios/recuperacion_password';

/**
 * Componente principal que actúa como el contenedor principal de la aplicación de facturación.
 * Este componente define las rutas y componentes de la aplicación.
 *
 * @returns {JSX.Element} Elemento JSX que representa la aplicación de facturación.
 */
function App() {
  // Estado para almacenar la opción de navegación seleccionada
  const [navSelected, setnavSelected] = useState('inicio');

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Barra de navegación global */}
        <BarraNavegacion setnavSelected={setnavSelected} />
        
        <div className="flex-grow">
          {/* Definición de rutas */}
          <Routes>
            {/* Ruta de inicio */}
            <Route path="/" element={<Navigate to="/inicio" />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/reimprimeFactura" element={<ReimprimirFactura />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/guia" element={<Guia />} />
            <Route path="/contactanos" element={<Contactanos />} />
            <Route path="/registro" element={<Registro />} />
            <Route path='/recuperarpassword' element={<RecuperarPassword/>} />
            
            {/* Ruta para manejar cualquier URL no coincidente */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
        
        {/* Footer global */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App; 
