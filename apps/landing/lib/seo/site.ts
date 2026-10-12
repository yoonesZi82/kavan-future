import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/brand"

export const SITE_NAME = BRAND_NAME

export const SITE_DEFAULT_DESCRIPTION = `${BRAND_TAGLINE} — تصمیم‌های مالی شفاف بدون سیگنال‌دهی`

export const SITE_LOCALE = "fa_IR"

export function getSiteUrl(): URL {
  return new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3002")
}
