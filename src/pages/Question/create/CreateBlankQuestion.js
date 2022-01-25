import {CreateBlankSelectQuestionForm} from '../../../components/Forms/Question';
import {PageTitle} from '../../../components/Utilities/Title';

const CreateBlankQuestion = () => {
  return (
    <div>
      <PageTitle>空欄補充問題作成</PageTitle>
      <CreateBlankSelectQuestionForm />
    </div>
  );
};

export default CreateBlankQuestion;
