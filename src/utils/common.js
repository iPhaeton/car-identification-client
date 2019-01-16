import {BASE64_PREFIX} from "../constants";

function promisify(f, context = null, errorFirst = false) {
  const ctx = context || this;
  return function (...args) {
    return new Promise((resolve, reject) => {
      f.call(ctx, ...arguments, (...args) => {
        const err = arguments ? args.find((a) => a instanceof Error) : null;
        if (err) {
          reject(err);
        } else if (errorFirst) {
          resolve(args.slice(1));
        } else {
          resolve(args)
        }
      })
    });
  }
};

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
    results.push(func(...funcArgs, i));
  }

  return results;
}

function fileToBase64WithCb(file, cb) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => cb(reader.result);
  reader.onerror = err => {throw err};
}

export const fileToBase64 = promisify(fileToBase64WithCb);

export const getImageString = str => str && str.indexOf(BASE64_PREFIX) === -1 ? `${BASE64_PREFIX}${str}` : str;
