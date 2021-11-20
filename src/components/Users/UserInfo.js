import './UserInfo.css';

import styled from 'styled-components';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {Delete, Edit} from '@material-ui/icons';

const StyledDelete = styled(Delete)`
  color: red;
  cursor: pointer;
`;

const StyledEdit = styled(Edit)`
  color: green;
  cursor: pointer;
`;

const UserInfo = (props) => {
  return (
    <TableRow key={props.data.user_id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell component='th' scope='row'>
        {props.data.name}
      </TableCell>
      <TableCell align='center'>{props.data.mail}</TableCell>
      <TableCell align='center'>{props.data.role}</TableCell>
      <TableCell align='center'>
        <StyledEdit></StyledEdit>
      </TableCell>
      <TableCell align='center'>
        <StyledDelete></StyledDelete>
      </TableCell>
    </TableRow>
  );
};

export default UserInfo;
