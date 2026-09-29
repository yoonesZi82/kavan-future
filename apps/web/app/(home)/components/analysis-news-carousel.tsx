"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@workspace/ui/components/carousel"
import {
  AnalysisCard,
  type AnalysisCardProps,
} from "@/components/analysis-card"
import { SectionHeading } from "@/components/section-heading"

type AnalysisNewsCarouselProps = {
  title: string
  items: AnalysisCardProps[]
}

function CarouselNav() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="اسلاید قبلی"
      >
        <ChevronRightIcon />
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="اسلاید بعدی"
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  )
}

/** RTL news carousel — minimal cards; nav sits in the section heading. */
export function AnalysisNewsCarousel({
  title,
  items,
}: AnalysisNewsCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start", direction: "rtl", loop: true }}
      className="w-full"
    >
      <SectionHeading title={title} actions={<CarouselNav />} />
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem
            key={item.title}
            className="basis-[90%] sm:basis-[70%] lg:basis-[48%]"
          >
            <AnalysisCard {...item} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
