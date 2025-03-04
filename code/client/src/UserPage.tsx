import { useEffect, useState } from "react";
import { User } from "./types";
import axios from "axios";
import { useParams } from "react-router";
import { UserNotes } from "./user-notes";

export const UserPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<User>();
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/api/users/${userId}`);
            setUser(result.data);
        };
        fetchData();
    }, [userId]);

    if (!user) {
        return;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                            <h2 className="font-semibold text-lg text-gray-800 mb-4">
                                Personal Information
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">First Name</p>
                                    <p className="text-gray-800">{user.firstName}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Last Name</p>
                                    <p className="text-gray-800">{user.lastName}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Age</p>
                                    <p className="text-gray-800">{user.age}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">Phone Number</p>
                                    <p className="text-gray-800">{user.phoneNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-semibold text-lg text-gray-800">
                                    User Notes
                                </h2>
                            </div>

                            <UserNotes userNotes={user.userNotes} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
