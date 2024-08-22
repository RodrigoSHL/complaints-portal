import { IComplaint } from "@/complaints";
import { ViewStatusPanel } from "@/complaints/components/ViewStatusPanel";
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
    const response = await fetch(`${endpoint}/${id}`, {
      cache: "no-store", // Usar "no-store" para asegurar una solicitud fresca
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch complaint: ${response.status}`);
    }

    const complaint: IComplaint = await response.json();
    return complaint;
  } catch (error) {
    console.error("Error fetching complaint:", error);
    notFound(); // Solo llamar a notFound si ocurre un error real
  }
}

export default async function EstadoDenuncia({ params }: Props) {
  const complaint = await getComplaint(params.id);

  if (!complaint) {
    return notFound(); // Manejar el caso en el que no se obtiene una denuncia
  }


  return (
    <div className="min-h-screen bg-cyan-600">
      <div className="flex items-center justify-center pt-20">
        <ViewStatusPanel complaint={complaint} />
      </div>
    </div>
  );
};
