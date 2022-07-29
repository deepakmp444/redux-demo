const redux = require("redux");
const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

// Cake
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

const initialStateOfCake = {
  numberOfCake: 10,
};

const cakeReducer = (state = initialStateOfCake, action) => {
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

// Ice
const ICE_ORDERED = "ICE_ORDERED";
const ICE_RESTORED = "ICE_RESTORED";

function orderedIce() {
  return {
    type: ICE_ORDERED,
    quantity: 1,
  };
}

function restoredIce(qty = 1) {
  return {
    type: ICE_RESTORED,
    payload: qty,
  };
}

const initialStateOfIce = {
  numberOfIce: 20,
};

const iceReducer = (state = initialStateOfIce, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numberOfIce: state.numberOfIce - action.quantity,
      };
    case CAKE_RESTORED:
      return {
        ...state,
        numberOfIce: state.numberOfIce + action.payload,
      };
    default:
      return state;
  }
};

// combine two reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  ice: iceReducer,
});

// const store = createStore(counter)
const store = createStore(rootReducer);
console.log("Initial State ", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updating Store", store.getState())
);

// when you use bindActionCreators then you don't use store.dispatch(orderedCake());
const actions = bindActionCreators(
  { orderedCake, restoredCake, orderedIce, restoredIce },
  store.dispatch
);

actions.orderedCake();
actions.restoredCake(3);

actions.orderedIce();
actions.restoredIce(3);

// store.dispatch(orderedCake());
// store.dispatch(orderedCake());
// store.dispatch(orderedCake());
// store.dispatch(restoredCake(3));

unsubscribe();
