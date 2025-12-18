
export interface Education {
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Project {
  name: string;
  role: string;
  description: string;
  technologies: string[];
}

export interface ResumeData {
  basics: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    title: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string[];
  languages: string[];
}

export enum ThemeType {
  MODERN = 'modern',
  CLASSIC = 'classic',
  MINIMAL = 'minimal',
  CREATIVE = 'creative'
}

export interface ResumeTheme {
  id: ThemeType;
  name: string;
  primaryColor: string;
}
