import { IComplaint } from "@/complaints";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const getComplaint = async (id: string): Promise<IComplaint> => {
  const endpoint = 'https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/complaint';

  try {
    const complaint = await fetch(`${endpoint}/${id}`, {
      cache: "force-cache" //cambiar esto en un futuro
    }).then(res => res.json());
    return complaint;
  } catch (error) {
    notFound();
  }

}
export default async function EstadoDenuncia({ params }: Props) {

  const complaint = await getComplaint(params.id);

  console.log(complaint);
  return (
    <div className="min-h-screen bg-cyan-600">

      <div className="flex items-center justify-center pt-20">
        <div className="bg-white rounded-lg shadow-md p-10 w-full lg:w-8/12 mt-12">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold">Canal de Denuncias</h1>
          </div>

          <h2 className="text-xl lg:text-2xl font-semibold mb-4">Estado de la denuncia: Recibida</h2>

          <div className="border-l-4 border-gray-300 pl-4">
            {/* Línea de tiempo */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="bg-black h-4 w-4 rounded-full mr-4"></div>
                <div className="text-sm text-gray-600">
                  <p>ddmmyyyy hh:mm:ss</p>
                  <p>Denuncia recibida</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="bg-black h-4 w-4 rounded-full mr-4"></div>
                <div className="text-sm text-gray-600">
                  <p>ddmmyyyy hh:mm:ss</p>
                  <p>Acción realizada lorem ipsum</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="bg-black h-4 w-4 rounded-full mr-4"></div>
                <div className="text-sm text-gray-600">
                  <p>ddmmyyyy hh:mm:ss</p>
                  <p>Acción realizada lorem ipsum</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="bg-black h-4 w-4 rounded-full mr-4"></div>
                <div className="text-sm text-gray-600">
                  <p>ddmmyyyy hh:mm:ss</p>
                  <p>Otras acciones realizada lorem ipsum</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="bg-cyan-600 h-4 w-4 rounded-full mr-4"></div>
                <div className="text-sm text-cyan-600">
                  <p>ddmmyyyy hh:mm:ss</p>
                  <p>Resolución emitida</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button className="bg-cyan-500 text-white py-2 px-6 rounded-md">
              Adjuntar + Evidencia
            </button>
            <Link href="/portal">
              <button className="bg-cyan-500 text-white py-2 px-6 rounded-md">
                Cerrar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};