import {useParams} from 'react-router';

import QuestionInfo from '../Questions/QuestionInfo';

import Button from '@material-ui/core/Button';

import './TeachingMaterialDetail.css';

//とりあえずダミーデータにしてます（本来はAPIから取得）
const dummyTM = [
  {
    id: 1,
    TeachingMaterialName: 'TM1',
    createdBy: 'admin1',
    accesskey: 'test',
    date: 'dummy1',
    groupId: 1,
    overview: 'これはtestグループです。\n改行テスト',
  },
  {
    id: 2,
    TeachingMaterialName: 'TM2',
    createdBy: 'admin2',
    accesskey: 'test',
    date: 'dummy2',
    groupId: 2,
    overview: 'これはtestグループです。\n改行テスト',
  },
  {
    id: 3,
    TeachingMaterialName: 'TM3',
    createdBy: 'admin3',
    accesskey: 'test',
    date: 'dummy3',
    groupId: 3,
    overview: 'これはtestグループです。\n改行テスト',
  },
  {
    id: 4,
    TeachingMaterialName: 'TM4',
    createdBy: 'admin4',
    accesskey: 'test',
    date: 'dummy4',
    groupId: 4,
    overview: 'これはtestグループです。\n改行テスト',
  },
  {
    id: 5,
    TeachingMaterialName: 'TM5',
    createdBy: 'admin5',
    accesskey: 'test',
    date: 'dummy5',
    groupId: 5,
    overview: 'これはtestグループです。\n改行テスト',
  },
];

const dummyQuestions = [
  {
    id: 1,
    TMId: 1,
    questionName: 'question1',
    createdBy: 'admin1',
    questionType: 'test',
    date: 'dummy1',
  },
  {
    id: 2,
    TMId: 2,
    questionName: 'question2',
    createdBy: 'admin2',
    questionType: 'test',
    date: 'dummy2',
  },
  {
    id: 3,
    TMId: 3,
    questionName: 'question3',
    createdBy: 'admin3',
    questionType: 'test',
    date: 'dummy3',
  },
  {
    id: 4,
    TMId: 4,
    questionName: 'question4',
    createdBy: 'admin4',
    questionType: 'test',
    date: 'dummy4',
  },
  {
    id: 5,
    TMId: 5,
    questionName: 'question5',
    createdBy: 'admin5',
    questionType: 'test',
    date: 'dummy5',
  },
];

const TeachingMaterialDetail = () => {
  const param = useParams();
  const detail = dummyTM.find((element) => element.id == param['id']);

  return (
    <div>
      <div className='TMDetailPageTitleFrame'>
        <span className='TMDetailPageTitle'>教材詳細</span>
      </div>

      <div className='editTMDetailButtonFrame'>
        <Button variant='contained' color='secondary' className='editTMDetailButton'>
          編集
        </Button>
      </div>
      <div class='TMDetailFrame'>
        <div className='TMDetailTopGrid'>
          <div>
            <span className='elementName'>教材名</span>
            {detail.TeachingMaterialName}
          </div>
          <div>
            <span className='elementName'>作成者</span>
            {detail.createdBy}
          </div>
          <div>
            <span className='elementName'>アクセスキー</span>
            {detail.accesskey}
          </div>
          <div>
            <span className='elementName'>作成日</span>
            {detail.date}
          </div>
        </div>
        <div className='TMDetailBottom'>
          <div>
            <span className='elementName'>教材詳細情報</span>
          </div>
          <div class='TMDetailTextRange'>
            {detail.overview.split(/(\n)/).map((item) => {
              return item.match(/\n/) ? <br /> : item;
            })}
          </div>
        </div>
      </div>

      <div className='TMDetailPageTitleFrame-sub'>
        <span className='TMDetailPageTitle-sub'>教材内問題一覧</span>
      </div>

      <div className='addQuestionButtonFrame'>
        <Button variant='contained' color='primary' className='addTMButton'>
          追加
        </Button>
        <Button variant='contained' color='primary' className='addTMsButton'>
          複数追加
        </Button>
      </div>
      <div className='QuestionList'>
        {dummyQuestions
          .filter((element) => element.TMId == param['id'])
          .map((data) => (
            <QuestionInfo data={data} key={data.questionName}></QuestionInfo>
          ))}
      </div>
    </div>
  );
};

export default TeachingMaterialDetail;
