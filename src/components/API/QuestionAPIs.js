import {QuestionsAPI} from '../../APILink';

export const getQuestion = async (id) => {
  //id指定で1データ取る
  return await fetch(QuestionsAPI + '/' + id) //api
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
