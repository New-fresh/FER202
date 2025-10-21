import React, { useEffect, useReducer, useRef } from "react";
import { Button, Card, Container, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DURATION = 10;          
const FEEDBACK_DELAY = 3000;  

const initialState = {
  questions: [
    { id: 1, question: "What is the capital of Australia?", options: ["Sydney", "Canberra", "Melbourne", "Perth"], answer: "Canberra" },
    { id: 2, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { id: 3, question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], answer: "Pacific Ocean" },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: null,     
  timeLeft: DURATION, 
  highScore: Number(localStorage.getItem("quiz_high_score") || 0),
};

function reducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload, feedback: null };

    case "TICK": {
      const next = Math.max(0, state.timeLeft - 1);
      return { ...state, timeLeft: next };
    }

    case "EVALUATE": {
      const correct = state.selectedOption === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        score: correct ? state.score + 1 : state.score,
        feedback: correct ? "correct" : "incorrect",
      };
    }

    case "NEXT": {
      const isLast = state.currentQuestion === state.questions.length - 1;
      if (isLast) {
        const finalScore = state.score;
        const newHigh = Math.max(finalScore, state.highScore);
        if (newHigh !== state.highScore) localStorage.setItem("quiz_high_score", String(newHigh));
        return { ...state, showScore: true, highScore: newHigh };
      }
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        feedback: null,
        timeLeft: DURATION,
      };
    }

    case "TIMEOUT": {
      
      const isLast = state.currentQuestion === state.questions.length - 1;
      const newState = { ...state, feedback: "incorrect" };
      if (isLast) {
        const finalScore = newState.score;
        const newHigh = Math.max(finalScore, newState.highScore);
        if (newHigh !== newState.highScore) localStorage.setItem("quiz_high_score", String(newHigh));
        return { ...newState, showScore: true, highScore: newHigh };
      }
      return {
        ...newState,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        feedback: null,
        timeLeft: DURATION,
      };
    }

    case "RESTART":
      return { ...initialState, highScore: Number(localStorage.getItem("quiz_high_score") || 0) };

    default:
      return state;
  }
}

export default function QuestionBankPlus() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore, feedback, timeLeft, highScore } = state;

  
  const timerRef = useRef(null);
  useEffect(() => {
    if (showScore) return; 
    if (timeLeft === 0) {
      dispatch({ type: "TIMEOUT" });
      return;
    }
    timerRef.current = setTimeout(() => dispatch({ type: "TICK" }), 1000);
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, showScore]);

  const q = questions[currentQuestion];
  const total = questions.length;
  const progress = Math.round(((currentQuestion) / total) * 100);
  const stepLabel = `${currentQuestion + 1}/${total}`;

  const handleSelect = (option) => dispatch({ type: "SELECT_OPTION", payload: option });

  
  const handleNext = () => {
    if (feedback == null) dispatch({ type: "EVALUATE" });
    setTimeout(() => dispatch({ type: "NEXT" }), FEEDBACK_DELAY);
  };

  const handleRestart = () => dispatch({ type: "RESTART" });

  return (
    <Container className="mt-4" style={{ maxWidth: 860 }}>
      <Card className="p-4">
        {showScore ? (
          <div className="text-center">
            <h4 className="mb-3">Your Score: {score} / {total}</h4>
            <p className="mb-2">🏆 High Score: <strong>{highScore}</strong></p>
            <Button variant="primary" onClick={handleRestart}>Restart Quiz</Button>
          </div>
        ) : (
          <div>
            
            <div className="d-flex align-items-center gap-3 mb-3">
              <div style={{ minWidth: 80, textAlign: "center", fontWeight: 600 }}>{stepLabel}</div>
              <div className="flex-grow-1">
                <ProgressBar now={progress} />
              </div>
            </div>

            
            <div className="mb-2">
              <span style={{ fontWeight: 600 }}>Time Left: </span>
              <span style={{ color: timeLeft < 5 ? "red" : "#333" }}>{timeLeft}s</span>
            </div>

            <h5 className="mb-3">
              Question {q.id}: <br /> {q.question}
            </h5>

            <div className="mt-2">
              {q.options.map((op, idx) => {
                const isSelected = selectedOption === op;
                return (
                  <Button
                    key={idx}
                    variant={isSelected ? "success" : "outline-secondary"}
                    className="m-2"
                    onClick={() => handleSelect(op)}
                    disabled={feedback !== null}
                  >
                    {op}
                  </Button>
                );
              })}
            </div>

            
            {feedback === "correct" && (
              <div className="mt-3 text-success d-flex align-items-center gap-2">
                <FaCheckCircle /> <span>Correct! 🎉</span>
              </div>
            )}
            {feedback === "incorrect" && (
              <div className="mt-3 text-danger d-flex align-items-center gap-2">
                <FaTimesCircle />{" "}
                <span>
                  Incorrect! The correct answer is <strong>{q.answer}</strong>.
                </span>
              </div>
            )}

            <Button
              variant="primary"
              className="mt-3"
              disabled={!selectedOption && feedback == null}
              onClick={handleNext}
            >
              {currentQuestion === total - 1 ? "Finish Quiz" : feedback == null ? "Check & Next" : "Next"}
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}
