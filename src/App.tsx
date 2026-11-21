// App.tsx (Complete)
import { useState } from "react";
import { type Contact, INITIAL_CONTACTS } from "./types";
import { AddContactForm } from "./components/AddContactForm";
import { ContactCard } from "./components/ContactCard";

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [editingId, setEditingId] = useState<string | null>(null);

  // CREATE: Add a new contact using spread syntax
  const handleAdd = (name: string, city: string) => {
    const newContact: Contact = {
      id: crypto.randomUUID(), // Generates a unique ID natively in the browser
      name,
      city,
    };
    setContacts((prev) => [newContact, ...prev]);
  };

  // UPDATE: Replace only the matching contact using .map()
  const handleSave = (id: string, name: string, city: string) => {
    if (!name || !city) return;
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name, city } : c)),
    );
    setEditingId(null); // Exit edit mode
  };

  // DELETE: Keep every contact EXCEPT the matching one using .filter()
  const handleDelete = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Contact Book</h1>
          <p className="text-gray-600">Keep track of where your friends live</p>
        </header>

        <AddContactForm onAdd={handleAdd} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isEditing={editingId === contact.id}
              onStartEdit={() => setEditingId(contact.id)}
              onCancelEdit={() => setEditingId(null)}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
