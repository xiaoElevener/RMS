import React from 'react';
import UserTable from './components/UserTable';
import ListSearch from './components/ListSearch';

const User = () => {
    return (
        <div style={{ padding: 20 }}><ListSearch /><UserTable /></div>
    );
}



export default User;