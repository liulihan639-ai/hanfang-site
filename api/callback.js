// Vercel Serverless Function - GitHub OAuth callback
// Exchanges code for access token and redirects back to Decap CMS
export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Missing code parameter" });
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: "GitHub OAuth credentials not configured" });
  }

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      return res.status(400).json({ error: data.error_description || data.error });
    }

    // Redirect back to Decap CMS with the token
    const redirectUrl = state
      ? `https://${process.env.VERCEL_URL || req.headers.host}/admin/#/settings/repo?access_token=${data.access_token}&state=${state}`
      : `https://${process.env.VERCEL_URL || req.headers.host}/admin/#/settings/repo?access_token=${data.access_token}`;

    res.redirect(redirectUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
