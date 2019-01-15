export function delay(timeout) {
  const promise = new Promise(resolve => {
    setTimeout(resolve, timeout);
  })

  return promise;
}