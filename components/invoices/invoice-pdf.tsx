import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { InvoiceItemData, calculateInvoiceTotals } from '@/lib/invoices/calculations'
import { format } from 'date-fns'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: '#1f2937',
    lineHeight: 1.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  companyDetails: {
    flex: 1,
  },
  companyName: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
    color: '#111827',
  },
  invoiceTitle: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  clientBox: {
    flex: 1,
  },
  metaBox: {
    flex: 1,
    alignItems: 'flex-end',
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#6b7280',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  textMain: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  textNormal: {
    fontSize: 10,
    color: '#4b5563',
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  metaLabel: {
    width: 80,
    fontFamily: 'Helvetica-Bold',
    color: '#6b7280',
    textAlign: 'right',
    marginRight: 8,
  },
  metaValue: {
    width: 80,
    textAlign: 'right',
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
    marginBottom: 8,
  },
  colDesc: { flex: 4 },
  colQty: { flex: 1, textAlign: 'right' },
  colPrice: { flex: 1.5, textAlign: 'right' },
  colTotal: { flex: 1.5, textAlign: 'right' },
  thText: {
    fontFamily: 'Helvetica-Bold',
    color: '#6b7280',
    fontSize: 9,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  totalsSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  totalsBox: {
    width: 200,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  totalLabel: {
    color: '#4b5563',
  },
  totalValue: {
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  grandTotalLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: '#111827',
  },
  grandTotalValue: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    color: '#111827',
  },
  notesSection: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  notesTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 9,
    color: '#4b5563',
  }
})

interface InvoicePdfProps {
  data: any
  company: any
  clients: any[]
}

const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function InvoicePdf({ data, company, clients }: InvoicePdfProps) {
  const selectedClient = clients.find(c => c.id === data.clientId) || null

  const items = data.items || []
  
  const discountValue = parseFloat(data.discountValue) || 0
  
  const totals = calculateInvoiceTotals(
    items.map((i: any) => ({
      quantity: parseFloat(i.quantity) || 0,
      unitPrice: parseFloat(i.unitPrice) || 0,
      discountValue: parseFloat(i.discountValue) || 0,
      discountType: i.discountType,
      taxRate: parseFloat(i.taxRate) || 0
    })),
    discountValue,
    data.discountType
  )

  const issueDateStr = data.issueDate ? format(new Date(data.issueDate), "MMM dd, yyyy") : ""
  const dueDateStr = data.dueDate ? format(new Date(data.dueDate), "MMM dd, yyyy") : ""
  const currency = data.currency || "USD"

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyDetails}>
            <Text style={styles.companyName}>{company?.name || "Your Company"}</Text>
            {company?.address && <Text style={styles.textNormal}>{company.address}</Text>}
            {company?.email && <Text style={styles.textNormal}>{company.email}</Text>}
            {company?.phone && <Text style={styles.textNormal}>{company.phone}</Text>}
            {company?.taxId && <Text style={styles.textNormal}>Tax ID: {company.taxId}</Text>}
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.clientBox}>
            <Text style={styles.sectionTitle}>Billed To</Text>
            <Text style={styles.textMain}>
              {selectedClient ? selectedClient.name : "Select a client"}
            </Text>
            {selectedClient?.clientCompany && (
              <Text style={styles.textNormal}>{selectedClient.clientCompany}</Text>
            )}
            {selectedClient?.address && (
              <Text style={styles.textNormal}>{selectedClient.address}</Text>
            )}
            {selectedClient?.email && (
              <Text style={styles.textNormal}>{selectedClient.email}</Text>
            )}
          </View>
          
          <View style={styles.metaBox}>
            {data.invoiceNumber && (
              <View style={styles.metaGrid}>
                <Text style={styles.metaLabel}>Invoice No.</Text>
                <Text style={styles.metaValue}>{data.invoiceNumber}</Text>
              </View>
            )}
            <View style={styles.metaGrid}>
              <Text style={styles.metaLabel}>Date Issued</Text>
              <Text style={styles.metaValue}>{issueDateStr}</Text>
            </View>
            <View style={styles.metaGrid}>
              <Text style={styles.metaLabel}>Due Date</Text>
              <Text style={styles.metaValue}>{dueDateStr}</Text>
            </View>
          </View>
        </View>

        {/* Line Items */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.thText, styles.colDesc]}>Description</Text>
            <Text style={[styles.thText, styles.colPrice]}>Price</Text>
            <Text style={[styles.thText, styles.colQty]}>Qty</Text>
            <Text style={[styles.thText, styles.colTotal]}>Total</Text>
          </View>

          {items.map((item: any, i: number) => {
            const qty = parseFloat(item.quantity) || 0
            const price = parseFloat(item.unitPrice) || 0
            const lineTotal = qty * price
            return (
              <View style={styles.tableRow} key={i}>
                <Text style={[styles.textNormal, styles.colDesc]}>
                  {item.description || "Item description"}
                </Text>
                <Text style={[styles.textNormal, styles.colPrice]}>
                  {formatCurrency(price, currency)}
                </Text>
                <Text style={[styles.textNormal, styles.colQty]}>
                  {qty}
                </Text>
                <Text style={[styles.textNormal, styles.colTotal]}>
                  {formatCurrency(lineTotal, currency)}
                </Text>
              </View>
            )
          })}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>{formatCurrency(totals.subtotal, currency)}</Text>
            </View>
            
            {totals.discountTotal > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Discount</Text>
                <Text style={styles.totalValue}>-{formatCurrency(totals.discountTotal, currency)}</Text>
              </View>
            )}

            {totals.taxTotal > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax</Text>
                <Text style={styles.totalValue}>{formatCurrency(totals.taxTotal, currency)}</Text>
              </View>
            )}

            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>Total Due</Text>
              <Text style={styles.grandTotalValue}>{formatCurrency(totals.grandTotal, currency)}</Text>
            </View>
          </View>
        </View>

        {/* Notes & Terms */}
        {(data.notes || data.terms) && (
          <View style={styles.notesSection}>
            {data.notes && (
              <View style={{ marginBottom: 16 }}>
                <Text style={styles.notesTitle}>NOTES</Text>
                <Text style={styles.notesText}>{data.notes}</Text>
              </View>
            )}
            {data.terms && (
              <View>
                <Text style={styles.notesTitle}>TERMS & CONDITIONS</Text>
                <Text style={styles.notesText}>{data.terms}</Text>
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  )
}
