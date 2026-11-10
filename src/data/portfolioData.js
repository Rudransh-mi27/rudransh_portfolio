export const PERSONAL_INFO = {
  name: "Rudransh Mishra",
  title: "Full-Stack Developer",
  tagline: "I build things that solve real-world problems.",
  heroSummary:
    "B.Tech AI/ML student exploring backend engineering, intelligent applications and technology that solves real problems.",
  aboutText: [
    "I'm Rudransh, a B.Tech student specializing in Artificial Intelligence and Machine Learning. I enjoy building practical applications, developing backend systems and experimenting with AI-powered solutions.",
    "My interests include backend engineering, full-stack development, machine learning and solving real-world problems through technology.",
    "I believe in learning by building, experimenting and continuously improving."
  ],
  education: {
    institution: "Shri Ramswaroop Memorial University (SRMU)",
    degree: "B.Tech in Computer Science and Engineering (AI & ML)",
    cgpa: "8.02",
    expectedGraduation: "2029",
    semester: "3rd Semester"
  },
  location: "Barabanki, Uttar Pradesh, India",
  email: "rudranshmishra153@gmail.com",
  phone: "9473897801",
  github: "https://github.com/Rudransh-mi27",
  linkedin: "https://www.linkedin.com/in/rudransh-mishra-3a5496375/",
  resumePath: "/assets/resume/Rudransh_Mishra_Resume.pdf",
  available: true,
  availableStatus: "Open for Opportunities"
};

export const PROJECTS_DATA = [
  {
    id: "mandidarpan",
    title: "MandiDarpan",
    subtitle: "Mandi Price & Comparison Platform",
    status: "Completed",
    featured: true,
    liveUrl: "https://m-andidarpan-9oot.vercel.app/",
    githubUrl: "https://github.com/Rudransh-mi27",
    image: "/assets/projects/mandidarpan.jpg",
    secondaryImage: "/assets/projects/mandidarpan_dashboard.png",
    architectureImage: "/assets/projects/mandimitra_arch.png",
    description:
      "An agricultural mandi price and comparison platform that empowers farmers and buyers to explore live commodity prices, historical price trends, and nearby mandi information with spatial intelligence.",
    contributions: [
      "Architected backend REST APIs to aggregate and fetch agricultural commodity prices from external government data feeds.",
      "Engineered distance-based nearest mandi discovery algorithm powered by the Haversine formula.",
      "Developed interactive API endpoints for live daily APMC rates, historical multi-day trends, and cross-mandi price comparisons.",
      "Implemented comprehensive input validation and fallback error handling for missing, stale, or incomplete mandi reports."
    ],
    technologies: ["React.js", "Node.js", "Express.js", "REST APIs", "Haversine Spatial Algorithm", "Data Aggregation"],
    tag: "Agricultural Intelligence / Full-Stack"
  },
  {
    id: "indian-standards-recommendation",
    title: "Indian Standards Recommendation Platform",
    subtitle: "AI-Powered Technical Standards Discovery",
    status: "In Progress",
    featured: true,
    githubUrl: "https://github.com/Rudransh-mi27",
    description:
      "An AI-powered technical platform designed to recommend relevant Indian Standards (BIS) based on raw product specifications, regulatory requirements, and technical documentation.",
    contributions: [
      "Designed backend service architecture and database schemas for technical documentation parsing.",
      "Integrated Supabase PostgreSQL with the pgvector extension for high-performance vector similarity search.",
      "Implemented document chunking, text embedding generation, and vector indexing pipeline.",
      "Built Retrieval-Augmented Generation (RAG) workflow to accurately surface contextual standards and requirements."
    ],
    technologies: ["Node.js", "Express.js", "Supabase PostgreSQL", "pgvector", "Embeddings", "RAG Pipeline"],
    tag: "AI & Vector Search / RAG Platform"
  },
  {
    id: "movie-recommendation-system",
    title: "Movie Recommendation System",
    subtitle: "Content-Based Filtering Engine",
    status: "Completed",
    featured: false,
    githubUrl: "https://github.com/Rudransh-mi27",
    image: "/assets/projects/movie_rec.jpg",
    description:
      "A content-based movie recommendation system built using the TMDB 5000 Movies and Credits datasets, extracting textual attributes to calculate pairwise cosine similarity.",
    contributions: [
      "Extracted and parsed JSON attributes including genres, keywords, primary cast, director, and plot overview.",
      "Engineered consolidated text tags with Porter stemming normalization to remove grammatical redundancy.",
      "Vectorized high-frequency vocabulary (5,000 top features) using scikit-learn CountVectorizer.",
      "Evaluated high-dimensional cosine similarity metrics across 4,806 titles to return top 5 matching recommendations."
    ],
    technologies: ["Python", "Pandas", "Scikit-learn", "NLTK", "CountVectorizer", "Cosine Similarity", "Jupyter Notebook"],
    tag: "Machine Learning / NLP"
  },
  {
    id: "zomato-data-analysis",
    title: "Zomato Data Analysis",
    subtitle: "Exploratory Data Analysis & Insights",
    status: "Completed",
    featured: false,
    githubUrl: "https://github.com/Rudransh-mi27",
    image: "/assets/projects/zomato_analysis.png",
    description:
      "Comprehensive exploratory data analysis (EDA) conducted on an extensive restaurant dataset consisting of approximately 51,717 records to uncover dining habits, pricing patterns, and review trends.",
    contributions: [
      "Conducted extensive data cleaning, type conversion, rating normalization, and missing-value imputation.",
      "Analyzed the statistical relationship between online ordering availability and consumer rating distributions.",
      "Mapped restaurant densities across geographical clusters and dining types using Seaborn & Matplotlib.",
      "Generated actionable visual boxplots, countplots, and correlation matrices for consumer behavior insights."
    ],
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook"],
    tag: "Data Analysis & Visualization"
  },
  {
    id: "natours",
    title: "Natours Backend API",
    subtitle: "Tour Booking & Reservation Architecture",
    status: "In Progress",
    featured: false,
    githubUrl: "https://github.com/Rudransh-mi27",
    description:
      "A complete tour-booking RESTful API built to master enterprise-grade backend architecture, database modeling, secure authentication, and middleware pipelines.",
    contributions: [
      "Built RESTful API routes adhering to strict HTTP method conventions and standard status codes.",
      "Designed flexible MongoDB schema relationships using Mongoose for tours, users, and booking references.",
      "Implemented JWT (JSON Web Token) authentication, bcrypt password hashing, and cookie management.",
      "Configured robust backend security middleware including rate limiting, data sanitization, and parameter pollution protection."
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Security Middleware", "Pug"],
    tag: "Backend Engineering / REST API"
  },
  {
    id: "amazon-clone",
    title: "Amazon Frontend Clone",
    subtitle: "E-Commerce User Interface Recreation",
    status: "Completed",
    featured: false,
    githubUrl: "https://github.com/Rudransh-mi27",
    image: "/assets/projects/amazon_clone.jpg",
    description:
      "A pixel-accurate frontend recreation of Amazon's e-commerce landing interface, focusing on multi-level navigation, banner sliders, responsive product category grids, and clean layout execution.",
    contributions: [
      "Recreated Amazon's desktop header with location selectors, search bars, account drawers, and category sub-navs.",
      "Engineered flexible card grid components displaying product categories (Clothes, Personal Care, Furniture, Electronics).",
      "Ensured cross-browser responsive layout styling and pixel precision."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    tag: "Frontend Engineering"
  }
];

export const SKILLS_DATA = [
  {
    category: "Programming",
    skills: ["JavaScript", "Python"]
  },
  {
    category: "Backend Development",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"]
  },
  {
    category: "Frontend Development",
    skills: ["React.js", "HTML5", "CSS3 / SCSS", "Next.js"]
  },
  {
    category: "Databases & Storage",
    skills: ["PostgreSQL", "MongoDB", "Supabase"]
  },
  {
    category: "AI / Machine Learning",
    note: "Project-level practical exposure",
    skills: ["Embeddings", "Vector Search", "pgvector", "RAG Pipeline", "Pandas", "NumPy", "Scikit-learn", "NLTK"]
  },
  {
    category: "Developer Tools",
    skills: ["Git", "GitHub", "Postman", "Jupyter Notebook", "Google Colab", "Vite"]
  }
];

export const EXPERIENCE_DATA = [
  {
    role: "Python Intern",
    company: "E1Systems",
    affiliation: "In collaboration with IIT Kanpur",
    duration: "16 June 2026 – 28 July 2026",
    mode: "Online",
    certificatePdf: "/assets/certificates/E1Systems_Python_Internship_Certificate.pdf",
    highlights: [
      "Practiced Python programming fundamentals, procedural logic, and problem-solving.",
      "Built modular applications including a Quiz Application, To-Do List, Expense Tracker, and Contact Book.",
      "Deepened hands-on understanding of Python functions, object-oriented concepts, and core data structures."
    ]
  }
];

export const ACHIEVEMENTS_DATA = [
  {
    title: "Smart India Hackathon (SIH)",
    category: "National Hackathon",
    badge: "Official Participant",
    certificateImage: "/assets/certificates/sih_certificate.jpg",
    certificatePdf: "/assets/certificates/SIH_2026_Certificate_Rudransh_Mishra.pdf",
    description:
      "Collaborated in a multidisciplinary team to ideate and architect technology-driven software solutions for nationwide problem statements."
  },
  {
    title: "C3iHub / IIT Kanpur Cybersecurity Hackathon",
    category: "Security & Applied AI",
    badge: "Hackathon Participant",
    description:
      "Explored threat analysis, cyber defense architectures, and application vulnerability remediation in a competitive hackathon organized by C3iHub at IIT Kanpur."
  },
  {
    title: "Google Developer Groups (GDG) / DevFest",
    category: "Technical Community",
    badge: "Community Activity",
    description:
      "Active participant in developer community events, technical workshops on modern cloud workflows, and ecosystem meetups."
  },
  {
    title: "GeeksforGeeks Activities",
    category: "Algorithmic Problem Solving",
    badge: "Active Coding",
    description:
      "Consistent practice in core data structures, algorithmic logic, time-complexity analysis, and foundational computer science concepts."
  }
];

