import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  type TypedUseSelectorHook,
  useSelector,
  useStore,
} from "react-redux";

type CounterState = {
  counter: number;
};

export type CounterId = string;

export type State = {
  counters: Record<CounterId, CounterState | undefined>;
};

export type ActionIncrement = {
  type: "increment";
  payload: {
    counterId: CounterId;
  };
};

export type ActionDecrement = {
  type: "decrement";
  payload: {
    counterId: CounterId;
  };
};

type Action = ActionIncrement | ActionDecrement;

const initialCounterState: CounterState = { counter: 0 };
const initialState: State = {
  counters: {},
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "increment": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] ?? initialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter + 1,
          },
        },
      };
    }
    case "decrement": {
      const { counterId } = action.payload;
      const currentCounter = state.counters[counterId] ?? initialCounterState;
      return {
        ...state,
        counters: {
          ...state.counters,
          [counterId]: {
            ...currentCounter,
            counter: currentCounter.counter - 1,
          },
        },
      };
    }
    default:
      return state;
  }
};

export const store = configureStore({
  reducer,
});

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppStore = () => useStore<typeof store>();
