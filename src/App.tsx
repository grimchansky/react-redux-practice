import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  type ActionIncrement,
  type ActionDecrement,
  type CounterId,
  useAppSelector,
  store,
  selectCounter,
} from "./store";
import { useEffect, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      <Counter counterId="first" />
      <Counter counterId="second" />
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useDispatch();
  const counterState = useAppSelector((state) =>
    selectCounter(state, counterId)
  );
  /*
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  console.log("render counter", counterId);

  const lastStateRef = useRef<ReturnType<typeof selectCounter>>();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentState = selectCounter(store.getState(), counterId);
      const lastState = lastStateRef.current;

      if (currentState !== lastState) {
        forceUpdate();
      }

      lastStateRef.current = currentState;
    });
    return unsubscribe;
  }, []);
  */

  return (
    <div className="card">
      counter {counterState?.counter}
      <button
        onClick={() =>
          dispatch({
            type: "increment",
            payload: { counterId },
          } satisfies ActionIncrement)
        }
      >
        increment
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "decrement",
            payload: { counterId },
          } satisfies ActionDecrement)
        }
      >
        decrement
      </button>
    </div>
  );
}

export default App;

export type AppState = ReturnType<typeof store.getState>;
