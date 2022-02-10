import {useState, createContext} from 'react';

export const PaginationContext = createContext();

export const PaginationProvider = (props) => {
  const [perPage, setPerPage] = useState(5);
  const [offset, setOffset] = useState(0);
  return (
    <PaginationContext.Provider value={{perPage: perPage, setPerPage, offset: offset, setOffset}}>
      {props.children}
    </PaginationContext.Provider>
  );
};
