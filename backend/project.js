import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import ProjectModel from "./src/models/project.model.js";
// pastikan path sesuai

dotenv.config();

const WORKSPACE_IDS = [
  "68a858480bd85d204e694381",
  "68a858480bd85d204e694382",
  "68a858480bd85d204e694383",
];

const USER_IDS = [
  "68a836b39ae7131e93e5e158",
  "68a836b39ae7131e93e5e159",
  "68a836b39ae7131e93e5e160",
];

const generateProjects = (count = 10) => {
  return Array.from({ length: count }, () => {
    const createdAt = faker.date.recent({ days: 30 });
    return {
      _id: new mongoose.Types.ObjectId(),
      name: faker.commerce.productName(), // nama project acak
      emoji: faker.internet.emoji(), // emoji random
      description: faker.lorem.sentence(), // deskripsi random
      workspace: new mongoose.Types.ObjectId(
        WORKSPACE_IDS[Math.floor(Math.random() * WORKSPACE_IDS.length)]
      ),
      createdBy: new mongoose.Types.ObjectId(
        USER_IDS[Math.floor(Math.random() * USER_IDS.length)]
      ),
      createdAt,
      updatedAt: createdAt,
    };
  });
};

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Hapus data lama
    await ProjectModel.deleteMany({});
    console.log("Old projects removed ✅");

    // Generate 20 project
    const projects = generateProjects(20);

    // Insert
    await ProjectModel.insertMany(projects);
    console.log("Projects seeded successfully ✅");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProjects();
