import { Question } from "../types/types";
import { shuffleQuestionsAndAnswers } from "../utils/shuffle";
import { QuizQuestion } from "./QuizQuestion";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

type QuizProps = {
  /**
   * An array of questions to display.
   */
  questions: Question[];
};

/**
 * Quiz component
 * @param questions
 * @returns A quiz component that displays a shuffled list of questions.
 * @example <Quiz questions={[{id: "1", questionText: "What is the capital of France?", answers: [{id: "1", options: ["Paris", "London"], correctOption: 0}]}]} />
 */
export const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [shuffledQuestions] = useState<Question[]>(
    shuffleQuestionsAndAnswers(questions)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Move to the next question when the current question is completed
  const handleNextQuestion = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsFirstRender(false);
      }, 1000);
    }
  };

  return (
    <Box style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        {shuffledQuestions.length && (
          <motion.div
            key={shuffledQuestions[currentIndex]?.id}
            initial={isFirstRender ? {} : { opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5 }}
            style={{ position: "absolute", width: "100%", height: "100%" }}
          >
            <QuizQuestion
              key={shuffledQuestions[currentIndex].id}
              {...shuffledQuestions[currentIndex]}
              onCompleted={handleNextQuestion}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};
