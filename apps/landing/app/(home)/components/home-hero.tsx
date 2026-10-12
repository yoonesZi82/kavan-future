import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import StrokeText from "@workspace/ui/components/stroke-text"
import {
  HERO_BADGE,
  HERO_DESCRIPTION,
  HERO_DISCLAIMER,
  HERO_TITLE,
} from "../constants"
import { HeroDevices } from "./hero-devices"

export function HomeHero() {
  return (
    <section className="container grid items-center gap-8 py-12 lg:grid-cols-2 lg:gap-16 lg:py-8 lg:pb-20">
      <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-start">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-gain opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-gain" />
          </span>
          {HERO_BADGE}
        </span>
        <h1 className="min-h-[8.5rem] w-full text-center sm:min-h-[9.5rem] lg:min-h-[11rem] lg:text-start">
          <StrokeText
            text={HERO_TITLE}
            strokeColor="var(--foreground)"
            fillColor="var(--primary)"
            strokeWidth={1.2}
            drawDuration={1.4}
            fillDelay={0.15}
            stagger={0.03}
            ease="power2.out"
            trigger="mount"
            fillMode="wipe"
            fontSize={42}
            fontWeight={800}
            letterSpacing={0}
            direction="rtl"
            align="center-mobile"
            className="w-full"
          />
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {HERO_DESCRIPTION}
        </p>
        <div className="flex flex-col items-center gap-2 lg:items-start">
          <Button
            size="lg"
            className="h-11 rounded-xl px-6 text-base"
            nativeButton={false}
            render={<Link href="/register-user" />}
          >
            درخواست عضویت رایگان
          </Button>
          <p className="text-xs text-muted-foreground">{HERO_DISCLAIMER}</p>
        </div>
      </div>
      <HeroDevices />
    </section>
  )
}
