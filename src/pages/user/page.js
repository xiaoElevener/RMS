import React from 'react';
import {connect} from 'dva';
import UserTable from './UserTable';

const User =(props)=>{
        console.log( 'props:'+JSON.stringify(props));
        const {list} =props;
        let items=[];
        return ( 
            <div><UserTable/></div>
        );
    }

function mapStateToPorps(state){
    const {list} = state.user;
    return {list};
}

export default connect(mapStateToPorps)(User);