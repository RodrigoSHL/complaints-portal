import Link from 'next/link'
import React from 'react'
import { IComplaint } from '../interfaces/complaints';

interface Props {
    complaint: IComplaint;
}

export const SendedView = ({complaint} : Props) => {
    return (
        <div className="bg-white rounded-lg shadow-lg m-6 p-10 w-full lg:w-8/12">
            <div className="flex items-center mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold">Canal de Denuncias</h1>
            </div>

            <h2 className="text-xl lg:text-2xl font-semibold mb-4">Ha completado su denuncia</h2>

            <div className="bg-gray-100 p-4 rounded-md mb-6">
                <p className="text-gray-700">
                    Identificador de denuncia: <span className="text-cyan-500">{complaint.idComplaint}</span>
                </p>
                <p className="text-gray-700">
                    Clave: <span className="text-cyan-500">{complaint.passComplaint}</span>
                </p>
            </div>

            <p className="text-gray-600 mb-6">
                Nuestro protocolo de seguimiento de denuncias de Ley Karin
            </p>

            <p className="text-gray-600 mb-6">
                Al recibir una denuncia, garantizamos la confidencialidad e iniciaremos una investigación exhaustiva. Un equipo designado recopilará evidencia, entrevistará a las partes involucradas y elaborará un informe detallado. Se adoptarán medidas cautelares si son necesarias para proteger a la víctima. Una vez concluida la investigación, se emitirá una resolución y se aplicarán las sanciones correspondientes. Se realizará un seguimiento continuo para asegurar la efectividad de las medidas adoptadas y prevenir nuevas ocurrencias. Este proceso se llevará a cabo de manera imparcial, eficiente y respetuosa con los derechos de las víctimas, promoviendo ambientes laborales seguros y libres de violencia.
            </p>

            <h3 className="text-lg lg:text-xl font-semibold mb-2">Principios que nos rigen:</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6">
                <li>Confidencialidad: Protección de la identidad de la víctima.</li>
                <li>Investigación exhaustiva: Recopilación de evidencia y entrevistas.</li>
                <li>Medidas cautelares: Protección inmediata de la víctima.</li>
                <li>Resolución imparcial: Sanciones a los responsables.</li>
                <li>Seguimiento continuo: Prevención de nuevas ocurrencias.</li>
            </ul>

            <div className="flex justify-end">
                <Link href="/portal">
                    <button className="bg-cyan-500 text-white py-2 px-6 rounded-md">
                        Volver
                    </button>
                </Link>

            </div>
        </div>)
}
