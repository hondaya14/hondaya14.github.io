// References:
// - Google Analytics Terms of Service: https://marketingplatform.google.com/about/analytics/terms/jp/
// - "How Google uses information from sites or apps that use our services": https://policies.google.com/technologies/partner-sites

import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-foreground p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold mb-4">プライバシーポリシー</h1>
        
        <h2 className="text-2xl font-semibold mb-3">Google Analytics について</h2>
        <p>
          本サイトでは、Google が提供するアクセス解析ツール「Google Analytics」を利用しています。
          Google Analytics は Cookie を使用してトラフィックデータを収集します。収集されるデータは匿名であり、個人を特定するものではありません。
          これらの機能はブラウザの設定により Cookie を無効にすることで拒否することができます。
        </p>
        <p>
          取得したデータはサイトの利用状況の分析にのみ利用し、それ以外の目的では利用いたしません。
          Google Analytics の利用規約および Google のプライバシーポリシーについては以下をご参照ください。
        </p>

        <h2 className="text-2xl font-semibold mb-3">Google AdSense について</h2>
        <p>
          本サイトでは、Google AdSense を利用して広告配信を行っております。
          Google AdSense は、Cookie を使用してユーザーの興味に基づいた広告を表示します。
          Cookie を無効にすることで、パーソナライズ広告の配信を停止することができます。
        </p>
        <p>
          Google AdSense に関して、このプロセスの詳細やこのような情報が広告配信事業者に使用されないようにする方法については、
          Google の広告およびプライバシーに関するポリシーをご覧ください。
        </p>
        <p>
          第三者配信の広告サービス（Google AdSense）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、
          Cookie を使用しております。Cookie を無効にする設定およびGoogle AdSenseに関する詳細は
          「Google の広告およびプライバシーに関するポリシー」をご確認ください。
        </p>
        <h2 className="text-2xl font-semibold mb-3">Amazonアソシエイトについて</h2>
        <p>
          当サイトは、Amazonのアソシエイトとして、適格販売により収入を得ています。
        </p>
        <h2 className="text-2xl font-semibold mb-3">関連リンク</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <Link href="https://marketingplatform.google.com/about/analytics/terms/jp/" className="underline" target="_blank">
              Google Analytics 利用規約
            </Link>
          </li>
          <li>
            <Link href="https://policies.google.com/technologies/partner-sites" className="underline" target="_blank">
              Google のサービスを使用するサイトやアプリから収集した情報の利用
            </Link>
          </li>
          <li>
            <Link href="https://policies.google.com/technologies/ads" className="underline" target="_blank">
              Google の広告およびプライバシーに関するポリシー
            </Link>
          </li>
          <li>
            <Link href="https://adssettings.google.com/" className="underline" target="_blank">
              Google 広告設定
            </Link>
          </li>
        </ul>
        <p>
          本サイトをご利用される場合は、上記内容に同意したものとみなします。
        </p>
        <p>
          お問い合わせは nqvno14[at]gmail.com からお願いいたします。
        </p>
      </div>
    </div>
  );
}
