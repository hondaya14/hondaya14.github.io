import Script from "next/script";

export default function GoogleAnalytics() {
  return (
    <>
      {/* Google Analytics測定 ID を設定 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-0W3H4TWTKW`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0W3H4TWTKW');
        `}
      </Script>
    </>
  );
}
