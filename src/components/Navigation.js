import styled from 'styled-components';

import {Link} from 'react-router-dom';

import {MenuItem, Drawer} from 'material-ui';

import './Navigation.css';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 16px;
  letter-spacing: 1.4px;
  '&:hover': {
    text-decoration: none;
  }
`;

const Navigation = (props) => {
  return (
    //   <nav className="Navigation">
    //     <ul className="NavigationList">
    //     <StyledLink to="/">
    //         <li className="NavigationUnit">
    //             <span >TOP</span>
    //         </li>
    //       </StyledLink>
    //       <StyledLink to="/group">
    //         <li className="NavigationUnit">
    //             <span >グループ一覧</span>
    //         </li>
    //       </StyledLink>
    //       <StyledLink to="/users">
    //         <li className="NavigationUnit">
    //             <span >ユーザ一覧</span>
    //         </li>
    //       </StyledLink>
    //       <StyledLink to="/questions">
    //         <li className="NavigationUnit">
    //             <span >問題一覧</span>
    //         </li>
    //       </StyledLink>
    //       <StyledLink to="/teachingMaterials">
    //         <li className="NavigationUnit">
    //             <span >教材一覧</span>
    //         </li>
    //       </StyledLink>
    //     </ul>
    // </nav>
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
