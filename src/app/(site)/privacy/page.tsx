// References:
// - Google Analytics Terms of Service: https://marketingplatform.google.com/about/analytics/terms/jp/
// - "How Google uses information from sites or apps that use our services": https://policies.google.com/technologies/partner-sites
// - Google AdSense Required content: https://support.google.com/adsense/answer/1348695

import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | hondaya.co",
  description: "Privacy policy for hondaya.co",
};

export default function PrivacyPage() {
  return (
    <div className="reading-page">
      <div className="prose privacy-content">
        <h1 className="page-title">Privacy Policy</h1>

        <p>
          This website (hondaya.co) may use cookies, web beacons, IP addresses, and other
          identifiers for site improvement, access analytics, and advertising delivery. The
          information collected is handled as statistical information that does not directly
          identify individuals.
        </p>

        <h2>Google Analytics</h2>
        <p>
          This website uses Google Analytics, an access analytics tool provided by Google. Google
          Analytics uses cookies to collect traffic data. The collected data is used to analyze and
          improve how this website is used.
        </p>
        <p>
          For details about how Google uses data, please see the Google page about how information
          from sites or apps using Google services is used. You can disable cookies through your
          browser settings.
        </p>

        <h2>Google AdSense</h2>
        <p>
          This website uses Google AdSense, a third-party advertising service. Third-party vendors,
          including Google, may use cookies to serve ads based on prior visits by users to this
          website or other websites.
        </p>
        <p>
          The use of advertising cookies by Google enables Google and its partners to serve ads
          based on visits to this website and other sites on the internet. As part of ad delivery,
          third-party vendors and ad networks may place or read cookies on a user browser, or use
          web beacons, IP addresses, and similar technologies to collect information.
        </p>
        <p>
          Users can opt out of personalized advertising through Google Ads Settings. Some
          personalized advertising that uses cookies from third-party vendors can also be disabled
          through the Network Advertising Initiative opt-out page.
        </p>

        <h2>Contact</h2>
        <p>For questions about this policy, please contact nqvno14[at]gmail.com.</p>

        <h2>Related Links</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Terms of Service
            </Link>
          </li>
          <li>
            <Link
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
            >
              How Google uses information from sites or apps that use our services
            </Link>
          </li>
          <li>
            <Link
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google advertising and privacy policies
            </Link>
          </li>
          <li>
            <Link href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </Link>
          </li>
          <li>
            <Link href="https://thenai.org/opt-out/" target="_blank" rel="noopener noreferrer">
              Network Advertising Initiative Opt Out
            </Link>
          </li>
        </ul>
        <p>By using this website, you are deemed to have agreed to the terms above.</p>
      </div>
    </div>
  );
}
