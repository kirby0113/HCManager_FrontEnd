import {useState, useEffect} from 'react';
import {getQuestions} from '../components/API/QuestionAPIs';

export const useQuestion = () => {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    getQuestions().then((json) => setQuestions(json));
  }, []);

  return {questions, setQuestions};
};
