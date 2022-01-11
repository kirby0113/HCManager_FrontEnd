import styled from 'styled-components';

import {Link} from 'react-router-dom';

import {MenuItem, Drawer} from 'material-ui';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 16px;
  letter-spacing: 1.4px;
  &:hover {
    text-decoration: none;
  }
`;

const Navigation = (props) => {
  return (
    <Drawer docked={false} width={200} open={props.open} onRequestChange={() => props.setOpenNavigation(false)}>
      <StyledLink to='/' onClick={() => props.setOpenNavigation(false)}>
        <MenuItem>TOP</MenuItem>
      </StyledLink>

      <StyledLink to='/group' onClick={() => props.setOpenNavigation(false)}>
        <MenuItem>グループ一覧</MenuItem>
      </StyledLink>

      <StyledLink to='/users' onClick={() => props.setOpenNavigation(false)}>
        <MenuItem>ユーザー覧</MenuItem>
      </StyledLink>

      <StyledLink to='/questions' onClick={() => props.setOpenNavigation(false)}>
        <MenuItem>問題一覧</MenuItem>
      </StyledLink>

      <StyledLink to='/teachingMaterials' onClick={() => props.setOpenNavigation(false)}>
        <MenuItem>教材一覧</MenuItem>
      </StyledLink>
    </Drawer>
  );
};

export default Navigation;
