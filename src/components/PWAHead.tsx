import React from 'react';

export default function PWAHead() {
  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <meta name="application-name" content="Yasuhisa Honda" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Yasuhisa Honda" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="apple-touch-icon" href="/fw.webp" />
      <link rel="icon" href="/next.svg" type="image/svg+xml" />
    </>
  );
}
