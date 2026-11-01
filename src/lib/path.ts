/**
 * ページの URL のパスを、ナビの href と同じ形（/profile。トップは /）にそろえる。
 * ビルド時は /profile.html の形になり、公開先では /profile で配信されるため。
 */
export function pagePath(url: URL) {
	return url.pathname.replace(/\.html$/, "").replace(/\/(index)?$/, "") || "/";
}
