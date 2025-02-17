import { Quiz } from './components/Quiz';
import { Question } from './types/types';

const sampleQuestions: Question[] = [
  {
    id: "q1",
    questionText: "An animal cell contains:",
    answers: [
      { id: "1", options: ["Cell wall", "Ribosomes"], correctOption: 1 },
      { id: "2", options: ["Cytoplasm", "Chloroplast"], correctOption: 0 },
      {
        id: "3",
        options: ["Partially permeable membrane", "Impermeable membrane"],
        correctOption: 0,
      },
      { id: "4", options: ["Cellulose", "Mitochondria"], correctOption: 1 },
    ],
  },
  {
    id: "q2",
    questionText: "What are ideal office conditions?",
    answers: [
      { id: "5", options: ["Good pay", "Bad pay"], correctOption: 0 },
      {
        id: "6",
        options: ["Lot of meetings", "Less meetings", "No meetings"],
        correctOption: 2,
      },
      {
        id: "7",
        options: ["Free coffee", "Expensive coffee"],
        correctOption: 0,
      },
      {
        id: "8",
        options: ["Bear in office", "Dog in office", "No animals"],
        correctOption: 1,
      },
    ],
  },
];

const App = () => {
  return <Quiz questions={sampleQuestions} />;
};

export default App;