"use client"

import {
  CrosshairIcon,
  EyeOffIcon,
  LockIcon,
  MagnetIcon,
  PenLineIcon,
  RulerIcon,
  ShapesIcon,
  SmileIcon,
  Trash2Icon,
  TypeIcon,
  ZoomInIcon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"
import type { DrawingToolId } from "@/features/market-pulse/chart/chart-options"

const TOOLS: {
  id: DrawingToolId
  label: string
  icon: typeof CrosshairIcon
}[] = [
  { id: "crosshair", label: "نشانگر", icon: CrosshairIcon },
  { id: "trend", label: "ابزار خط روند", icon: PenLineIcon },
  { id: "fib", label: "ابزار گن و فیبوناچی", icon: ShapesIcon },
  { id: "shape", label: "اشکال هندسی", icon: ShapesIcon },
  { id: "text", label: "ابزار متن", icon: TypeIcon },
  { id: "emoji", label: "آیکون‌ها", icon: SmileIcon },
  { id: "measure", label: "اندازه‌گیری", icon: RulerIcon },
  { id: "zoom", label: "بزرگ‌نمایی کامل", icon: ZoomInIcon },
  { id: "magnet", label: "حالت مغناطیس", icon: MagnetIcon },
  { id: "lock", label: "قفل همه ابزارها", icon: LockIcon },
  { id: "hide", label: "مخفی کردن رسم‌ها", icon: EyeOffIcon },
  { id: "trash", label: "حذف رسم‌ها", icon: Trash2Icon },
]

type ChartDrawingToolsProps = {
  activeTool: DrawingToolId
  isMagnet: boolean
  isLocked: boolean
  drawingsVisible: boolean
  onSelect: (id: DrawingToolId) => void
}

export function ChartDrawingTools({
  activeTool,
  isMagnet,
  isLocked,
  drawingsVisible,
  onSelect,
}: ChartDrawingToolsProps) {
  return (
    <div className="flex w-9 shrink-0 flex-col items-center gap-0.5 border-e border-border py-1">
      {TOOLS.map((tool) => {
        const Icon = tool.icon
        const isActive =
          tool.id === "magnet"
            ? isMagnet
            : tool.id === "lock"
              ? isLocked
              : tool.id === "hide"
                ? !drawingsVisible
                : activeTool === tool.id
        return (
          <Tooltip key={tool.id}>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={tool.label}
                  aria-pressed={isActive}
                  disabled={isLocked && tool.id !== "lock"}
                  className={cn(isActive && "bg-primary/15 text-primary")}
                  onClick={() => onSelect(tool.id)}
                />
              }
            >
              <Icon />
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={6}>
              {tool.label}
            </TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  )
}
