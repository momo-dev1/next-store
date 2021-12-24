import { fetchJson } from "../../lib/api";
async function handleUser(req, res) {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const user = await fetchJson("http://localhost:1337/users/me", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    res.status(200).json({ id: user.id, name: user.username });
  } catch (err) {
    res.status(401).end();
  }
}
export default handleUser;
