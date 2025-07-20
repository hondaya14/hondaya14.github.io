import React from 'react';

export default function PWAHead() {
  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <meta name="application-name" content="hondaya.co" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="hondaya.co" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="apple-touch-icon" href="/icon.png" />
      <link rel="icon" href="/icon.png" type="image/png" />
    </>
  );
}
