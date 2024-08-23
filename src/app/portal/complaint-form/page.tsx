import DynamicForm from "@/dynamicForm/components/DynamicForm";

export const metadata = {
    title: "Complaint Form",
    description: "Complete a simple form to describe in detail what happened.",
    date: "2024-08-01",
    tags: ['form', 'form-fields', 'configuration']
  }
  

export default function FormFieldsPage() {


    return (
        <>
            <DynamicForm />
        </>
    );
}
