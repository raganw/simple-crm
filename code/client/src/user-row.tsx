import { useState } from "react";
import { User } from "./types";
import axios from "axios";
import { AddNote } from "./add-note";

type EditingMode = "none" | "user" | "userNote";

export const UserRow: React.FC<{ user: User }> = ({ user }) => {
    const [editingMode, setEditingMode] = useState<EditingMode>("none");
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(`${user.age}`);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleUserSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await axios.put(`/api/users/${user.id}`, {
                firstName,
                lastName,
                age,
                phoneNumber,
            });
            setSuccess(true);
            setEditingMode("none");
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((error as any).response.data);
        }
        setLoading(false);
    };
    if (editingMode === "user") {
        return (
            <tr>
                <td colSpan={7}>
                    <form
                        onSubmit={handleUserSubmit}
                        className="space-y-4 p-4 rounded bg-gray-100 w-96">
                        <h2 className="text-xl font-fold">Edit</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && (
                            <p className="text-green-500">User added successfully</p>
                        )}
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Age"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="block w-full p-2 bg-blue-500 text-white rounded">
                            Update User
                        </button>
                    </form>
                </td>
            </tr>
        );
    }
    if (editingMode === "userNote") {
        return (
            <tr>
                <td colSpan={7}>
                    <AddNote
                        userId={user.id}
                        onSuccess={() => {
                            setEditingMode("none");
                        }}
                    />
                </td>
            </tr>
        );
    }
    return (
        <tr key={user.id}>
            <td className="grid gap-1">
                <button onClick={() => setEditingMode("user")}>Edit</button>
                <button onClick={() => setEditingMode("userNote")}>Add Note</button>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>{phoneNumber}</td>
            <td>
                <ul className="space-y-3">
                    {user.userNotes.map(note => (
                        <li
                            key={note.id}
                            className="rounded-lg bg-white shadow p-4 border border-gray-200">
                            <div className="flex flex-col">
                                <p className="text-gray-800">{note.content}</p>
                                <span className="text-xs text-gray-400 mt-2 self-end">
                                    {new Date(note.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};
