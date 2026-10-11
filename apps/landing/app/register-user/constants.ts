import {
  BarChart3,
  Mail,
  Phone,
  Send,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react"

export type ContactChannel = "telegram" | "mobile" | "email"
export type Interest = "market-analysis" | "portfolio"

export type BenefitItem = {
  title: string
  description: string
  icon: LucideIcon
}

export type ContactOption = {
  value: ContactChannel
  label: string
  icon: LucideIcon
  fieldLabel: string
  placeholder: string
  hint: string
  inputType: "text" | "tel" | "email"
  autoComplete: string
  dir?: "ltr"
}

export const WAITLIST_TAGLINE = "تصمیم‌های بهتر، با داده‌های دقیق‌تر"

export const BENEFITS: BenefitItem[] = [
  {
    title: "دسترسی زودهنگام",
    description: "از اولین نفرهایی باشید که محصول را می‌بینند.",
    icon: BarChart3,
  },
  {
    title: "محتوای تخصصی",
    description: "تحلیل و آموزش کاربردی برای تصمیم‌گیری بهتر.",
    icon: Shield,
  },
  {
    title: "ارتباط با جامعه حرفه‌ای",
    description: "همراه معامله‌گران و تحلیل‌گران حرفه‌ای باشید.",
    icon: Users,
  },
]

export const CONTACT_OPTIONS: ContactOption[] = [
  {
    value: "telegram",
    label: "آیدی تلگرام",
    icon: Send,
    fieldLabel: "آیدی تلگرام",
    placeholder: "@username",
    hint: "بدون @ هم قابل قبول است",
    inputType: "text",
    autoComplete: "username",
    dir: "ltr",
  },
  {
    value: "mobile",
    label: "شماره موبایل",
    icon: Phone,
    fieldLabel: "شماره موبایل",
    placeholder: "+98912XXXXXXX",
    hint: "برای ارتباط سریع‌تر پیشنهاد می‌شود",
    inputType: "tel",
    autoComplete: "tel",
    dir: "ltr",
  },
  {
    value: "email",
    label: "ایمیل",
    icon: Mail,
    fieldLabel: "ایمیل",
    placeholder: "example@email.com",
    hint: "این فیلد اختیاری است",
    inputType: "email",
    autoComplete: "email",
    dir: "ltr",
  },
]

export const INTEREST_OPTIONS: { value: Interest; label: string }[] = [
  { value: "market-analysis", label: "تحلیل بازار" },
  { value: "portfolio", label: "مدیریت سبد" },
]

export const TELEGRAM_CHANNEL_URL = "https://t.me/"
