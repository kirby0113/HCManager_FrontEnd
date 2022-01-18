import {useEffect, useState} from 'react';
import parse from 'html-react-parser';
import {getQuestion} from '../../components/API/QuestionAPIs';
import {useParams} from 'react-router';

import {PageTitle} from '../../components/Utilities/Title';
import {Label} from '../../components/Utilities/Card/Label';
import {DetailCard, DetailCardContent} from '../../components/Cards/DetailCard';

const QuestionDetail = () => {
  const param = useParams();
  const [questionData, setQuestionData] = useState();
  useEffect(() => {
    getQuestion(param['id'])
      .then((json) => {
        setQuestionData(json);
      })
      .then(() => {
        console.log(questionData);
      });
  }, []);
  return (
    <div>
      <PageTitle color='blue'>問題詳細</PageTitle>
      <DetailCard>
        {questionData ? (
          <DetailCardContent>
            <div>
              <Label>問題名</Label>
              {questionData.name}
            </div>
            <div>
              <Label>作成者</Label>
              {/* {CreatedBy ? CreatedBy : ''} */}
            </div>
            <div>
              <Label>問題形式</Label>
              {questionData.mode}
            </div>
            <div>
              <Label>作成日</Label>
              {questionData.created_at}
            </div>
            <div>{parse(questionData.card_question.explain)}</div>
          </DetailCardContent>
        ) : (
          ''
        )}
      </DetailCard>
    </div>
  );
};

export default QuestionDetail;
