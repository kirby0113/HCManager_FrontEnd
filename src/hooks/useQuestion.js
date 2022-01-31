import {useEffect, useContext} from 'react';
import {getQuestions} from '../components/API/QuestionAPIs';
import {QuestionContext} from '../contexts/QuestionContext';

export const useQuestion = () => {
  const {questions, setQuestions} = useContext(QuestionContext);

  useEffect(() => {
    getQuestions().then((json) => setQuestions(json));
  }, []);

  return {questions, setQuestions};
};
