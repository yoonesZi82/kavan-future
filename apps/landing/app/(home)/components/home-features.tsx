"use client"

import { FEATURES, FEATURES_SUBTITLE, FEATURES_TITLE } from "../constants"
import { HomeFeatureCard } from "./home-feature-card"

export function HomeFeatures() {
  return (
    <section className="container py-0">
      <div className="mb-10 flex flex-col items-center">
        <div className="flex w-full max-w-2xl flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {FEATURES_TITLE}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {FEATURES_SUBTITLE}
          </p>
        </div>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((item, index) => (
          <HomeFeatureCard key={item.title} index={index} {...item} />
        ))}
      </ul>
    </section>
  )
}
