export type TxType = "buy" | "sell" | "deposit" | "withdraw"

export type PortfolioTransaction = {
  id: string
  date: string
  time: string
  type: TxType
  assetName: string
  assetSymbol: string
  accent: string
  quantity: string
  unitPrice: string
  totalAmount: string
  note: string
  impactBefore: number
  impactChange: number
  impactAfter: number
  impactSeries: readonly number[]
}

export type TxTypeFilter = "all" | TxType
