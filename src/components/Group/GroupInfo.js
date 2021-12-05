import {useEffect, useState} from 'react';
import './GroupInfo.css';
import styled from 'styled-components';

import {Link} from 'react-router-dom';

import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';

import {UsersAPI, GroupsAPI} from '../../APILink';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 16px;
  letter-spacing: 1.4px;
  '&:hover': {
    text-decoration: none;
  }
`;

const GroupInfo = (props) => {
  const [User, setUser] = useState();

  useEffect(() => {
    fetch(UsersAPI + '/' + props.data.user_id) //api
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
      });
  }, []);

  const DeleteGroup = (id) => {
    fetch(GroupsAPI + '/' + id, {
      method: 'DELETE',
    }) //api
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

  const Delete = async (id, name) => {
    if (
      await fetch(GroupsAPI + '/' + id + '/books')
        .then((res) => res.json())
        .then((json) => {
          return json.length > 0 ? true : false;
        })
    ) {
      alert('Bookが登録されているため、削除できませんでした。');
      return;
    }
    if (confirm('グループ名：' + name + ' 本当に削除しますか？')) {
      DeleteGroup(id);
    }
  };

  return (
    <Card className='GroupInfoFrame'>
      <div className='GroupInfoGrid'>
        <div>
          <span className='elementName'>グループ名</span>
          {props.data.name}
        </div>
        <div>
          <span className='elementName'>作成者</span>
          {User ? User.name : ''}
        </div>
        <div>
          <span className='elementName'>アクセスキー</span>
          {props.data.access_key}
        </div>
        <div>
          <span className='elementName'>作成日</span>
          {props.data.created_at}
        </div>
      </div>

      <div className='GroupInfoLinkGrid'>
        <div className='GroupInfoDeleteButtonFrame'>
          <Button
            variant='contained'
            color='secondary'
            className='GroupInfoDeleteButton'
            onClick={() => Delete(props.data.group_id, props.data.name)}
          >
            削除する
          </Button>
        </div>
        <div className='GroupInfoDetailButtonFrame'>
          <StyledLink to={'/group/detail/'.concat(props.data.group_id)}>
            <Button variant='contained' color='primary' className='GroupInfoDetailButton'>
              詳細を見る
            </Button>
          </StyledLink>
        </div>
      </div>
    </Card>
  );
};

export default GroupInfo;
