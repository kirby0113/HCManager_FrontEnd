import styled from 'styled-components';

const StyledCardList = styled.div`
  display: grid;
  grid-template-columns: 90vw;
  justify-content: center;
  grid-row-gap: 20px;
  margin: 30px 0;
`;
export const CardList = (props) => {
  return <StyledCardList>{props.children}</StyledCardList>;
};
