import { useState } from "react";
import axios from "axios";

type Props = {
    userId: number;
    onSuccess: () => void;
};

export const AddNote: React.FC<Props> = ({ userId, onSuccess }) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await axios.post(`/api/users/${userId}/note`, {
                content,
            });
            setSuccess(true);
            onSuccess();
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((error as any).response.data);
        }
        setLoading(false);
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded bg-gray-100 w-96">
            <h2 className="text-xl font-fold">Add User Note</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">User note added successfully</p>}
            <input
                type="textarea"
                placeholder="User Note"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded"
            />
            <button
                type="submit"
                disabled={loading}
                className="block w-full p-2 bg-blue-500 text-white rounded">
                Add Note
            </button>
        </form>
    );
};
