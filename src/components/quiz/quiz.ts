import { modals } from "$lib/utils/modal-manager";
import QuizComponent from "./quiz.svelte";

export namespace quiz {
  export type Question = {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    hint?: string;
    explanation?: string;
  };

  export type Config = {
    title: string;
    description: string;
    passingScore: number;
    maxAttempts: number;
    timeLimit?: number;
    questions: Question[];
  };

  export type Result = {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeSpent: number;
    passed: boolean;
    answers: Record<string, any>;
  };

  export type ModalConfig = {
    config: Config;
    class?: string;
  };

  export const open = (config: ModalConfig, onClose: () => void) => {
    modals.open(QuizComponent, config, onClose);
  };
}
