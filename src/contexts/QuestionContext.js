import {useState, createContext} from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = (props) => {
  const [questions, setQuestions] = useState([]);
  return (
    <QuestionContext.Provider value={{questions: questions, setQuestions}}>{props.children}</QuestionContext.Provider>
  );
};
