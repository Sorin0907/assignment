import { Question } from "../types/types";

/**
 * Function to shuffle questions and answers
 * @param questions
 * @returns random organized questions
 * @example shuffleQuestionsAndAnswers([{id: "1", questionText: "What is the capital of France?", answers: [{id: "1", options: ["Paris", "London"], correctOption: 0}]}])
 */
export const shuffleQuestionsAndAnswers = (
  questions: Question[]
): Question[] => {
  return [...questions]
    .sort(() => Math.random() - 0.5)
    .map((q) => ({
      ...q,
      answers: [...q.answers].sort(() => Math.random() - 0.5),
    }));
};
