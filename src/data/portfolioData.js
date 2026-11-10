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
    subtitle: "Agricultural Mandi Intelligence & Comparison Platform",
    status: "Completed",
    featured: true,
    category: "Full-Stack & Spatial Analytics",
    tag: "Agricultural Intelligence / Full-Stack",
    image: "/assets/projects/mandidarpan.jpg",
    secondaryImage: "/assets/projects/mandidarpan_dashboard.png",
    architectureImage: "/assets/projects/mandimitra_arch.png",
    liveUrl: "https://m-andidarpan-9oot.vercel.app/",
    githubUrl: "https://github.com/Rudransh-mi27",
    shortDescription:
      "A spatial intelligence and mandi price discovery platform enabling farmers and agricultural buyers to track daily APMC commodity rates, evaluate nearby market spreads, and make informed dispatch decisions.",
    description:
      "MandiDarpan addresses severe price opacity in regional agricultural markets. In fragmented supply chains, farmers frequently sell at local mandis without real-time insight into price premiums available in adjacent districts. MandiDarpan aggregates live government commodity datasets, normalizes disparate mandi nomenclatures, calculates geospatial road distances via the Haversine formula, and visually presents multi-day price trends and arbitrage spreads.",
    problem:
      "Lack of real-time price transparency across agricultural mandis forces local farmers into distressed selling, losing up to 30% margin to intermediaries due to missing market intelligence.",
    whyBuilt:
      "Built to democratize access to agricultural market data through an intuitive mobile-friendly interface and low-latency backend APIs that process nationwide market feeds.",
    targetAudience:
      "Indian farmers, agricultural produce traders, APMC commission agents, and rural supply chain dispatch planners.",
    keyFeatures: [
      "Live daily commodity APMC rates with state, district, and market filtering",
      "Haversine spatial algorithm discovering nearby mandis within customized radii",
      "Interactive multi-day price velocity charts comparing historical spreads",
      "Defensive caching and graceful fallbacks for missing or delayed government reports",
      "Bilingual ready UI optimized for low-bandwidth mobile devices"
    ],
    architecture: [
      { step: "01", title: "Client Layer", tech: "React.js / Next.js", desc: "Interactive map view, commodity filters, and responsive charting" },
      { step: "02", title: "Backend Gateway", tech: "Node.js & Express", desc: "RESTful endpoints with request validation and rate limiting" },
      { step: "03", title: "Data Aggregator", tech: "External Gov API", desc: "Periodic ingestion and sanitization of APMC daily market reports" },
      { step: "04", title: "Spatial Engine", tech: "Haversine Distance", desc: "Computes great-circle distances between farmer coordinate and regional mandis" },
      { step: "05", title: "Analytics Output", tech: "Price Intelligence", desc: "Normalized JSON payloads with comparative market price spreads" }
    ],
    contributions: [
      "Architected backend REST APIs with Express.js to fetch and ingest raw agricultural commodity data from public feeds.",
      "Engineered mathematical Haversine spatial calculation logic to rank nearest mandis based on user GPS or district coordinates.",
      "Built resilient data sanitization pipeline to handle missing, misspelled, or delayed agricultural commodity reports.",
      "Structured optimized JSON response contracts for daily APMC prices, commodity varieties, and price spread differentials.",
      "Designed clean modular endpoints conforming to RESTful conventions, enabling rapid frontend integration and sub-50ms query responses."
    ],
    technologies: ["Node.js", "Express.js", "React.js", "REST APIs", "Haversine Algorithm", "Data Aggregation", "JavaScript"]
  },
  {
    id: "indian-standards-recommendation",
    title: "Indian Standards Recommendation Platform",
    subtitle: "AI-Powered Technical Standards Discovery & RAG Engine",
    status: "In Progress",
    featured: true,
    category: "AI / Machine Learning & RAG",
    tag: "AI & Vector Search / RAG Platform",
    image: "/assets/projects/indian_standards.png",
    architectureImage: "/assets/projects/mandimitra_arch.png",
    githubUrl: "https://github.com/Rudransh-mi27",
    shortDescription:
      "An AI-powered regulatory platform recommending Bureau of Indian Standards (BIS) specifications based on raw product parameters, engineering schematics, and legal compliance criteria.",
    description:
      "Navigating thousands of complex Bureau of Indian Standards (BIS) documents is an arduous task for manufacturers and compliance engineers. This platform implements a semantic Retrieval-Augmented Generation (RAG) architecture powered by PostgreSQL and pgvector. Users submit product descriptions or testing parameters, and the system performs high-dimensional vector search to surface applicable technical standards, mandatory test protocols, and certification guidelines with zero hallucinations.",
    problem:
      "Engineers and manufacturers waste hundreds of hours manually searching dense regulatory catalogs, frequently missing mandatory safety and quality standards required for legal certification.",
    whyBuilt:
      "Engineered to demonstrate production-grade AI retrieval: pairing high-dimensional embeddings with PostgreSQL pgvector for verifiable regulatory compliance search.",
    targetAudience:
      "Product design engineers, quality assurance managers, compliance officers, and hardware manufacturers across India.",
    keyFeatures: [
      "Semantic vector search indexing thousands of technical standards and clauses",
      "Supabase PostgreSQL database with pgvector extension and HNSW indexing",
      "Intelligent text chunking pipeline maintaining cross-section document context",
      "Cosine distance similarity scoring with confidence threshold filtering",
      "Hallucination-free contextual citation linking directly to verified clauses"
    ],
    architecture: [
      { step: "01", title: "Query Input", tech: "Specification Parser", desc: "User inputs product materials, voltage, or manufacturing criteria" },
      { step: "02", title: "Embedding Generation", tech: "Vector Transformer", desc: "Translates query into 1,536-dimensional semantic dense vector" },
      { step: "03", title: "Vector Search", tech: "Supabase pgvector", desc: "HNSW approximate nearest neighbor cosine search across standards index" },
      { step: "04", title: "Context Assembly", tech: "RAG Pipeline", desc: "Extracts top-ranked clause chunks and regulatory metadata" },
      { step: "05", title: "Synthesized Output", tech: "LLM Augmentation", desc: "Grounded recommendations specifying exact BIS standard numbers and tests" }
    ],
    contributions: [
      "Designed backend service architecture and database schemas for technical standards document ingestion and parsing.",
      "Configured Supabase PostgreSQL database with pgvector extension for high-performance vector indexing.",
      "Implemented document chunking and text embedding generation pipeline to handle multi-page regulatory PDF extracts.",
      "Constructed Retrieval-Augmented Generation (RAG) query execution workflow with cosine distance similarity ranking.",
      "Authored clean modular service layers separating vector retrieval from API serialization."
    ],
    technologies: ["Python", "Node.js", "Express.js", "Supabase PostgreSQL", "pgvector", "Embeddings", "RAG Pipeline"]
  },
  {
    id: "natours",
    title: "Natours Backend API",
    subtitle: "Enterprise Tour Booking & Geospatial Reservation Engine",
    status: "In Progress",
    featured: false,
    category: "Backend Engineering",
    tag: "Backend Engineering / REST API",
    image: "/assets/projects/natours_api.png",
    githubUrl: "https://github.com/Rudransh-mi27",
    shortDescription:
      "A complete tour-booking RESTful API built to master enterprise backend patterns: database modeling, JWT authentication, geospatial queries, security middleware, and Stripe payments.",
    description:
      "Natours is an enterprise-grade backend service powering an adventure tour booking ecosystem. Built strictly with modern Node.js and Express, it features complete CRUD capabilities, advanced geospatial queries (finding tours within specific radii), nested routing for reviews, stateless JWT authentication with bcrypt password hashing, cookie-based session verification, and hardened security middleware preventing NoSQL query injection and parameter pollution.",
    problem:
      "Real-world web APIs require strict security guards, defensive rate-limiting, relational data consistency in NoSQL, and complex spatial queries that basic tutorials omit.",
    whyBuilt:
      "Built as a rigorous deep dive into production-grade backend engineering, architectural clean-code patterns, and secure API design.",
    targetAudience:
      "Tour operators, travelers booking expeditions, and backend developers studying enterprise Node.js architecture.",
    keyFeatures: [
      "Role-Based Access Control (RBAC) with user, guide, lead-guide, and admin roles",
      "Stateless JWT authentication with password reset tokens and secure HttpOnly cookies",
      "MongoDB geospatial indexing and spatial queries calculating distances to tour points",
      "Advanced filtering, sorting, field limiting, and page-based pagination utility class",
      "Hardened security: Helmet HTTP headers, express-rate-limit, mongo-sanitize, and XSS-clean"
    ],
    architecture: [
      { step: "01", title: "Security Barrier", tech: "Helmet & Rate Limit", desc: "Filters HTTP request headers and blocks brute-force volumetric attacks" },
      { step: "02", title: "Auth Pipeline", tech: "JWT & Bcrypt", desc: "Validates bearer token signatures and enforces role authorization" },
      { step: "03", title: "API Controllers", tech: "Modular Handlers", desc: "Generic factory functions for standard CRUD and spatial endpoints" },
      { step: "04", title: "ODM Modeling", tech: "Mongoose & MongoDB", desc: "Enforces schema validation, pre/post middleware hooks, and geospatial indexes" },
      { step: "05", title: "Error Handler", tech: "Centralized Global Catch", desc: "Distinguishes operational vs programming errors with clean JSON output" }
    ],
    contributions: [
      "Engineered comprehensive RESTful API routes adhering strictly to HTTP conventions and standardized status codes.",
      "Designed flexible MongoDB schema relationships with Mongoose, including parent and child referencing for reviews and bookings.",
      "Implemented stateless JWT authorization pipeline, bcrypt password hashing, and secure cookie transport.",
      "Created reusable APIFeatures class providing dynamic URL query sorting, multi-field filtering, and cursor pagination.",
      "Configured robust security middleware against NoSQL injection, cross-site scripting (XSS), and HTTP parameter pollution."
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Security Middleware", "Geospatial Indexing"]
  },
  {
    id: "movie-recommendation-system",
    title: "Movie Recommendation System",
    subtitle: "High-Dimensional Content-Based Similarity Engine",
    status: "Completed",
    featured: false,
    category: "Machine Learning & NLP",
    tag: "Machine Learning / NLP",
    image: "/assets/projects/movie_rec.jpg",
    githubUrl: "https://github.com/Rudransh-mi27",
    shortDescription:
      "A content-based recommendation system parsing TMDB datasets with NLP tokenization, Porter stemming normalization, and cosine similarity across 5,000 feature dimensions.",
    description:
      "Designed to solve the problem of content discovery in large media catalogs, this project processes the TMDB 5000 Movies and Credits dataset. It tokenizes, stems, and normalizes unstructured metadata—including plot overviews, director credits, top cast members, genres, and contextual keywords—into consolidated feature tags. A high-frequency vocabulary vector space is constructed, and pairwise cosine similarity is computed across 4,806 feature vectors to deliver instantaneous, mathematically grounded recommendations.",
    problem:
      "Users struggle to find relevant movies aligned with their specific narrative and aesthetic tastes without accurate metadata-driven recommendation systems.",
    whyBuilt:
      "Engineered to explore applied natural language processing (NLP), vector space mathematical modeling, and dimensionality reduction in Python.",
    targetAudience:
      "Film enthusiasts, content streaming platforms, and data science teams building recommendation engines.",
    keyFeatures: [
      "Consolidated multi-field metadata tokenization and JSON feature extraction",
      "Porter stemming normalization via NLTK to eliminate morphological duplicates",
      "Top 5,000 high-frequency feature vocabulary vectorization via CountVectorizer",
      "Pairwise cosine distance similarity matrix computed across 4,806 feature vectors",
      "Sub-second recommendation lookup returning top 5 semantically aligned titles"
    ],
    architecture: [
      { step: "01", title: "Raw Data Ingestion", tech: "TMDB Datasets", desc: "Merges 5,000 movies and credits tabular datasets via Pandas" },
      { step: "02", title: "Feature Extraction", tech: "JSON Parsing", desc: "Extracts cast, director, genre, and keyword text arrays" },
      { step: "03", title: "NLP Normalization", tech: "NLTK Porter Stemmer", desc: "Lowercases and stems text tokens to base morphological roots" },
      { step: "04", title: "Vectorization", tech: "CountVectorizer", desc: "Transforms text tags into 5,000-dimensional bag-of-words matrix" },
      { step: "05", title: "Cosine Metric", tech: "Linear Algebra", desc: "Calculates angular distance between target movie vector and catalog" }
    ],
    contributions: [
      "Extracted and parsed complex JSON attributes including genres, cast, crew, director, and plot overview.",
      "Engineered consolidated text tags with Porter stemming normalization to remove grammatical redundancy.",
      "Vectorized high-frequency vocabulary (5,000 top features) using scikit-learn CountVectorizer.",
      "Evaluated high-dimensional cosine similarity metrics across 4,806 titles to return top 5 matching recommendations."
    ],
    technologies: ["Python", "Pandas", "Scikit-learn", "NLTK", "CountVectorizer", "Cosine Similarity", "Jupyter Notebook"]
  },
  {
    id: "zomato-data-analysis",
    title: "Zomato Restaurant Data Analytics",
    subtitle: "Large-Scale Exploratory Data Analysis & Pricing Patterns",
    status: "Completed",
    featured: false,
    category: "Data Analysis & Visualization",
    tag: "Data Analysis & Visualization",
    image: "/assets/projects/zomato_analysis.png",
    githubUrl: "https://github.com/Rudransh-mi27",
    shortDescription:
      "Exploratory data analysis over 51,700+ restaurant records uncovering pricing strategies, geographical density clusters, consumer ratings, and dining trends across major urban centers.",
    description:
      "This data analytics project investigates consumer dining dynamics, cost structures, and online delivery adoption across Bangalore. Conducting rigorous statistical cleaning on over 51,717 raw dining records, the study addresses missing values, normalizes cost metrics, filters geographical anomalies, and evaluates correlation matrices between dining types, online ordering options, and overall customer satisfaction.",
    problem:
      "Restaurateurs and investors lack data-driven insights into prime restaurant locations, optimal cost-for-two pricing points, and the statistical impact of online ordering on ratings.",
    whyBuilt:
      "Built to master large-scale data manipulation, statistical correlation analysis, and impactful visual storytelling using Python's data science stack.",
    targetAudience:
      "Food tech analysts, restaurant entrepreneurs, market researchers, and consumer behavior economists.",
    keyFeatures: [
      "Data cleaning and type casting over 51,717 restaurant records",
      "Statistical distribution analysis of approximate cost for two people",
      "Correlation evaluation between online ordering availability and average ratings",
      "Spatial density heatmaps highlighting high-competition dining clusters",
      "Publication-quality visual boxplots, countplots, and multi-variable charts"
    ],
    architecture: [
      { step: "01", title: "Dataset Ingestion", tech: "Pandas DataFrame", desc: "Loads 51,717 multi-column records of restaurant telemetry" },
      { step: "02", title: "Data Sanitization", tech: "Data Wrangling", desc: "Handles nulls, converts cost strings to numeric, and strips ratings" },
      { step: "03", title: "Statistical Modeling", tech: "NumPy & SciPy", desc: "Calculates descriptive statistics, variance, and interquartile ranges" },
      { step: "04", title: "Correlation Matrix", tech: "Bivariate Analysis", desc: "Evaluates interaction between delivery channels and customer reviews" },
      { step: "05", title: "Visual Synthesis", tech: "Seaborn & Matplotlib", desc: "Generates distribution plots, heatmaps, and categorical charts" }
    ],
    contributions: [
      "Conducted extensive data cleaning, type conversion, rating normalization, and missing-value imputation.",
      "Analyzed the statistical relationship between online ordering availability and consumer rating distributions.",
      "Mapped restaurant densities across geographical clusters and dining types using Seaborn & Matplotlib.",
      "Generated actionable visual boxplots, countplots, and correlation matrices for consumer behavior insights."
    ],
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter Notebook"]
  },
  {
    id: "amazon-clone",
    title: "Amazon Frontend Recreation",
    subtitle: "High-Fidelity Multi-Tier Responsive E-Commerce Interface",
    status: "Completed",
    featured: false,
    category: "Frontend Engineering",
    tag: "Frontend Engineering",
    image: "/assets/projects/amazon_clone.jpg",
    githubUrl: "https://github.com/Rudransh-mi27",
    shortDescription:
      "A pixel-accurate frontend recreation of Amazon's multi-level header, category carousels, responsive deal grids, and fluid layout navigation.",
    description:
      "A front-end recreation of Amazon's e-commerce portal, built to master complex multi-tier navigation systems, CSS grid and flexbox architectures, image banner carousels, and responsive viewports. Every layout element—from the localization bar, category mega-drawers, product category tiles, and bottom footer links—was reconstructed with pixel precision and cross-browser consistency.",
    problem:
      "Complex e-commerce user interfaces require rigorous CSS layout architecture, high-density component hierarchies, and responsive adaptation without layout shifts.",
    whyBuilt:
      "Built as a foundational UI engineering project to master layout precision, CSS hierarchy, responsive break-points, and modern semantic HTML5 standards.",
    targetAudience:
      "Frontend developers evaluating layout precision, UI/UX designers, and e-commerce web architects.",
    keyFeatures: [
      "Multi-tier responsive header with delivery pin, search bar, and account drawers",
      "Full-width visual banner slider with product showcase overlays",
      "Responsive 4-quadrant product category cards matching Amazon's layout design",
      "High-density responsive footer architecture with back-to-top smooth scrolling",
      "Fluid CSS Flexbox and Grid without third-party UI framework dependencies"
    ],
    architecture: [
      { step: "01", title: "Semantic Markup", tech: "HTML5 Layout", desc: "Organized structural tags adhering to accessibility standards" },
      { step: "02", title: "Grid & Flexbox", tech: "Modern CSS3", desc: "Calculated box models and adaptive multi-column product grids" },
      { step: "03", title: "Interactive Controls", tech: "JavaScript", desc: "Navigation dropdowns, search focus states, and banner transitions" },
      { step: "04", title: "Media Queries", tech: "Responsive Design", desc: "Smooth layout scaling across mobile, tablet, and widescreen monitors" }
    ],
    contributions: [
      "Recreated Amazon's desktop header with location selectors, search bars, account drawers, and category sub-navs.",
      "Engineered flexible card grid components displaying product categories (Clothes, Personal Care, Furniture, Electronics).",
      "Ensured cross-browser responsive layout styling and pixel precision."
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Flexbox", "CSS Grid"]
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

