import React from 'react';
import { Page, View, StyleSheet, Text } from '@react-pdf/renderer';
import { WatermarkLayer } from './WatermarkLayer';
import { CompanyInfo, ClientInfo, InvoiceMeta, InvoicePayment, InvoiceTermsAndNotes, InvoiceSignatures, InvoiceFooter, InvoiceTable, InvoiceTotals } from './shared-sections';
import { getFontFamily } from './font-utils';

export function ClassicTemplate({ data, company, clients, totals, ds }: any) {
    const selectedClient = clients?.find((c: any) => c.id === data.clientId) || null;
    const colors = ds.colors;
    const sizes = ds.typography.sizes;
    const vis = ds.visibility;

    const styles = StyleSheet.create({
        page: {
            padding: ds.layout.spacing.pageMargins || 40,
            fontFamily: getFontFamily(ds.typography.fontFamily),
            backgroundColor: '#ffffff',
            paddingBottom: 80
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 20,
            borderBottom: `2px solid ${colors.primary}`,
            marginBottom: 30
        },
        logo: { width: ds.layout.logoSize || 80, height: 'auto', objectFit: 'contain', marginBottom: 10 },
        companyCol: { flex: 1, paddingRight: 20 },
        invoiceMetaCol: { flex: 1, alignItems: 'flex-end' },
        companyName: { fontSize: sizes.invoiceTitle - 8, fontWeight: 'bold', color: colors.primary, marginBottom: 4 },
        invoiceTitle: { fontSize: sizes.invoiceTitle, fontWeight: 'bold', color: colors.invoiceTitle, letterSpacing: 2, marginBottom: 10 },
        textNormal: { fontSize: sizes.bodyText, color: colors.primary, marginBottom: 3 },
        textBold: { fontSize: sizes.bodyText, color: colors.primary, fontWeight: 'bold', marginBottom: 3 },
        metaGrid: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 4, width: '100%' },
        metaLabel: { width: 80, color: colors.secondary, fontSize: sizes.bodyText, textAlign: 'right', paddingRight: 10 },
        metaValue: { width: 100, fontWeight: 'bold', color: colors.primary, textAlign: 'right', fontSize: sizes.bodyText },
        sectionTitle: { fontSize: sizes.sectionHeading, fontWeight: 'bold', color: colors.secondary, textTransform: 'uppercase', marginBottom: 8, borderBottom: `1px solid ${colors.secondary}`, paddingBottom: 4 },
        infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
        billToCol: { flex: 1, paddingRight: 20 },
        paymentCol: { flex: 1, paddingLeft: 20 },
        table: { width: '100%', marginBottom: 30 },
        tableHeader: { flexDirection: 'row', backgroundColor: colors.tableHeader, padding: 8, borderBottom: `1px solid ${colors.primary}` },
        thText: { fontWeight: 'bold', color: colors.tableText, fontSize: sizes.tableText, textTransform: 'uppercase' },
        tableRow: { flexDirection: 'row', padding: 8, borderBottom: `1px solid #e2e8f0` },
        tdText: { fontSize: sizes.tableText, color: colors.tableText },
        tdTextBold: { fontSize: sizes.tableText, color: colors.tableText, fontWeight: 'bold' },
        summaryContainer: { flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: 30 },
        summaryBox: { width: 250 },
        summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottom: `1px solid #e2e8f0` },
        grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTop: `2px solid ${colors.totalAmount}`, marginTop: 4 },
        grandTotalText: { fontWeight: 'bold', fontSize: sizes.totalAmount, color: colors.totalAmount },
        footerText: { fontSize: sizes.footerText, color: colors.footer }
    });

    return (
        <Page size="A4" style={styles.page} wrap>
            <WatermarkLayer ds={ds} companyLogo={company?.logoUrl} />

            <View style={styles.headerRow}>
                <View style={styles.companyCol}>
                    <CompanyInfo company={company} vis={vis} styles={styles} />
                </View>
                <View style={styles.invoiceMetaCol}>
                    <Text style={styles.invoiceTitle}>INVOICE</Text>
                    <InvoiceMeta data={data} vis={vis} styles={styles} />
                </View>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.billToCol}>
                    <Text style={styles.sectionTitle}>Bill To</Text>
                    <ClientInfo client={selectedClient} vis={vis} styles={styles} />
                </View>
                <View style={styles.paymentCol}>
                    <Text style={styles.sectionTitle}>Payment Details</Text>
                    <InvoicePayment company={company} vis={vis} styles={styles} />
                </View>
            </View>

            <InvoiceTable data={data} vis={vis} styles={styles} />
            <InvoiceTotals totals={totals} vis={vis} styles={styles} />

            <InvoiceTermsAndNotes data={data} vis={vis} styles={styles} />
            <InvoiceSignatures company={company} vis={vis} styles={styles} />
            <InvoiceFooter company={company} vis={vis} styles={styles} />
        </Page>
    );
}