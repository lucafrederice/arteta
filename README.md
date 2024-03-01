
# arteta

`arteta` is a lightweight, powerful React custom hook library designed to enhance state management with actions in React applications. The core feature of this library is the `useStateAction` hook, which simplifies the process of updating state based on actions, making state management more predictable and organized.

## Features

- Simplifies state management in React components.
- Offers an easy way to define actions for state updates.
- Supports TypeScript for type safety and better development experience.

## Installation

Install `arteta` using npm or yarn:

```bash
npm install arteta
# or
yarn add arteta
```

## Usage

The `useStateAction` hook from the `arteta` package enables streamlined state management within React components, facilitating the definition of actions to update the state. Here's how you can use it in a component:

### Basic Example

```tsx
import { useStateAction } from "arteta";

function Counter() {
  const [count, createAction] = useStateAction(0);

  // Increment action: payload is required and dynamically handles payload within the callback.
  const increment = createAction({
    type: "increment",
    callback: (currentCount, payload = 1) => currentCount + payload,
  });

  // Decrement action: payload does not exist. Explicitly states there's no payload.
  const decrement = createAction<never>({
    type: "decrement",
    callback: (currentCount) => currentCount - 1,
  });

  // Reset action: payload is optional. The function can be called with or without a payload.
  const reset = createAction<undefined>({
    type: "reset",
    callback: (_, payload?: number) => payload || 0,
  });

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => increment(1)}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}
```

In this example:
- The `increment` action demonstrates how to handle a required payload dynamically within the callback function. This allows for flexible state updates based on the action's payload.
- The `decrement` action shows the use of `<never>` to indicate that this action does not accept a payload, making the state update operation simpler and more straightforward.
- The `reset` action uses `<undefined>` to signify that the payload is optional, offering the ability to reset the state to a specific value or to a default value if no payload is provided.

This example illustrates the versatility and power of the `useStateAction` hook in creating clear and concise state management logic within React components.

---
## API Reference

### `useStateAction<S>(initialState: S): [S, CreateAction<S>]`

- `initialState`: The initial state value of the component.
- Returns a stateful value, and a function to create actions.

### `createAction<P>({ type, callback }): Action`

- `type`: A string representing the action type.
- `callback`: A function that defines how the state should be updated when the action is dispatched.

## Contributing

Contributions are always welcome! Please see the [GitHub repository](https://github.com/lucafrederice/arteta) for how to contribute to `arteta`.

## License

Distributed under the MIT License. See `LICENSE` for more information.
