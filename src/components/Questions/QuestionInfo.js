import {useEffect, useState} from 'react';
import {UsersAPI} from '../../APILink';
import './QuestionInfo.css';

import Card from '@material-ui/core/Card';

import {InfoCardButtonList} from '../Buttons/Lists/InfoCardButtonList';
import {PrimaryButton} from '../Buttons/PrimaryButton';

const QuestionInfo = (props) => {
  const [User, setUser] = useState();

  useEffect(() => {
    fetch(UsersAPI + '/' + props.data.user_id) //api
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
      });
  }, []);

  return (
    <Card className='QuestionInfoFrame'>
      <div className='QuestionInfoGrid'>
        <div>
          <span className='elementName'>問題名</span>
          {props.data.name}
        </div>
        <div>
          <span className='elementName'>作成者</span>
          {User ? User.name : ''}
        </div>
        <div>
          <span className='elementName'>問題形式</span>
          {props.data.mode}
        </div>
        <div>
          <span className='elementName'>作成日</span>
          {props.data.created_at}
        </div>
      </div>
      <InfoCardButtonList>
        <PrimaryButton color='secondary'>削除する</PrimaryButton>
        <PrimaryButton>詳細を見る</PrimaryButton>
      </InfoCardButtonList>
    </Card>
  );
};

export default QuestionInfo;
