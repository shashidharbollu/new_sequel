export default function redirect(req, res, next) {
  if (req.cookies?.user) {
    return res.redirect("/jobs");
  } else {
    next();
  }
}
