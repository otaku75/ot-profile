# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

卓球選手のWebサイト兼ポートフォリオ。Astro で静的サイトとして書き出し（`dist/`）、Cloudflare Workers の静的アセット配信で公開する（サーバー側のコード・DB はない）。プロフィール・戦績・お知らせなどのコンテンツは `content/` のファイルに書き、ローカルで編集して git push で公開する（Cloudflare に GitHub のリポジトリをつなぐ想定）。

- 以前の版: 素の HTML / CSS / JS 版は git タグ `static-v1`、EmDash（CMS）＋ Cloudflare Workers（D1 / R2）版はコミット `0faec4f`。コンテンツが少なく管理画面は不要と判断して、ファイル管理の静的サイトにした。
- npm 依存は package.json にあるもの（Astro / `@astrojs/check` / wrangler）だけ。新しく追加する場合は事前にユーザーに確認する。ページ側の外部依存は Google Fonts（Fredoka / Zen Maru Gothic）と、ギャラリーの YouTube（サムネイル画像と、再生ボタンを押したときに読み込む埋め込みプレーヤー）のみ。
- 公開（`npm run deploy` / `wrangler deploy`）は、ユーザーの指示があるまで行わない。Cloudflare にリポジトリをつないだあとは main への push がそのまま公開になるので、push も同じ扱いにする。
- デザインはシンプル寄りをベースに、ユーザーの好みである「丸いドット柄の背景」「ゲームっぽさ」「柔らかいグリーン系」で個性を出す。
- UI部品はコンポーネント化し、複数ページ・複数箇所で再利用できるようにする。

## 開発コマンド

```bash
npm run dev         # http://localhost:4321（バックグラウンドで起動する。止めるのは npx astro dev stop、ログは npx astro dev logs）
npm run typecheck   # astro check（型チェック）
npm run build       # dist/ に書き出す（コンテンツの書き間違いもここでエラーになる）
```

テスト・リントの仕組みはなし。

- 公開時の配信を手元で確かめるときは、`npm run build` のあと `npx wrangler dev`（ローカルで動くだけで公開はされない）。

## アーキテクチャ

### ページの組み立て

- 縦に長い1ページではなく、ゲームのメニュー画面のようにボタンで画面を移動する構成。トップ（`src/pages/index.astro`）はヒーロー＋メニューだけのタイトル画面で、内容は下層ページ（`profile` / `results` / `gallery` / `works` / `news` / `sponsor` / `contact`）に分ける。下層ページは先頭に `PageHeader`（メニューへ戻るボタン＋h1）を置く。
- ページは `src/pages/*.astro`。ビルド時に `/profile.html` の形で書き出し（`build.format: "file"`）、URL は末尾の `/` なしの `/profile` にそろえる（`trailingSlash: "never"`。Cloudflare は `/profile.html` や `/profile/` を `/profile` にリダイレクトする）。ビルド時の `Astro.url.pathname` は `/profile.html` になるので、ナビとの比較などは `src/lib/path.ts` の `pagePath()` を通す。
- 全ページ共通の `<head>`（SEO・OGP の meta を含む）・ヘッダー・フッターは `src/layouts/Base.astro`。`body` は縦の flex で `main` を伸ばし、中身が短いページでもフッターを画面の下端に置く（ページの中身は必ず `<main>` で囲む）。ページ側は `title` / `description` を渡すだけにする。canonical と `og:image` は絶対 URL が要るので、`astro.config.mjs` の `site` を設定したときだけ出る（公開先の URL が決まったら設定する）。
- 存在しない URL では `src/pages/404.astro`（GAME OVER 風）が返る（`wrangler.jsonc` の `not_found_handling: "404-page"`）。
- ページ移動の演出は `src/styles/base.css` の View Transitions（`@view-transition`）で CSS だけで行う。固定ヘッダーは `view-transition-name` で演出から外している。
- ナビ（ヘッダーとトップのメニューの両方で使う）はコードで管理する（`src/data/site.ts`）。ページを増やすときは `src/pages/` にページを作り、`nav` に項目を足す。項目が増えたら、PC のヘッダー（900px 前後）とスマホの全画面メニュー（背の低い画面）に収まるか確かめる。ヘッダーは現在の URL と一致するリンクに `aria-current="page"` を付ける。

### コンテンツ（`content/`）

- サイトに載せる内容はすべてリポジトリ直下の `content/` に置き、ページ＝ファイルの対応にする: `site.yaml`（サイト名・説明文・お問い合わせ先メール・SNS）/ `profile.md`（frontmatter に名前・写真・基本情報・能力値・そうび・卓球歴、本文が自己紹介の Markdown）/ `results.yaml` / `news.yaml` / `gallery.yaml`（`photos` と `videos`）/ `works.yaml`（つくったもの `works` と、IT・DX のご相談の内容 `services`）/ `sponsor.yaml`。写真は `content/images/`。
- `content/README.md` は、ユーザー向けの「どこを直すか」の案内。各ファイルの先頭コメントにも項目の意味と書き方を書いている。項目やファイルを変えたら、README・先頭コメント・スキーマの3か所をそろえる。
- 読み込みと項目の形（zod のスキーマ）は `src/content.config.ts`。Astro のコンテンツコレクションで、1ファイル＝1コレクション（ID はコレクション名と同じ）。一覧のファイルは最上位が配列。
- YAML では `2026-08-24` が日付、`2025` が数値として読まれるので、スキーマの `date` / `text` で文字列に戻している。書き間違いはビルド時に日本語のエラーになるよう、メッセージをスキーマに書く。
- 中身が空のページ（戦績・お知らせ・ギャラリー・Works・スポンサーの一覧が空、お問い合わせのメールが空）は「準備中」になる。判定は `src/lib/content.ts` の `getComingSoonPages()`（nav の id の Set）に集め、ページは `isComingSoon()` で `ComingSoon` コンポーネントに切り替えて `noindex` にし、トップのメニューは `comingSoon` の項目を点線の枠で表示する。空のファイルも読めるように、一覧のスキーマは `list()`、ID は `contentFile()` でファイル名から固定している。
- コンテンツの取得と表示用の並べ替えは `src/lib/content.ts` にまとめ、ページはそこから取得する。同じデータを複数ページで使い、形が合わない場合はページ側で変換して渡す（`index.astro` で戦績・お知らせの最新1件をメニューのプレビューにしている例を参照）。
- 日付は年月だけの場合もあるので、`'YYYY-MM-DD'` / `'YYYY-MM'` / `'YYYY'` の文字列で持ち、文字列の比較で並べる。戦績・お知らせ・卓球歴は日付で並べ、それ以外は書いた順に表示する（並び順の項目は持たない）。
- 画像は `{ src, alt, position }`（`position` は `object-position` の値）。`ContentImage` コンポーネント（Astro の `<Image>` の薄いラッパー）で表示し、ビルド時に幅違いの webp を書き出す。表示位置は `position` がインラインの `object-position` として入るので、CSS で画像の位置を決めない。正方形などに切り抜く場合も `width` / `height` を渡して画像自体を切り抜かず、CSS の `object-fit` で切り抜く（画像自体の切り抜きは `position` を無視して中央になるため）。

### コンポーネント（`src/components/`）

- Astro コンポーネント。ファイル名はパスカルケース（`Timeline.astro`）で、ルート要素は `tt-` プレフィックスのタグ（`<tt-timeline>`）にし、CSS（`src/styles/components/tt-timeline.css`）はタグ名と揃える（画像1枚を出すだけの `ContentImage` は例外で、ルート要素を持たない）。
- 用途を限定しない汎用的な props にして使い回す（例: `Timeline` は戦績と卓球歴の両方で使う）。各コンポーネント先頭の JSDoc と `Props` に入力の形を書く。
- 動きのある部品（ヘッダーの開閉、能力値の演出、写真ビューア、動画の再生、404 の選択肢）は、同じファイルの `<script>` で Custom Element を定義し、ビルド時に描画した中身に振る舞いだけを付ける。中身は描画し直さない。イベントはホスト要素に委譲して constructor で登録する（`Header.astro` 参照）。
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

- コンテンツの値は現在「〇〇」のダミー。`content/` のファイルで実データに差し替える。
- ファビコンなどそのまま配信するファイルは `public/`。コンテンツの写真は `content/images/`（ビルド時に最適化される）。
