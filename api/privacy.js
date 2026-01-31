export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - Benefique Client Monitor</title>
    <style>
        body {font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 900px; margin: 0 auto; padding: 20px;}
        h1 {color: #003057; font-size: 2.5rem; margin-bottom: 0.5rem;}
        h2 {color: #003057; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;}
        h3 {color: #666; font-size: 1.2rem; margin-top: 1.5rem;}
        p {margin-bottom: 1rem;}
        ul {margin-bottom: 1rem; padding-left: 2rem;}
        li {margin-bottom: 0.5rem;}
        a {color: #FF6B35; text-decoration: none;}
        .subtitle {color: #666; font-size: 1.2rem;}
        .date {color: #888; margin-bottom: 2rem;}
    </style>
</head>
<body>
    <h1>Privacy Policy</h1>
    <h2 class="subtitle">Benefique Client Monitor</h2>
    <p class="date">Effective Date: January 23, 2026</p>
    <p>This Privacy Policy explains how <strong>Benefique Capital LLC</strong> ("Benefique," "we," "us," or "our") collects, uses, stores, and protects information in connection with <strong>Benefique Client Monitor</strong> (the "Service").</p>
    <h2>1. Scope</h2>
    <p>This Policy applies to the Service and related web pages. It does not apply to third-party platforms you connect, including QuickBooks Online, which are governed by their own privacy policies.</p>
    <h2>2. Information we collect</h2>
    <h3>A. QuickBooks Online data</h3>
    <p>With your authorization, the Service accesses <strong>read-only</strong> data from QBO, which may include:</p>
    <ul><li>Company and account metadata</li><li>Chart of accounts</li><li>Transaction data and summaries (e.g., invoices, bills, payments, deposits, journal entries)</li><li>Customer and vendor information</li><li>Financial reports (e.g., Profit & Loss, Balance Sheet, A/R and A/P aging)</li></ul>
    <p>We access only data necessary to provide monitoring, reporting, and analytics.</p>
    <h3>B. User-provided information</h3>
    <p>We may collect contact and account information such as name, email address, role, and configuration settings related to your use of the Service.</p>
    <h3>C. Technical information</h3>
    <p>We may collect limited technical data (e.g., IP address, device type, usage logs) for security, diagnostics, and performance optimization.</p>
    <h2>3. How information is used</h2>
    <p>Information is used to:</p>
    <ul><li>Provide dashboards, reports, and analytics</li><li>Maintain and improve Service reliability and performance</li><li>Support client service and troubleshooting</li><li>Comply with legal and regulatory obligations</li></ul>
    <h2>4. Data storage and retention</h2>
    <p>Certain QBO data may be <strong>stored in a database</strong> to support:</p>
    <ul><li>Historical trend analysis</li><li>Performance optimization and reliability</li><li>Consistency of reporting outputs</li></ul>
    <p>Data is retained only as long as reasonably necessary to provide the Service, meet client support needs, or comply with legal or operational requirements.</p>
    <h2>5. Data sharing</h2>
    <p>Benefique does <strong>not</strong> sell client data or personal information.</p>
    <p>Data may be shared only with:</p>
    <ul><li>Service providers acting on our behalf under confidentiality obligations</li><li>Authorized users within your organization</li><li>Legal or regulatory authorities when required by law</li><li>Other parties with your explicit instruction or consent</li></ul>
    <h2>6. Security</h2>
    <p>We employ reasonable administrative, technical, and organizational safeguards to protect information. No system can guarantee absolute security.</p>
    <h2>7. Your rights and choices</h2>
    <p>You may request:</p>
    <ul><li>Information about data associated with your account</li><li>Deletion of stored data associated with your organization, subject to legal or operational retention requirements</li></ul>
    <p>Requests can be made by contacting <a href="mailto:hello@benefique.com">hello@benefique.com</a>.</p>
    <h2>8. Disconnecting QuickBooks Online</h2>
    <p>If QBO access is disconnected, the Service will stop retrieving new data. Previously stored data may remain for the retention period described above unless deletion is requested.</p>
    <h2>9. Children's privacy</h2>
    <p>The Service is not intended for children under the age of 13.</p>
    <h2>10. Updates to this Policy</h2>
    <p>We may update this Policy periodically. The "Effective Date" reflects the most current version.</p>
    <h2>11. Contact</h2>
    <p>Privacy questions or requests:</p>
    <p><strong>Benefique Capital LLC</strong><br>Email: <a href="mailto:hello@benefique.com">hello@benefique.com</a></p>
</body>
</html>`);
}
