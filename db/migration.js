import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';  
import Job from "../models/job.model.js";

dotenv.config({ path: '../.env' });
const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.v5a80.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;`

export const connectionDB = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log("connect"))
    .catch((e) => console.log("not connect, Error:" .concat(e)));
};
   

const generateFakeJobs = (num) => {
  const jobs = [];
  for (let i = 0; i < num; i++) {
    jobs.push({
      company: faker.company.name(),
      position: faker.person.jobTitle(),
      salaryRange: `$${faker.number.int({ min: 40000, max: 150000 })}-${faker.number.int({ min: 40000, max: 150000 })}`,
      status: faker.helpers.arrayElement(['Open', 'Closed', 'Pending']),
      note: faker.lorem.sentence(),
    });
  }
  return jobs;
};

const insertJobs = async (num) => {
  try {
    const fakeJobs = generateFakeJobs(num);
    await Job.insertMany(fakeJobs);  
    console.log(`Successfully inserted ${num} fake jobs into the database.`);
  } catch (error) {
    console.error('Error inserting fake jobs:', error);
  }
};

const seedDatabase = async () => {
  connectionDB();  
  await insertJobs(100000);  
};

seedDatabase().then(() => {
  console.log('Database seeding complete');
  mongoose.disconnect();  
});
