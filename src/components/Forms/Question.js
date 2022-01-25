import styled from 'styled-components';

import {Form, Field} from 'react-final-form';
import {PrimaryButton} from '../Buttons/PrimaryButton';

const StyledForm = styled.form`
  width: 80%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const InputBox = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  grid-column-gap: 30px;
  padding-bottom: 30px;
  font-size: 20px;
`;

const InputLabel = styled.label`
  align-self: center;
  margin: 0;
`;

const onSubmit = (data) => {
  console.log('result:', data);
};

/* 空欄補充形式の問題作成フォーム */
export const CreateBlankSelectQuestionForm = () => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValue={{
        name: '',
        format: '',
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
            <Field name='name' type='text' component='input' label='name' />
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
