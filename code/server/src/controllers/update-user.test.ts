import { DataSource, Repository } from "typeorm";
import { beforeEach, describe, test, expect } from "vitest";
import { User } from "../entity/User";
import { updateUser } from "./update-user";

describe("updateUser", () => {
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
            entities: [User],
            migrations: [],
            subscribers: [],
        });
        await testDataSource.initialize();
        testUserRepo = testDataSource.manager.getRepository(User);
        testUserRepo.insert(testUser);
    });

    test("it should update the user information, not creating another record", async () => {
        // Assemble
        const testUpdateData = {
            ...testUser,
            age: 31,
            firstName: "Johnny",
        };
        const beforeUpdate = await testUserRepo.find();
        expect(beforeUpdate).toHaveLength(1);
        expect(beforeUpdate[0]).toStrictEqual(testUser);

        // Act
        await updateUser(testDataSource, testUpdateData);

        // Assert
        const afterUpdate = await testUserRepo.find();
        expect(afterUpdate).toHaveLength(1);
        expect(afterUpdate[0]).toMatchInlineSnapshot(`
          User {
            "age": 31,
            "firstName": "Johnny",
            "id": 123,
            "lastName": "Doe",
            "phoneNumber": "4255550123",
          }
        `);
    });
});
