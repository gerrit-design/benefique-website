// Start OAuth flow
export default function handler(req, res) {
  const clientId = process.env.QBO_CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI || 'https://app.benefique.com/api/oauth/callback';
  
  if (!clientId) {
    return res.status(500).json({ error: 'QBO_CLIENT_ID not configured' });
  }

  // Build authorization URL
  const authUrl = new URL('https://appcenter.intuit.com/connect/oauth2');
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('scope', 'com.intuit.quickbooks.accounting');
  authUrl.searchParams.append('state', 'benefique-qbo-auth');

  // Redirect to QuickBooks authorization
  res.redirect(302, authUrl.toString());
}
