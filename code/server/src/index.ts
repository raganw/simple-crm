import { updateUser } from "./controllers/update-user";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import * as express from "express";
import { UserNote } from "./entity/UserNote";
import { addUserNote } from "./controllers/add-user-note";

const run = async () => {
    await AppDataSource.initialize();
    const app = express();
    app.use(express.json());
    app.get("/users", async (req, res) => {
        const users = await AppDataSource.manager.getRepository(User).find({
            relations: { userNotes: true },
            order: { userNotes: { createdAt: "DESC" } },
        });
        res.json(users);
    });
    app.post("/users", async (req, res) => {
        const user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.phoneNumber = req.body.phoneNumber;
        await AppDataSource.manager.getRepository(User).save(user);
        res.json(user);
    });
    app.get("/users/:id", async (req, res) => {
        const user = await AppDataSource.manager.getRepository(User).findOneOrFail({
            where: { id: req.params.id },
            relations: { userNotes: true },
            order: { userNotes: { createdAt: "DESC" } },
        });
        res.json(user);
    });
    app.put("/users/:id", async (req, res) => {
        const user = await updateUser(AppDataSource, {
            id: req.params.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            phoneNumber: req.body.phoneNumber,
        });
        res.json(user);
    });
    app.post("/users/:id/note", async (req, res) => {
        const userNote = await addUserNote(
            AppDataSource,
            req.params.id,
            req.body.content,
        );
        res.json(userNote);
    });
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
};

run();
