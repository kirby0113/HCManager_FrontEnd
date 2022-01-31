import {useContext} from 'react';
import {getQuestions as getQuestionsAPI} from '../components/API/QuestionAPIs';
import {QuestionContext} from '../contexts/QuestionContext';

export const useQuestion = () => {
  const {questions, setQuestions} = useContext(QuestionContext);

  const getQuestions = () => {
    getQuestionsAPI().then((json) => setQuestions(json));
  };

  return {questions, setQuestions, getQuestions};
};
