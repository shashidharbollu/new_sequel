import multer from "multer";
import Jobs from "../models/jobs.models.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/resume");
  },
  filename: (req, file, cb) => {
    const jobId = req.params.id;
    const { name, email, contact } = req.body;
    const fileName = Date.now() + file.originalname;
    const user = { name, email, contact, resume: `/resume/${fileName}` };
    const curJob = Jobs.findJob(jobId);
    curJob.applicants.push(user);
    cb(null, fileName);
  },
});

export const resumeUpload = multer({ storage });
