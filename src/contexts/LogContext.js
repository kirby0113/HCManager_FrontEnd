import {useState, createContext} from 'react';

export const LogContext = createContext();

export const LogProvider = (props) => {
  const [logs, setLogs] = useState([]);
  const [selectLog, setSelectLog] = useState();
  return <LogContext.Provider value={{logs, setLogs, selectLog, setSelectLog}}>{props.children}</LogContext.Provider>;
};
