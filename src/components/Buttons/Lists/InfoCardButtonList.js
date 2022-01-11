import styled from 'styled-components';

const StyledInfoCardButtonList = styled.div`
  border-top: solid 0.5px rgb(132, 173, 235);
  padding: 25px 0px;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  justify-content: space-evenly;

  @media screen and (max-width: 450px) {
    grid-template-columns: max-content;
    grid-row-gap: 10px;
  }
`;

export const InfoCardButtonList = (props) => {
  return <StyledInfoCardButtonList>{props.children}</StyledInfoCardButtonList>;
};
