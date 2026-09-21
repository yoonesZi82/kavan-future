export const SITE_NAME = "آینده‌کاوان"

export const SITE_DEFAULT_DESCRIPTION =
  "پنل معاملاتی و رصد بازار آینده‌کاوان"

export const SITE_LOCALE = "fa_IR"

export function getSiteUrl(): URL {
  return new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
}
