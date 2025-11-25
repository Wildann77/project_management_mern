import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import TaskModel from "./src/models/task.model.js";
// sesuaikan path

dotenv.config();

// contoh ID workspace & project & user, bisa diganti dengan ID asli di database
const WORKSPACE_IDS = ["68a858480bd85d204e694381"];

const PROJECT_IDS = ["68a6d425ab8c104d23a782e1", "68a6d425ab8c104d23a782e2"];

const USER_IDS = ["68ac155dd4bbfff200a6b630"];

const generateTasks = (count = 20) => {
  return Array.from({ length: count }, (_, i) => {
    const createdAt = faker.date.recent({ days: 30 });
    const dueDate = faker.date.future({ years: 1 });

    return {
      _id: new mongoose.Types.ObjectId(),
      title: faker.hacker.phrase(), // judul random
      description: faker.lorem.sentence(), // deskripsi random
      project: new mongoose.Types.ObjectId(
        PROJECT_IDS[Math.floor(Math.random() * PROJECT_IDS.length)]
      ),
      workspace: new mongoose.Types.ObjectId(
        WORKSPACE_IDS[Math.floor(Math.random() * WORKSPACE_IDS.length)]
      ),
      status: faker.helpers.arrayElement(["TODO", "IN_PROGRESS", "DONE"]),
      priority: faker.helpers.arrayElement(["LOW", "MEDIUM", "HIGH"]),
      assignedTo: faker.helpers.arrayElement([
        null,
        new mongoose.Types.ObjectId(
          USER_IDS[Math.floor(Math.random() * USER_IDS.length)]
        ),
      ]),
      createdBy: new mongoose.Types.ObjectId(
        USER_IDS[Math.floor(Math.random() * USER_IDS.length)]
      ),
      dueDate,
      taskCode: `task-${faker.string.alphanumeric(4).toLowerCase()}`,
      createdAt,
      updatedAt: createdAt,
    };
  });
};

const seedTasks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await TaskModel.deleteMany({});
    console.log("Old tasks removed ✅");

    const tasks = generateTasks(20);
    await TaskModel.insertMany(tasks);
    console.log("Tasks seeded successfully ✅");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedTasks();
