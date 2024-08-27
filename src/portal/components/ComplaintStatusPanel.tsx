"use client";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/Loading/LoadingScreen';
import ReCAPTCHA from 'react-google-recaptcha';
interface Props {
    siteKey: string;
}


export const ComplaintStatusPanel = ({ siteKey }: Props) => {
    const [complaintId, setComplaintId] = useState('');
    const [passComplaint, setPassComplaint] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validCaptcha, setValidCaptcha] = useState<any>(null);

    const router = useRouter();
    const captcha = useRef<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!captcha.current.getValue()) {
            setValidCaptcha(false);
            return;
        }

        setIsLoading(true);
        const response = await fetch('https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/complaint/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: complaintId, pass: passComplaint }),
        });
        setIsLoading(false);

        if (response.ok) {
            const data = await response.json();
            if (data === true) { // Si la validación es exitosa
                router.push(`/portal/complaint-state/${complaintId}`);
            } else {
                console.error('La validación falló');
            }
        } else {
            console.error('Error al validar la denuncia');
        }
    };

    return (
        <div>
            {isLoading && <LoadingScreen />}

            <h2 className="text-xl font-semibold mb-4">Revisa el estado de tu denuncia</h2>
            <input
                type="text"
                placeholder="Número de denuncia"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4"
            />
            <input
                type="password"
                placeholder="Clave"
                value={passComplaint}
                onChange={(e) => setPassComplaint(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-6"
            />
            <div className='mb-5 flex justify-center'>
                <ReCAPTCHA ref={captcha} sitekey={siteKey}/>
            </div>

            {
                validCaptcha === false &&
                (<div className='text-red-600 mb-2 text-center'>
                    <p>Please accept the captcha</p>
                </div>)
            }

            <button onClick={handleSubmit} className="w-full bg-cyan-500 text-white py-3 rounded-md">
                Continuar
            </button>
        </div>)
}
