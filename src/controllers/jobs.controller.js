import Jobs from "../models/jobs.models.js";

export default class JobsController {
  newJobGet(req, res, next) {
    res.render("postjob", { recruiter: req.cookies?.user });
  }

  newJobPost(req, res, next) {
    const {
      jobCategory = "",
      jobDesignation = "",
      jobLocation = "",
      companyName = "",
      enterSalary = 1,
      position = 1,
      skillsRequired = [],
      applyBy = "",
    } = req.body;

    Jobs.addJob(
      req.cookies.user.id,
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      enterSalary,
      position,
      skillsRequired,
      applyBy
    );
    res.redirect("/jobs");
  }

  getJob(req, res, next) {
    const allJobs = Jobs.getAllJobs();
    res.render("jobs", {
      allJobs,
      recruiter: req.cookies?.user,
    });
  }

  postJob(req, res, next) {
    const { name } = req.body;
    const allJobs = Jobs.findJob(null, name);
    res.render("jobs", {
      allJobs,
      recruiter: req.cookies?.user,
    });
  }

  getCurJob(req, res, next) {
    const curJobID = req.params.id;
    const curJob = Jobs.findJob(curJobID);

    res.render("jobFull", { curJob, recruiter: req.cookies?.user });
  }

  updateCurJobGet(req, res, next) {
    const jobId = req.params.id;
    const curJob = Jobs.findJob(jobId);
    res.render("updatemodal.ejs", {
      curJob,
      recruiter: req.cookies?.user,
    });
  }

  updateCurJobPost(req, res, next) {
    const jobId = req.params.id;
    const {
      jobCategory = "",
      jobDesignation = "",
      jobLocation = "",
      companyName = "",
      enterSalary = 1,
      position = 1,
      skillsRequired = [],
      applyBy = "",
    } = req.body;

    Jobs.updateJob(
      jobId,
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      enterSalary,
      position,
      skillsRequired,
      applyBy
    );
    res.redirect(`/job/${jobId}`);
  }

  deleteJob(req, res, next) {
    const jobId = req.params.id;
    Jobs.deleteJob(jobId);
    res.redirect("/jobs");
  }

  postResume(req, res, next) {
    res.redirect("/jobs");
  }

  getApplicantDetails(req, res, next) {
    const jobId = req.params.id;
    const curJob = Jobs.findJob(jobId);
    res.render("applicants", {
      applicants: curJob.applicants,
      recruiter: req.cookies?.user,
    });
  }

  nfu(req, res, next) {
    res.render("message", {
      recruiter: req.cookies?.user,
      message: "Only recruiter for the current job can view the applicants",
    });
  }
}
