
---

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
