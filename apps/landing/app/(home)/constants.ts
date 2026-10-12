import {
  ChartColumnIncreasing,
  CircleOff,
  Clock3,
  Compass,
  Lock,
  Scale,
  ShieldCheck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react"

export type FeatureItem = {
  title: string
  description: string
  icon: LucideIcon
}

export type FaqItem = {
  question: string
  answer: string
  icon: LucideIcon
}

export const HERO_BADGE = "دسترسی زودهنگام"

export const HERO_TITLE =
  "تصمیم‌های مالی هوشمندتر، بدون سیگنال‌دهی و پیش‌بینی‌های آماده"

export const HERO_DESCRIPTION =
  "داده محور یک دستیار تحلیل است که منطق تصمیم را شفاف می‌کند نه این‌که به‌جای شما تصمیم بگیرد. انتخاب نهایی همیشه با شماست."

export const HERO_DISCLAIMER = "بدون توصیه خرید یا فروش — فقط شفافیت."

export const FEATURES_TITLE = "آنچه داده محور ارائه می‌دهد"
export const FEATURES_SUBTITLE = "چهار ستون یک تصمیم آگاهانه"

export const FEATURES: FeatureItem[] = [
  {
    title: "تصمیم‌گیری داده‌محور",
    description:
      "جمع‌بندی شواهد و شاخص‌ها در یک نمای شفاف برای انتخاب آگاهانه‌تر.",
    icon: Scale,
  },
  {
    title: "ساختار قابل مشاهده",
    description: "منطق تحلیل را می‌بینید؛ هیچ جعبهٔ سیاهی بین شما و داده نیست.",
    icon: Compass,
  },
  {
    title: "تحلیل چندبُعدی بازار",
    description:
      "نمای ترکیبی از روند، نوسان و زمینهٔ بازار در یک داشبورد واحد.",
    icon: ChartColumnIncreasing,
  },
  {
    title: "ارزیابی دقیق ریسک",
    description:
      "ریسک را قابل اندازه‌گیری و قابل مقایسه می‌کند تا تصمیم متعادل‌تری بگیرید.",
    icon: ShieldCheck,
  },
]

export const QUOTE_TEXT =
  "ابزار تحلیل وقتی ارزشمند است که منطق را روشن کند، نه این‌که به‌جای شما تصمیم بگیرد."

export const QUOTE_AUTHOR = "کارشناس بازار سرمایه"

export const CTA_TITLE = "منطق تصمیم را ببینید نه فقط نتیجه را"

export const CTA_DESCRIPTION =
  "به لیست انتظار داده محور بپیوندید و با دسترسی زودهنگام، تحلیل شفاف و بدون سیگنال‌دهی را تجربه کنید."

export const FAQ_TITLE = "پرسش‌های متداول"
export const FAQ_SUBTITLE = "پاسخ‌های شفاف برای سوالات رایج دربارهٔ داده محور"

export const FAQS: FaqItem[] = [
  {
    question: "داده محور سیگنال خرید و فروش می‌دهد؟",
    answer:
      "خیر. داده محور توصیهٔ معاملاتی ارائه نمی‌کند. تمرکز ما روی شفاف‌کردن منطق تحلیل و کمک به تصمیم‌گیری آگاهانه است.",
    icon: CircleOff,
  },
  {
    question: "دسترسی زودهنگام چگونه کار می‌کند؟",
    answer:
      "با عضویت در لیست انتظار، هنگام باز شدن ظرفیت از طریق راه ارتباطی‌تان مطلع می‌شوید و اولویت دسترسی خواهید داشت.",
    icon: Clock3,
  },
  {
    question: "آیا جایگزین تحلیل‌گر انسانی است؟",
    answer:
      "خیر. داده محور دستیار تصمیم است؛ قضاوت نهایی و مسئولیت انتخاب همیشه با کاربر می‌ماند.",
    icon: UserRound,
  },
  {
    question: "برای چه کسانی مناسب است؟",
    answer:
      "برای معامله‌گران و تحلیل‌گرانی که می‌خواهند ساختار تصمیم را ببینند و از جعبهٔ سیاه و پیش‌بینی‌های آماده فاصله بگیرند.",
    icon: Users,
  },
  {
    question: "اطلاعات من چگونه استفاده می‌شود؟",
    answer:
      "اطلاعات عضویت فقط برای اطلاع‌رسانی عرضه و دسترسی زودهنگام استفاده می‌شود و در اختیار شخص ثالث قرار نمی‌گیرد.",
    icon: Lock,
  },
]
