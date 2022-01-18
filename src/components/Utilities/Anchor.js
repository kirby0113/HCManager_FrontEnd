import styled from 'styled-components';

import {Link} from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 16px;
  letter-spacing: 1.4px;
  '&:hover': {
    text-decoration: none;
  }
`;

export const Anchor = (props) => {
  return <StyledLink to={props.to}>{props.children}</StyledLink>;
};
