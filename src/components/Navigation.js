import {Anchor} from './Utilities/Anchor';

import {MenuItem, Drawer} from 'material-ui';

const Navigation = (props) => {
  return (
    <Drawer docked={false} width={200} open={props.open} onRequestChange={() => props.setOpenNavigation(false)}>
      <Anchor to='/' onClick={() => props.setOpenNavigation(false)}>
        <MenuItem>TOP</MenuItem>
      </Anchor>

      <Anchor to='/group' onClick={() => props.setOpenNavigation(false)}>
        <MenuItem>グループ一覧</MenuItem>
      </Anchor>

      <Anchor to='/users' onClick={() => props.setOpenNavigation(false)}>
        <MenuItem>ユーザー覧</MenuItem>
      </Anchor>

      <Anchor to='/questions' onClick={() => props.setOpenNavigation(false)}>
        <MenuItem>問題一覧</MenuItem>
      </Anchor>

      <Anchor to='/teachingMaterials' onClick={() => props.setOpenNavigation(false)}>
        <MenuItem>教材一覧</MenuItem>
      </Anchor>
    </Drawer>
  );
};

export default Navigation;
