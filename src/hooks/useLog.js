import {useContext} from 'react';
import {getLogs as getLogsAPI} from '../components/API/LogAPIs';
import {ErrorContext} from '../contexts/ErrorContext';
import {LogContext} from '../contexts/LogContext';

export const useLog = () => {
  const {logs, setLogs, selectLog, setSelectLog} = useContext(LogContext);
  const {setError, setIsOpenError} = useContext(ErrorContext);

  const getLogs = async () => {
    return await getLogsAPI().then((json) => {
      if (json.status === 'fail') {
        setIsOpenError(true);
        setError(json.content);
      } else {
        setLogs(json.content);
      }
      return json;
    });
  };

  return {logs, setLogs, selectLog, setSelectLog, getLogs};
};
