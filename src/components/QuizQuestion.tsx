import { Answer } from "../types/types";
import { ToggleSwitch } from "./ToggleSwitch";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { t } from "ttag";

type QuizQuestionProps = {
  /**
   * The question to display.
   */
  questionText: string;
  /**
   * An array of answers to display.
   */
  answers: Answer[];
  /**
   * The function to call when the correct answers have been sellected.
   */
  onCompleted: () => void;
};

/**
 * Quiz question component.
 * @param questionText The question to display.
 * @param answers An array of answers to display.
 * @param onCompleted The function to call when the correct answers have been sellected.
 * @returns The quiz question component.
 *
 * @example
 * <QuizQuestion question="What is the capital of France?" answers={[{ id: "1", options: ["Paris", "London"], correctOption: 0 }]} onCompleted={() => console.log("Completed!")} />
 */
export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  questionText,
  answers,
  onCompleted,
}) => {
  // Generate random selections for the answers
  const generateRandomSelections = () => {
    const selections: { [key: string]: number } = {};
    answers.forEach((answer) => {
      selections[answer.id] = Math.floor(Math.random() * answer.options.length);
    });
    return selections;
  };

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: number;
  }>(generateRandomSelections());
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState(0);

  // Calculate the score and lock the quiz if all answers are correct
  const handleToggle = (id: string, value: number) => {
    if (isLocked) return;

    const newSelectedAnswers = {
      ...selectedAnswers,
      [id]: value,
    };

    setSelectedAnswers(newSelectedAnswers);

    // Calculate the score
    const correctCount = Object.entries(newSelectedAnswers).reduce(
      (acc, [id, selected]) => {
        const answer = answers.find((a) => a.id === id);
        return acc + (answer?.correctOption === selected ? 1 : 0);
      },
      0
    );

    const newScore = correctCount / answers.length;
    setScore(newScore);

    // Lock the quiz if all answers are correct
    if (correctCount === answers.length) {
      setIsLocked(true);
      setTimeout(() => onCompleted(), 1000);
    }
  };

  // Provide colors based on the score
  const getColor = () => {
    let backgroundColor;
    let activeColor;
    let indicatorColor;
    let borderColor;

    switch (true) {
      case score === 1:
        backgroundColor =
          "linear-gradient(to bottom, #76E0C2 0%, #59CADA 100%)";
        activeColor = "#4CAD94";
        indicatorColor = "#A5E7E2";
        borderColor = "#FBFBFB";
        break;
      case score > 0.5:
        backgroundColor =
          "linear-gradient(to bottom, #F1B496 0%, #EA806A 100%)";
        activeColor = "#E47958";
        indicatorColor = "#F2CBBD";
        borderColor = "#FBFBFB";
        break;
      default:
        backgroundColor =
          "linear-gradient(to bottom, #F6B868 0%, #EE6B2D 100%)";
        activeColor = "#9F938B";
        indicatorColor = "#F8CAA3";
        borderColor = "#F9D29F";
        break;
    }

    return { backgroundColor, activeColor, indicatorColor, borderColor };
  };

  return (
    <motion.div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "16px",
        background: getColor().backgroundColor,
        transition: "background 0.5s ease-in-out",
      }}
    >
      <Box maxWidth={900} width="100%" textAlign="center">
        <Typography variant="h1" color="white" mb={5}>
          {questionText}
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          {answers.map((answer) => (
            <ToggleSwitch
              key={answer.id}
              id={answer.id}
              selected={selectedAnswers[answer.id] ?? 0}
              onChange={(value) => handleToggle(answer.id, value)}
              options={answer.options}
              disabled={isLocked}
              activeColor={getColor().activeColor}
              indicatorColor={getColor().indicatorColor}
              borderColor={getColor().borderColor}
            />
          ))}
        </Box>

        {isLocked ? (
          <Typography color="white" mt={4} variant="h2">
            {t`The answer is correct!`}
          </Typography>
        ) : (
          score < 1 &&
          Object.keys(selectedAnswers).length === answers.length && (
            <Typography color="white" mt={4} variant="h2">
              {t`The answer is incorect!`}
            </Typography>
          )
        )}
      </Box>
    </motion.div>
  );
};
