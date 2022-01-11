import './TeachingMaterialInfo.css';

import {useEffect, useState} from 'react';
import {UsersAPI, BooksAPI} from '../../APILink';

import Card from '@material-ui/core/Card';

import styled from 'styled-components';

import {Link} from 'react-router-dom';

import {InfoCardButtonList} from '../Buttons/Lists/InfoCardButtonList';
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

/* TM = TeachingMaterial */

const TeachingMaterialInfo = (props) => {
  const [user, setUser] = useState();

  useEffect(() => {
    fetch(UsersAPI + '/' + props.data.user_id) //api
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
      });
  }, []);

  const DeleteBook = (id) => {
    fetch(BooksAPI + '/' + id, {
      method: 'DELETE',
    }) //api
      .then(() => props.getBook());
  };

  const Delete = async (id, name) => {
    if (
      await fetch(BooksAPI + '/' + id + '/questions')
        .then((res) => res.json())
        .then((json) => {
          return json.length > 0 ? true : false;
        })
    ) {
      alert('問題が登録されているため、削除できませんでした。');
      return;
    }
    if (confirm('教材名：' + name + ' 本当に削除しますか？')) {
      DeleteBook(id);
    }
  };

  return (
    <Card className='TMInfoFrame'>
      <div className='TMInfoGrid'>
        <div>
          <span className='elementName'>教材名</span>
          {props.data.name}
        </div>
        <div>
          <span className='elementName'>作成者</span>
          {user ? user.name : ''}
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
      <InfoCardButtonList>
        <PrimaryButton color='secondary' onClick={() => Delete(props.data.book_id, props.data.name)}>
          削除する
        </PrimaryButton>
        <StyledLink to={'/TeachingMaterial/detail/'.concat(props.data.book_id)}>
          <PrimaryButton>詳細を見る</PrimaryButton>
        </StyledLink>
      </InfoCardButtonList>
    </Card>
  );
};

export default TeachingMaterialInfo;
