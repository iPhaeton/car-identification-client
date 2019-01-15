export const buildQueryString = obj => {
  const query = Object.entries(obj)
    .map(pair => pair.map(encodeURIComponent).join('='))
    .join('&');

  return `?${query}`;
}

export async function getRequest(url, queryParams = null, options = {}) {
  const query = queryParams ? buildQueryString(queryParams) : '';
  try {
    const response = await fetch(`${url}${query}`, {method: 'GET', ...options});
    const body = await response.json();
    return body
  } catch(err) {
    console.error(err);
  }
}

export async function getPreview(filename = null) {
  const preview = await getRequest(`${process.env.REACT_APP_API}/preview`, filename ? {filename} : null);
  return preview;
}