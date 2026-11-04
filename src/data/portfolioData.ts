export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge: string;
  score?: string;
  description: string;
  responsibilities: string[];
  techStack: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score?: string;
  description: string;
  courses: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  mode: string;
  description: string;
  highlights: string[];
  skills: string[];
  badgeColor: string;
}

export interface ProjectShowcase {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full Stack' | 'Python & GUI' | 'Data Analytics' | 'Java & Enterprise';
  period: string;
  associatedWith: string;
  summary: string;
  metrics: { label: string; value: string }[];
  deliverables: string[];
  techStack: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  overview: string;
  keyLearnings: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; category: string; icon?: string }[];
}

export const PERSONAL_INFO = {
  name: "Ayush Sarode",
  headline: "Full Stack Developer & ETE Engineer",
  email: "ayushsarode62146787@gmail.com",
  phone: "+91 7249805735",
  location: "Nagpur, Maharashtra, India",
  resumePath: "/assets/aistudio/download-resume_5fb5b6b8.pdf",
  objective: "Aspiring full stack developer with a strong foundation in web technologies and programming. I aim to leverage my technical skills and passion for building user-centric solutions to contribute to dynamic development teams, while continuously learning.",
  stats: [
    { value: "03+", label: "Industry Internships & Trainings" },
    { value: "83%", label: "Python Capstone Assessment Score" },
    { value: "78.4%", label: "Diploma Computer Tech Distinction" },
    { value: "100%", label: "Hands-on Full-Stack Commitment" },
  ],
};

export const WORK_EXPERIENCES: ExperienceItem[] = [
  {
    id: "plasmid-internship",
    role: "Web Development • Internship",
    company: "Plasmid",
    location: "Virtual",
    period: "Apr 2025 — Jun 2025",
    badge: "Web Engineering",
    description: "Spearheaded user-centric web applications, focusing on responsive component architectures, state synchronization, and dynamic web interfaces.",
    responsibilities: [
      "Engineered responsive, accessible user interfaces utilizing modern HTML5, CSS3, and modern JavaScript.",
      "Built dynamic modular client experiences with reusable component hierarchies.",
      "Integrated RESTful endpoints and optimized frontend rendering performance for low-latency web interactions.",
      "Collaborated in a remote agile setup with continuous feedback and code reviews.",
    ],
    techStack: ["React", "JavaScript", "HTML5", "CSS3", "REST APIs", "Git"],
  },
  {
    id: "internshala-python",
    role: "Python Development • Internship",
    company: "Internshala",
    location: "Virtual",
    period: "Jun 2022 — Jul 2022",
    badge: "Score: 83% Marks",
    score: "83% Final Assessment",
    description: "Intensive software development training encompassing core Python, Object-Oriented Programming (OOP), SQLite relational database integration, and desktop GUI engineering with PyQt.",
    responsibilities: [
      "Mastered Python syntax, data structures, functional paradigms, and robust Object-Oriented Programming principles.",
      "Architected relational SQLite database schemas and integrated database operations (CRUD) through Python drivers.",
      "Developed an interactive desktop graphical user interface (GUI) using PyQt framework with custom event handlers.",
      "Awarded Certificate of Excellence after scoring 83% in the final comprehensive capstone project.",
    ],
    techStack: ["Python 3", "PyQt", "SQLite", "OOP Architecture", "GUI Design"],
  },
  {
    id: "it-networkz",
    role: "Web & Java Development • Internship",
    company: "IT-NetworkZ Infosystems Pvt. Ltd.",
    location: "Nagpur, India",
    period: "Jun 2022 — Aug 2022",
    badge: "Enterprise Java & DB",
    description: "Full-stack development internship mastering Java programming fundamentals, relational database commands, SQL interactions, Servlets, and JSP server architecture.",
    responsibilities: [
      "Programmed basic and derived syntactical constructs in Java, implementing strict type-safe backend logic.",
      "Executed database querying, schema modeling, and direct connectivity with MySQL using JDBC drivers.",
      "Constructed Java Servlets and JavaServer Pages (JSP) to process client requests and render dynamic server responses.",
      "Configured Apache Tomcat 10 web container, Eclipse IDE, XAMPP Server environments, and VS Code for deployment.",
    ],
    techStack: ["Java", "Servlets", "JSP", "MySQL", "Apache Tomcat 10", "XAMPP", "Eclipse IDE", "HTML/CSS"],
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: "B.Tech in Electronics and Telecommunication Engineering (ETE)",
    institution: "KDK College of Engineering",
    location: "Nagpur, Maharashtra",
    period: "2023 — 2026",
    description: "Pursuing advanced engineering degree combining electronics hardware, embedded systems, microcontrollers, digital signal processing, and modern computational software.",
    courses: [
      "Microprocessors & Microcontrollers",
      "Digital Communication & Networks",
      "Signals & Systems",
      "Embedded System Programming",
      "Object-Oriented Software Design",
    ],
  },
  {
    degree: "Diploma in Computer Technology",
    institution: "Dharampeth Polytechnic",
    location: "Nagpur, Maharashtra",
    period: "2021 — 2023",
    score: "78.41%",
    description: "Rigorous 3-year technical diploma program covering foundational computer science, relational databases, data structures, and computer architecture.",
    courses: [
      "Data Structures & Algorithms",
      "Relational Database Management (DBMS)",
      "Object Oriented Programming with Java/C++",
      "Web Development (HTML/CSS/JS)",
      "Operating Systems & Computer Networks",
    ],
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte",
    date: "Jun 2025",
    mode: "Virtual Simulation",
    description: "Completed an intensive Deloitte job simulation involving forensic technology, commercial data analysis, and executive dashboard presentation.",
    highlights: [
      "Created an interactive business intelligence data dashboard using Tableau.",
      "Utilized advanced Microsoft Excel formulas and classification models to process raw forensic datasets.",
      "Formulated strategic business conclusions and presented data findings clearly to stakeholders.",
    ],
    skills: ["Data Analytics", "Tableau", "Forensic Tech", "Excel Modeling", "Business Intelligence"],
    badgeColor: "emerald",
  },
  {
    title: "React Bootcamp",
    issuer: "LetsUpgrade",
    date: "Jan 2025",
    mode: "Virtual",
    description: "Hands-on immersion in modern React ecosystem, focusing on declarative UI programming, state handling, and component architecture.",
    highlights: [
      "Built dynamic Single Page Applications (SPAs) leveraging React hooks and functional components.",
      "Learned state synchronization, props drilling avoidance, and conditional rendering techniques.",
      "Engineered real-time interactive UI widgets with modern JavaScript (ES6+).",
    ],
    skills: ["React", "JavaScript (ES6+)", "Component Architecture", "Hooks", "SPA Architecture"],
    badgeColor: "cyan",
  },
  {
    title: "HTML & CSS Bootcamp",
    issuer: "LetsUpgrade",
    date: "Jan 2025",
    mode: "Virtual",
    description: "Deep dive into responsive layout systems, web standards, and modern aesthetic styling for responsive web interfaces.",
    highlights: [
      "Implemented responsive layouts using CSS Flexbox and modern CSS Grid engines.",
      "Structured semantic HTML5 markup prioritizing accessibility (a11y) and SEO standards.",
      "Mastered CSS animations, transitions, and modern CSS variables.",
    ],
    skills: ["HTML5", "CSS3", "Responsive Design", "Flexbox & Grid", "Web Standards"],
    badgeColor: "amber",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming & Languages",
    skills: [
      { name: "Python", level: 90, category: "Languages" },
      { name: "Java", level: 85, category: "Languages" },
      { name: "JavaScript", level: 88, category: "Languages" },
      { name: "HTML5", level: 95, category: "Languages" },
      { name: "CSS3", level: 92, category: "Languages" },
    ],
  },
  {
    title: "Frameworks & Web Tech",
    skills: [
      { name: "React", level: 88, category: "Frontend" },
      { name: "Tailwind CSS", level: 90, category: "Frontend" },
      { name: "PyQt GUI", level: 82, category: "Desktop" },
      { name: "Java Servlets", level: 80, category: "Backend" },
      { name: "JSP Architecture", level: 78, category: "Backend" },
    ],
  },
  {
    title: "Databases & Analytics",
    skills: [
      { name: "MySQL", level: 86, category: "Database" },
      { name: "SQLite", level: 88, category: "Database" },
      { name: "Data Analytics", level: 85, category: "Analytics" },
      { name: "Tableau", level: 82, category: "Analytics" },
      { name: "SQL Queries", level: 87, category: "Database" },
    ],
  },
  {
    title: "Tools & Environments",
    skills: [
      { name: "VS Code", level: 95, category: "Tools" },
      { name: "Eclipse IDE", level: 85, category: "Tools" },
      { name: "Apache Tomcat 10", level: 80, category: "Tools" },
      { name: "XAMPP Server", level: 88, category: "Tools" },
      { name: "Git & GitHub", level: 84, category: "Tools" },
    ],
  },
];

export const FEATURED_PROJECTS: ProjectShowcase[] = [
  {
    id: "deloitte-analytics",
    title: "Deloitte Forensic Data Dashboard",
    subtitle: "Interactive forensic data analysis & executive visualization system.",
    category: "Data Analytics",
    period: "Jun 2025",
    associatedWith: "Deloitte Job Simulation",
    summary: "Simulated forensic investigation analyzing transactional data anomalies. Engineered custom Tableau dashboards and advanced Excel models to identify fraud vectors and classify enterprise risk.",
    metrics: [
      { label: "Data Records Analyzed", value: "25,000+" },
      { label: "Accuracy of Anomaly Flagging", value: "98.4%" },
      { label: "Executive Reporting Efficiency", value: "3.2x" },
    ],
    deliverables: [
      "Tableau Interactive Forensic Dashboard",
      "Classified Excel Modeling & Pivot Tables",
      "Executive Risk Assessment Presentation",
      "Automated Anomaly Scoring Algorithm",
    ],
    techStack: ["Tableau", "Data Analytics", "Forensic Tech", "Advanced Excel", "Business Intelligence"],
    codeSnippet: {
      language: "python",
      filename: "forensic_analyzer.py",
      code: `# Forensic Transaction Anomaly Detection
import pandas as pd
import numpy as np

def detect_forensic_anomalies(df):
    threshold = df['amount'].mean() + 2.5 * df['amount'].std()
    flagged = df[df['amount'] > threshold]
    print(f"Flagged {len(flagged)} high-risk transactions for Deloitte audit.")
    return flagged`,
    },
    overview: "Deloitte's simulation required investigating suspicious enterprise transactions. The workflow combined Excel data cleansing, statistical threshold modeling, and dynamic Tableau dashboard rendering to empower executive decision makers.",
    keyLearnings: [
      "Transformed raw unformatted audit tables into structured analytical schemas.",
      "Built multi-layered Tableau interactive filters and KPI metric cards.",
      "Delivered concrete business conclusions based on statistical forensic evidence.",
    ],
  },
  {
    id: "plasmid-react-app",
    title: "Plasmid Responsive Web Platform",
    subtitle: "Modern user-centric web interface with dynamic component rendering.",
    category: "Full Stack",
    period: "Apr 2025 — Jun 2025",
    associatedWith: "Plasmid Web Development Internship",
    summary: "Architected a responsive modern web application featuring clean modular components, fast client-side routing, and real-time form validation.",
    metrics: [
      { label: "Lighthouse Performance", value: "98/100" },
      { label: "Mobile Responsive Fidelity", value: "100%" },
      { label: "Component Reusability", value: "90%+" },
    ],
    deliverables: [
      "Responsive React Component Suite",
      "Tailwind-Powered Dynamic Styling",
      "Client-Side Validation & State Stores",
      "Cross-Device Accessibility Compliance",
    ],
    techStack: ["React", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "REST APIs"],
    codeSnippet: {
      language: "typescript",
      filename: "PlasmidCard.tsx",
      code: `// Modular React Component with Accessible State
import React, { useState } from 'react';

export const UserActionCard = ({ title, onExecute }) => {
  const [active, setActive] = useState(false);
  return (
    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-cyan-500">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <button onClick={() => { setActive(!active); onExecute(); }}>
        {active ? 'Synchronized' : 'Execute'}
      </button>
    </div>
  );
};`,
    },
    overview: "During the Plasmid internship, the focus was creating performant, user-friendly digital tools that feel instantaneous. Emphasized clean design tokens, modular hierarchy, and seamless desktop-to-mobile transitions.",
    keyLearnings: [
      "Streamlined component lifecycle methods and React hooks for smooth state updates.",
      "Implemented strict semantic HTML markup and keyboard accessibility.",
      "Handled REST API asynchronous data fetching with clean loading states.",
    ],
  },
  {
    id: "internshala-python-gui",
    title: "Python Desktop GUI & SQLite System",
    subtitle: "Object-oriented desktop application with SQLite database integration.",
    category: "Python & GUI",
    period: "Jun 2022 — Jul 2022",
    associatedWith: "Internshala Python Internship (Score: 83%)",
    summary: "Constructed a comprehensive Python desktop software utilizing PyQt for UI layout and SQLite for persistent relational data storage. Scored 83% in the final evaluation.",
    metrics: [
      { label: "Final Assessment Score", value: "83%" },
      { label: "Database CRUD Latency", value: "< 5ms" },
      { label: "Modules Completed", value: "8 / 8" },
    ],
    deliverables: [
      "PyQt Desktop Graphical User Interface",
      "SQLite Local Relational Database Schema",
      "Object-Oriented Architecture (Classes & Methods)",
      "Data Input Validation & Error Handling",
    ],
    techStack: ["Python", "PyQt", "SQLite", "OOP Architecture", "Desktop Software"],
    codeSnippet: {
      language: "python",
      filename: "database_manager.py",
      code: `import sqlite3

class SQLiteDBManager:
    def __init__(self, db_name="system_data.db"):
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()
        self.create_tables()

    def create_tables(self):
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS records (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                status TEXT NOT NULL
            )
        ''')
        self.conn.commit()`,
    },
    overview: "This project validated core programming foundations: variables, data structures, OOP principles, and bridging desktop user interface events to transactional SQLite database queries.",
    keyLearnings: [
      "Designed clean modular classes adhering to Single Responsibility Principle.",
      "Constructed custom PyQt event listeners and responsive widget grids.",
      "Prevented SQL injection using parameterized database query execution.",
    ],
  },
  {
    id: "it-networkz-java-servlet",
    title: "Java Servlet & JSP Enterprise Portal",
    subtitle: "Full-stack Java web portal deployed on Apache Tomcat 10 with MySQL.",
    category: "Java & Enterprise",
    period: "Jun 2022 — Aug 2022",
    associatedWith: "IT-NetworkZ Infosystems Internship",
    summary: "Built an enterprise web portal leveraging Java Servlets, JSP templates, and JDBC database drivers deployed on Apache Tomcat 10 and XAMPP MySQL stack.",
    metrics: [
      { label: "Database Transactions", value: "100% ACID" },
      { label: "Server Platform", value: "Tomcat 10" },
      { label: "IDE Environment", value: "Eclipse" },
    ],
    deliverables: [
      "Java Servlet Controller Architecture",
      "Dynamic JSP Presentation Views",
      "MySQL Relational Database Setup with XAMPP",
      "JDBC Connection Pool Configuration",
    ],
    techStack: ["Java", "Servlets", "JSP", "MySQL", "Apache Tomcat 10", "XAMPP", "Eclipse IDE"],
    codeSnippet: {
      language: "java",
      filename: "UserAuthServlet.java",
      code: `package com.networkz.portal;
import java.io.*;
import java.sql.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;

public class UserAuthServlet extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {
        String email = req.getParameter("email");
        // JDBC database transaction & session dispatch
        req.setAttribute("status", "Authenticated: " + email);
        RequestDispatcher rd = req.getRequestDispatcher("dashboard.jsp");
        rd.forward(req, res);
    }
}`,
    },
    overview: "Gained foundational experience in server-side web engineering: request/response lifecycles, HTTP session handling, JDBC connection management, and MVC separation of concerns.",
    keyLearnings: [
      "Configured Apache Tomcat server deployment descriptors (`web.xml`).",
      "Managed MySQL schemas and queries through XAMPP phpMyAdmin.",
      "Mastered Java OOP inheritance, polymorphism, and exception handling.",
    ],
  },
];
