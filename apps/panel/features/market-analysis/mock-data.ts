import type {
  AssetMetric,
  DecisionAlert,
  MyAlert,
  ReturnsRange,
  ReturnsSeries,
} from "@/features/market-analysis/types"

export const DECISION_ALERTS: DecisionAlert[] = [
  {
    id: "crisis-1",
    tone: "danger",
    title: "بحران، نزدیک به سطح کلیدی",
    rows: [
      { label: "مقاومت", value: "۴٬۳۰۰٬۰۰۰", valueTone: "muted" },
      { label: "ریسک ورود", value: "متوسط", valueTone: "warning" },
      { label: "احتمال شکست", value: "بالا", valueTone: "danger" },
    ],
  },
  {
    id: "break-1",
    tone: "success",
    title: "شکست",
    rows: [
      { label: "جهت شکست", value: "صعودی", valueTone: "muted" },
      { label: "ساختار تایید شده", value: "بله", valueTone: "muted" },
      { label: "ریسک ورود", value: "کم", valueTone: "muted" },
    ],
  },
  {
    id: "break-2",
    tone: "success",
    title: "شکست",
    rows: [
      { label: "جهت شکست", value: "صعودی", valueTone: "muted" },
      { label: "ساختار تایید شده", value: "بله", valueTone: "muted" },
      { label: "ریسک ورود", value: "کم", valueTone: "muted" },
    ],
  },
  {
    id: "break-3",
    tone: "success",
    title: "شکست",
    rows: [
      { label: "جهت شکست", value: "صعودی", valueTone: "muted" },
      { label: "ساختار تایید شده", value: "بله", valueTone: "muted" },
      { label: "ریسک ورود", value: "کم", valueTone: "muted" },
    ],
  },
]

export const MY_ALERTS: MyAlert[] = [
  {
    id: "a1",
    tone: "danger",
    title: "شکست مقاومت",
    asset: "XAU/IRT",
    description: "شکست سطح ۸۷٬۵۰۰ با حجم بالا",
    time: "۱۸:۴۲",
  },
  {
    id: "a2",
    tone: "success",
    title: "ورود پول هوشمند",
    asset: "BTC/USDT",
    description: "جریان خرید نهادی در محدوده حمایتی",
    time: "۱۷:۱۵",
  },
  {
    id: "a3",
    tone: "warning",
    title: "فروش نهادی",
    asset: "ETH/USDT",
    description: "فشار فروش در نزدیکی مقاومت روزانه",
    time: "۱۵:۳۰",
  },
  {
    id: "a4",
    tone: "info",
    title: "تایید ساختار",
    asset: "SOL/USDT",
    description: "ساختار صعودی در تایم‌فریم ۴ ساعته",
    time: "۱۲:۰۵",
  },
  {
    id: "a5",
    tone: "success",
    title: "ورود پول هوشمند",
    asset: "XAU/IRT",
    description: "انباشت در محدوده ارزشمند",
    time: "۱۰:۴۸",
  },
]

export const ASSET_METRICS: AssetMetric[] = [
  {
    id: "intrinsic",
    label: "ارزش ذاتی",
    value: "در محدوده ارزشمند",
    tone: "gain",
  },
  {
    id: "structure",
    label: "ساختار",
    value: "صعودی",
    tone: "gain",
  },
  {
    id: "direction",
    label: "جهت",
    value: "صعودی",
    tone: "info",
  },
  {
    id: "power",
    label: "قدرت",
    value: "مثبت",
    tone: "gain",
  },
]

export const ASSET_ANALYSIS_TEXT =
  "قیمت طلای ۱۸ عیار در محدوده حمایتی ۸۴ تا ۹۱ میلیون تومان در حال تثبیت است. با حفظ این سطح و تداوم تقاضای داخلی، احتمال ادامه روند صعودی در میان‌مدت بالاست. از منظر فاندامنتال، نوسان نرخ ارز و انتظارات تورمی همچنان از سمت تقاضا حمایت می‌کنند."

export const RETURNS_RANGES: ReturnsRange[] = [
  "1M",
  "3M",
  "6M",
  "YTD",
  "1Y",
  "ALL",
]

export const RETURNS_LABELS = [
  "هفته ۱",
  "هفته ۲",
  "هفته ۳",
  "هفته ۴",
  "هفته ۵",
  "هفته ۶",
  "هفته ۷",
  "هفته ۸",
]

export const RETURNS_SERIES: ReturnsSeries[] = [
  {
    id: "xau",
    label: "XAU/IRT",
    color: "#eab308",
    data: [0, 1.2, 2.8, 1.5, 3.4, 4.1, 5.6, 6.2],
  },
  {
    id: "btc",
    label: "BTC",
    color: "#f97316",
    data: [0, -2.1, -1.4, 0.8, 2.2, 1.1, 3.5, 4.8],
  },
  {
    id: "eth",
    label: "ETH",
    color: "#3b82f6",
    data: [0, -3.2, -4.5, -2.1, 0.4, -1.2, 1.8, 2.4],
  },
  {
    id: "sol",
    label: "SOL",
    color: "#a855f7",
    data: [0, 2.4, -1.1, 3.8, 6.2, 4.5, 8.1, 7.4],
  },
  {
    id: "usdt",
    label: "USDT",
    color: "#14b8a6",
    data: [0, 0.1, -0.2, 0.3, 0.1, -0.1, 0.2, 0.15],
  },
]
