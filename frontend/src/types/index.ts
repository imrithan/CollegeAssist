export interface User {
  id: number;
  full_name: string;
  email: string;
}

export interface StudentProfile {
  id?: number;
  user_id?: number;
  name: string;
  dob: string;
  class_12_stream: string;
  preferred_location: string;
  interests: string[];
  preferred_degree: string;
  academic_score: number;
}

export interface College {
  id: number;
  name: string;
  programme: string;
  degree: string;
  stream: string;
  location: string;
  state: string;
  duration: string;
  cutoff: string;
  min_cutoff: number;
  nirf_rank?: number;
  fees?: string;
  placements?: string;
  website?: string;
  logo_type?: string;
  description?: string;
  relevanceScore?: number;
}

export interface CounselingHistoryItem {
  id: number;
  user_id?: number;
  date_time: string;
  query: string;
  response_summary: string;
  full_response?: string;
  source: string;
  created_at?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  source?: string;
}
