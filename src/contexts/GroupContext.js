import {useState, createContext} from 'react';

export const GroupContext = createContext();

export const GroupProvider = (props) => {
  const [groups, setGroups] = useState([]);
  const [selectGroup, setSelectGroup] = useState();
  return (
    <GroupContext.Provider value={{groups: groups, setGroups, selectGroup: selectGroup, setSelectGroup}}>
      {props.children}
    </GroupContext.Provider>
  );
};
