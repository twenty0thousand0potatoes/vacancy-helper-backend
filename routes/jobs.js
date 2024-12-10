import { Router } from "express";
import Job from "../models/job.model.js";

const jobs_router = Router();

jobs_router.get("/", async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query; 
  const skip = (page - 1) * pageSize; 
  const limit = parseInt(pageSize);  

  try {

    const jobs = await Job.find()
      .skip(skip)
      .limit(limit);

    const totalJobs = await Job.countDocuments();

    res.status(200).json({
      jobs,
      totalPages: Math.ceil(totalJobs / pageSize),  
      currentPage: page,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

jobs_router.post("/", async (req, res) => {
  const { company, position, salaryRange, status, note } = req.body;


  if (!company || !position || !salaryRange || !status) {
    return res.status(400).json({ message: "Недостаточно данных для создания вакансии" });
  }

  const job = new Job({
    company,
    position,
    salaryRange,
    status,
    note,
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


jobs_router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ message: "Вакансия не найдена" });
    }

    res.json({ message: "Вакансия удалена" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

jobs_router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Вакансия не найдена" });
    }

    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default jobs_router;
