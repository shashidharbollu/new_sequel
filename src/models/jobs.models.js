let allJobs = [
  {
    id: "xyz",
    jobId: 1695003570534,
    applicants: [
      {
        name: "Veronica Smith",
        email: "veronica@gmail.com",
        contact: "9147843694",
        resume: "/resume/sample-resume.pdf",
      },
    ],
    category: "Tech",
    jobDesignation: "Full-Stack Developer",
    jobLocation: "Hyderabad,Pune",
    companyName: "Deloitte",
    salary: "7-8",
    totalOpening: "1",
    skills: ["React", "NodeJs", "Angular", "SQL", "Express"],
    applyBy: "2023-10-19",
    posted: "Sep 15, 2023, 09:11:25 PM",
  },
  {
    id: "xyz",
    jobId: 1695003600075,
    applicants: [
      {
        name: "Veronica Smith",
        email: "veronica@gmail.com",
        contact: "9147843694",
        resume: "/resume/sample-resume.pdf",
      },
    ],
    category: "Tech",
    jobDesignation: "SDE",
    jobLocation: "Noida",
    companyName: "Total System Services",
    salary: "14-15",
    totalOpening: "3",
    skills: ["SQL", "Java", "C++", "MongoDB", "Data Structures & Algo"],
    applyBy: "2023-12-19",
    posted: "Sep 16, 2023, 07:31:25 AM",
  },
  {
    id: "xyz",
    jobId: 1695003630774,
    applicants: [
      {
        name: "Veronica Smith",
        email: "veronica@gmail.com",
        contact: "9147843694",
        resume: "/resume/sample-resume.pdf",
      },
    ],
    category: "Tech",
    jobDesignation: "Full-Stack Developer",
    jobLocation: "Kolkata, Mumbai, New Delhi",
    companyName: "legatohealth",
    salary: "9-12",
    totalOpening: "6",
    skills: ["React", "NodeJs", "Angular", "MongoDB", "SQL", "Express"],
    applyBy: "2023-10-25",
    posted: "Sep 18, 2023, 04:11:25 PM",
  },
];

function posted() {
  const timestamp = Date.now();
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export default class Jobs {
  constructor(
    id,
    jobId,
    applicants,
    category,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    totalOpening,
    skills,
    applyBy
  ) {
    this.posted = posted();
    this.id = id;
    this.jobId = jobId;
    this.applicants = [];
    this.category = category;
    this.jobDesignation = jobDesignation;
    this.jobLocation = jobLocation;
    this.companyName = companyName;
    this.salary = salary;
    this.totalOpening = totalOpening;
    this.skills = skills;
    this.applyBy = applyBy;
  }

  static addJob(
    id,
    category,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    totalOpening,
    skills,
    applyBy
  ) {
    const newJob = new Jobs(
      id,
      Date.now(),
      0,
      category,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      totalOpening,
      skills,
      applyBy
    );
    allJobs.push(newJob);
  }

  static getAllJobs() {
    return allJobs;
  }

  static findJob(id, name) {
    if (id) {
      const curJob = allJobs.find((job) => job.jobId === +id);
      return curJob;
    } else if (name) {
      const curJob = allJobs.filter((job) =>
        job.companyName.toLowerCase().includes(name.toLowerCase())
      );
      return curJob;
    }
  }

  static updateJob(
    jobId,
    category,
    jobDesignation,
    jobLocation,
    companyName,
    salary,
    totalOpening,
    skills,
    applyBy
  ) {
    const curJob = this.findJob(jobId);
    if (Array.isArray(skills)) {
      curJob.skills = [...skills];
    } else {
      curJob.skills = [skills];
    }

    allJobs = allJobs.map((job) =>
      job.jobId === +jobId
        ? {
            ...job,
            category,
            jobDesignation,
            jobLocation,
            companyName,
            salary,
            totalOpening,
            skills,
            applyBy,
          }
        : { ...job }
    );
  }

  static deleteJob(id) {
    allJobs = allJobs.filter((job) => job.jobId !== +id);
  }
}
