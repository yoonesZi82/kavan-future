"use client"

import Link from "next/link"
import { NeuroNoise } from "@paper-design/shaders-react"
import { ArrowUpRight } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@workspace/ui/components/button"
import { CTA_DESCRIPTION, CTA_TITLE } from "../constants"

export function HomeQuote() {
  const { resolvedTheme } = useTheme()
  const isLight = resolvedTheme !== "dark"

  return (
    <section className="container py-10 sm:py-14">
      <div className="relative overflow-hidden rounded-xl border border-primary/25 bg-white p-8 sm:p-12 lg:p-14 dark:border-primary/20 dark:bg-[#12182c]">
        <NeuroNoise
          brightness={isLight ? 0.35 : 0.2}
          className="pointer-events-none absolute inset-0"
          colorBack={isLight ? "#ffffff" : "#12182c"}
          colorFront={isLight ? "#9eb0e8" : "#5b7ae8"}
          colorMid={isLight ? "#2f4fc4" : "#7b93f0"}
          contrast={1.2}
          height={720}
          scale={0.65}
          speed={1}
          width={1280}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white via-white/85 to-primary/10 rtl:bg-gradient-to-r dark:from-[#12182c] dark:via-[#12182c]/90 dark:to-primary/25"
        />
        <div className="relative isolate flex w-full max-w-2xl flex-col items-center gap-4 text-center sm:items-start sm:text-start">
          <p className="inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/25 dark:text-[#b8c6ff]">
            دسترسی زودهنگام
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-balance text-primary sm:text-4xl lg:text-[2.5rem] lg:leading-tight dark:text-white">
            {CTA_TITLE}
          </h2>
          <p className="text-base leading-relaxed text-balance text-primary/80 sm:text-lg dark:text-white/80">
            {CTA_DESCRIPTION}
          </p>
          <div className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              size="lg"
              className="h-11 w-full rounded-xl px-6 sm:w-auto"
              nativeButton={false}
              render={<Link href="/register-user" />}
            >
              درخواست عضویت رایگان
              <ArrowUpRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 w-full rounded-xl border-primary/40 bg-white px-6 text-primary hover:bg-primary/5 sm:w-auto dark:border-primary dark:bg-primary/50 dark:text-white dark:hover:bg-primary/20"
              nativeButton={false}
              render={
                <a
                  href="#faq"
                  onClick={(event) => {
                    event.preventDefault()
                    document
                      .getElementById("faq")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    window.history.replaceState(null, "", "#faq")
                  }}
                />
              }
            >
              پرسش‌های متداول
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
