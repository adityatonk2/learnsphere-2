export interface Course {
  id: string;
  title: string;
  code?: string;
  duration?: string;
  level?: string;
  domain?: string;
  slug?: string;
  description?: string;
  popular?: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  badge?: string;
  courses: Course[];
}

export interface TrainingMode {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  recommendedFor: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
}

export interface ContactFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  trainingMode: string;
  participants: string;
  message: string;
}

export interface PartnerFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  partnershipType: string;
  message: string;
}
