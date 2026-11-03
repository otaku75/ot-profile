# Hikaru Ota — 卓球ポートフォリオ

卓球プレーヤー 太田輝のポートフォリオサイトです。
ゲームのメニュー画面のように、トップのメニューから各ページ（プロフィール・戦績・ギャラリー・つくったもの・お知らせ・スポンサー・お問い合わせ）に移動します。

- [Astro](https://astro.build/) で静的サイトとして書き出し、Cloudflare Workers で配信する（サーバー側のコードやデータベースはない）
- 文章・写真・戦績などの内容は `content/` のファイルに書き、git push で公開する
- 丸いドット柄の背景、ゲーム風の太い輪郭線と影、柔らかいグリーンの配色

## はじめかた

Node.js 22.23.4 以上が必要です。

```bash
npm install
npm run dev
```

http://localhost:4321 で確認できます。`content/` のファイルを保存すると、すぐ画面に反映されます。

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動する |
| `npm run build` | `dist/` に公開用のファイルを書き出す（`content/` の書き間違いもここでエラーになる） |
| `npm run preview` | 書き出した `dist/` を手元で確認する |
| `npm run typecheck` | 型チェック |

## 内容の編集

サイトに載せる内容は、すべて `content/` にあります。ページごとに1ファイルです。

| ファイル | 内容 |
| --- | --- |
| `content/site.yaml` | サイト名・説明文・お問い合わせ先メール・SNS |
| `content/profile.md` | 名前・写真・基本情報・能力値・そうび・卓球歴・自己紹介 |
| `content/results.yaml` | 戦績 |
| `content/news.yaml` | お知らせ |
| `content/gallery.yaml` | ギャラリーの写真・動画（写真のファイルは `content/images/`） |
| `content/works.yaml` | つくったもの・IT のご相談の内容（Works ページ） |
| `content/sponsor.yaml` | スポンサー |

書き方（日付・写真・「準備中」にする方法など）は [content/README.md](content/README.md) にまとめています。

## フォルダ構成

```
content/              サイトに載せる内容（上の表）
src/
  pages/              ページ（1ファイル＝1ページ。404.astro は存在しない URL のとき）
  components/         UI 部品（Astro コンポーネント）
  layouts/Base.astro  全ページ共通の <head>・ヘッダー・フッター
  styles/             CSS（main.css から tokens → base → layout → components の順に読み込む）
  lib/content.ts      content/ の取得と、表示用の並べ替え
  content.config.ts   content/ の読み込みと、項目の形（スキーマ）
  data/site.ts        ヘッダーのナビとトップのメニューの項目
public/               そのまま配信するファイル（ファビコン）
astro.config.mjs      Astro の設定（公開先の URL など）
wrangler.jsonc        Cloudflare の配信設定
```

設計のきまり（コンポーネントや CSS の書き方など）は [CLAUDE.md](CLAUDE.md) にあります。

## 公開

Cloudflare の Workers Builds で、GitHub のリポジトリをつないで公開します。つないだあとは、main ブランチに push するたびに自動でビルドされて公開されます。

1. Cloudflare のダッシュボードで **Workers & Pages** → **Create** → **Import a repository** を選び、このリポジトリを選ぶ
2. 次のように設定して保存する（保存すると最初のビルドが始まり、公開される）

   | 項目 | 値 |
   | --- | --- |
   | Worker の名前 | `my-profile`（`wrangler.jsonc` の `name` と同じにする） |
   | ブランチ | `main` |
   | ビルドコマンド | `npm run build` |
   | デプロイコマンド | `npx wrangler deploy` |

公開先の URL は `https://<Worker の名前>.<アカウントのサブドメイン>.workers.dev` です。
URL が決まったら `astro.config.mjs` の `site` に書くと、canonical と SNS でシェアされたときの画像が出力されるようになります。

公開時の配信を手元で確かめるときは、`npm run build` のあとに `npx wrangler dev` を使います（ローカルで動くだけで、公開はされません）。

## 以前の版

- 素の HTML / CSS / JS で作った版: git タグ `static-v1`
- EmDash（CMS）＋ Cloudflare Workers（D1 / R2）で、管理画面から編集できるようにした版: コミット `0faec4f`
