import Image from "next/image"

export function HeroDevices() {
  return (
    <div className="relative w-full max-w-xl justify-self-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-8 rounded-full bg-primary/10 blur-3xl"
      />
      <Image
        src="/landing-light.webp"
        alt="نمای داشبورد تحلیل داده محور"
        width={1672}
        height={941}
        className="relative h-auto w-full rounded-2xl dark:hidden"
        sizes="(max-width: 768px) 100vw, 560px"
        priority
      />
      <Image
        src="/landing-dark.webp"
        alt="نمای داشبورد تحلیل داده محور"
        width={1672}
        height={941}
        className="relative hidden h-auto w-full rounded-2xl dark:block"
        sizes="(max-width: 768px) 100vw, 560px"
        priority
      />
    </div>
  )
}
