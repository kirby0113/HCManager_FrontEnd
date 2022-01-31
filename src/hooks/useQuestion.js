import {useContext} from 'react';
import {getQuestions as getQuestionsAPI, getQuestion as getQuestionAPI} from '../components/API/QuestionAPIs';
import {QuestionContext} from '../contexts/QuestionContext';

export const useQuestion = () => {
  const {questions, setQuestions, selectQuestion, setSelectQuestion} = useContext(QuestionContext);

  const getQuestions = () => {
    getQuestionsAPI().then((json) => setQuestions(json));
  };

  const getQuestion = (id) => {
    getQuestionAPI(id).then((json) => {
      console.log(json);
      setSelectQuestion(json);
    });
  };

  return {questions, setQuestions, getQuestions, getQuestion, selectQuestion, setSelectQuestion};
};
