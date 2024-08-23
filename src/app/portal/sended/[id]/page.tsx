import { IComplaint } from "@/complaints";
import { SendedView } from "@/complaints/components/SendedView";
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
      console.log('complaint', complaint)
      return complaint;
    } catch (error) {
      console.error("Error fetching complaint:", error);
      notFound(); // Solo llamar a notFound si ocurre un error real
    }
  }
  
  export default async function SendedComplaintView({ params }: Props) {

    const complaint = await getComplaint(params.id);

    if (!complaint) {
      return notFound(); // Manejar el caso en el que no se obtiene una denuncia
    }
  
    return (
        <div className="min-h-screen flex items-center justify-center bg-cyan-600">
            <SendedView complaint={complaint}/>
        </div>
    );
};
