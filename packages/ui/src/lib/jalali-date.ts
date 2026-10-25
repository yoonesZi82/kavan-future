import { format, isValid, parse } from "date-fns-jalali"

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"

export function toPersianDigits(value: string): string {
  return value.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit)
}

export function toAsciiDigits(value: string): string {
  return value.replace(/[۰-۹٠-٩]/g, (char) => {
    const persian = PERSIAN_DIGITS.indexOf(char)
    if (persian >= 0) return String(persian)
    const arabic = "٠١٢٣٤٥٦٧٨٩".indexOf(char)
    return arabic >= 0 ? String(arabic) : char
  })
}

/** Format a Date as Jalali `yyyy/MM/dd` with Persian digits. */
export function formatJalaliDate(date: Date): string {
  return toPersianDigits(format(date, "yyyy/MM/dd"))
}

/** Parse a Jalali `yyyy/MM/dd` string (Persian or Latin digits) into a Date. */
export function parseJalaliDate(value: string): Date | undefined {
  const ascii = toAsciiDigits(value.trim())
  if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(ascii)) return undefined
  const date = parse(ascii, "yyyy/MM/dd", new Date())
  return isValid(date) ? date : undefined
}
