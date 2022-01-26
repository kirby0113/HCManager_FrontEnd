import styled, {css} from 'styled-components';

import {Form, Field} from 'react-final-form';
import {PrimaryButton} from '../Buttons/PrimaryButton';

const StyledForm = styled.form`
  width: 80%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const InputBox = styled.div`
  display: ${({hidden}) => (hidden ? 'none' : 'grid')};
  grid-template-columns: 180px 1fr;
  align-items: center;
  grid-column-gap: 30px;
  padding-bottom: 30px;
  font-size: 20px;
`;

const StyledField = styled(Field)`
  ${({component}) =>
    (component === 'input' || component === 'select') &&
    css`
      height: 40px;
    `}
`;

const InputLabel = styled.label`
  align-self: center;
  justify-self: end;
  margin: 0;
`;

const Option = styled.option`
  font-size: 20px;
`;

const onSubmit = (data) => {
  console.log('result:', data);
};

/* 空欄補充形式の問題作成フォーム */
export const CreateBlankSelectQuestionForm = (props) => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        name: '',
        format: 'blank_select',
        user_id: '',
        mode: '',
        time_limit: '',
        number_limit: '',
        explain: '',
        language: '',
        base_code: '',
        select_blank: '',
        correct_blank: '',
        stdinout: '',
        hint_type: '',
        max_exec_time: '',
      }}
      render={({handleSubmit}) => (
        <StyledForm onSubmit={handleSubmit}>
          <InputBox>
            <InputLabel label='name'>問題名：</InputLabel>
            <StyledField name='name' type='text' component='input' label='name' />
          </InputBox>

          <InputBox hidden={true}>
            <InputLabel label='format'>フォーマット：</InputLabel>
            <StyledField name='format' type='text' component='input' label='format' />
          </InputBox>

          <InputBox>
            <InputLabel label='user_id'>作成者：</InputLabel>
            <StyledField name='user_id' component='select' label='user_id'>
              <Option value='' key=''>
                ユーザを選択してください
              </Option>
              {props.users &&
                props.users.map((data) => (
                  <option value={data.user_id} key={data.user_id}>
                    {data.name}
                  </option>
                ))}
            </StyledField>
          </InputBox>

          <InputBox>
            <InputLabel label='mode'>問題モード：</InputLabel>
            <StyledField name='mode' component='select' label='mode'>
              <Option value='' key=''>
                モードを選択してください
              </Option>

              <Option value='演習モード' key='演習モード'>
                演習モード
              </Option>

              <Option value='テストモード' key='テストモード'>
                テストモード
              </Option>

              <Option value='リアルタイムモード' key='リアルタイムモード'>
                リアルタイムモード
              </Option>
            </StyledField>
          </InputBox>

          <div>
            <PrimaryButton sizeX='large' sizeY='small' onClick={handleSubmit}>
              作成
            </PrimaryButton>
          </div>
        </StyledForm>
      )}
    />
  );
};
