export type Answer = {
  /**
   * The unique identifier for the answer.
   */
  id: string;
  /**
   * An array of options to display in the answer.
   */
  options: [string, string] | [string, string, string];
  /**
   * The index of the correct option.
   */
  correctOption: number;
};

export type Question = {
  /**
   * The unique identifier for the question.
   */
  id: string;
  /**
   * The question to display.
   */
  questionText: string;
  /**
   * An array of answers to display.
   */
  answers: Answer[];
};
