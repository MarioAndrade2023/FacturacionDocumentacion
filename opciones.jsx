import { ArrowDownCircleIcon, PrinterIcon } from "@heroicons/react/24/outline";

/**
 * Componente para mostrar opciones adicionales relacionadas con facturación.
 * Permite al usuario reimprimir o descargar facturas en formatos PDF y XML.
 *
 * @returns {JSX.Element} Elemento JSX que representa las opciones adicionales de facturación.
 */
const Opciones = () => {
  return (
    <div className="p-5 div-morado rounded-lg font-sans bg-slate-100">
      <h2 className="text-center text-2xl font-bold mb-4 text-gray-600">
        También puedes...
      </h2>
      {/* Opción para reimprimir factura */}
      <div className="mb-1 flex gap-x-2 m-t">
        <PrinterIcon className="w-6 jpyrsa-color" />
        <p className="jpyrsa-color">
          <a
            href="#"
            className="font-bold underline hover:text-indigo-500">
            Reimprimir
          </a>{" "}
          factura
        </p>
      </div>
      {/* Opción para descargar factura en formato PDF y XML */}
      <div className="mb-1 flex gap-x-2 m-t">
        <ArrowDownCircleIcon className="w-6 jpyrsa-color" />
        <p className="jpyrsa-color">
          <a
            href="#"
            className="font-bold underline hover:text-indigo-500">
            Descargar
          </a>{" "}
          factura en formato PDF y XML
        </p>
      </div>
    </div>
  );
};

export default Opciones;
