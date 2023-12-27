const authenticate = (req, res, next) => {
  if (req.cookies.user) {
    next();
  } else {
    res.render("message", {
      recruiter: null,
      message:
        "Only recruiter is allowed to access this page, login as recruiter to continue",
    });
  }
};
export default authenticate;
