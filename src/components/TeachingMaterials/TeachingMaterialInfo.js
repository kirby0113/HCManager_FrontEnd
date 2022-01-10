import './TeachingMaterialInfo.css';

import {useEffect, useState} from 'react';
import {UsersAPI, BooksAPI} from '../../APILink';

import Card from '@material-ui/core/Card';

import styled from 'styled-components';

import {Link} from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 16px;
  letter-spacing: 1.4px;
  '&:hover': {
    text-decoration: none;
  }
`;

import Button from '@material-ui/core/Button';

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
      <div className='TMInfoLinkGrid'>
        <div className='TMInfoDeleteButtonFrame'>
          <Button
            variant='contained'
            color='secondary'
            className='TMInfoDeleteButton'
            onClick={() => Delete(props.data.book_id, props.data.name)}
          >
            削除する
          </Button>
        </div>
        <div className='TMInfoDetailButtonFrame'>
          <StyledLink to={'/TeachingMaterial/detail/'.concat(props.data.book_id)}>
            <Button variant='contained' color='primary' className='TMInfoDetailButton'>
              詳細を見る
            </Button>
          </StyledLink>
        </div>
      </div>
    </Card>
  );
};

export default TeachingMaterialInfo;
