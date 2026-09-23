"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="ghost" size="icon" aria-label="تغییر تم" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="تغییر تم"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}
