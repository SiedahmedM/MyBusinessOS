export interface BusinessType {
  id: string;
  name: string;
  icon: string;
  title: string;
  features: AppFeature[];
}

export interface AppFeature {
  icon: string;
  title: string;
  description: string;
}

export interface DemoRequest {
  id: string;
  session_id: string;
  business_type: string;
  description?: string;
  created_at: string;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  business_type?: string;
  message?: string;
  created_at: string;
}

export interface ROICalculation {
  id: string;
  calculator_type: string;
  input_values: Record<string, number>;
  results: Record<string, number>;
  created_at: string;
}

export interface CaseStudy {
  id: string;
  business: string;
  industry: string;
  profile_image: string;
  quote: string;
  author: string;
  position: string;
  rating: number;
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
  features: string[];
}