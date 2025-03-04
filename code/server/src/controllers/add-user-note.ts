import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { UserNote } from "../entity/UserNote";

export const addUserNote = async (
    dataSource: DataSource,
    userId: number,
    content: string,
) => {
    const user = await dataSource.manager
        .getRepository(User)
        .findOneByOrFail({ id: userId });
    const userNote = new UserNote();
    userNote.content = content;
    userNote.user = user;
    return dataSource.manager.getRepository(UserNote).save(userNote);
};
