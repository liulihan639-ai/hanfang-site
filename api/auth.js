// Vercel Serverless Function - GitHub OAuth entry point
// Redirects to GitHub's OAuth authorization page
export default function handler(req, res) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return res.status(500).json({ error: "GITHUB_OAUTH_CLIENT_ID not configured" });
  }

  const redirectUri = process.env.OAUTH_REDIRECT_URI || `https://${req.headers.host}/api/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo,user",
    state: req.query.state || "",
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}
