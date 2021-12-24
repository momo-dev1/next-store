import cookie from "cookie";
import { fetchJson } from "../../lib/api";
async function handleLogin(req, res) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { email, password } = req.body;
  try {
    const { jwt, user } = await fetchJson("http://localhost:1337/auth/local", {
      method: "POST",
      body: JSON.stringify({
        identifier: email,
        password: password,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });
    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", jwt, {
          path: "/api",
          httpOnly: true,
        })
      )
      .json({ id: user.id, name: user.username });
  } catch (error) {
    res.status(401).end(); //401 = unAuth
  }
}
export default handleLogin;
