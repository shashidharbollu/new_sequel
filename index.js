import express from "express";
import ejsLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
import HomepageController from "./src/controllers/homepage.controller.js";
import validateSignUp from "./src/middlewares/auth.recruiter.middleware.js";
import cookieParser from "cookie-parser";
import createRecruiterCookie from "./src/middlewares/recruiter.cookie.middleware.js";
import authenticate from "./src/middlewares/authenticate.middleware.js";
import JobsController from "./src/controllers/jobs.controller.js";
import redirect from "./src/middlewares/redirect.middleware.js";
import { resumeUpload } from "./src/middlewares/fileUpload.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const homepageController = new HomepageController();
const jobsController = new JobsController();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(ejsLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

app.get("/", redirect, homepageController.homepage);
app.get("/login", homepageController.loginGet);
app.get("/logout", homepageController.logout);
app.post("/", validateSignUp, homepageController.recruiterPost);
app.post("/login", createRecruiterCookie, homepageController.loginPost);
app.get("/postjob", authenticate, jobsController.newJobGet);
app.post("/postjob", authenticate, jobsController.newJobPost);
app.get("/jobs", jobsController.getJob);
app.post("/jobs", jobsController.postJob);
app.get("/job/:id", jobsController.getCurJob);
app.post(
  "/apply/:id",
  resumeUpload.single("resume"),
  jobsController.postResume
);
app.get("/job/update/:id", jobsController.updateCurJobGet);
app.post("/job/update/:id", jobsController.updateCurJobPost);
app.get("/job/delete/:id", jobsController.deleteJob);
app.get("/job/applicants/:id", jobsController.getApplicantDetails);
app.get("/nfu", jobsController.nfu);

export default app;
