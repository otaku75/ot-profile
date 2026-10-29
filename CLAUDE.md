# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

卓球選手のWebサイト兼ポートフォリオ。素のHTML / CSS / JavaScriptのみで作り、フレームワーク・ビルドツール・npm依存は導入しない（導入する場合は事前にユーザーに確認する）。外部依存は Google Fonts（Barlow Condensed / Noto Sans JP）のみ。

- デザインはシンプル寄り。装飾より余白・タイポグラフィ・整列を優先する。
- UI部品はコンポーネント化し、複数ページ・複数箇所で再利用できるようにする。

## 開発コマンド

ES Modules を使うため `file://` で直接開くと動かない。必ずローカルサーバー経由で確認する。

```bash
python3 -m http.server 8000   # http://localhost:8000
```

ビルド・リント・テストの仕組みはなし。

## アーキテクチャ

### ページの組み立て

- 各HTMLページは `css/main.css`（全共通CSSのエントリ）と、ページ用スクリプト `js/pages/<page>.js` を1つずつ読み込む。
- ページ用スクリプトは最初に `js/components/index.js`（全コンポーネントの登録）を import し、その後 `js/data/` のデータを各コンポーネントの `data` プロパティに代入する。import 順により define 済みの要素に代入されることが前提なので、この順序を崩さない。
- ヘッダー・フッターは `js/data/site.js`（選手名・ナビ・SNS）を直接参照する。ナビ項目は現在トップページ内アンカー（`#profile` など）で、下層ページを作ったらページへのリンクに変える。

### コンポーネント（`js/components/`）

- Custom Elements。タグ名は `tt-` プレフィックスで、JS/CSS のファイル名もタグ名と揃える（`tt-result-list` → `js/components/tt-result-list.js` + `css/components/tt-result-list.css`）。
- すべて `BaseElement`（`base-element.js`）を継承し、`render()` が返したHTMLを Light DOM の innerHTML に描画する。Shadow DOM は使わない。
- 入力は、文字列なら属性（`static observedAttributes` に列挙すると変更時に再描画）、配列・オブジェクトなら `data` プロパティ。各コンポーネント先頭の JSDoc に属性と data の形を書く。
- テンプレートは `js/utils/html.js` の `html` タグ付きテンプレートで書く。埋め込み値は自動エスケープされ、ネストした `html` と配列はそのまま展開される。生文字列を連結して innerHTML に入れない。
- 再描画で中身が丸ごと置き換わるため、イベントは子要素ではなくホスト要素に委譲して constructor で登録する（`tt-header` 参照）。`connectedCallback` / `disconnectedCallback` を上書きする場合は `super` を呼ぶ。
- 新しいコンポーネントは `js/components/index.js` と `css/main.css` の両方に登録する。
- JS が不要な見た目だけの部品（`.button`, `.tag` など）は Custom Element にせず、`css/components/` の CSS クラスにする。

### CSS

- `css/main.css` が `@import` で tokens → base → layout → components の順に読み込む。
- 色・余白・フォントサイズなどは `css/tokens.css` のカスタムプロパティを使う。色はセマンティックトークン（`--color-text`, `--color-border` など）経由で指定する。
- ダーク配色は `.theme-dark` クラスがセマンティックトークンを上書きする仕組み。コンポーネントがトークン経由で色を指定していれば、暗いセクション内でも自動で追従する。
- クラス名はタグ名をブロックにした BEM（`.tt-header__nav`）。状態はホストの属性（`tt-header[menu-open]`）か `is-*` クラスで表す。
- レイアウト用ユーティリティ（`.container`, `.section`, `.split`, `.flow` など）は `css/layout.css`。
- ブレークポイントは 600px / 900px（モバイルファースト、`min-width`）。

### データ・素材

- `js/data/` の値は現在「〇〇」のダミー。実データに差し替える前提で、構造（キー名）はコンポーネント側の JSDoc に合わせる。
- 画像は `assets/images/` に置く。
