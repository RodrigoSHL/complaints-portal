"use client";
import { useEffect, useState } from 'react';
import { IoEllipsisVerticalSharp } from "react-icons/io5";

interface FormFields {
    _id: string;
    name: string;
    label: string;
    type: string;
    visible: boolean;
    default: boolean;
    defaultValue?: string;
    options?: string[];
}

export default function FieldsManagerPage() {
    const [fields, setFields] = useState<FormFields[]>([]);
    const [newField, setNewField] = useState<FormFields>({
        _id: '',
        name: '',
        label: '',
        type: 'text',
        visible: true,
        default: true,
        defaultValue: '',
    });
    const [selectedField, setSelectedField] = useState<FormFields | null>(null);
    const [menuOpen, setMenuOpen] = useState<string | null>(null);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    const endpoint = 'https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/dynamic-field';

    useEffect(() => {
        fetchFields();
    }, []);

    const fetchFields = async () => {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            console.log(data);
            setFields(data);
        } catch (error) {
            console.error('Error fetching fields:', error);
        }
    };

    const handleCreate = async () => {
        console.log(newField);
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newField),
            });
            const createdField = await response.json();
            setFields((prevFields) => [...prevFields, createdField]);
            setNewField({ _id: '', name: '', label: '', type: 'text', visible: true, default: true, defaultValue: '' });
        } catch (error) {
            console.error('Error creating field:', error);
        }
    };

    const handleUpdate = async (id: string, updatedField: Partial<FormFields>) => {
        console.log(updatedField);
        try {
            await fetch(`${endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedField),
            });
            setFields((prevFields) =>
                prevFields.map((field) =>
                    field.name === id ? { ...field, ...updatedField } : field
                )
            );
        } catch (error) {
            console.error('Error updating field:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await fetch(`${endpoint}/${id}`, {
                method: 'DELETE',
            });
            setFields((prevFields) => prevFields.filter((field) => field._id !== id));
        } catch (error) {
            console.error('Error deleting field:', error);
        }
    };

    const handleToggleVisible = async (field: FormFields) => {
        const updatedField = { ...field, visible: !field.visible };
        await handleUpdate(field.name, updatedField);
    };


    const openEditModal = (field: FormFields) => {
        setSelectedField(field);
        setEditModalOpen(true);
        setMenuOpen(null);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedField(null);
    };

    const handleEditSubmit = () => {
        if (selectedField) {
            handleUpdate(selectedField._id, selectedField);
            closeEditModal();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Form Fields</h1>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Create New Field</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <input
                            type="text"
                            placeholder="Name"
                            value={newField.name}
                            onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <input
                            type="text"
                            placeholder="Label"
                            value={newField.label}
                            onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <select
                            value={newField.type}
                            onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="boolean">Boolean</option>
                            <option value="text-area">Text Area</option>
                            <option value="array-text">Array Text</option>
                            <option value="file">File</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Default Value"
                            value={newField.defaultValue}
                            onChange={(e) => setNewField({ ...newField, defaultValue: e.target.value })}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <button
                        onClick={handleCreate}
                        className="mt-4 bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors"
                    >
                        Create Field
                    </button>
                </div>

                <h2 className="text-xl font-semibold text-gray-700 mb-4">Existing Fields</h2>
                <ul className="space-y-4">
                    {fields.map((field) => (
                        <li key={field.name} className="bg-gray-50 p-4 rounded-md shadow-sm flex justify-between items-center">
                            <div>
                                <p className="text-lg font-medium text-gray-800">{field.label}</p>
                                <p className="text-sm text-gray-600">Type: {field.type}</p>
                            </div>
                            <div className="relative flex items-center space-x-2">
                                <div className="flex items-center">
                                    <span className="mr-2 text-sm text-gray-600">Visible</span>
                                    <input
                                        type="checkbox"
                                        checked={field.visible}
                                        onChange={() => handleToggleVisible(field)}
                                        className="toggle-switch"
                                    />
                                </div>
                                <button
                                    onClick={() => setMenuOpen(menuOpen === field.name ? null : field.name)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <IoEllipsisVerticalSharp />

                                </button>

                                {menuOpen === field.name && (
                                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                                        <button
                                            onClick={() => openEditModal(field)}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(field._id)}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {editModalOpen && selectedField && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Field</h2>
                        <input

                            type="text"
                            placeholder="Name"
                            value={selectedField.name}
                            onChange={(e) =>
                                setSelectedField({ ...selectedField, name: e.target.value })
                            }
                            className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <input
                            type="text"
                            placeholder="Label"
                            value={selectedField.label}
                            onChange={(e) =>
                                setSelectedField({ ...selectedField, label: e.target.value })
                            }
                            className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <select
                            value={selectedField.type}
                            onChange={(e) =>
                                setSelectedField({ ...selectedField, type: e.target.value })
                            }
                            className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="boolean">Boolean</option>
                            <option value="text-area">Text Area</option>
                            <option value="array-text">Array Text</option>
                            <option value="file">File</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Default Value"
                            value={selectedField.defaultValue}
                            onChange={(e) =>
                                setSelectedField({
                                    ...selectedField,
                                    defaultValue: e.target.value,
                                })
                            }
                            className="border border-gray-300 rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleEditSubmit}
                                className="bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={closeEditModal}
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
