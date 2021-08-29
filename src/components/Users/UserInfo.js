import "./UserInfo.css";


const UserInfo = (props) => {

    return (
        <tr>
            <th>{props.data.UserName}</th>
            <th>{props.data.Email}</th>
            <th>{props.data.Authority}</th>
            <th>変更</th>
            <th>削除</th>
        </tr>
    )
}

export default UserInfo;