// References:
// - Google Analytics Terms of Service: https://marketingplatform.google.com/about/analytics/terms/jp/
// - "How Google uses information from sites or apps that use our services": https://policies.google.com/technologies/partner-sites
// - Google AdSense Required content: https://support.google.com/adsense/answer/1348695

import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | hondaya.co",
  description: "hondaya.co のプライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-base font-semibold mb-2 text-red-400">プライバシーポリシー</h1>

        <p className="text-gray-300">
          本サイト（hondaya.co）では、サイトの改善、アクセス解析、広告配信のために Cookie、ウェブビーコン、IP
          アドレス、その他の識別子を利用する場合があります。取得した情報は、個人を直接特定しない統計情報として扱います。
        </p>

        <h2 className="text-sm font-semibold mb-2 mt-4 text-red-400">Google Analytics について</h2>
        <p className="text-gray-300">
          本サイトでは、Google が提供するアクセス解析ツール「Google Analytics」を利用しています。Google Analytics
          は Cookie を使用してトラフィックデータを収集します。収集したデータはサイトの利用状況の分析と改善に利用します。
        </p>
        <p className="text-gray-300">
          Google によるデータの利用方法については、「Google のサービスを使用するサイトやアプリから収集した情報の利用」をご確認ください。
          Cookie はブラウザの設定により無効にできます。
        </p>

        <h2 className="text-sm font-semibold mb-2 mt-4 text-red-400">Google AdSense について</h2>
        <p className="text-gray-300">
          本サイトでは、第三者配信の広告サービス「Google AdSense」を利用しています。Google などの第三者配信事業者は、
          ユーザーが本サイトや他のサイトに過去にアクセスした情報に基づいて広告を配信するため、Cookie を使用することがあります。
        </p>
        <p className="text-gray-300">
          Google が広告 Cookie を使用することにより、Google とそのパートナーは、本サイトやインターネット上の他のサイトへのアクセス情報に基づいて、
          ユーザーに広告を配信できます。また、広告配信の結果として、第三者配信事業者や広告ネットワークがユーザーのブラウザに Cookie
          を配置・読み取りしたり、ウェブビーコンや IP アドレス等を使用して情報を収集したりする場合があります。
        </p>
        <p className="text-gray-300">
          ユーザーは Google の広告設定からパーソナライズ広告を無効にできます。第三者配信事業者による Cookie
          を使ったパーソナライズ広告の一部については、Network Advertising Initiative のオプトアウトページから無効にできます。
        </p>

        <h2 className="text-sm font-semibold mb-2 mt-4 text-red-400">お問い合わせ</h2>
        <p className="text-gray-300">本ポリシーに関するお問い合わせは nqvno14[at]gmail.com からお願いいたします。</p>

        <h2 className="text-sm font-semibold mb-2 mt-4 text-red-400">関連リンク</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            <Link
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              className="underline text-red-400 hover:text-red-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics 利用規約
            </Link>
          </li>
          <li>
            <Link
              href="https://policies.google.com/technologies/partner-sites"
              className="underline text-red-400 hover:text-red-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google のサービスを使用するサイトやアプリから収集した情報の利用
            </Link>
          </li>
          <li>
            <Link
              href="https://policies.google.com/technologies/ads"
              className="underline text-red-400 hover:text-red-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google の広告およびプライバシーに関するポリシー
            </Link>
          </li>
          <li>
            <Link
              href="https://adssettings.google.com/"
              className="underline text-red-400 hover:text-red-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google 広告設定
            </Link>
          </li>
          <li>
            <Link
              href="https://thenai.org/opt-out/"
              className="underline text-red-400 hover:text-red-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Network Advertising Initiative オプトアウト
            </Link>
          </li>
        </ul>
        <p className="text-gray-300">本サイトをご利用される場合は、上記内容に同意したものとみなします。</p>
      </div>
    </div>
  );
}
