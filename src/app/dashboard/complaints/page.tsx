
import { IComplaint } from '@/complaints';
import { ComplaintMain } from '@/complaints/components/ComplaintMain';
import { notFound } from 'next/navigation';

const endpoint = 'https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/complaint';

const getComplaint = async (): Promise<IComplaint[]> => {
    try {
        const response = await fetch(`${endpoint}`, {
            cache: "no-store", // Usar "no-store" para asegurar una solicitud fresca
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch complaint: ${response.status}`);
        }

        const complaint: IComplaint[] = await response.json();
        return complaint;
    } catch (error) {
        console.error("Error fetching complaint:", error);
        notFound(); // Solo llamar a notFound si ocurre un error real
    }
}

export default async function ComplaintList() {

    const complaints: IComplaint[] = await getComplaint();

    if (!complaints) {
        return notFound(); // Manejar el caso en el que no se obtiene una denuncia
    }

    return (
        <>
            <ComplaintMain complaintList={complaints}/>
        </>
    );

}