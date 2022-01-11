import styled from 'styled-components';
import {Color} from '../constants/Color';

const StyledTitle = styled.span`
  text-align: left;
  font-size: 30px;
  padding: 10px 30px;
  padding-left: 15px;
  background: #f4f4f4; /*背景色*/
  border-left: solid 8px ${(props) => Color[props.color]}; /*左線*/
  border-bottom: solid 3px #d7d7d7; /*下線*/
`;

const PageTitleWrapper = styled.div`
  margin-top: 20px;
`;

export const Title = (props) => {
  return <StyledTitle color={props.color}>{props.children}</StyledTitle>;
};

export const PageTitle = (props) => {
  return (
    <PageTitleWrapper>
      <StyledTitle color={props.color}>{props.children}</StyledTitle>
    </PageTitleWrapper>
  );
};
