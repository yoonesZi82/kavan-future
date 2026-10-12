import Link from "next/link"
import { AnimatedThemeToggler } from "@workspace/ui/components/animated-theme-toggler"
import { Button } from "@workspace/ui/components/button"
import { BrandMark } from "./brand-mark"

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <BrandMark />
        <div className="flex items-center gap-2 sm:gap-3">
          <AnimatedThemeToggler />
          <Button
            size="lg"
            className="h-9 rounded-xl"
            nativeButton={false}
            render={<Link href="/register-user" />}
          >
            درخواست عضویت رایگان
          </Button>
        </div>
      </div>
    </header>
  )
}
