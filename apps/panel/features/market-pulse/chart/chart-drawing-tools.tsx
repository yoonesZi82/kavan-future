"use client"

import {
  CrosshairIcon,
  DiamondIcon,
  EyeOffIcon,
  LockIcon,
  MagnetIcon,
  PenLineIcon,
  RulerIcon,
  ShapesIcon,
  SmileIcon,
  Trash2Icon,
  TypeIcon,
  Undo2Icon,
  ZoomInIcon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { cn } from "@workspace/ui/lib/utils"
import type { DrawingToolId } from "@/features/market-pulse/chart/chart-options"
import {
  EMOJI_MENU,
  FIB_MENU,
  SHAPE_MENU,
  TREND_MENU,
  type DrawingMenuItem,
  isDrawableTool,
} from "@/features/market-pulse/chart/chart-drawing-map"

const TOOLS: {
  id: DrawingToolId
  label: string
  icon: typeof CrosshairIcon
  menu?: DrawingMenuItem[]
}[] = [
  { id: "crosshair", label: "نشانگر", icon: CrosshairIcon },
  { id: "trend", label: "ابزار خط روند", icon: PenLineIcon, menu: TREND_MENU },
  { id: "fib", label: "ابزار گن و فیبوناچی", icon: DiamondIcon, menu: FIB_MENU },
  { id: "shape", label: "اشکال هندسی", icon: ShapesIcon, menu: SHAPE_MENU },
  { id: "text", label: "ابزار متن", icon: TypeIcon },
  { id: "emoji", label: "آیکون‌ها", icon: SmileIcon, menu: EMOJI_MENU },
  { id: "measure", label: "اندازه‌گیری", icon: RulerIcon },
  { id: "zoom", label: "بزرگ‌نمایی کامل", icon: ZoomInIcon },
  { id: "magnet", label: "حالت مغناطیس", icon: MagnetIcon },
  { id: "lock", label: "قفل همه ابزارها", icon: LockIcon },
  { id: "hide", label: "مخفی کردن رسم‌ها", icon: EyeOffIcon },
  { id: "undo", label: "برگشت آخرین رسم", icon: Undo2Icon },
  { id: "trash", label: "حذف رسم‌ها", icon: Trash2Icon },
]

type ChartDrawingToolsProps = {
  activeTool: DrawingToolId
  isMagnet: boolean
  isLocked: boolean
  drawingsVisible: boolean
  canUndo: boolean
  onSelect: (
    id: DrawingToolId,
    type?: string,
    payload?: string | null
  ) => void
}

function toolIsActive(
  id: DrawingToolId,
  activeTool: DrawingToolId,
  isMagnet: boolean,
  isLocked: boolean,
  drawingsVisible: boolean
): boolean {
  if (id === "magnet") return isMagnet
  if (id === "lock") return isLocked
  if (id === "hide") return !drawingsVisible
  return activeTool === id
}

export function ChartDrawingTools({
  activeTool,
  isMagnet,
  isLocked,
  drawingsVisible,
  canUndo,
  onSelect,
}: ChartDrawingToolsProps) {
  return (
    // * Mobile chart height is tight — rail must scroll, not clip tools
    <div className="flex h-full min-h-0 w-9 shrink-0 flex-col items-center gap-0.5 overflow-y-auto overscroll-contain border-e border-border py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {TOOLS.map((tool) => {
        const Icon = tool.icon
        const isActive = toolIsActive(
          tool.id,
          activeTool,
          isMagnet,
          isLocked,
          drawingsVisible
        )
        const disabled =
          (isLocked && isDrawableTool(tool.id)) ||
          (tool.id === "undo" && !canUndo)
        const className = cn(isActive && "bg-primary/15 text-primary")
        if (tool.menu) {
          return (
            <DropdownMenu key={tool.id}>
              <DropdownMenuTrigger
                title={tool.label}
                render={
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label={tool.label}
                    aria-pressed={isActive}
                    disabled={disabled}
                    className={className}
                  />
                }
              >
                <Icon />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="left" align="start" sideOffset={8}>
                {tool.menu.map((item) => (
                  <DropdownMenuItem
                    key={`${item.type}-${item.label}`}
                    onClick={() =>
                      onSelect(tool.id, item.type, item.payload ?? null)
                    }
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
        return (
          <Tooltip key={tool.id}>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  aria-label={tool.label}
                  aria-pressed={isActive}
                  disabled={disabled}
                  className={className}
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
