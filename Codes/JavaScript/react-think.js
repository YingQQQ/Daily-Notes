/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */

const context = [];

function subscribe(running, subscriptions) {
  subscriptions.add(running);
  running.dependencies.add(subscriptions);
}

function createSignal(value) {
  const subscriptions = new Set();

  const read = () => {
    const running = context[context.length - 1];
    if (running) {
      subscribe(running, subscriptions);
    }
    return value;
  };
  const write = newValue => {
    value = newValue;

    for (const sub of [...subscriptions]) {
      sub.execute();
    }
  };
  return [read, write];
}

function cleanup(running) {
  for (const deps of running.dependencies) {
    deps.delete(running);
  }
  running.dependencies.clear();
}

function createEffect(fn) {
  const running = {
    // eslint-disable-next-line no-use-before-define
    execute,
    dependencies: new Set()
  };

  function execute() {
    cleanup(running);
    context.push(running);
    try {
      fn();
    } finally {
      context.pop();
    }
  }

  execute();
}
console.log("1. Create Signal");
const [count, setCount] = createSignal(0);

console.log("2. Create Reaction");
createEffect(() => console.log("The count is", count()));

console.log("3. Set count to 5");
setCount(5);

console.log("4. Set count to 10");
setCount(10);
