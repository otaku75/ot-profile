// 管理画面で編集するコンテンツの取得と、表示用の並べ替え・整形
// コレクションの定義は seed/seed.json（管理画面でも変更できる）
import { getEmDashCollection } from "emdash";

// 個人サイトなので件数は少ない前提で、一覧は全件を取得してから並べ替える
const LIST_LIMIT = 500;

/** プロフィール（1件だけ作る想定。複数あれば先頭を使う） */
export async function getProfile() {
	const { entries } = await getEmDashCollection("profile", { limit: 1 });
	return entries[0] ?? null;
}

/** 戦績（日付の新しい順） */
export async function getResults() {
	const { entries } = await getEmDashCollection("results", { limit: LIST_LIMIT });
	return entries.map((entry) => entry.data).toSorted(byDateDesc);
}

/** お知らせ（日付の新しい順） */
export async function getNews() {
	const { entries } = await getEmDashCollection("news", { limit: LIST_LIMIT });
	return entries.map((entry) => entry.data).toSorted(byDateDesc);
}

/** ギャラリーの写真（並び順の小さい順） */
export async function getPhotos() {
	const { entries } = await getEmDashCollection("photos", { limit: LIST_LIMIT });
	return entries.map((entry) => entry.data).toSorted(bySortOrder);
}

/** ギャラリーの動画（並び順の小さい順） */
export async function getVideos() {
	const { entries } = await getEmDashCollection("videos", { limit: LIST_LIMIT });
	return entries.map((entry) => entry.data).toSorted(bySortOrder);
}

/** スポンサー（並び順の小さい順） */
export async function getSponsors() {
	const { entries } = await getEmDashCollection("sponsors", { limit: LIST_LIMIT });
	return entries.map((entry) => entry.data).toSorted(bySortOrder);
}

/** '2026-08-24' → '2026.08.24' */
export function formatDate(date: string) {
	return date.replaceAll("-", ".");
}

// 日付は 'YYYY-MM-DD' / 'YYYY-MM' / 'YYYY' の文字列なので、文字列の比較で並べられる
function byDateDesc(a: { date?: string | null }, b: { date?: string | null }) {
	return (b.date ?? "").localeCompare(a.date ?? "");
}

// 並び順が未入力のものは後ろに回し、同じ並び順なら新しく作ったものを先にする
function bySortOrder(
	a: { sort?: number | null; createdAt?: Date },
	b: { sort?: number | null; createdAt?: Date },
) {
	const order = (a.sort ?? Infinity) - (b.sort ?? Infinity);
	if (order !== 0 && !Number.isNaN(order)) return order;
	return (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0);
}
