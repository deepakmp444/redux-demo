const redux = require("redux");
const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTORED = "CAKE_RESTORED";

function orderedCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

function restoredCake(qty = 1) {
  return {
    type: CAKE_RESTORED,
    payload: qty,
  };
}

const initialState = {
  numberOfCake: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfCake: state.numberOfCake - action.quantity,
      };
    case CAKE_RESTORED:
      return {
        ...state,
        numberOfCake: state.numberOfCake + action.payload,
      };
    default:
      return state;
  }
};

// const store = createStore(counter)
const store = createStore(reducer);
console.log("Initial State ", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updating Store", store.getState())
);

// when you use bindActionCreators then you don't use store.dispatch(orderedCake());
const actions = bindActionCreators({orderedCake, restoredCake}, store.dispatch)
actions.orderedCake()
actions.restoredCake(3)

// store.dispatch(orderedCake());
// store.dispatch(orderedCake());
// store.dispatch(orderedCake());
// store.dispatch(restoredCake(3));

unsubscribe();

