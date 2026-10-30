# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

卓球選手のWebサイト兼ポートフォリオ。[EmDash](https://docs.emdashcms.com/)（Astro ベースの CMS）で作り、Cloudflare Workers（D1 / R2）で動かす。プロフィール・戦績・お知らせなどのコンテンツは管理画面（`/_emdash/admin`）から編集する。素の HTML / CSS / JS で作っていた静的サイト版は git タグ `static-v1` に残っている。

- npm 依存は package.json にあるもの（Astro / EmDash / Cloudflare 関連）だけ。新しく追加する場合は事前にユーザーに確認する。ページ側の外部依存は Google Fonts（Fredoka / Zen Maru Gothic）と、ギャラリーの YouTube（サムネイル画像と、再生ボタンを押したときに読み込む埋め込みプレーヤー）のみ。
- 公開（`npm run deploy` / `wrangler deploy`）は、ユーザーの指示があるまで行わない。
- デザインはシンプル寄りをベースに、ユーザーの好みである「丸いドット柄の背景」「ゲームっぽさ」「柔らかいグリーン系」で個性を出す。
- UI部品はコンポーネント化し、複数ページ・複数箇所で再利用できるようにする。

## 開発コマンド

```bash
npm run dev         # http://localhost:4321（バックグラウンドで起動する。止めるのは npx astro dev stop、ログは npx astro dev logs）
npm run typecheck   # astro check（型チェック）
```

テスト・リントの仕組みはなし。

- 管理画面は `http://localhost:4321/_emdash/admin`。ローカルでは `/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin` を開くと、パスキーの登録なしで開発用の管理者としてログインできる（開発サーバーでのみ有効）。
- ローカルの DB・画像は `.wrangler/state/` にある（git 管理外）。初回アクセス時に `seed/seed.json` のコレクション定義だけが自動で入る。ダミーのコンテンツも入れるには上の dev-bypass を開く（シードのコンテンツが入る）。
- 画像はシードに書けないので、`npx emdash media upload <file> --alt "..."` でアップロードし、管理画面か `npx emdash content update` でコンテンツに設定する。元の写真は `seed/images/` にある。
- EmDash の API・フィールド型などを確かめるときは、記憶に頼らず docs の MCP サーバー（`.mcp.json` の emdash-docs）か `.agents/skills/`（building-emdash-site / emdash-cli / creating-plugins）を参照する。

## アーキテクチャ

### ページの組み立て

- 縦に長い1ページではなく、ゲームのメニュー画面のようにボタンで画面を移動する構成。トップ（`src/pages/index.astro`）はヒーロー＋メニューだけのタイトル画面で、内容は下層ページ（`profile` / `results` / `gallery` / `news` / `sponsor` / `contact`）に分ける。下層ページは先頭に `PageHeader`（メニューへ戻るボタン＋h1）を置く。
- ページは `src/pages/*.astro`。すべてサーバーでレンダリングする（`output: "server"`。CMS のコンテンツに `getStaticPaths()` は使わない）。
- 全ページ共通の `<head>`・ヘッダー・フッター・EmDash の差し込み口（`EmDashHead` など）は `src/layouts/Base.astro`。SEO 用の meta は `EmDashHead` が出すので、ページ側は `title` / `description` を渡すだけにする。
- 存在しない URL では `src/pages/404.astro`（GAME OVER 風）が返る。
- ページ移動の演出は `src/styles/base.css` の View Transitions（`@view-transition`）で CSS だけで行う。固定ヘッダーは `view-transition-name` で演出から外している。
- ナビ（ヘッダーとトップのメニューの両方で使う）はコードで管理する（`src/data/site.ts`）。ページを増やすときは `src/pages/` にページを作り、`nav` に項目を足す。ヘッダーは現在の URL と一致するリンクに `aria-current="page"` を付ける。

### コンテンツ（EmDash）

- コレクションの定義（スキーマ）とダミーのコンテンツは `seed/seed.json`。コレクションは `profile`（1件だけ作る。名前・写真・自己紹介・基本情報・能力値・そうび・卓球歴・連絡先メール）/ `results` / `news` / `photos` / `videos` / `sponsors`。SNS のアカウントは管理画面のサイト設定（Social）に入れる。
- `seed.json` を変えても、すでに作られた DB には反映されない。管理画面の Content Types で同じ変更をするか、ローカルなら `.wrangler/state/` を消して作り直す。
- コンテンツの取得と表示用の並べ替えは `src/lib/content.ts` にまとめ、ページはそこから取得する。同じデータを複数ページで使い、形が合わない場合はページ側で変換して渡す（`index.astro` で戦績・お知らせの最新1件をメニューのプレビューにしている例を参照）。
- 日付は年月だけの場合もあるので、`'YYYY-MM-DD'` / `'YYYY-MM'` / `'YYYY'` の文字列フィールドで持ち、文字列の比較で並べる。
- 画像フィールドはオブジェクト（`{ id, alt, width, height, focalX, focalY, ... }`）。`emdash/ui` の `Image` で表示する。表示位置は管理画面で設定するフォーカルポイントが `object-position` として入るので、CSS で画像の位置を決めない。正方形などに切り抜く場合も `width` / `height` を渡してサーバーで切り抜かず、CSS の `object-fit` で切り抜く（サーバー側の切り抜きはフォーカルポイントを無視して中央になるため）。
- 自己紹介などのリッチテキストは Portable Text。`emdash/ui` の `PortableText` で表示する。

### コンポーネント（`src/components/`）

- Astro コンポーネント。ファイル名はパスカルケース（`Timeline.astro`）で、ルート要素は `tt-` プレフィックスのタグ（`<tt-timeline>`）にし、CSS（`src/styles/components/tt-timeline.css`）はタグ名と揃える。
- 用途を限定しない汎用的な props にして使い回す（例: `Timeline` は戦績と卓球歴の両方で使う）。各コンポーネント先頭の JSDoc と `Props` に入力の形を書く。
- 動きのある部品（ヘッダーの開閉、能力値の演出、写真ビューア、動画の再生、404 の選択肢）は、同じファイルの `<script>` で Custom Element を定義し、サーバーで描画した中身に振る舞いだけを付ける。中身は描画し直さない。イベントはホスト要素に委譲して constructor で登録する（`Header.astro` 参照）。
- 新しいコンポーネントの CSS は `src/styles/main.css` に登録する。
- JS が不要な見た目だけの部品（`.button`, `.tag` など）はコンポーネントにせず、`src/styles/components/` の CSS クラスにする。

### CSS（`src/styles/`）

- `Base.astro` が `src/styles/main.css` を読み込み、`main.css` が `@import` で tokens → base → layout → components の順に読み込む。
- 色・余白・フォントサイズなどは `tokens.css` のカスタムプロパティを使う。色はセマンティックトークン（`--color-text`, `--color-border` など）経由で指定する。
- ダーク配色は `.theme-dark` クラスがセマンティックトークンを上書きする仕組み。コンポーネントがトークン経由で色を指定していれば、暗いセクション内でも自動で追従する。
- 写真以外の背景はドット柄にする。`base.css` で `body` / `.section--muted` / `.theme-dark` / `.bg-dots` に敷いているので、背景色を持つ面を新しく作るときは `.bg-dots` などで同じ柄を敷き、写真の上では `background: none` で消す（`tt-hero` 参照）。
- ゲーム風の見た目は、太い輪郭線（`--outline-width`）とずらした影（`--shadow-offset`）の組み合わせで統一する（`.panel`, `.button`, `.photo`）。
- クラス名はタグ名をブロックにした BEM（`.tt-header__nav`）。状態はホストの属性（`tt-header[menu-open]`）か `is-*` クラスで表す。
- レイアウト用ユーティリティ（`.container`, `.section`, `.split`, `.flow` など）は `layout.css`。
- ブレークポイントは 600px / 900px（モバイルファースト、`min-width`）。

### データ・素材

- コンテンツの値は現在「〇〇」のダミー。管理画面から実データに差し替える。
- ファビコンなどそのまま配信するファイルは `public/`。写真は管理画面（メディア）にアップロードする。
