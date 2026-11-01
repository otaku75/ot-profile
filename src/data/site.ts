// サイトの構成（ヘッダーのナビと、トップページのメニュー）
// ページを増やすときは src/pages/ にページを作り、ここに項目を足す
// 名前・写真・戦績などのコンテンツは content/ のファイルで編集する（content/README.md）

export interface NavItem {
	/** トップページで最新情報のプレビューを差し込むときの目印 */
	id: string;
	label: string;
	ja: string;
	href: string;
	/** メニューに表示する説明（最新情報のプレビューがない項目に使う） */
	description: string;
}

export const nav: NavItem[] = [
	{ id: "profile", label: "Profile", ja: "プロフィール", href: "/profile", description: "能力値・そうび・卓球歴" },
	{ id: "results", label: "Results", ja: "戦績", href: "/results", description: "これまでの戦績" },
	{ id: "gallery", label: "Gallery", ja: "ギャラリー", href: "/gallery", description: "試合や練習の写真・動画" },
	{ id: "news", label: "News", ja: "お知らせ", href: "/news", description: "お知らせ・試合予定" },
	{ id: "sponsor", label: "Sponsor", ja: "スポンサー", href: "/sponsor", description: "活動を支えてくださっている企業" },
	{ id: "contact", label: "Contact", ja: "お問い合わせ", href: "/contact", description: "取材・出演のご相談はこちら" },
];
