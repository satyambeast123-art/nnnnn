
export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  subtext?: string;
  options: Option[];
}

export type QuizState = 'start' | 'quiz' | 'loading' | 'result' | 'error';
