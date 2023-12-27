import { body, validationResult } from "express-validator";

const validateSignUp = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name cannot be empty"),
    body("email").isEmail().withMessage("Provide a valid email"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.send(result.errors.map((err) => err.msg));
  } else {
    next();
  }
};

export default validateSignUp;
