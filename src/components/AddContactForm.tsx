import {useState, FormEvent} from 'react'

interface AddContactFormProps {
    onAdd : (name : string, city : string) => void;
}

export function AddContactForm({ onAdd } : AddContactFormProps) {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault();
        if(!name.trim() || !city.trim()) return;

        onAdd(name.trim(), city.trim());
        setName("");
        setCity("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 bg-white p-4 rounded-lg shadow mb-6">
            <input 
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2 flex-1"
            />
            <input 
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border rounded px-3 py-2 flex-1"
            />
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                Add Contact
            </button>
        </form>
    );
}

