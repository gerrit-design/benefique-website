export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms of Service - Benefique Client Monitor</title>
    <style>
        body {font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 900px; margin: 0 auto; padding: 20px;}
        h1 {color: #003057; font-size: 2.5rem; margin-bottom: 0.5rem;}
        h2 {color: #003057; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;}
        p {margin-bottom: 1rem;}
        ul {margin-bottom: 1rem; padding-left: 2rem;}
        li {margin-bottom: 0.5rem;}
        a {color: #FF6B35; text-decoration: none;}
        .subtitle {color: #666; font-size: 1.2rem;}
        .date {color: #888; margin-bottom: 2rem;}
    </style>
</head>
<body>
    <h1>Terms of Service</h1>
    <h2 class="subtitle">Benefique Client Monitor</h2>
    <p class="date">Effective Date: January 23, 2026</p>
    <p>These Terms of Service ("Terms") govern access to and use of <strong>Benefique Client Monitor</strong> (the "Service"), operated by <strong>Benefique Capital LLC</strong> ("Benefique," "we," "us," or "our").</p>
    <p>By accessing or using the Service, you agree to these Terms.</p>
    <h2>1. Intended users</h2>
    <p>The Service is intended <strong>solely for existing clients of Benefique</strong> and authorized users designated by those clients. You represent that you have the authority to connect your organization's QuickBooks Online account and to permit Benefique to access and use the data as described in these Terms and the Privacy Policy.</p>
    <h2>2. Description of the Service</h2>
    <p>The Service provides <strong>read-only monitoring, reporting, and analytics</strong> based on data retrieved from <strong>QuickBooks Online ("QBO")</strong> and other data sources you authorize.</p>
    <p>The Service does <strong>not</strong> create, modify, or delete transactions in QBO, initiate payments, or perform any write-back actions.</p>
    <h2>3. Client responsibilities</h2>
    <p>You agree to:</p>
    <ul><li>Use the Service only for lawful business purposes</li><li>Ensure you have the right to provide and authorize access to connected data</li><li>Review outputs and reports for accuracy and appropriateness for your business</li><li>Maintain appropriate internal controls over who is authorized to view the Service</li></ul>
    <h2>4. No professional advice through the Service</h2>
    <p>Information displayed in the Service is provided for <strong>informational and monitoring purposes only</strong>. While Benefique may provide accounting, tax, or advisory services under separate engagement agreements, the Service itself does not constitute professional advice or replace formal reports, filings, or consultations.</p>
    <h2>5. Availability and changes</h2>
    <p>We may modify, suspend, or discontinue the Service (in whole or in part) at any time. We do not guarantee uninterrupted or error-free availability.</p>
    <h2>6. Data handling and security</h2>
    <p>We use reasonable safeguards to protect data handled through the Service. Details regarding data collection, storage, and retention are described in the Privacy Policy.</p>
    <h2>7. Intellectual property</h2>
    <p>All rights, title, and interest in the Service (excluding client data) are owned by Benefique or its licensors. You are granted a limited, revocable, non-transferable right to use the Service solely as permitted under these Terms.</p>
    <h2>8. Termination</h2>
    <p>Access to the Service may be suspended or terminated if:</p>
    <ul><li>You are no longer an active Benefique client</li><li>These Terms are violated</li><li>Continued access poses legal, security, or operational risk</li></ul>
    <p>Upon termination, access may be removed and data handling will follow the Privacy Policy.</p>
    <h2>9. Disclaimers</h2>
    <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, BENEFIQUE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
    <h2>10. Limitation of liability</h2>
    <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, BENEFIQUE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS INTERRUPTION ARISING OUT OF OR RELATING TO THE SERVICE.</p>
    <p>BENEFIQUE'S TOTAL LIABILITY FOR ANY CLAIM RELATING TO THE SERVICE SHALL NOT EXCEED THE FEES PAID FOR THE SERVICE DURING THE <strong>THREE (3) MONTHS</strong> PRECEDING THE EVENT GIVING RISE TO THE CLAIM.</p>
    <h2>11. Third-party services</h2>
    <p>The Service integrates with third-party platforms, including QuickBooks Online. Such platforms are governed by their own terms and policies, and Benefique is not responsible for third-party services.</p>
    <h2>12. Governing law</h2>
    <p>These Terms are governed by the laws of the State of Florida, without regard to conflict-of-law principles. Venue shall lie in Florida courts with appropriate jurisdiction.</p>
    <h2>13. Contact</h2>
    <p>Questions regarding these Terms may be directed to:</p>
    <p><strong>Benefique Capital LLC</strong><br>Email: <a href="mailto:hello@benefique.com">hello@benefique.com</a></p>
</body>
</html>`);
}
