import * as userService from '../services/userService';

export default {
    namespace: 'user',
    state:{
        list:[],
    },

    reducers:{
        save(state,{payload:{data:list}}){
            return {...state,list};
        },
    },

    effects:{
        *fetch({state},{select,call,put}){
            const result = yield call(userService.queryAll,{});
            const {data} =result;
            console.log('fetch:'+JSON.stringify(data));
            yield put({type:'save',payload:{data}});
            const  user = yield select(state => state.user);
            console.log(JSON.stringify(user));
        }
    },


    subscriptions:{
        setup({dispatch,history}){
            return history.listen(({pathname})=>{
                if(pathname ==='/user'){
                    dispatch({type: 'fetch'});
                }
            })
        }
    }
}