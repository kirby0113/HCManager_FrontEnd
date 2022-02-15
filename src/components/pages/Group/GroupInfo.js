import {useEffect, useState} from 'react';

import {InfoCard, InfoCardDetail, InfoCardButtons} from '../../Cards/InfoCard';
import {Label} from '../../Utilities/Card/Label';
import {PrimaryButton} from '../../Buttons/PrimaryButton';
import {UsersAPI, GroupsAPI} from '../../../APILink';
import {Anchor} from '../../Utilities/Anchor';

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
      .then((res) => res);
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
    <InfoCard>
      <InfoCardDetail>
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
      </InfoCardDetail>

      <InfoCardButtons>
        <PrimaryButton color='secondary' onClick={() => Delete(props.data.group_id, props.data.name)}>
          削除する
        </PrimaryButton>
        <Anchor to={'/group/'.concat(props.data.group_id)}>
          <PrimaryButton>詳細を見る</PrimaryButton>
        </Anchor>
      </InfoCardButtons>
    </InfoCard>
  );
};

export default GroupInfo;
