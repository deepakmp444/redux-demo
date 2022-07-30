const redux = require('redux');

const createStore = redux.legacy_createStore;

const CAKE_ORDERED = "CAKE_ORDERED";

function cakeOrdered(qty = 1){
    return{
       type: CAKE_ORDERED,
       payload: qty
    }
}

const initialState = {
    cakeStock : 10
}

const cakeReducer = (state = initialState, action) =>{
    switch(action.type){
        case CAKE_ORDERED: return{
            ...state,
            cakeStock : state.cakeStock - action.payload
        }
        default: return state;
    }
}

const store = createStore(cakeReducer);

console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(()=>{
    console.log("Updated cake", store.getState());
})

store.dispatch(cakeOrdered(3));

unsubscribe();