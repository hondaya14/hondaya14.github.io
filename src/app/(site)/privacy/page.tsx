// References:
// - Google Analytics Terms of Service: https://marketingplatform.google.com/about/analytics/terms/jp/
// - "How Google uses information from sites or apps that use our services": https://policies.google.com/technologies/partner-sites

import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-base font-semibold mb-2 text-red-400">プライバシーポリシー</h1>

        <h2 className="text-sm font-semibold mb-2 mt-4 text-red-400">Google Analytics について</h2>
        <p className="text-gray-300">
          本サイトでは、Google が提供するアクセス解析ツール「Google Analytics」を利用しています。
          Google Analytics は Cookie
          を使用してトラフィックデータを収集します。収集されるデータは匿名であり、個人を特定するものではありません。
          これらの機能はブラウザの設定により Cookie を無効にすることで拒否することができます。
        </p>
        <p className="text-gray-300">
          取得したデータはサイトの利用状況の分析にのみ利用し、それ以外の目的では利用いたしません。
          Google Analytics の利用規約および Google
          のプライバシーポリシーについては以下をご参照ください。
        </p>

        <h2 className="text-sm font-semibold mb-2 mt-4 text-red-400">Google AdSense について</h2>
        <p className="text-gray-300">
          本サイトでは、Google AdSense を利用して広告配信を行っております。 Google AdSense
          は、Cookie を使用してユーザーの興味に基づいた広告を表示します。 Cookie
          を無効にすることで、パーソナライズ広告の配信を停止することができます。
        </p>
        <p className="text-gray-300">
          Google AdSense
          に関して、このプロセスの詳細やこのような情報が広告配信事業者に使用されないようにする方法については、
          Google の広告およびプライバシーに関するポリシーをご覧ください。
        </p>
        <p className="text-gray-300">
          第三者配信の広告サービス（Google
          AdSense）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、 Cookie
          を使用しております。Cookie を無効にする設定およびGoogle AdSenseに関する詳細は 「Google
          の広告およびプライバシーに関するポリシー」をご確認ください。
        </p>
        <h2 className="text-sm font-semibold mb-2 mt-4 text-red-400">関連リンク</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            <Link
              href="https://marketingplatform.google.com/about/analytics/terms/jp/"
              className="underline text-red-400 hover:text-red-300"
              target="_blank"
            >
              Google Analytics 利用規約
            </Link>
          </li>
          <li>
            <Link
              href="https://policies.google.com/technologies/partner-sites"
              className="underline text-red-400 hover:text-red-300"
              target="_blank"
            >
              Google のサービスを使用するサイトやアプリから収集した情報の利用
            </Link>
          </li>
          <li>
            <Link
              href="https://policies.google.com/technologies/ads"
              className="underline text-red-400 hover:text-red-300"
              target="_blank"
            >
              Google の広告およびプライバシーに関するポリシー
            </Link>
          </li>
          <li>
            <Link
              href="https://adssettings.google.com/"
              className="underline text-red-400 hover:text-red-300"
              target="_blank"
            >
              Google 広告設定
            </Link>
          </li>
        </ul>
        <p className="text-gray-300">
          本サイトをご利用される場合は、上記内容に同意したものとみなします。
        </p>
        <p className="text-gray-300">お問い合わせは nqvno14[at]gmail.com からお願いいたします。</p>
      </div>
    </div>
  );
}
