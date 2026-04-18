export interface Professor {
  name: string;
  department: string;
  college: string;
  email?: string;
  profileUrl?: string;
  researchInterests: string[];
  bio?: string;
}

export const FALLBACK_PROFESSORS: Professor[] = [
  // Engineering
  { name: "Dr. Tak Igusa", department: "Civil & Environmental Engineering", college: "Rossin", email: "tsi2@lehigh.edu", researchInterests: ["structural engineering", "risk analysis", "probabilistic methods", "resilience"] },
  { name: "Dr. Joachim Grenestedt", department: "Mechanical Engineering & Mechanics", college: "Rossin", email: "jig205@lehigh.edu", researchInterests: ["composites", "materials science", "structural mechanics", "manufacturing"] },
  { name: "Dr. Mooi Choo Chuah", department: "Electrical & Computer Engineering", college: "Rossin", email: "mcc5@lehigh.edu", researchInterests: ["machine learning", "network security", "IoT", "edge computing"] },
  { name: "Dr. Brian Chen", department: "Computer Science & Engineering", college: "Rossin", email: "bic210@lehigh.edu", researchInterests: ["bioinformatics", "machine learning", "protein structure", "computational biology"] },
  { name: "Dr. Hector Briceno", department: "Chemical & Biomolecular Engineering", college: "Rossin", email: "hfb2@lehigh.edu", researchInterests: ["membrane science", "energy", "separations", "polymers"] },
  { name: "Dr. Paolo Bocchini", department: "Civil & Environmental Engineering", college: "Rossin", email: "pab310@lehigh.edu", researchInterests: ["structural reliability", "resilience", "infrastructure systems", "natural hazards"] },
  { name: "Dr. Dominic Chao", department: "Computer Science & Engineering", college: "Rossin", email: "doc4@lehigh.edu", researchInterests: ["algorithms", "combinatorics", "graph theory", "data structures"] },
  { name: "Dr. Liang Cheng", department: "Computer Science & Engineering", college: "Rossin", email: "liang.cheng@lehigh.edu", researchInterests: ["networking", "distributed systems", "cybersecurity", "cloud computing"] },
  { name: "Dr. Michael Spear", department: "Computer Science & Engineering", college: "Rossin", email: "mfs409@lehigh.edu", researchInterests: ["parallel computing", "transactional memory", "systems programming", "concurrency"] },
  { name: "Dr. Daniel Lopresti", department: "Computer Science & Engineering", college: "Rossin", email: "lopresti@lehigh.edu", researchInterests: ["pattern recognition", "document analysis", "machine learning", "NLP"] },
  // Arts & Sciences
  { name: "Dr. Joshua Breslau", department: "Physics", college: "CAS", email: "jbreslau@lehigh.edu", researchInterests: ["plasma physics", "fusion energy", "computational physics", "magnetohydrodynamics"] },
  { name: "Dr. Xuanhui Qu", department: "Chemistry", college: "CAS", email: "xuq210@lehigh.edu", researchInterests: ["organic chemistry", "catalysis", "synthetic chemistry", "drug discovery"] },
  { name: "Dr. Michael Stavola", department: "Physics", college: "CAS", email: "mjs2@lehigh.edu", researchInterests: ["semiconductor physics", "defects", "materials characterization", "solar energy"] },
  { name: "Dr. Volkmar Dierolf", department: "Physics", college: "CAS", email: "vod2@lehigh.edu", researchInterests: ["photonics", "quantum information", "optical materials", "lasers"] },
  { name: "Dr. Wonpil Im", department: "Biological Sciences", college: "CAS", email: "woi216@lehigh.edu", researchInterests: ["computational biology", "membrane proteins", "molecular simulation", "biophysics"] },
  { name: "Dr. Gregory Lang", department: "Biological Sciences", college: "CAS", email: "gsl210@lehigh.edu", researchInterests: ["evolutionary biology", "genomics", "yeast genetics", "experimental evolution"] },
  { name: "Dr. Xiaofeng Qian", department: "Physics", college: "CAS", email: "xiq210@lehigh.edu", researchInterests: ["2D materials", "quantum computing", "condensed matter physics", "nanotechnology"] },
  // College of Business
  { name: "Dr. Linpeng Tang", department: "Finance", college: "Business", email: "lit218@lehigh.edu", researchInterests: ["financial economics", "asset pricing", "market microstructure", "behavioral finance"] },
  { name: "Dr. Nicos Savva", department: "Management", college: "Business", email: "nis219@lehigh.edu", researchInterests: ["healthcare operations", "data-driven decision making", "economics of AI", "platform markets"] },
  { name: "Dr. Kapil Tuli", department: "Marketing", college: "Business", email: "krt216@lehigh.edu", researchInterests: ["marketing analytics", "customer behavior", "AI in marketing", "digital marketing"] },
  // College of Health
  { name: "Dr. Jill Newby", department: "Population Health", college: "Health", email: "jin220@lehigh.edu", researchInterests: ["public health", "health disparities", "community health", "epidemiology"] },
  { name: "Dr. Diane Hu", department: "Health", college: "Health", email: "dih219@lehigh.edu", researchInterests: ["nutrition", "health behavior", "chronic disease", "wellness"] },
  // College of Education
  { name: "Dr. Gary Sasso", department: "Education", college: "Education", email: "gms2@lehigh.edu", researchInterests: ["special education", "behavioral intervention", "autism", "learning disabilities"] },
  { name: "Dr. Kisha Porcher", department: "Education", college: "Education", email: "kip219@lehigh.edu", researchInterests: ["educational equity", "urban education", "teacher development", "diversity in STEM"] },
];
