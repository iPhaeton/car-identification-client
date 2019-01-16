export function delay(timeout) {
  const promise = new Promise(resolve => {
    setTimeout(resolve, timeout);
  })

  return promise;
}

export function map(...args) {
  const func = args[0];
  const arrays = args.slice(1);
  const results = [];

  for (let i = 0; i < arrays[0].length; i++) {
    const funcArgs = arrays.map(a => a[i]);
    results.push(func(...funcArgs));
  }

  return results;
}