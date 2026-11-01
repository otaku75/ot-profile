---
# プロフィール（トップページとプロフィールページに表示）
# 下の --- より後ろの本文が「自己紹介」になる（Markdown で書ける）

name_en: Hikaru Ota # 名前（英字）。トップの大きな名前・ヘッダー・フッターに出る
name_ja: 太田 輝 # 名前（日本語）
label: 一般プレーヤー # 肩書き

# トップページの写真 / プロフィール写真
# position … 切り抜いたときにどこを見せるか（横 縦。"50% 20%" なら中央・上寄り）
hero_image:
  src: ./images/hero.jpg
  alt: 試合中にボールを打つ太田輝
  position: 62% 30%
photo:
  src: ./images/profile.jpg
  alt: ユニフォーム姿で立つ太田輝
  position: 50% 20%

# 基本情報（Status）。上から順に表示
facts:
  - label: 所属
    value: 〇〇〇〇
  - label: 生年月日
    value: 〇〇〇〇年〇月〇日
  - label: 出身地
    value: 〇〇県
  - label: 戦型
    value: 〇〇〇〇

# 能力値（Ability）。value は 0〜10 の自己評価
abilities:
  - { label: サーブ, value: 7 }
  - { label: レシーブ, value: 5 }
  - { label: フォアハンド, value: 8 }
  - { label: バックハンド, value: 6 }
  - { label: フットワーク, value: 5 }
  - { label: メンタル, value: 6 }

# そうび（使用用具）。上から順に表示
#   slot … 種類 / maker・comment … なくてもよい
#   image … 写真（なければラケットのアイコン）。例: image: { src: ./images/racket.jpg }
equipment:
  - slot: ラケット
    name: 〇〇〇〇
    maker: 〇〇〇〇
    comment: ここに使用感や選んだ理由などのコメントが入ります。
  - slot: ラバー（フォア）
    name: 〇〇〇〇
    maker: 〇〇〇〇
    comment: ここに使用感や選んだ理由などのコメントが入ります。
  - slot: ラバー（バック）
    name: 〇〇〇〇
    maker: 〇〇〇〇
    comment: ここに使用感や選んだ理由などのコメントが入ります。

# 卓球歴（History）。古い順に自動で並ぶ
#   date … 2014-08-20 / 2014-08 / 2014 のどれか / note … 補足（なくてもよい）
#   highlight: true … 金色で強調する
history:
  - date: 2008-04
    title: 卓球を始める
    note: 〇〇クラブに入会
  - date: 2012
    title: 〇〇中学校 卓球部に入部
  - date: 2014-08
    title: 〇〇大会に初出場
    note: 一般シングルス
  - date: 2018-04
    title: 〇〇大学 卓球部に入部
  - date: 2024-06
    title: 〇〇クラブに所属
  - date: 2026-08
    title: 〇〇選手権大会で初優勝
    note: 一般シングルス
    highlight: true
---

ここに自己紹介文が入ります。卓球を始めたきっかけ、これまでの競技歴、プレースタイルの特徴などを紹介します。

得意なプレーや試合で大切にしていること、練習で取り組んでいることなど、一歩踏み込んだ内容を書くと読み応えが出ます。

応援してくれる方へのメッセージで締めくくると、人柄が伝わるプロフィールになります。
