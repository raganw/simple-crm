import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "./types";
import { UserRow } from "./user-row";

export const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("/api/users");
            setUsers(result.data);
        };
        fetchData();
    }, []);
    return (
        <div className="w-full">
            <h2 className="text-xl font-fold">Users</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Phone Number</th>
                        <th>User Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <UserRow user={user} key={user.id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
