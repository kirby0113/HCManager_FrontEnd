import {useContext, useEffect} from 'react';
import {ErrorMessage, ErrorMessageWrapper} from '../../components/Utilities/ErrorMessage';
import {ErrorContext} from '../../contexts/ErrorContext';
import {useLog} from '../../hooks/useLog';

const LogList = () => {
  const {logs, getLogs} = useLog();
  const {error, isOpenError, setIsOpenError} = useContext(ErrorContext);

  useEffect(() => {
    getLogs().then((json) => {
      console.log(json);
    });
  }, []);

  return (
    <div>
      <div>loglist page.</div>
      <ErrorMessageWrapper isOpen={isOpenError}>
        <ErrorMessage text={error} onClose={() => setIsOpenError(false)} />
      </ErrorMessageWrapper>
    </div>
  );
};

export default LogList;
