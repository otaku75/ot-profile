// content/ に置いたファイル（サイトに載せる内容）の読み込みと、項目の形の定義
// 必須の項目が抜けている・日付の形が違うなどの書き間違いは、npm run dev / build のときにエラーで知らせる
import { defineCollection, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** content/ の中の1ファイルを、ファイル名と同じ ID の1件として読み込む */
const contentFile = (name: string) => glob({ pattern: name, base: "./content" });

/** エラーメッセージ。項目がないときは「必須」、形が違うときは message */
const requiredOr = (message: string) => (issue: { input?: unknown }) =>
	issue.input == null ? "この項目は必須です" : message;

// YAML では 2025 のような値が数値として読まれるので、表示する文字はすべて文字列にそろえる
const text = z.union([z.string(), z.number()], { error: requiredOr("文字で書いてください") }).transform(String);

// 'YYYY-MM-DD' / 'YYYY-MM' / 'YYYY'（文字列のまま比べて並べる）。
// YAML では 2026-08-24 は日付、2012 は数値として読まれるので、どちらも文字列に戻す
const DATE_MESSAGE = "日付は 2026-08-24 / 2026-08 / 2026 のどれかの形で書いてください";
const date = z
	.union([z.string(), z.number(), z.date()], { error: requiredOr(DATE_MESSAGE) })
	.transform((value) => (value instanceof Date ? value.toISOString().slice(0, 10) : String(value)))
	.pipe(z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, DATE_MESSAGE));

/** 一覧。項目名だけ書いて中身が空（null）のときも、空の一覧として扱う */
const list = <T extends z.ZodType>(item: T) =>
	z
		.array(item)
		.nullish()
		.transform((items) => items ?? []);

/** 画像。src は書いたファイルからの相対パス。position は切り抜いたときの表示位置（object-position の値） */
const picture = (image: SchemaContext["image"]) =>
	z.object({
		src: image(),
		alt: text.nullish(),
		position: z.string().nullish(),
	});

const site = defineCollection({
	loader: contentFile("site.yaml"),
	schema: z.object({
		title: text,
		description: text,
		contact_email: z.email("メールアドレスの形で書いてください").nullish(),
		social: z
			.object({
				instagram: text.nullish(),
				x: text.nullish(),
				youtube: text.nullish(),
			})
			.nullish(),
	}),
});

const profile = defineCollection({
	loader: contentFile("profile.md"),
	schema: ({ image }) =>
		z.object({
			name_en: text,
			name_ja: text,
			label: text.nullish(),
			hero_image: picture(image).nullish(),
			photo: picture(image).nullish(),
			facts: list(z.object({ label: text, value: text })),
			abilities: list(z.object({ label: text, value: z.number().min(0).max(10) })),
			equipment: list(
				z.object({
					slot: text,
					name: text,
					maker: text.nullish(),
					comment: text.nullish(),
					image: picture(image).nullish(),
				}),
			),
			history: list(z.object({ date, title: text, note: text.nullish(), highlight: z.boolean().nullish() })),
		}),
});

const results = defineCollection({
	loader: contentFile("results.yaml"),
	schema: z.array(
		z.object({
			date,
			title: text,
			note: text.nullish(),
			badge: text.nullish(),
			highlight: z.boolean().nullish(),
		}),
	),
});

const news = defineCollection({
	loader: contentFile("news.yaml"),
	schema: z.array(
		z.object({
			date,
			category: text.nullish(),
			title: text,
			url: z.url("URL の形で書いてください").nullish(),
		}),
	),
});

const gallery = defineCollection({
	loader: contentFile("gallery.yaml"),
	schema: ({ image }) =>
		z.object({
			photos: list(z.object({ title: text, image: picture(image) })),
			videos: list(z.object({ title: text, youtube_id: text.nullish(), date: date.nullish() })),
		}),
});

const sponsor = defineCollection({
	loader: contentFile("sponsor.yaml"),
	schema: ({ image }) =>
		z.array(
			z.object({
				title: text,
				description: text.nullish(),
				url: z.url("URL の形で書いてください").nullish(),
				since: text.nullish(),
				logo: picture(image).nullish(),
			}),
		),
});

export const collections = { site, profile, results, news, gallery, sponsor };
