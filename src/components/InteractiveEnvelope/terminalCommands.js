/**
 * Terminal Command Engine for Rudransh's Portfolio
 * Safely parses and executes Bash-style commands with history and auto-complete.
 */

import { PERSONAL_INFO, PROJECTS_DATA } from '@/data/portfolioData';

export const COMMAND_LIST = [
  'about',
  'education',
  'cgpa',
  'semester',
  'coursework',
  'skills',
  'projects',
  'github',
  'contact',
  'help',
  'clear',
  'restart',
];

export function executeCommand(cmdString) {
  const trimmed = cmdString.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case 'about':
      return {
        type: 'about',
        content: [
          "I'm Rudransh, a B.Tech student specializing in Artificial Intelligence and Machine Learning at SRMU.",
          "I enjoy building practical applications, developing robust backend systems, and experimenting with AI-powered solutions.",
          "Core Philosophy: I believe in learning by building, experimenting and continuously improving.",
        ],
      };

    case 'education':
      return {
        type: 'education',
        content: [
          `• Degree: ${PERSONAL_INFO.education.degree}`,
          `• Institution: ${PERSONAL_INFO.education.institution}`,
          `• Expected Graduation: ${PERSONAL_INFO.education.expectedGraduation}`,
          `• Current Term: ${PERSONAL_INFO.education.semester}`,
          `• Academic Standing: ${PERSONAL_INFO.education.cgpa} CGPA`,
        ],
      };

    case 'cgpa':
      return {
        type: 'cgpa',
        content: [
          `Current Cumulative GPA: ${PERSONAL_INFO.education.cgpa} / 10.0`,
          'Status: First Class with Distinction pace across evaluated university semesters.',
        ],
      };

    case 'semester':
      return {
        type: 'semester',
        content: [
          `Current Term: ${PERSONAL_INFO.education.semester}`,
          'Department of Computer Science & Engineering (Specialization: AI & ML)',
        ],
      };

    case 'coursework':
      return {
        type: 'coursework',
        content: [
          'Core Academic Modules & Technical Foundations:',
          '  [1] Data Structures & Algorithms',
          '  [2] Object-Oriented Programming (OOP)',
          '  [3] Database Management Systems (DBMS)',
          '  [4] Machine Learning Fundamentals',
          '  [5] Discrete Mathematics',
          '  [6] Computer Networks & Operating Systems',
        ],
      };

    case 'skills':
      return {
        type: 'skills',
        content: [
          'Verified Technical Competencies:',
          '• Backend Architecture : Node.js, Express.js, REST APIs, JWT Auth, Cookies',
          '• Databases & Storage  : PostgreSQL, MongoDB, Mongoose, Supabase, pgvector',
          '• AI / Machine Learning: Python, NumPy, Pandas, Vector Search, RAG Pipelines, LLMs',
          '• Developer Toolchain  : Git, GitHub, Docker, Postman, Linux / Bash',
        ],
      };

    case 'projects': {
      // Check if user requested a specific project: e.g. "projects 1" or "projects 1 -d"
      if (args.length > 0) {
        const num = parseInt(args[0], 10);
        const isVerbose = args.includes('-d') || args.includes('--details');

        if (!isNaN(num) && num >= 1 && num <= PROJECTS_DATA.length) {
          const proj = PROJECTS_DATA[num - 1];
          return {
            type: 'project_detail',
            project: proj,
            number: num,
            isVerbose,
          };
        } else {
          return {
            type: 'error',
            content: [
              `Project index out of range: "${args[0]}".`,
              `Available project numbers: 1 to ${PROJECTS_DATA.length}. Example: "projects 1 -d"`,
            ],
          };
        }
      }

      // Default: list all projects
      return {
        type: 'projects_list',
        projects: PROJECTS_DATA.map((p, idx) => ({
          number: idx + 1,
          id: p.id,
          title: p.title,
          subtitle: p.subtitle,
          category: p.category,
        })),
        content: [
          'Here are some major projects,',
          ...PROJECTS_DATA.map(
            (p, idx) => `[${idx + 1}] ${p.title} - ${p.subtitle}`
          ),
          '',
          'To get details run : "projects <number>" or "projects <number> -d"',
          'Example: "projects 1 -d"',
        ],
      };
    }

    case 'github': {
      if (typeof window !== 'undefined') {
        window.open(PERSONAL_INFO.github, '_blank', 'noopener,noreferrer');
      }
      return {
        type: 'github',
        content: [
          `Opening GitHub profile in a new tab...`,
          `URL: ${PERSONAL_INFO.github}`,
        ],
      };
    }

    case 'contact':
      return {
        type: 'contact',
        content: [
          'Direct Contact Channels:',
          `• Email    : ${PERSONAL_INFO.email}`,
          `• Phone    : +91 ${PERSONAL_INFO.phone}`,
          `• Location : ${PERSONAL_INFO.location}`,
          `• GitHub   : ${PERSONAL_INFO.github}`,
          `• LinkedIn : ${PERSONAL_INFO.linkedin}`,
          `• Status   : ${PERSONAL_INFO.availableStatus}`,
        ],
      };

    case 'help':
      return {
        type: 'help',
        content: [
          'Available Portfolio Terminal Commands:',
          '  about         - Personal biography and engineering statement',
          '  education     - University degree and graduation timeline',
          '  cgpa          - Current academic GPA and standing',
          '  semester      - Current active semester term',
          '  coursework    - Core university subjects and modules',
          '  skills        - Technical stack and core tools',
          '  projects      - List all portfolio systems (run "projects <n> -d")',
          '  github        - Open genuine GitHub profile in new tab',
          '  contact       - Public communication channels and email',
          '  clear         - Clear terminal screen output',
          '  restart       - Replay initial welcome sequence',
          '  help          - Show this command manual',
        ],
      };

    case 'clear':
      return { type: 'clear' };

    case 'restart':
      return { type: 'restart' };

    default:
      return {
        type: 'error',
        content: [
          `Command not found: "${command}"`,
          "Type 'help' to see all available commands.",
        ],
      };
  }
}

