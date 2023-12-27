import Recruiter from "../models/recruiter.models.js";

const createRecruiterCookie = (req, res, next) => {
  const { email, password } = req.body;
  const curRecruiter = Recruiter.findRecruiter(email, password);
  if (curRecruiter) {
    if (req.cookies.user) {
      res.clearCookie("user");
    }
    res.cookie("user", curRecruiter, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
  } else {
    return res.render("message", {
      message: "User not found",
      recruiter: null,
    });
  }
  next();
};
export default createRecruiterCookie;
