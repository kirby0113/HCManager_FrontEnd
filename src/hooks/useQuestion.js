import {useContext} from 'react';
import {getQuestions as getQuestionsAPI, getQuestion as getQuestionAPI} from '../components/API/QuestionAPIs';
import {QuestionContext} from '../contexts/QuestionContext';

export const useQuestion = () => {
  const {questions, setQuestions, selectQuestion, setSelectQuestion} = useContext(QuestionContext);

  const getQuestions = async () => {
    return await getQuestionsAPI().then((json) => setQuestions(json));
  };

  const getQuestion = async (id) => {
    return await getQuestionAPI(id).then((json) => {
      setSelectQuestion(json);
      return json;
    });
  };

  return {questions, setQuestions, getQuestions, getQuestion, selectQuestion, setSelectQuestion};
};
