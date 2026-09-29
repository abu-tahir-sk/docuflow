import React from 'react';
import { Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';

// Minimalist, premium styling inspired by Vercel/Stripe
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    color: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  invoiceTag: {
    fontSize: 12,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 8,
  },
  metaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  metaCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  metaValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 1.5,
  },
  table: {
    width: '100%',
    marginBottom: 40,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
    marginBottom: 12,
  },
  colDesc: { flex: 4 },
  colQty: { flex: 1, textAlign: 'right' },
  colPrice: { flex: 1.5, textAlign: 'right' },
  colTotal: { flex: 1.5, textAlign: 'right' },
  thText: {
    fontSize: 10,
    color: '#6b7280',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  tdTextDesc: { fontSize: 11, fontWeight: 'bold', color: '#111827' },
  tdText: { fontSize: 11, color: '#4b5563' },
  summaryWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  summaryBox: {
    width: '50%',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 11,
    color: '#111827',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a', // Primary pop for total
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
  },
  footerText: {
    fontSize: 10,
    color: '#9ca3af',
  },
});

export function MinimalPremiumTemplate({ data, company, clients, totals, ds }: any) {
  const client = clients?.find((c: any) => c.id === data.clientId) || null;
  const currencySymbol = data.currency === 'USD' ? '$' : (data.currency === 'EUR' ? '€' : (data.currency === 'GBP' ? '£' : '₹'));

  return (
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandName}>{company?.name || "Your Company"}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.invoiceTag}>INVOICE {data.invoiceNumber}</Text>
        </View>
      </View>

      {/* Metadata Grid */}
      <View style={styles.metaGrid}>
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>Billed To</Text>
          <Text style={styles.metaValue}>{client ? client.name : "Client Name"}</Text>
          {client?.clientCompany && <Text style={styles.metaText}>{client.clientCompany}</Text>}
          {client?.address && <Text style={styles.metaText}>{client.address}</Text>}
        </View>
        
        <View style={styles.metaCol}>
          <Text style={styles.metaLabel}>Invoice Date</Text>
          <Text style={styles.metaValue}>
            {data.issueDate ? format(new Date(data.issueDate), "MMM dd, yyyy") : ""}
          </Text>
          
          <Text style={[styles.metaLabel, { marginTop: 16 }]}>Due Date</Text>
          <Text style={styles.metaValue}>
            {data.dueDate ? format(new Date(data.dueDate), "MMM dd, yyyy") : ""}
          </Text>
        </View>
      </View>

      {/* Line Items */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, styles.colDesc]}>Description</Text>
          <Text style={[styles.thText, styles.colPrice]}>Price</Text>
          <Text style={[styles.thText, styles.colQty]}>Qty</Text>
          <Text style={[styles.thText, styles.colTotal]}>Amount</Text>
        </View>
        
        {data.items?.map((item: any, i: number) => {
          const qty = parseFloat(item.quantity) || 0;
          const price = parseFloat(item.unitPrice) || 0;
          
          return (
            <View style={styles.tableRow} key={i}>
              <Text style={[styles.tdTextDesc, styles.colDesc]}>{item.description || "Description"}</Text>
              <Text style={[styles.tdText, styles.colPrice]}>{currencySymbol}{price.toFixed(2)}</Text>
              <Text style={[styles.tdText, styles.colQty]}>{qty}</Text>
              <Text style={[styles.tdText, styles.colTotal]}>{currencySymbol}{(qty * price).toFixed(2)}</Text>
            </View>
          );
        })}
      </View>

      {/* Totals */}
      <View style={styles.summaryWrapper}>
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{currencySymbol}{totals?.subtotal?.toFixed(2) || "0.00"}</Text>
          </View>
          
          {totals?.discountTotal > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.summaryValue}>-{currencySymbol}{totals.discountTotal.toFixed(2)}</Text>
            </View>
          )}

          {totals?.taxTotal > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>{currencySymbol}{totals.taxTotal.toFixed(2)}</Text>
            </View>
          )}

          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total Due</Text>
            <Text style={styles.grandTotalValue}>{currencySymbol}{totals?.grandTotal?.toFixed(2) || "0.00"}</Text>
          </View>
        </View>
      </View>

      {/* Footer / Notes */}
      {data.notes && (
        <View style={{ marginTop: 40, maxWidth: '60%' }}>
          <Text style={styles.metaLabel}>Notes</Text>
          <Text style={styles.metaText}>{data.notes}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for your business. Generated by DocuFlow.</Text>
      </View>
    </Page>
  );
}
