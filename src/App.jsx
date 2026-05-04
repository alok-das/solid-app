import { createSignal } from 'solid-js';
import styles from './App.module.css';

function App() {
  const [count, setCount] = createSignal(0);
  const [count2, setCount2] = createSignal(0);

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn new things in solid
        </a>
        <p class={styles.counter}>
          <button onClick={() => setCount(count() - 1)}>-</button>
          <output>{count()}</output>
          <button onClick={() => setCount(count() + 1)}>+</button>
        </p>
      </header>
    </div>
  );
}

export default App;
