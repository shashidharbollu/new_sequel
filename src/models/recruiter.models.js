const allRecruiters = [
  {
    id: "xyz",
    name: "Bhavya",
    email: "xyz@samplemail.com",
    password: "123",
  },
];

export default class Recruiter {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static addRecruiter(name, email, password) {
    const recruiter = new Recruiter(
      allRecruiters.length + 1,
      name,
      email,
      password
    );
    allRecruiters.push(recruiter);
  }

  static findRecruiter(email, password) {
    const curRecruiter = allRecruiters.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );
    return curRecruiter;
  }
}
