"use client";

import React, { useEffect, useState } from 'react';
import { IFormFields } from '../interfaces/form-fields';
import FormFields from './FormFields';
import { useRouter } from 'next/navigation';


const DynamicForm = () => {
    const [dynamicField, setDynamicField] = useState<IFormFields[]>([]);
    const endpoint = 'https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/complaint';
    const router = useRouter();

    // const dynamicFieldMock: FormFields[] = [
    //     { name: 'anonymousComplaint', label: 'Anonymous Complaint', type: 'boolean', visible: true, default: true, defaultValue: 'some name' },
    //     { name: 'companyRelationship', label: 'Company Relationship', type: 'text', visible: true, default: true, defaultValue: 'some name' },
    //     { name: 'email', label: 'Email', type: 'email', visible: true, default: true, defaultValue: 'some@email.com' },
    //     { name: 'incidentDetail', label: 'Incident details', type: 'text-area', visible: true, default: true, defaultValue: 'some text area' },
    //     { name: 'witnesses', label: 'Witnesses of the incident', type: 'text', visible: true, default: true, defaultValue: 'some name' },
    //     { name: 'involved', label: 'Mentions those involved', type: 'text', visible: true, default: true, defaultValue: 'some name' },
    //     {
    //         name: 'complaintType',
    //         label: 'Type of complaint',
    //         type: 'array-text',
    //         visible: true,
    //         default: true,
    //         options: ['anonimo', 'con nombre', 'otro'], // Las opciones para el campo array-text
    //     },
    //     { name: 'attachments', label: 'Attachments', type: 'file', visible: true, default: true },
    // ];

    useEffect(() => {

        const fetchFields = async () => {
            try {
                const response = await fetch('https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/dynamic-field', {
                    headers: {
                        'accept': '*/*',
                    },
                });
                const data = await response.json();
                setDynamicField(data);
            } catch (error) {
                console.error('Error fetching form fields:', error);
            }
        };

        fetchFields();
    }, []);




    const handleSubmit = async (formData: { [key: string]: any }) => {
        //console.log('Form Data Submitted:', formData);
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        try {
            if (response.ok) {
                const data = await response.json();
                console.log('data', data)
                if (data.idComplaint) { // Si la validación es exitosa
                    router.push(`/portal/sended/${data.idComplaint}`);
                } else {
                    console.error('La validación falló');
                }
            } else {
                console.error('Error al validar la denuncia');
            }
        } catch (error) {
            console.error('Error creating field:', error);
        }
    };

    return (
        <div className="min-h-screen w-full bg-cyan-600 flex items-center justify-center">
            {dynamicField.length > 0 ? (
                <FormFields fields={dynamicField} onSubmit={handleSubmit} />
            ) : (
                <p>Loading form fields...</p>
            )}
        </div>
    );
};

export default DynamicForm;
