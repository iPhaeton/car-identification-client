export const buildQueryString = obj => {
  const query = Object.entries(obj)
    .map(pair => pair.map(encodeURIComponent).join('='))
    .join('&');

  return `?${query}`;
}

export async function getPreview(filename = null) {
  const query = filename ? buildQueryString({filename}) : '';
  const response = await fetch(`${process.env.REACT_APP_API}/preview${query}`, {method: 'GET'});
  const body = await response.json();
  return body;
}