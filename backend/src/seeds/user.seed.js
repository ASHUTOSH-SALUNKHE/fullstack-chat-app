import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import messageSchema from "../models/message.model.js";

config();


const seedDatabase = async () => {
  try {
    await connectDB();

    await messageSchema.deleteMany();
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();