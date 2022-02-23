import {useEffect} from 'react';
import {useContext} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';
import {DetailCard, DetailCardContent, DetailCardSummary, DetailCardButtons} from '../components/Cards/DetailCard';
import {Breadcrumbs} from '../components/Breadcrumbs';
import {AuthContext} from '../contexts/AuthContext';
import {PageTitle} from '../components/Utilities/Title';
import {Label} from '../components/Utilities/Card/Label';
import {useState} from 'react';
import {PrimaryButton} from '../components/Buttons/PrimaryButton';

const ButtonContent = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
`;

const LoginUser = () => {
  const {authData} = useContext(AuthContext);

  const [onEdit, setOnEdit] = useState(false);

  const onSave = () => {
    setOnEdit(false);
  };

  if (!authData) {
    return <Redirect to='/' />;
  }

  useEffect(() => {
    console.log(authData);
  });

  return (
    <div>
      <PageTitle>ユーザーページ</PageTitle>
      <Breadcrumbs />
      <DetailCard>
        {onEdit ? (
          ''
        ) : (
          <DetailCardContent>
            <div>
              <Label>ユーザーID</Label>
              {authData.user_id}
            </div>
            <div>
              <Label>ユーザー名</Label>
              {authData.name}
            </div>
            <div>
              <Label>メールアドレス</Label>
              {authData.mail}
            </div>
            <div>
              <Label>権限</Label>
              {authData.role}
            </div>
          </DetailCardContent>
        )}
        {onEdit ? (
          <ButtonContent>
            <PrimaryButton
              color='primary'
              sizeX='large'
              sizeY='small'
              onClick={() => {
                onSave();
              }}
            >
              保存
            </PrimaryButton>
          </ButtonContent>
        ) : (
          <ButtonContent>
            <PrimaryButton
              color='secondary'
              sizeX='large'
              sizeY='small'
              onClick={() => {
                setOnEdit(true);
              }}
            >
              編集する
            </PrimaryButton>
          </ButtonContent>
        )}
      </DetailCard>
    </div>
  );
};

export default LoginUser;
