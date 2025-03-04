export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;
    userNotes: UserNote[];
}

export interface UserNote {
    id: number;
    content: string;
    createdAt: string;
}
