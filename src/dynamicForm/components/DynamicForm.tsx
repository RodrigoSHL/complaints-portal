"use client";

import React, { useState } from 'react';
import { FormFields } from '../interfaces/form-fields';
import Link from 'next/link';

interface Props {
    fields: FormFields[];
    onSubmit: (formData: { [key: string]: any }) => void;
}

const DynamicForm = ({ fields, onSubmit }: Props) => {
    const [formState, setFormState] = useState<{ [key: string]: any }>({});
    const [files, setFiles] = useState<{ [key: string]: File[] }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const fileList = (e.target as HTMLInputElement).files;
            if (fileList) {
                setFiles((prevFiles) => ({
                    ...prevFiles,
                    [name]: [...(prevFiles[name] || []), ...Array.from(fileList)],
                }));
            }
        } else {
            const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
            setFormState((prev) => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...formState, ...files });
    };

    return (
        <div className="container my-auto mx-auto py-10 px-4">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 w-full mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center">Canal de Denuncias</h2>
                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                    {fields.map((field, index) => {
                        if (!field.visible) return null;

                        switch (field.type) {
                            case 'text':
                            case 'email':
                                return (
                                    <div key={index}>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{field.label}</label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            defaultValue={field.default || ''}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                                                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                                        dark:focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                );
                            case 'boolean':
                                return (
                                    <div key={index} className="col-span-2 flex items-start mb-6">
                                        <div className="flex items-center h-5">
                                            <input
                                                type="checkbox"
                                                name={field.name}
                                                defaultChecked={field.default}
                                                onChange={handleChange}
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 
                                                        dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">{field.label}</label>
                                    </div>
                                );
                            case 'text-area':
                                return (
                                    <div key={index} className="col-span-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{field.label}</label>
                                        <textarea
                                            name={field.name}
                                            defaultValue={field.default || ''}
                                            onChange={handleChange}
                                            rows={4}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                                                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                                        dark:focus:border-blue-500"
                                        ></textarea>
                                    </div>
                                );
                            case 'array-text':
                                return (
                                    <div key={index}>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{field.label}</label>
                                        <select
                                            name={field.name}
                                            multiple
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                                                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                                    dark:focus:border-blue-500"
                                        >
                                            {field.options?.map((option, i) => (
                                                <option key={i} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            case 'file':
                                return (
                                    <div key={index} className="col-span-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{field.label}</label>
                                        <input
                                            type="file"
                                            name={field.name}
                                            multiple
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                                                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                                        dark:focus:border-blue-500"
                                        />
                                        {/* Optional: Display the list of uploaded files */}
                                        {files[field.name] && (
                                            <ul className="mt-2">
                                                {files[field.name].map((file, i) => (
                                                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400">
                                                        {file.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
                <div className="mt-4 flex flex-col space-y-2 md:space-y-0 md:space-x-2 md:flex-row ">
                    <Link href="/portal">
                        <button
                            type="button"
                            className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none 
                                focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto md:w-[200px] px-5 py-2.5 text-center 
                                dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                        >
                            Back
                        </button>
                    </Link>
                    <Link href="/portal/sended">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                                focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto md:w-[200px] px-5 py-2.5 text-center 
                                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Next
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default DynamicForm;
