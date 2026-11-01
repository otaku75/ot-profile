// content/ に置いたコンテンツの取得と、表示用の並べ替え・整形
// 読み込みと項目の形の定義は src/content.config.ts
import type { ImageMetadata } from "astro";
import { type CollectionKey, getEntry } from "astro:content";

/** content/ に書いた画像（形は src/content.config.ts の picture） */
export interface ImageField {
	src: ImageMetadata;
	alt?: string | null;
	/** 切り抜いたときの表示位置（object-position の値。例: '50% 20%'） */
	position?: string | null;
}

/** サイト全体の設定（content/site.yaml） */
export async function getSite() {
	return (await getFile("site")).data;
}

/** プロフィール（content/profile.md）。自己紹介（本文）は render() で表示する */
export async function getProfile() {
	return getFile("profile");
}

/** 戦績（content/results.yaml。日付の新しい順） */
export async function getResults() {
	return (await getFile("results")).data.toSorted(byDateDesc);
}

/** お知らせ（content/news.yaml。日付の新しい順） */
export async function getNews() {
	return (await getFile("news")).data.toSorted(byDateDesc);
}

/** ギャラリーの写真と動画（content/gallery.yaml。書いた順） */
export async function getGallery() {
	return (await getFile("gallery")).data;
}

/** スポンサー（content/sponsor.yaml。書いた順） */
export async function getSponsors() {
	return (await getFile("sponsor")).data;
}

/** '2026-08-24' → '2026.08.24' */
export function formatDate(date: string) {
	return date.replaceAll("-", ".");
}

// 各コレクションは content/ の1ファイルで、ID はコレクション名と同じ（src/content.config.ts の contentFile）
async function getFile<C extends CollectionKey>(collection: C) {
	const entry = await getEntry(collection, collection);
	if (!entry) throw new Error(`content/ の ${collection} のファイルが読み込めませんでした`);
	return entry;
}

// 日付は 'YYYY-MM-DD' / 'YYYY-MM' / 'YYYY' の文字列なので、文字列の比較で並べられる
function byDateDesc(a: { date: string }, b: { date: string }) {
	return b.date.localeCompare(a.date);
}
