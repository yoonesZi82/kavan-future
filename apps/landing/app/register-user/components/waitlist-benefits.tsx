import { BENEFITS } from "../constants"

export function WaitlistBenefits() {
  return (
    <aside className="bg-card flex flex-col gap-8 rounded-xl p-5 ring-1 ring-foreground/10 sm:p-6 lg:max-w-sm">
      <h2 className="text-xl font-bold tracking-tight">چرا باید عضو شوید؟</h2>
      <ul className="flex flex-col gap-6">
        {BENEFITS.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.title} className="flex gap-3">
              <span className="bg-background text-primary ring-border flex size-11 shrink-0 items-center justify-center rounded-xl ring-1">
                <Icon />
              </span>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
      <p className="text-muted-foreground text-xs leading-relaxed">
        اطلاعات شما فقط برای اطلاع‌رسانی عرضه و دسترسی زودهنگام استفاده
        می‌شود.
      </p>
    </aside>
  )
}
