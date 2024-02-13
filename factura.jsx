import React, { useState } from "react";
import {
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Componente para iniciar el proceso de facturación.
 * Permite al usuario ingresar los datos de su ticket y de facturación.
 *
 * @returns {JSX.Element} Elemento JSX que representa el componente de facturación.
 */
const FacturaComponent = () => {
  const [ticketValidado, setTicketValidado] = useState(false);
  const [datosFactura, setDatosFactura] = useState(null);
  const [formularioHabilitado, setFormularioHabilitado] = useState(false);

  // Arreglo de datos de tickets ficticios
  const ticketsFicticios = [
    {
      fechaVenta: "2024-02-09",
      folioVenta: "1234567890",
      idVenta: "9876543210",
      total: "500.00",
    },
    {
      fechaVenta: "2024-02-08",
      folioVenta: "0987654321",
      idVenta: "1234567890",
      total: "750.00",
    },
    {
      fechaVenta: "2024-02-07",
      folioVenta: "2468013579",
      idVenta: "1357924680",
      total: "300.00",
    },
  ];

  /**
   * Maneja la validación del ticket ingresado por el usuario.
   * Comprueba si los datos del ticket coinciden con los datos de algún ticket ficticio.
   */
  const handleValidarTicket = () => {
    const fechaVenta = document.getElementById("fechaVenta").value;
    const folioVenta = document.getElementById("folioVenta").value;
    const idVenta = document.getElementById("idVenta").value;
    const total = document.getElementById("total").value;

    // Validar si los datos del ticket existen en el arreglo de tickets ficticios
    const ticketValido = ticketsFicticios.some(
      (ticket) =>
        ticket.fechaVenta === fechaVenta &&
        ticket.folioVenta === folioVenta &&
        ticket.idVenta === idVenta &&
        ticket.total === total
    );

    if (ticketValido) {
      setTicketValidado(true);
      setDatosFactura({ folioVenta, total });
      setFormularioHabilitado(true); // Habilitar el formulario de facturación
    } else {
      toast.error("Los datos del ticket no son válidos.");
    }
  };

  return (
    <div className="bg-slate-100 rounded-lg p-5">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">
        ¡Inicia tu factura!
      </h2>
      <h3 className="jpyrsa-color font-semibold">
        1. Ingresa los Datos de tu Ticket
      </h3>
      <div className="mt-4">
        <form action="#" className="flex flex-col">
          {/* Formulario para ingresar los datos del ticket */}
          {/* Se omite la implementación del formulario de ticket para simplificar */}
        </form>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center mt-4">
        {/* Mensaje de validación del ticket */}
        <div className="flex items-center mb-2 lg:mb-0">
          {ticketValidado ? (
            <>
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              <p className="text-green-500">
                Ticket validado, puedes continuar
              </p>
            </>
          ) : (
            <>
              <InformationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-red-500">Ticket pendiente por validar</p>
            </>
          )}
        </div>
        {/* Botón para validar el ticket */}
        <div className="flex items-center">
          <button
            onClick={handleValidarTicket}
            className="bg-jpyrsa hover:bg-jpyrsa text-white font-bold rounded-md transition-all duration-300 px-4 py-2"
            disabled={ticketValidado} // Deshabilitar el botón si el ticket ya está validado
          >
            Validar Ticket
          </button>
        </div>
      </div>
      {/* Se omite el formulario de datos de facturación para simplificar */}
      <ToastContainer />
    </div>
  );
};

export default FacturaComponent;
