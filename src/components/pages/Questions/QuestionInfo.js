import {useEffect, useState} from 'react';
import {UsersAPI} from '../../../APILink';

import {PrimaryButton} from '../../Buttons/PrimaryButton';
import {Label} from '../../Utilities/Card/Label';
import {InfoCard, InfoCardDetail, InfoCardButtons} from '../../Cards/InfoCard';

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
    <InfoCard>
      <InfoCardDetail>
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
      </InfoCardDetail>
      <InfoCardButtons>
        <PrimaryButton color='secondary'>削除する</PrimaryButton>
        <PrimaryButton>詳細を見る</PrimaryButton>
      </InfoCardButtons>
    </InfoCard>
  );
};

export default QuestionInfo;
