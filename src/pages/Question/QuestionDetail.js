import {useEffect, useState} from 'react';
import styled from 'styled-components';
import parse, {domToReact} from 'html-react-parser';
import {getQuestion} from '../../components/API/QuestionAPIs';
import {useParams} from 'react-router';

import {PageTitle, PageSubTitle} from '../../components/Utilities/Title';
import {Label} from '../../components/Utilities/Card/Label';
import {CodeBoard} from '../../components/Utilities/Card/CodeBoard';
import {DetailCard, DetailCardContent, DetailCardQuestionView} from '../../components/Cards/DetailCard';

const replace = (node) => {
  if (node.children !== undefined && node.children.length > 0) {
    let child = <div>{node.children.map((children) => replace(children))}</div>;
    if (node.name === 'p') {
      return domToReact(child);
    } else if (node.type === 'text') {
      return domToReact(node.children);
    }
  }

  if (node.name === 'img') {
    console.log(node);
    return <QuestionImage src={node.attribs.src} />;
  }
  return domToReact(node);
};

const QuestionImage = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: auto;

  @media screen and (max-width: 600px) {
    width: 100%;
  }

  @media screen and (min-width: 1500px) {
    width: 70%;
  }
`;

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
          <div>
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
            </DetailCardContent>
            <PageSubTitle>問題内容</PageSubTitle>
            <CodeBoard code={questionData.card_question.base_code} />
            <DetailCardQuestionView>{parse(questionData.card_question.explain, {replace})}</DetailCardQuestionView>
          </div>
        ) : (
          ''
        )}
      </DetailCard>
    </div>
  );
};

export default QuestionDetail;
