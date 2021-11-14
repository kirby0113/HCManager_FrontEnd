import {useEffect, useState} from 'react';
import {UsersAPI} from '../../APILink';
import './QuestionInfo.css';

import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';

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
      <div className='QuestionInfoLinkGrid'>
        <div className='QuestionInfoDeleteButtonFrame'>
          <Button variant='contained' color='secondary' className='QuestionInfoDeleteButton'>
            削除する
          </Button>
        </div>
        <div className='QuestionInfoDetailButtonFrame'>
          <Button variant='contained' color='primary' className='QuestionInfoDetailButton'>
            詳細を見る
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuestionInfo;
