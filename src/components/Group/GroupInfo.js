import {useEffect, useState} from 'react';
import './GroupInfo.css';
import styled from 'styled-components';

import {Link} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import {InfoCardButtonList} from '../Buttons/Lists/InfoCardButtonList';
import {Label} from '../Utilities/Card/Label';

import {UsersAPI, GroupsAPI} from '../../APILink';

import {PrimaryButton} from '../Buttons/PrimaryButton';
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
          <Label>グループ名</Label>
          {props.data.name}
        </div>
        <div>
          <Label>作成者</Label>
          {User ? User.name : ''}
        </div>
        <div>
          <Label>アクセスキー</Label>
          {props.data.access_key}
        </div>
        <div>
          <Label>作成日</Label>
          {props.data.created_at}
        </div>
      </div>

      <InfoCardButtonList>
        <PrimaryButton color='secondary' onClick={() => Delete(props.data.group_id, props.data.name)}>
          削除する
        </PrimaryButton>
        <StyledLink to={'/group/detail/'.concat(props.data.group_id)}>
          <PrimaryButton>詳細を見る</PrimaryButton>
        </StyledLink>
      </InfoCardButtonList>
    </Card>
  );
};

export default GroupInfo;
