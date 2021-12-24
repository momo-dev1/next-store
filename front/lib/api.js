export async function fetchJson(url, option) {
  const res = await fetch(url, option);
  if (!res.ok) {
    throw new Error(`request failed : ${res.status}`);
  }
  return await res.json({});
}
