export interface PersonalInfo {
  full_name: string;
  email: string | null;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  summary?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  gpa?: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  location?: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  level?: string;
}

export interface Language {
  name: string;
  proficiency: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  start_date?: string;
  end_date?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credential_id?: string;
  url?: string;
}

export interface Reference {
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
  relationship?: string;
}

export interface Resume {
  _id?: string;
  user_id?: string;
  template_id: string;
  personal_info: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
  certifications: Certification[];
  references: Reference[];
  created_at?: string;
  updated_at?: string;
}

export interface Template {
  _id: string;
  name: string;
  description: string;
  preview_image?: string;
  category: string;
  is_premium: boolean;
  sections: string[];
  color_scheme: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  font_family: string;
  layout: string;
}

export interface User {
  _id?: string;
  email: string;
  username: string;
  full_name?: string;
  is_active: boolean;
  created_at?: string;
}