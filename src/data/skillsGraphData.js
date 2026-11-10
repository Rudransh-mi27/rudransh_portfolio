/**
 * Technology Constellation & Knowledge Graph Data
 * Authentic relationships, categories, production usages, and official documentation links.
 */

export const CATEGORIES = {
  BACKEND: {
    id: 'backend',
    label: 'Backend Development',
    color: '#38bdf8', // Cyan-tinted platinum
    glow: 'rgba(56, 189, 248, 0.35)',
    border: 'rgba(56, 189, 248, 0.45)',
    accent: '#0284c7',
  },
  DATABASES: {
    id: 'databases',
    label: 'Databases & Storage',
    color: '#34d399', // Emerald platinum
    glow: 'rgba(52, 211, 153, 0.35)',
    border: 'rgba(52, 211, 153, 0.45)',
    accent: '#059669',
  },
  AI_ML: {
    id: 'aiml',
    label: 'AI / Machine Learning',
    color: '#a78bfa', // Violet platinum
    glow: 'rgba(167, 139, 250, 0.35)',
    border: 'rgba(167, 139, 250, 0.45)',
    accent: '#7c3aed',
  },
  TOOLS: {
    id: 'tools',
    label: 'Developer Tools',
    color: '#fbbf24', // Amber platinum
    glow: 'rgba(251, 191, 36, 0.35)',
    border: 'rgba(251, 191, 36, 0.45)',
    accent: '#d97706',
  },
};

export const GRAPH_NODES = [
  // ==========================================
  // BACKEND DEVELOPMENT CLUSTER (Top-Left quadrant)
  // ==========================================
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'backend',
    size: 58,
    importance: 'core',
    x: 280,
    y: 200,
    description: 'High-level, multi-paradigm interpreted language powering modern full-stack web and backend architectures.',
    usage: 'I write idiomatic ES6+ asynchronous logic, promises, async/await pipelines, and modular event-driven services across the stack.',
    docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    size: 68,
    importance: 'primary',
    x: 440,
    y: 260,
    description: 'Asynchronous event-driven JavaScript runtime built on Chrome\'s V8 engine for scalable networked services.',
    usage: 'I use Node.js to engineer scalable REST APIs, microservices, secure authentication pipelines, and asynchronous server workflows.',
    docUrl: 'https://nodejs.org/docs/latest/api/',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    size: 58,
    importance: 'primary',
    x: 580,
    y: 190,
    description: 'Fast, unopinionated, minimalist web framework providing a robust suite of HTTP utilities for Node.js.',
    usage: 'I build modular routing architectures, custom validation middleware, rate-limiting handlers, and unified JSON error handling.',
    docUrl: 'https://expressjs.com/',
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'backend',
    size: 64,
    importance: 'primary',
    x: 740,
    y: 260,
    description: 'Architectural paradigm for networked systems utilizing HTTP verbs, stateless requests, and standardized status codes.',
    usage: 'I design idempotent endpoints, resource-oriented URIs, JWT authorization headers, pagination, and query-level filtering.',
    docUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/REST',
  },
  {
    id: 'authentication',
    name: 'Authentication',
    category: 'backend',
    size: 54,
    importance: 'secondary',
    x: 350,
    y: 380,
    description: 'Security mechanisms and cryptographic protocols for identity verification and resource authorization.',
    usage: 'I implement token-based session verification, bcrypt password hashing, role-based access control (RBAC), and route guards.',
    docUrl: 'https://developer.mozilla.org/en-US/docs/Web/Security',
  },
  {
    id: 'jwt',
    name: 'JWT',
    category: 'backend',
    size: 48,
    importance: 'standard',
    x: 230,
    y: 450,
    description: 'Compact, URL-safe means of representing digitally signed claims between client and server.',
    usage: 'I issue signed, tamper-proof bearer tokens with payload expiration checks for stateless session management.',
    docUrl: 'https://jwt.io/introduction',
  },
  {
    id: 'cookies',
    name: 'Cookies',
    category: 'backend',
    size: 46,
    importance: 'standard',
    x: 400,
    y: 490,
    description: 'HTTP state management tokens configured with HttpOnly, Secure, and SameSite protection flags.',
    usage: 'I store refresh tokens in HttpOnly secure cookies to safeguard against cross-site scripting (XSS) attacks.',
    docUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies',
  },
  {
    id: 'react',
    name: 'React',
    category: 'backend',
    size: 54,
    importance: 'secondary',
    x: 160,
    y: 280,
    description: 'Declarative component-driven user interface library for orchestrating dynamic, reactive client applications.',
    usage: 'I build modular reusable UI components, custom state hooks, and integrate frontend clients with backend REST APIs.',
    docUrl: 'https://react.dev/',
  },

  // ==========================================
  // DATABASE ENGINEERING CLUSTER (Top-Right quadrant)
  // ==========================================
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'databases',
    size: 60,
    importance: 'primary',
    x: 910,
    y: 190,
    description: 'Distributed document-oriented NoSQL database optimized for high-throughput, flexible JSON document structures.',
    usage: 'I architect schemaless document collections, aggregation pipelines, indexed lookups, and transactional operations.',
    docUrl: 'https://www.mongodb.com/docs/',
  },
  {
    id: 'mongoose',
    name: 'Mongoose',
    category: 'databases',
    size: 50,
    importance: 'secondary',
    x: 1040,
    y: 130,
    description: 'Elegant object data modeling (ODM) library for MongoDB and Node.js with built-in schema validation.',
    usage: 'I enforce strict schema typing, pre/post middleware hooks, custom instance methods, and reference population.',
    docUrl: 'https://mongoosejs.com/docs/',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'databases',
    size: 68,
    importance: 'primary',
    x: 960,
    y: 330,
    description: 'Enterprise-grade open-source object-relational database renowned for reliability, SQL adherence, and ACID compliance.',
    usage: 'I design normalized relational schemas, foreign key constraints, composite indexes, and complex analytical SQL queries.',
    docUrl: 'https://www.postgresql.org/docs/',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'databases',
    size: 54,
    importance: 'secondary',
    x: 1110,
    y: 260,
    description: 'Open-source backend-as-a-service built directly on PostgreSQL, providing instant APIs and realtime database streams.',
    usage: 'I leverage Supabase for hosted Postgres instances, Row-Level Security (RLS) policies, and vector embedding storage.',
    docUrl: 'https://supabase.com/docs',
  },
  {
    id: 'db-design',
    name: 'Database Design',
    category: 'databases',
    size: 52,
    importance: 'secondary',
    x: 1120,
    y: 400,
    description: 'Methodology for relational modeling, 3NF normalization, index tuning, and entity-relationship mapping.',
    usage: 'I map out ER diagrams, plan foreign key constraints, prevent query Cartesian bottlenecks, and optimize query latency.',
    docUrl: 'https://www.postgresql.org/docs/current/ddl.html',
  },

  // ==========================================
  // AI & MACHINE LEARNING CLUSTER (Bottom-Right quadrant)
  // ==========================================
  {
    id: 'python',
    name: 'Python',
    category: 'aiml',
    size: 68,
    importance: 'primary',
    x: 820,
    y: 530,
    description: 'Interpreted high-level programming language underpinning modern scientific computing, data science, and AI pipelines.',
    usage: 'I write data processing pipelines, model inference routines, embedding generation scripts, and algorithmic analysis tools.',
    docUrl: 'https://docs.python.org/3/',
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'aiml',
    size: 52,
    importance: 'secondary',
    x: 960,
    y: 480,
    description: 'Fundamental scientific package providing fast N-dimensional array objects and vectorized linear algebra operations.',
    usage: 'I perform high-speed matrix multiplications, vector calculations, mathematical transformations, and tensor manipulations.',
    docUrl: 'https://numpy.org/doc/',
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'aiml',
    size: 52,
    importance: 'secondary',
    x: 1080,
    y: 540,
    description: 'Fast, flexible data analysis library providing DataFrames for tabular data wrangling and statistical inspection.',
    usage: 'I run exploratory data analysis (EDA), statistical aggregations, data reshaping, and missing-value imputation.',
    docUrl: 'https://pandas.pydata.org/docs/',
  },
  {
    id: 'data-processing',
    name: 'Data Processing',
    category: 'aiml',
    size: 48,
    importance: 'standard',
    x: 960,
    y: 610,
    description: 'Techniques for transforming raw, noisy data into clean, normalized feature distributions for analytical pipelines.',
    usage: 'I clean raw real-world datasets, remove statistical outliers, scale continuous features, and structure training matrices.',
    docUrl: 'https://pandas.pydata.org/docs/getting_started/index.html',
  },
  {
    id: 'embeddings',
    name: 'Embeddings',
    category: 'aiml',
    size: 56,
    importance: 'core',
    x: 740,
    y: 660,
    description: 'Dense numerical vector representations capturing semantic meaning, nuance, and contextual proximity of text.',
    usage: 'I generate high-dimensional text embeddings using transformer models to enable semantic similarity and retrieval.',
    docUrl: 'https://platform.openai.com/docs/guides/embeddings',
  },
  {
    id: 'vector-search',
    name: 'Vector Search',
    category: 'aiml',
    size: 62,
    importance: 'primary',
    x: 880,
    y: 730,
    description: 'Approximate Nearest Neighbor (ANN) search algorithm for querying high-dimensional embedding spaces.',
    usage: 'I calculate cosine distance and inner product metrics over indexed vector stores to retrieve contextually relevant chunks.',
    docUrl: 'https://github.com/pgvector/pgvector#vector-search',
  },
  {
    id: 'pgvector',
    name: 'pgvector',
    category: 'aiml',
    size: 56,
    importance: 'primary',
    x: 1030,
    y: 690,
    description: 'Open-source vector similarity search extension for PostgreSQL supporting IVFFlat and HNSW indexing.',
    usage: 'I store and query high-dimensional embeddings directly within PostgreSQL alongside structured application metadata.',
    docUrl: 'https://github.com/pgvector/pgvector',
  },
  {
    id: 'rag',
    name: 'RAG',
    category: 'aiml',
    size: 64,
    importance: 'primary',
    x: 750,
    y: 810,
    description: 'Retrieval-Augmented Generation architecture synthesizing vector similarity retrieval with generative LLMs.',
    usage: 'I architect RAG systems like MandiMitra that dynamically retrieve verified domain knowledge before synthesizing responses.',
    docUrl: 'https://www.promptingguide.ai/techniques/rag',
  },
  {
    id: 'llm-integration',
    name: 'LLM Integration',
    category: 'aiml',
    size: 56,
    importance: 'core',
    x: 910,
    y: 850,
    description: 'Interfacing foundation models via structured prompt templates, system instructions, and tool calling protocols.',
    usage: 'I integrate Gemini and open-source models into conversational pipelines with strict JSON schema outputs and fallbacks.',
    docUrl: 'https://ai.google.dev/docs',
  },

  // ==========================================
  // DEVELOPER TOOLS & DEPLOYMENT CLUSTER (Bottom-Left quadrant)
  // ==========================================
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    size: 62,
    importance: 'primary',
    x: 480,
    y: 600,
    description: 'Fast, distributed version control system designed for speed, data integrity, and non-linear development workflows.',
    usage: 'I manage branch lifecycles, atomic commits, interactive rebases, conflict resolutions, and maintain clean commit graphs.',
    docUrl: 'https://git-scm.com/doc',
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    size: 58,
    importance: 'primary',
    x: 340,
    y: 640,
    description: 'Cloud collaboration platform for Git repositories, code reviews, automated CI/CD workflows, and issue tracking.',
    usage: 'I organize open-source projects, manage pull requests, conduct peer code reviews, and configure automated GitHub Actions.',
    docUrl: 'https://docs.github.com/',
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'tools',
    size: 54,
    importance: 'secondary',
    x: 580,
    y: 720,
    description: 'Comprehensive API platform for building, mocking, testing, and documenting HTTP and RESTful interfaces.',
    usage: 'I create automated request test collections, inspect headers, simulate edge-case payloads, and verify auth tokens.',
    docUrl: 'https://learning.postman.com/docs/',
  },
  {
    id: 'api-testing',
    name: 'API Testing',
    category: 'tools',
    size: 48,
    importance: 'standard',
    x: 690,
    y: 740,
    description: 'Systematic testing of application interfaces to validate functional correctness, reliability, security, and performance.',
    usage: 'I verify status code contracts, rate limits, schema validations, and resilience against malformed or malicious payloads.',
    docUrl: 'https://learning.postman.com/docs/writing-scripts/test-scripts/',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'tools',
    size: 56,
    importance: 'secondary',
    x: 400,
    y: 780,
    description: 'Containerization platform packaging software and runtime dependencies into isolated, reproducible containers.',
    usage: 'I containerize backend microservices, ensure dev-to-prod consistency, and configure Dockerfiles for multi-stage builds.',
    docUrl: 'https://docs.docker.com/',
  },
  {
    id: 'deployment',
    name: 'Deployment',
    category: 'tools',
    size: 50,
    importance: 'standard',
    x: 270,
    y: 820,
    description: 'Automated delivery, cloud hosting, and continuous deployment of production-ready web and backend services.',
    usage: 'I deploy containerized workloads, configure environment variables, setup SSL, and monitor service health and uptime.',
    docUrl: 'https://docs.docker.com/get-started/',
  },
];

export const GRAPH_LINKS = [
  // Backend Cluster Links
  { source: 'javascript', target: 'nodejs', label: 'Runtime Engine' },
  { source: 'javascript', target: 'react', label: 'UI Framework' },
  { source: 'nodejs', target: 'express', label: 'HTTP Framework' },
  { source: 'express', target: 'rest-apis', label: 'Endpoint Architecture' },
  { source: 'nodejs', target: 'authentication', label: 'Security Layer' },
  { source: 'authentication', target: 'jwt', label: 'Stateless Tokens' },
  { source: 'authentication', target: 'cookies', label: 'HttpOnly Transport' },
  { source: 'react', target: 'rest-apis', label: 'Client Consumes' },

  // Cross-Cluster: Backend -> Databases
  { source: 'rest-apis', target: 'mongodb', label: 'Document Store' },
  { source: 'rest-apis', target: 'postgresql', label: 'Relational Store' },

  // Database Cluster Links
  { source: 'mongodb', target: 'mongoose', label: 'Schema ODM' },
  { source: 'postgresql', target: 'supabase', label: 'Cloud Infrastructure' },
  { source: 'postgresql', target: 'db-design', label: 'Schema Architecture' },

  // Cross-Cluster: Databases -> AI / ML Vector Search
  { source: 'postgresql', target: 'pgvector', label: 'Vector Extension' },
  { source: 'supabase', target: 'pgvector', label: 'Managed Vectors' },

  // AI & Machine Learning Cluster Links
  { source: 'python', target: 'numpy', label: 'Tensor Operations' },
  { source: 'python', target: 'pandas', label: 'DataFrame Analysis' },
  { source: 'python', target: 'data-processing', label: 'Feature Engineering' },
  { source: 'pandas', target: 'data-processing', label: 'ETL Pipeline' },
  { source: 'python', target: 'embeddings', label: 'Vector Generation' },
  { source: 'embeddings', target: 'vector-search', label: 'Similarity Index' },
  { source: 'vector-search', target: 'pgvector', label: 'Storage Engine' },
  { source: 'vector-search', target: 'rag', label: 'Context Retrieval' },
  { source: 'rag', target: 'llm-integration', label: 'Prompt Augmentation' },

  // Cross-Cluster: Backend <-> AI
  { source: 'rest-apis', target: 'rag', label: 'API Serving' },

  // Developer Tools Cluster Links
  { source: 'git', target: 'github', label: 'Remote Hosting' },
  { source: 'postman', target: 'api-testing', label: 'Automated Suites' },
  { source: 'rest-apis', target: 'postman', label: 'Validation' },
  { source: 'docker', target: 'deployment', label: 'Container Release' },
  { source: 'github', target: 'deployment', label: 'CI/CD Pipeline' },
  { source: 'git', target: 'nodejs', label: 'Version Tracking' },
  { source: 'git', target: 'python', label: 'Version Tracking' },
  { source: 'docker', target: 'nodejs', label: 'App Container' },
];

/**
 * Returns all direct neighbors (connected node ids) for a given node id
 */
export function getConnectedNodeIds(nodeId) {
  const connected = new Set();
  GRAPH_LINKS.forEach(link => {
    if (link.source === nodeId) connected.add(link.target);
    if (link.target === nodeId) connected.add(link.source);
  });
  return connected;
}

/**
 * Returns all links connected directly to a given node id
 */
export function getConnectedLinks(nodeId) {
  return GRAPH_LINKS.filter(link => link.source === nodeId || link.target === nodeId);
}

