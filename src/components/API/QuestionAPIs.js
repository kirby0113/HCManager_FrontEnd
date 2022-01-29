import {LaptopWindows} from '@material-ui/icons';
import {QuestionsAPI} from '../../APILink';

export const getQuestion = async (id) => {
  //id指定で1データ取る
  return await fetch(QuestionsAPI + '/' + id) //api
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

export const createQuestion = async (body) => {
  return await fetch(QuestionsAPI + '/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: body.name,
      format: body.format,
      user_id: body.user_id,
      mode: body.mode,
      time_limit: body.time_limit,
      number_limit: body.number_limit,
    }),
  })
    .then((res) => {
      if (res.errors || res.error) {
        throw new Error('QuestionCreateError');
      }
      return res.json();
    })
    .then((json) => json.question_id);
};

export const createBlankQuestion = async (body) => {
  return await createQuestion(body).then((id) => {
    return fetch(QuestionsAPI + '/' + id + '/blankselect', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        explain: body.explain,
        language: body.language,
        base_code: body.base_code,
        select_blank: body.select_blank,
        correct_blank: body.correct_blank,
        stdinout: body.stdinout,
        hint_type: body.hint_type,
        max_exec_time: body.max_exec_time,
      }),
    }).then((res) => {
      if (res.error || res.errors) {
        throw new Error('BlankQuestionCreateError');
      }
      return;
    });
  });
};
