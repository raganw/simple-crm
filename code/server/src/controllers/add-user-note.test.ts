import { DataSource, Repository } from "typeorm";
import { beforeEach, describe, test, expect } from "vitest";
import { User } from "../entity/User";
import { UserNote } from "../entity/UserNote";
import { addUserNote } from "./add-user-note";

describe("addUserNote", () => {
    let testUserRepo: Repository<User>;
    let testDataSource: DataSource;
    const testUser = new User();
    testUser.id = 123;
    testUser.age = 21;
    testUser.firstName = "John";
    testUser.lastName = "Doe";
    testUser.phoneNumber = "4255550123";

    beforeEach(async () => {
        testDataSource = new DataSource({
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            logging: false,
            entities: [User, UserNote],
            migrations: [],
            subscribers: [],
        });
        await testDataSource.initialize();
        testUserRepo = testDataSource.manager.getRepository(User);
        testUserRepo.insert(testUser);
    });

    test("add a note to a user", async () => {
        const TEST_NOTE_1 = "Test note 1";

        // Act
        await addUserNote(testDataSource, testUser.id, TEST_NOTE_1);

        // Assert
        const users = await testUserRepo.find({
            relations: { userNotes: true },
            order: { userNotes: { createdAt: "DESC" } },
        });
        expect(users).toHaveLength(1);
        expect(users[0].userNotes).toHaveLength(1);
        expect(users[0].userNotes[0].content).toEqual(TEST_NOTE_1);
        expect(users[0].userNotes[0].createdAt).toBeInstanceOf(Date);
    });
});
