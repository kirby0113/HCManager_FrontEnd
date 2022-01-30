import {useEffect, useState} from 'react';
import {UsersAPI, BooksAPI} from '../../../APILink';

import {Anchor} from '../../Utilities/Anchor';

import {PrimaryButton} from '../../Buttons/PrimaryButton';
import {Label} from '../../Utilities/Card/Label';
import {InfoCard, InfoCardDetail, InfoCardButtons} from '../../Cards/InfoCard';

/* TM = TeachingMaterial */

const BookInfo = (props) => {
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
    <InfoCard>
      <InfoCardDetail>
        <div>
          <Label>教材名</Label>
          {props.data.name}
        </div>
        <div>
          <Label>作成者</Label>
          {user ? user.name : ''}
        </div>
        <div>
          <Label>アクセスキー</Label>
          {props.data.access_key}
        </div>
        <div>
          <Label>作成日</Label>
          {props.data.created_at}
        </div>
      </InfoCardDetail>
      <InfoCardButtons>
        <PrimaryButton color='secondary' onClick={() => Delete(props.data.book_id, props.data.name)}>
          削除する
        </PrimaryButton>
        <Anchor to={'/book/detail/'.concat(props.data.book_id)}>
          <PrimaryButton>詳細を見る</PrimaryButton>
        </Anchor>
      </InfoCardButtons>
    </InfoCard>
  );
};

export default BookInfo;
