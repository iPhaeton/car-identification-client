import {delay} from "./common";

export const buildQueryString = obj => {
  const query = Object.entries(obj)
    .map(pair => pair.map(encodeURIComponent).join('='))
    .join('&');

  return `?${query}`;
}

export async function sendRequest(url, options) {
  try {
    const response = await fetch(url, options);
    const res = await response.json();
    return res;
  } catch(err) {
    console.error(err);
  }
}

export async function getRequest(url, queryParams = null, options = {}) {
  const query = queryParams ? buildQueryString(queryParams) : '';
  return await sendRequest(`${url}${query}`, {method: 'GET', ...options});
}

export async function postRequest(url, body={}, options = {}) {
  return await sendRequest(url, {method: 'POST', body, ...options});
}

export async function getPreview(filename = null) {
  const preview = await getRequest(`${process.env.REACT_APP_API}/preview`, filename ? {filename} : null);
  return preview;
}

export async function getThumbnails(quantity = 20) {
  const thumbnails = await getRequest(`${process.env.REACT_APP_API}/thumbnails`, {quantity});
  return thumbnails;
}

export async function recognize(file) {
  if (process.env.NODE_ENV === 'production') {
    const body = new FormData();
    body.append('image', file);
    const res = await postRequest(process.env.REACT_APP_API, body);
    return res;
  } else {
    await delay(1000);
    return {
      classes: ['1', '2', '3', '4', '5'],
      probs: [1,0,0,0,0],
    }
  }
}
