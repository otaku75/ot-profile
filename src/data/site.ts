// サイトの構成（ヘッダーのナビと、トップページのメニュー）
// ページを増やすときは src/pages/ にページを作り、ここに項目を足す
// 名前・写真・戦績などのコンテンツは content/ のファイルで編集する（content/README.md）

export interface NavItem {
	/** トップページで最新情報のプレビューを差し込むときの目印 */
	id: string;
	label: string;
	ja: string;
	href: string;
	/** トップのメニューのカードに表示する説明（戦績・お知らせのカードは、1件以上あれば代わりに最新の1件を表示する） */
	description: string;
}

export const nav: NavItem[] = [
	{ id: "profile", label: "Profile", ja: "プロフィール", href: "/profile", description: "能力値・そうび・卓球歴" },
	{ id: "results", label: "Results", ja: "戦績", href: "/results", description: "これまでの戦績" },
	{ id: "gallery", label: "Gallery", ja: "ギャラリー", href: "/gallery", description: "試合や練習の写真・動画" },
	{ id: "works", label: "Works", ja: "つくったもの", href: "/works", description: "つくったものなどなど" },
	{ id: "news", label: "News", ja: "お知らせ", href: "/news", description: "お知らせ・試合予定" },
	{ id: "sponsor", label: "Sponsor", ja: "スポンサー", href: "/sponsor", description: "アンバサダーさせていただいている企業様" },
	{ id: "contact", label: "Contact", ja: "お問い合わせ", href: "/contact", description: "お問い合わせはこちらから" },
];
