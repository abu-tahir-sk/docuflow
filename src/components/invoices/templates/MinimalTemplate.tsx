import React from 'react';
import { Page, View, StyleSheet, Text } from '@react-pdf/renderer';
import { WatermarkLayer } from './WatermarkLayer';
import { CompanyInfo, ClientInfo, InvoiceMeta, InvoicePayment, InvoiceTermsAndNotes, InvoiceSignatures, InvoiceFooter, InvoiceTable, InvoiceTotals } from './shared-sections';
import { getFontFamily } from './font-utils';

export function MinimalTemplate({ data, company, clients, totals, ds }: any) {
    const selectedClient = clients?.find((c: any) => c.id === data.clientId) || null;
    const colors = ds.colors;
    const sizes = ds.typography.sizes;
    const vis = ds.visibility;

    const styles = StyleSheet.create({
        page: {
            padding: 60, // Larger margins for minimal aesthetic
            fontFamily: getFontFamily(ds.typography.fontFamily),
            backgroundColor: '#ffffff',
            paddingBottom: 80
        },
        logo: { width: ds.layout.logoSize || 80, height: 'auto', objectFit: 'contain', marginBottom: 10 },
        topSection: { marginBottom: 50 },
        invoiceTitle: { fontSize: sizes.invoiceTitle + 4, color: colors.invoiceTitle, letterSpacing: -1, marginBottom: 20 },
        gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
        col: { flex: 1, paddingRight: 20 },
        sectionTitle: { fontSize: sizes.sectionHeading - 2, color: colors.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
        textNormal: { fontSize: sizes.bodyText, color: colors.primary, marginBottom: 4 },
        textBold: { fontSize: sizes.bodyText, color: colors.primary, fontWeight: 'bold', marginBottom: 4 },
        companyName: { fontSize: sizes.bodyText, color: colors.primary, fontWeight: 'bold', marginBottom: 4 },
        metaGrid: { flexDirection: 'row', marginBottom: 4 },
        metaLabel: { width: 80, color: colors.secondary, fontSize: sizes.bodyText },
        metaValue: { flex: 1, color: colors.primary, fontSize: sizes.bodyText },
        table: { width: '100%', marginBottom: 30 },
        tableHeader: { flexDirection: 'row', paddingBottom: 10, borderBottom: `1px solid #f1f5f9`, marginBottom: 10 },
        thText: { color: colors.secondary, fontSize: sizes.tableText - 1, textTransform: 'uppercase', letterSpacing: 1 },
        tableRow: { flexDirection: 'row', paddingVertical: 10 },
        tdText: { fontSize: sizes.tableText, color: colors.primary },
        tdTextBold: { fontSize: sizes.tableText, color: colors.primary, fontWeight: 'bold' },
        summaryContainer: { flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: 30 },
        summaryBox: { alignSelf: 'flex-end', width: 200, marginTop: 40 },
        summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
        grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, marginTop: 10, borderTop: `1px solid #000000` },
        grandTotalText: { fontWeight: 'bold', fontSize: sizes.totalAmount, color: colors.primary },
        footerText: { fontSize: sizes.footerText, color: colors.footer }
    });

    return (
        <Page size="A4" style={styles.page} wrap>
            <WatermarkLayer ds={ds} companyLogo={company?.logoUrl} />

            <View style={styles.topSection}>
                <Text style={styles.invoiceTitle}>Invoice</Text>
                <CompanyInfo company={company} vis={vis} styles={styles} />
            </View>

            <View style={styles.gridRow}>
                <View style={styles.col}>
                    <Text style={styles.sectionTitle}>Billed To</Text>
                    <ClientInfo client={selectedClient} vis={vis} styles={styles} />
                </View>
                <View style={styles.col}>
                    <Text style={styles.sectionTitle}>Invoice Details</Text>
                    <InvoiceMeta data={data} vis={vis} styles={styles} />
                </View>
            </View>

            <InvoiceTable data={data} vis={vis} styles={styles} />
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <View style={{ flex: 1, paddingRight: 40 }}>
                    <Text style={styles.sectionTitle}>Payment Details</Text>
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