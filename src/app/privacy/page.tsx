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
        <h1 className="text-3xl font-bold mb-4">プライバシーポリシー</h1>
        <p>
          本サイトでは、Google が提供するアクセス解析ツール「Google Analytics」を利用しています。
          Google Analytics は Cookie を使用してトラフィックデータを収集します。収集されるデータは匿名であり、個人を特定するものではありません。
          これらの機能はブラウザの設定により Cookie を無効にすることで拒否することができます。
        </p>
        <p>
          取得したデータはサイトの利用状況の分析にのみ利用し、それ以外の目的では利用いたしません。
          Google Analytics の利用規約および Google のプライバシーポリシーについては以下をご参照ください。
        </p>
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
        </ul>
        <p>
          本サイトをご利用される場合は、上記内容に同意したものとみなします。
        </p>
        <p>
          お問い合わせは <Link href="/" className="underline">こちら</Link> からお願いいたします。
        </p>
      </div>
    </div>
  );
}
