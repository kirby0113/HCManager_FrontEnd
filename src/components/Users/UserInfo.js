import "./UserInfo.css";

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


const UserInfo = (props) => {

    return (
        <TableRow
        key={props.data.UserName}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell component="th" scope="row">
            {props.data.UserName}
        </TableCell>
        <TableCell align="center">{props.data.Email}</TableCell>
        <TableCell align="center">{props.data.Authority}</TableCell>
        <TableCell align="center">変更</TableCell>
        <TableCell align="center">削除</TableCell>
        </TableRow>
    )
}

export default UserInfo;