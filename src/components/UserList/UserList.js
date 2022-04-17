import React from 'react';
import List from '@material-ui/core/List';
import {UserListItem} from "./UserListItem";
import avatar from '../../assets/images/avatars/man-with-beard.svg';

export const UserList = ({users}) => {
    return <List>
        {users.map((user, index) => <UserListItem
                key={user.id}
                username={user.name}
                avatar={avatar}
                score={user.score}
                hasDivider={index + 1 !== users.length}
            />
        )}
    </List>
}
