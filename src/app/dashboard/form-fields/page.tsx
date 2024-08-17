"use client";
import { FormFields } from "@/dynamicForm";
import DynamicForm from "@/dynamicForm/components/DynamicForm";

// export const metadata = {
//   title: "Form Fields Configuration¿",
//   description: "Configure the form fields",
//   date: "2021-07-19",
//   tags: ['form', 'form-fields', 'configuration']
// }

export default function FormFieldsPage() {

  const dynamicField: FormFields[] = [
    { name: 'anonymousComplaint', label: 'Anonymous Complaint', type: 'boolean', visible: true, default: true, defaultValue: 'some name' },
    {
      name: 'complaintExample',
      label: 'Type of complaint',
      type: 'array-text',
      visible: true,
      default: true,
      options: ['anonimo ex', 'con nombre ex', 'otro ex'], // Las opciones para el campo array-text
    },
    { name: 'companyRelationship', label: 'Company Relationship', type: 'text', visible: false, default: true, defaultValue: 'some name' },
    { name: 'email', label: 'Email', type: 'email', visible: true, default: true, defaultValue: 'some@email.com' },
    { name: 'incidentDetail', label: 'Incident details', type: 'text-area', visible: true, default: true, defaultValue: 'some text area' },
    { name: 'witnesses', label: 'Witnesses of the incident', type: 'text', visible: true, default: true, defaultValue: 'some name' },
    { name: 'involved', label: 'Mentions those involved', type: 'text', visible: true, default: true, defaultValue: 'some name' },
    {
      name: 'complaintType',
      label: 'Type of complaint',
      type: 'array-text',
      visible: false,
      default: true,
      options: ['anonimo', 'con nombre', 'otro'], // Las opciones para el campo array-text
    },
  ];

  const handleSubmit = (formData: { [key: string]: any }) => {
    console.log('Form Data Submitted:', formData);
    // Aquí es donde envías los datos a tu backend, por ejemplo, con fetch o axios
    // fetch('/api/submit', { method: 'POST', body: JSON.stringify(formData) });
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <DynamicForm fields={dynamicField} onSubmit={handleSubmit} />
    </div>
  );
}