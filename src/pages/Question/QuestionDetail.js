import {useEffect, useState} from 'react';
import styled from 'styled-components';
import parse, {domToReact} from 'html-react-parser';
import {getQuestion} from '../../components/API/QuestionAPIs';
import {useParams} from 'react-router';

import {PageTitle, PageSubTitle} from '../../components/Utilities/Title';
import {Label} from '../../components/Utilities/Card/Label';
import {CodeBoard} from '../../components/Utilities/Card/CodeBoard';
import {QuestionBoard} from '../../components/Utilities/Card/QuestionBoard';
import {DetailCard, DetailCardContent} from '../../components/Cards/DetailCard';
import {AnswerCard} from '../../components/Cards/AnswerCard';

const replace = (node) => {
  if (node.children !== undefined && node.children.length > 0) {
    let child = <div>{node.children.map((children) => replace(children))}</div>;
    if (node.name === 'p') {
      return domToReact(child);
    } else if (node.type === 'text') {
      return domToReact(<QuestionText>{}</QuestionText>);
    }
  }
  if (node.type === 'text') {
    return <QuestionText>{node.data}</QuestionText>;
  }

  if (node.name === 'img') {
    return <QuestionImage src={node.attribs.src} />;
  }
  return domToReact(node);
};

const QuestionImage = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: auto;
  margin: 20px 0;
  border: 1px solid #111111;
  @media screen and (max-width: 600px) {
    width: 100%;
  }

  @media screen and (min-width: 1500px) {
    width: 70%;
  }
`;

const QuestionText = styled.div`
  font-size: 1.5rem;
  line-height: 2;
`;

const QuestionCardView = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  @media screen and (max-width: 800px) {
    width: 95%;
  }
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 30px;

  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(2, max-content);
    justify-content: space-evenly;
  }
`;

const QuestionDetail = () => {
  const param = useParams();
  const [questionData, setQuestionData] = useState();
  useEffect(() => {
    getQuestion(param['id'])
      .then((json) => {
        setQuestionData(json);
        console.log(json);
      })
      .then(() => {});
  }, []);
  return (
    <div>
      <PageTitle color='blue'>問題詳細</PageTitle>
      <DetailCard>
        {questionData && (
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
              <div>
                <Label>学習言語</Label>
                {questionData.card_question.language}
              </div>
              <div>
                <Label>解答時間</Label>
                <span>
                  {Math.trunc(questionData.time_limit / 60)}分{questionData.time_limit % 60}秒
                </span>
              </div>
              <div>
                <Label>実行時間制限</Label>
                {questionData.card_question.max_exec_time} sec
              </div>
              <div>
                <Label>行数制限</Label>
                {questionData.number_limit}行
              </div>
              <div>
                <Label>ヒント</Label>
                {questionData.card_question.hint_type}
              </div>
            </DetailCardContent>

            <PageSubTitle color='blue'>問題内容</PageSubTitle>
            <CodeBoard code={questionData.card_question.base_code} />
            <QuestionBoard>{parse(questionData.card_question.explain, {replace})}</QuestionBoard>

            <PageSubTitle color='red'>選択肢・解答</PageSubTitle>
            <QuestionCardView>
              {questionData &&
                questionData.card_question.card
                  .sort((a, b) => {
                    if (a.loc.line >= b.loc.line) {
                      return 1;
                    } else {
                      return -1;
                    }
                  })
                  .map((card, index) => {
                    return (
                      <AnswerCard
                        line={card.loc.line}
                        options={card.option}
                        answer={
                          questionData.card_question.correct_blank[index]
                            ? questionData.card_question.correct_blank[index]
                            : -1
                        }
                      />
                    );
                  })}
            </QuestionCardView>
          </div>
        )}
      </DetailCard>
    </div>
  );
};

export default QuestionDetail;
