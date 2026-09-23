import type { Metadata } from "next"
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  getSiteUrl,
} from "@/lib/seo/site"

export type CreateMetadataInput = {
  title: string
  description: string
  path?: string
  keywords?: string[]
  image?:
    | string
    | {
        url: string
        width?: number
        height?: number
        alt?: string
      }
  noIndex?: boolean
  type?: "website" | "article"
  /** Skip `%s | site` template (e.g. home). */
  absoluteTitle?: boolean
}

function resolveImage(
  image: CreateMetadataInput["image"]
): NonNullable<Metadata["openGraph"]>["images"] | undefined {
  if (!image) return undefined
  if (typeof image === "string") {
    return [{ url: image, alt: SITE_NAME }]
  }
  return [
    {
      url: image.url,
      width: image.width ?? 1200,
      height: image.height ?? 630,
      alt: image.alt ?? SITE_NAME,
    },
  ]
}

/** Full page metadata for any route. */
export function createMetadata({
  title,
  description,
  path = "/",
  keywords,
  image,
  noIndex = false,
  type = "website",
  absoluteTitle = false,
}: CreateMetadataInput): Metadata {
  const images = resolveImage(image)
  const absoluteUrl = new URL(path, getSiteUrl()).toString()
  const indexable = !noIndex

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    applicationName: SITE_NAME,
    keywords,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      type,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      images: images
        ? typeof image === "string"
          ? [image]
          : image
            ? [image.url]
            : undefined
        : undefined,
    },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  }
}

/** Root layout defaults (title template + metadataBase). */
export function createRootMetadata(
  overrides?: Partial<CreateMetadataInput>
): Metadata {
  const page = createMetadata({
    title: SITE_NAME,
    description: overrides?.description ?? SITE_DEFAULT_DESCRIPTION,
    path: overrides?.path ?? "/",
    keywords: overrides?.keywords,
    image: overrides?.image,
    noIndex: overrides?.noIndex,
    type: overrides?.type,
  })

  return {
    ...page,
    metadataBase: getSiteUrl(),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
  }
}
