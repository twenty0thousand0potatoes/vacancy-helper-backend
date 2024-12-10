import mongoose from "mongoose";

const jobShema =  new mongoose.Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    salaryRange: { type: String },
    status: { type: String, required: true },
    note: { type: String },
},{ timestamps: true });

export default mongoose.model('Job', jobShema);