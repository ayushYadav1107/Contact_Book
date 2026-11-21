import {useState} from 'react';
import { type Contact } from '../types';

interface ContactCardProps {
    contact : Contact;
    isEditing : boolean;
    onStartEdit : () => void;
    onCancelEdit : () => void;
    onSave : (id : string, name: string, city : string) => void;
    onDelete : (id : string) => void;
}

export function ContactCard({
    contact,
    isEditing,
    onStartEdit,
    onCancelEdit,
    onSave,
    onDelete
} : ContactCardProps) {
    // local draft state while editing
    const [draftName, setDraftName] = useState(contact.name);
    const [draftCity, setDraftCity] = useState(contact.city);

    const handleEditClick = () => {
    // Sync draft inputs with current contact data before opening edit mode
    setDraftName(contact.name);
    setDraftCity(contact.city);
    onStartEdit();
};

if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-3">
        <input
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="Name"
        />
        <input
          value={draftCity}
          onChange={(e) => setDraftCity(e.target.value)}
          className="border rounded px-2 py-1"
          placeholder="City"
        />
        <div className="flex justify-between mt-2">
          <button
            onClick={() => onDelete(contact.id)}
            className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700"
          >
            Delete
          </button>
          <div className="flex gap-2">
            <button onClick={onCancelEdit} className="border px-3 py-1 rounded">
              Cancel
            </button>
            <button
              onClick={() => onSave(contact.id, draftName.trim(), draftCity.trim())}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-lg">{contact.name}</h3>
        <p className="text-gray-600">{contact.city}</p>
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={handleEditClick} className="border px-3 py-1 rounded hover:bg-gray-100">
          Edit
        </button>
      </div>
    </div>
  );
}