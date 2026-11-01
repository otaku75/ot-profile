import { defineConfig } from "astro/config";

// 静的サイトとして書き出す（npm run build で dist/ に HTML・CSS・JS・画像ができる）
export default defineConfig({
	// 公開先の URL。決まったら書く（canonical と、SNS でシェアされたときの画像に使う）
	// site: "https://my-profile.<アカウント名>.workers.dev",
	// /profile.html のように書き出し、URL の末尾に / を付けない（/profile）
	build: { format: "file" },
	trailingSlash: "never",
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	devToolbar: { enabled: false },
});
