import { useState } from "react";
import { User } from "./types";
import axios from "axios";
import { AddNote } from "./add-note";
import { Link } from "react-router";
import { UserNotes } from "./user-notes";

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
            <td>
                <Link to={`/user/${user.id}`}>{firstName}</Link>
            </td>
            <td>
                <Link to={`/user/${user.id}`}>{lastName}</Link>
            </td>
            <td>
                <Link to={`/user/${user.id}`}>{age}</Link>
            </td>
            <td>
                <Link to={`/user/${user.id}`}>{phoneNumber}</Link>
            </td>
            <td>
                <UserNotes userNotes={user.userNotes} />
            </td>
        </tr>
    );
};
