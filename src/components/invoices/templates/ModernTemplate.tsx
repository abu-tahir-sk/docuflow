import React from 'react';
import { Page, View, StyleSheet, Text } from '@react-pdf/renderer';
import { WatermarkLayer } from './WatermarkLayer';
import { CompanyInfo, ClientInfo, InvoiceMeta, InvoicePayment, InvoiceTermsAndNotes, InvoiceSignatures, InvoiceFooter, InvoiceTable, InvoiceTotals } from './shared-sections';

export function ModernTemplate({ data, company, clients, totals, ds }: any) {
    const selectedClient = clients?.find((c: any) => c.id === data.clientId) || null;
    const colors = ds.colors;
    const sizes = ds.typography.sizes;
    const vis = ds.visibility;

    const styles = StyleSheet.create({
        page: { padding: 0, fontFamily: 'Helvetica', backgroundColor: '#ffffff' },
        topBanner: { backgroundColor: colors.primary, padding: 40, color: '#ffffff', flexDirection: 'row', justifyContent: 'space-between' },
        companyCol: { flex: 1, paddingRight: 20 },
        invoiceMetaCol: { flex: 1, alignItems: 'flex-end' },
        companyName: { fontSize: sizes.sectionHeading, color: '#ffffff', fontWeight: 'bold', marginBottom: 4 },
        textNormal: { fontSize: sizes.bodyText, color: '#e2e8f0', marginBottom: 2 },
        invoiceTitle: { fontSize: sizes.invoiceTitle + 8, fontWeight: 'bold', color: '#ffffff', textTransform: 'uppercase', marginBottom: 10 },
        metaGrid: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 4, width: '100%' },
        metaLabel: { width: 80, color: '#e2e8f0', fontSize: sizes.bodyText, textAlign: 'right', paddingRight: 10 },
        metaValue: { width: 100, fontWeight: 'bold', color: '#ffffff', textAlign: 'right', fontSize: sizes.bodyText },
        contentWrapper: { padding: 40 },
        infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, paddingBottom: 20, borderBottom: `2px solid ${colors.tableHeader}` },
        billToCol: { flex: 1, paddingRight: 20 },
        paymentCol: { flex: 1, paddingLeft: 20 },
        sectionTitle: { fontSize: sizes.sectionHeading, color: colors.secondary, marginBottom: 4, textTransform: 'uppercase' },
        textBold: { fontSize: sizes.bodyText, color: colors.primary, fontWeight: 'bold', marginBottom: 2 },
        table: { width: '100%', marginBottom: 30 },
        tableHeader: { flexDirection: 'row', paddingVertical: 10, borderBottom: `1px solid ${colors.secondary}` },
        thText: { color: colors.secondary, fontSize: sizes.tableText, textTransform: 'uppercase' },
        tableRow: { flexDirection: 'row', paddingVertical: 12, borderBottom: `1px solid ${colors.tableHeader}` },
        tdText: { fontSize: sizes.tableText, color: colors.tableText },
        tdTextBold: { fontSize: sizes.tableText, color: colors.tableText, fontWeight: 'bold' },
        summaryContainer: { flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: 30 },
        summaryBox: { alignSelf: 'flex-end', width: 280, backgroundColor: colors.tableHeader, padding: 20, borderRadius: 8, marginTop: 20 },
        summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
        grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, marginTop: 6, borderTop: `1px solid ${colors.secondary}` },
        grandTotalText: { fontSize: sizes.totalAmount, color: colors.totalAmount, fontWeight: 'bold' },
        footerText: { fontSize: sizes.footerText, color: colors.footer }
    });

    return (
        <Page size="A4" style={styles.page} wrap>
            <WatermarkLayer ds={ds} companyLogo={company?.logoUrl} />

            <View style={styles.topBanner}>
                <View style={styles.companyCol}>
                    <CompanyInfo company={company} vis={vis} styles={styles} />
                </View>
                <View style={styles.invoiceMetaCol}>
                    <Text style={styles.invoiceTitle}>INVOICE</Text>
                    <InvoiceMeta data={data} vis={vis} styles={styles} />
                </View>
            </View>

            <View style={styles.contentWrapper}>
                <View style={styles.infoRow}>
                    <View style={styles.billToCol}>
                        <Text style={styles.sectionTitle}>Billed To</Text>
                        <ClientInfo client={selectedClient} vis={{...vis, clientEmail: true, clientPhone: true, billingAddress: true}} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.primary }}} />
                    </View>
                    <View style={styles.paymentCol}>
                        <Text style={styles.sectionTitle}>Payment Details</Text>
                        <InvoicePayment company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.primary }}} />
                    </View>
                </View>

                <InvoiceTable data={data} vis={vis} styles={styles} />
                <InvoiceTotals totals={totals} vis={vis} styles={styles} />

                <InvoiceTermsAndNotes data={data} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.primary }}} />
                <InvoiceSignatures company={company} vis={vis} styles={styles} />
                <InvoiceFooter company={company} vis={vis} styles={styles} />
            </View>
        </Page>
    );
}