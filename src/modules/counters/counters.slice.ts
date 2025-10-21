import { createAction, createReducer } from "@reduxjs/toolkit";
import { AppState } from "../../store";

type CounterState = {
  counter: number;
};
export type CounterId = string;

type CountersState = Record<CounterId, CounterState | undefined>;

export const IncrementAction = createAction<{
  counterId: CounterId;
}>("counters/increment");

export const DecrementAction = createAction<{
  counterId: CounterId;
}>("counters/decrement");

const initialCountersState: CountersState = {};

export const countersReducer = createReducer(
  initialCountersState,
  (builder) => {
    builder.addCase(IncrementAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) {
        state[counterId] = { counter: 0 };
      }
      state[counterId].counter++;
    });
    builder.addCase(DecrementAction, (state, action) => {
      const { counterId } = action.payload;
      if (!state[counterId]) {
        state[counterId] = { counter: 0 };
      }
      state[counterId].counter--;
    });
    // default уже по-умолчанию
  }
);

export const selectCounter = (state: AppState, counterId: CounterId) =>
  state.counters[counterId];
