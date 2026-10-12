"use client"

import Link from "next/link"
import { NeuroNoise } from "@paper-design/shaders-react"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { CTA_DESCRIPTION, CTA_TITLE } from "../constants"

export function HomeQuote() {
  return (
    <section className="container py-10 sm:py-14">
      <div className="border-primary/25 relative overflow-hidden rounded-xl border bg-white p-8 sm:p-12 lg:p-14 dark:bg-white">
        <NeuroNoise
          brightness={0.35}
          className="pointer-events-none absolute inset-0"
          colorBack="#ffffff"
          colorFront="#9eb0e8"
          colorMid="#2f4fc4"
          contrast={1.2}
          height={720}
          scale={0.65}
          speed={1}
          width={1280}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white via-white/85 to-primary/10 rtl:bg-gradient-to-r"
        />
        <div className="relative isolate flex w-full max-w-2xl flex-col items-center gap-4 text-center sm:items-start sm:text-start">
          <p className="bg-primary/15 text-primary inline-flex rounded-full px-3 py-1 text-xs font-medium">
            دسترسی زودهنگام
          </p>
          <h2 className="text-primary text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            {CTA_TITLE}
          </h2>
          <p className="text-primary/80 text-base leading-relaxed text-balance sm:text-lg">
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
              className="border-primary/40 bg-white text-primary hover:bg-primary/5 h-11 w-full rounded-xl px-6 sm:w-auto"
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
