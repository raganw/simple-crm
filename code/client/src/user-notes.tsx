import { UserNote } from "./types";

type Props = {
    userNotes: UserNote[];
};
export const UserNotes: React.FC<Props> = ({ userNotes }) => {
    return (
        <ul className="space-y-3">
            {userNotes.map(note => (
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
    );
};
