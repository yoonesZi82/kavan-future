import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import { FAQ_SUBTITLE, FAQ_TITLE, FAQS } from "../constants"

export function HomeFaq() {
  return (
    <section id="faq" className="container scroll-mt-24 py-8">
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {FAQ_TITLE}
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base">
          {FAQ_SUBTITLE}
        </p>
      </div>
      <Accordion className="w-full" defaultValue={["item-0"]}>
        {FAQS.map(({ question, answer, icon: Icon }, index) => (
          <AccordionItem key={question} value={`item-${index}`}>
            <AccordionTrigger>
              <div className="flex items-start gap-3 font-medium">
                <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-start">{question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="relative ps-9 leading-relaxed text-foreground/80">
              <div className="inset-s-4 absolute top-0 bottom-3 w-px border-s border-dashed border-primary" />
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
