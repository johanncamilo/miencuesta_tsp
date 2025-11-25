// FIX: Added 'take-survey' to Page type to allow navigation to the survey taking component.
export type Page = 'home' | 'pricing' | 'checkout' | 'contact' | 'create-survey' | 'edit-survey' | 'results' | 'take-survey' | 'preview-survey' | 'training';

export interface PricingPlan {
    name: string;
    price: string;
    features: string[];
    isPopular: boolean;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  // FIX: Added 'draft' to the possible status values to align with its usage in App.tsx.
  status: 'active' | 'closed' | 'draft';
  responses: number;
  createdAt: string;
}

export type QuestionType = 'multiple-choice' | 'short-text' | 'paragraph';

export interface AnswerOption {
    id: string;
    value: string;
}

export interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options: AnswerOption[];
}

export interface MultipleChoiceResult extends AnswerOption {
    count: number;
}

export type TextResult = string;

export type QuestionResultData = MultipleChoiceResult[] | TextResult[];

export interface Attendee {
    id: string;
    name: string;
    department: string;
}

export interface TrainingSession {
    id: string;
    topic: string;
    date: string;
    instructor: string;
    attendees: Attendee[];
    status: 'Programada' | 'Realizada' | 'Cancelada';
}
