import { createStore } from "vuex";
const store= createStore({
    state:{
        token:''
    },
    mutations:{
        SET(state,value){
            state.token=value
        },
        REMOVE(state){
            state.token=''
        }
    },
    actions:{
    },
})
export default store