import React from 'react';
import {connect} from 'dva';
import UserTable from './components/UserTable';

const User =()=>{
        return ( 
            <div><UserTable/></div>
        );
    }

function mapStateToPorps(state){
    const {data} = state.user;
    return {data};
}

export default connect(mapStateToPorps)(User);