import React from 'react';
import { Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { WatermarkLayer } from './WatermarkLayer';
import { CompanyInfo, ClientInfo, InvoiceMeta, InvoicePayment, InvoiceTermsAndNotes, InvoiceSignatures, InvoiceFooter, InvoiceTable, InvoiceTotals } from './shared-sections';
import { getFontFamily } from './font-utils';

export function MinimalPremiumTemplate({ data, company, clients, totals, ds }: any) {
  const selectedClient = clients?.find((c: any) => c.id === data.clientId) || null;
  const colors = ds.colors;
  const sizes = ds.typography.sizes;
  const vis = ds.visibility;

  const styles = StyleSheet.create({
    page: {
      padding: ds.layout.spacing.pageMargins || 50,
      fontFamily: getFontFamily(ds.typography.fontFamily),
      backgroundColor: '#ffffff',
      color: '#111827',
      paddingBottom: 80
    },
    logo: { width: ds.layout.logoSize || 80, height: 'auto', objectFit: 'contain', marginBottom: 10 },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 60,
    },
    companyContainer: {
        flex: 1
    },
    companyName: {
      fontSize: sizes.invoiceTitle - 4,
      fontWeight: 'bold',
      letterSpacing: -0.5,
      marginBottom: 4
    },
    textNormal: {
        fontSize: sizes.bodyText,
        color: '#4b5563',
        marginBottom: 2
    },
    textBold: {
        fontSize: sizes.bodyText + 1,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4
    },
    invoiceTag: {
      fontSize: sizes.invoiceTitle - 8,
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 8,
    },
    metaGridContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 50,
    },
    metaCol: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: sizes.sectionHeading,
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 6,
    },
    metaGrid: { flexDirection: 'row', marginBottom: 4 },
    metaLabel: { width: 100, color: '#6b7280', fontSize: sizes.bodyText },
    metaValue: { flex: 1, color: '#111827', fontSize: sizes.bodyText, fontWeight: 'bold' },
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
    thText: {
      fontSize: sizes.tableText - 1,
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
    tdTextBold: { fontSize: sizes.tableText, fontWeight: 'bold', color: '#111827' },
    tdText: { fontSize: sizes.tableText, color: '#4b5563' },
    summaryContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
      marginBottom: 30
    },
    summaryBox: {
      width: '50%',
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    grandTotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
      marginTop: 8,
      borderTopWidth: 1,
      borderTopColor: '#e5e7eb',
    },
    grandTotalText: {
      fontSize: sizes.totalAmount,
      fontWeight: 'bold',
      color: '#0f172a',
    },
    footerText: {
      fontSize: sizes.footerText,
      color: '#9ca3af',
    }
  });

  return (
    <Page size="A4" style={styles.page} wrap>
      <WatermarkLayer ds={ds} companyLogo={company?.logoUrl} />

      <View style={styles.header}>
        <View style={styles.companyContainer}>
            <CompanyInfo company={company} vis={vis} styles={styles} />
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.invoiceTag}>INVOICE {data.invoiceNumber || "DRAFT"}</Text>
        </View>
      </View>

      <View style={styles.metaGridContainer}>
        <View style={styles.metaCol}>
          <Text style={styles.sectionTitle}>Billed To</Text>
          <ClientInfo client={selectedClient} vis={vis} styles={styles} />
        </View>
        <View style={styles.metaCol}>
            <Text style={styles.sectionTitle}>Details</Text>
            <InvoiceMeta data={data} vis={vis} styles={styles} />
        </View>
      </View>

      <InvoiceTable data={data} vis={vis} styles={styles} />
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <View style={{ flex: 1, paddingRight: 40 }}>
            <Text style={styles.sectionTitle}>Payment Info</Text>
            <InvoicePayment company={company} vis={vis} styles={styles} />
        </View>
        <View style={{ flex: 1 }}>
            <InvoiceTotals totals={totals} vis={vis} styles={styles} />
        </View>
      </View>

      <InvoiceTermsAndNotes data={data} vis={vis} styles={styles} />
      <InvoiceSignatures company={company} vis={vis} styles={styles} />
      <InvoiceFooter company={company} vis={vis} styles={styles} />
    </Page>
  );
}
