"use client";

import React, { useState } from 'react';
import { FormFields } from '../interfaces/form-fields';

interface Props {
    fields: FormFields[];
    onSubmit: (formData: { [key: string]: any }) => void;
}

const DynamicForm = ({ fields, onSubmit }: Props) => {
    const [formState, setFormState] = useState<{ [key: string]: any }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        setFormState((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Canal de Denuncias</h2>
            <div className="grid grid-cols-2 gap-4">
                {fields.map((field, index) => {
                    if (!field.visible) return null;

                    switch (field.type) {
                        case 'text':
                        case 'email':
                            return (
                                <div key={index} className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        defaultValue={field.defaultValue || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            );
                        case 'boolean':
                            return (
                                <div key={index} className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                                    <input
                                        type="checkbox"
                                        name={field.name}
                                        defaultChecked={field.default}
                                        onChange={handleChange}
                                        className="mt-1"
                                    />
                                </div>
                            );
                        case 'text-area':
                            return (
                                <div key={index} className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                                    <textarea
                                        name={field.name}
                                        defaultValue={field.defaultValue || ''}
                                        onChange={handleChange}
                                        rows={4}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    ></textarea>
                                </div>
                            );
                        case 'array-text':
                            return (
                                <div key={index} className="col-span-1">
                                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                                    <select
                                        name={field.name}
                                        multiple
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        {field.options?.map((option, i) => (
                                            <option key={i} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
            <div className="mt-4">
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Continuar
                </button>
            </div>
        </form>
    );
};

export default DynamicForm;