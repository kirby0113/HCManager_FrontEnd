import {Breadcrumbs} from '../../../components/Breadcrumbs';
import {CreateBlankSelectQuestionForm} from '../../../components/Forms/Question';
import {PageTitle} from '../../../components/Utilities/Title';
import {useUser} from '../../../hooks/useUser';

const CreateBlankQuestion = () => {
  const {users} = useUser();
  return (
    <div>
      <PageTitle>空欄補充問題作成</PageTitle>
      <Breadcrumbs />
      <CreateBlankSelectQuestionForm users={users} />
    </div>
  );
};

export default CreateBlankQuestion;
