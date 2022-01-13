import {useEffect, useState} from 'react';
import {UsersAPI} from '../../APILink';
import './QuestionInfo.css';

import Card from '@material-ui/core/Card';

import {InfoCardButtonList} from '../Buttons/Lists/InfoCardButtonList';
import {PrimaryButton} from '../Buttons/PrimaryButton';
import {Label} from '../Utilities/Card/Label';

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
          <Label>問題名</Label>
          {props.data.name}
        </div>
        <div>
          <Label>作成者</Label>
          {User ? User.name : ''}
        </div>
        <div>
          <Label>問題形式</Label>
          {props.data.mode}
        </div>
        <div>
          <Label>作成日</Label>
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
