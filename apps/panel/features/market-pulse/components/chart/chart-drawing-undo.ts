export type DrawingUndoStack = {
  push: (drawingId: string) => void
  pop: () => string | undefined
  forget: (drawingId: string) => void
  clear: () => void
  get size(): number
}

export function createDrawingUndoStack(
  onChange: (canUndo: boolean) => void
): DrawingUndoStack {
  const ids: string[] = []
  const notify = () => onChange(ids.length > 0)
  return {
    push(drawingId) {
      ids.push(drawingId)
      notify()
    },
    pop() {
      const drawingId = ids.pop()
      notify()
      return drawingId
    },
    forget(drawingId) {
      const next = ids.filter((id) => id !== drawingId)
      ids.length = 0
      ids.push(...next)
      notify()
    },
    clear() {
      ids.length = 0
      notify()
    },
    get size() {
      return ids.length
    },
  }
}
