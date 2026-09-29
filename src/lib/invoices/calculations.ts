export interface InvoiceItemData {
  quantity: number
  unitPrice: number
  discountValue?: number
  discountType?: "PERCENTAGE" | "FIXED" | null
  taxRate?: number
}

export interface InvoiceCalculationResult {
  subtotal: number
  discountTotal: number
  taxableAmount: number
  taxTotal: number
  grandTotal: number
}

export function calculateInvoiceTotals(
  items: InvoiceItemData[],
  globalDiscountValue: number = 0,
  globalDiscountType: "PERCENTAGE" | "FIXED" | null = null,
  globalTaxRate: number = 0 // If we apply a flat tax to the whole invoice instead of per-item
): InvoiceCalculationResult {
  let subtotal = 0
  let itemDiscountTotal = 0
  let itemTaxTotal = 0

  items.forEach((item) => {
    // 1. Calculate base amount for this item
    const baseAmount = (item.quantity || 0) * (item.unitPrice || 0)
    subtotal += baseAmount

    // 2. Calculate item-level discount
    let itemDiscount = 0
    if (item.discountValue && item.discountValue > 0) {
      if (item.discountType === "PERCENTAGE") {
        itemDiscount = baseAmount * (item.discountValue / 100)
      } else if (item.discountType === "FIXED") {
        itemDiscount = item.discountValue
      }
    }
    itemDiscountTotal += itemDiscount
    const discountedItemAmount = baseAmount - itemDiscount

    // 3. Calculate item-level tax
    if (item.taxRate && item.taxRate > 0) {
      const itemTax = discountedItemAmount * (item.taxRate / 100)
      itemTaxTotal += itemTax
    }
  })

  // 4. Calculate global discount (applied on top of the subtotal minus item discounts)
  let globalDiscount = 0
  const subtotalAfterItemDiscounts = subtotal - itemDiscountTotal

  if (globalDiscountValue && globalDiscountValue > 0) {
    if (globalDiscountType === "PERCENTAGE") {
      globalDiscount = subtotalAfterItemDiscounts * (globalDiscountValue / 100)
    } else if (globalDiscountType === "FIXED") {
      globalDiscount = globalDiscountValue
    }
  }

  const totalDiscount = itemDiscountTotal + globalDiscount
  const taxableAmount = subtotal - totalDiscount

  // 5. Calculate global tax (if applicable, typically it's either item-level OR global, but we handle both)
  let globalTax = 0
  if (globalTaxRate && globalTaxRate > 0) {
    globalTax = taxableAmount * (globalTaxRate / 100)
  }

  const totalTax = itemTaxTotal + globalTax
  const grandTotal = taxableAmount + totalTax

  return {
    subtotal: Math.max(0, subtotal),
    discountTotal: Math.max(0, totalDiscount),
    taxableAmount: Math.max(0, taxableAmount),
    taxTotal: Math.max(0, totalTax),
    grandTotal: Math.max(0, grandTotal),
  }
}
