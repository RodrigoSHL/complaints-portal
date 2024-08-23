import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png"
import { ComplaintStatusPanel } from "@/portal/components/ComplaintStatusPanel";

const PortalDenuncias = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cyan-600">            
            <div className="bg-white rounded-lg shadow-md p-10 flex flex-col md:flex-row w-10/12">
                {/* Sección de la izquierda */}
                <div className="w-full md:w-7/12 p-8">
                    <h1 className="text-3xl font-bold mb-4">Canal de Denuncias</h1>
                    <p className="text-gray-600 mb-6">
                        En [Nombre de Empresa] tu voz cuenta: Denuncia segura y confidencial
                    </p>
                    <p className="text-gray-600 mb-4">
                        ¿Qué es la Ley Karin? <br />
                        La Ley 21.643 tiene por objeto prevenir, investigar y sancionar el acoso laboral,
                        el acoso sexual, así como la violencia en el trabajo, garantizando los derechos de las víctimas y facilitando el acceso a la justicia.
                    </p>
                    <p className="text-gray-600 mb-6">
                        Presenta tu denuncia de forma fácil y segura. Nuestro portal te brinda un espacio confidencial para que puedas expresar lo ocurrido.
                    </p>
                    <h2 className="text-xl font-semibold mb-2">¿Cómo presentar una denuncia?</h2>
                    <ul className="list-decimal list-inside text-gray-600 mb-4">
                        <li>Completa un sencillo formulario donde podrás describir detalladamente lo sucedido.</li>
                        <li>Selecciona la categoría que mejor se ajuste a tu situación para agilizar el proceso.</li>
                        <li>Puedes adjuntar documentos, fotografías u otros archivos que puedan respaldar tu denuncia (opcional).</li>
                        <li>Al finalizar, recibirás un código único que te permitirá hacer seguimiento a tu denuncia en cualquier momento. ¡Guárdalo en un lugar seguro!</li>
                    </ul>
                    <p className="text-gray-600 font-semibold">
                        ¡No dudes en denunciar! Tu voz es fundamental para erradicar el acoso y la violencia.
                    </p>
                </div>

                {/* Sección de la derecha */}
                <div className="w-full md:w-5/12 p-8 flex flex-col justify-between">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Ingresar nueva denuncia</h2>
                        <Link href='/portal/complaint-form'>
                            <button className="w-full bg-cyan-500 text-white py-3 rounded-md">
                                Continuar
                            </button>
                        </Link>
                    </div>

                   <ComplaintStatusPanel />
                </div>
            </div>
        </div>
    );
};

export default PortalDenuncias;
