import { DataSource } from "typeorm";
import { User } from "../entity/User";

type UpdateUserShape = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;
};

export const updateUser = async (dataSource: DataSource, data: UpdateUserShape) => {
    const user = await dataSource.manager
        .getRepository(User)
        .findOne({ where: { id: data.id } });
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.age = data.age;
    user.phoneNumber = data.phoneNumber;
    return dataSource.manager.getRepository(User).save(user);
};
