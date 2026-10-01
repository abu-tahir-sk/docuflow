import React from 'react';
import { Page, View, StyleSheet, Text } from '@react-pdf/renderer';
import { WatermarkLayer } from './WatermarkLayer';
import { CompanyInfo, ClientInfo, InvoiceMeta, InvoicePayment, InvoiceTermsAndNotes, InvoiceSignatures, InvoiceFooter, InvoiceTable, InvoiceTotals } from './shared-sections';
import { getFontFamily } from './font-utils';

export function CreativeTemplate({ data, company, clients, totals, ds }: any) {
    const selectedClient = clients?.find((c: any) => c.id === data.clientId) || null;
    // Overriding colors for the dark creative theme
    const colors = {
        primary: '#f97316', // Orange
        secondary: '#a855f7', // Purple
        background: '#0f172a', // Slate 900
        text: '#f1f5f9', // Slate 100
        textMuted: '#94a3b8', // Slate 400
        border: '#1e293b', // Slate 800
        tableHeader: '#1e293b',
        tableRowHover: '#1e293b',
    };
    const sizes = ds.typography.sizes;
    const vis = ds.visibility;

    const styles = StyleSheet.create({
        page: { padding: 40, fontFamily: getFontFamily(ds.typography.fontFamily), backgroundColor: colors.background },
        logo: { width: ds.layout.logoSize || 80, height: 'auto', objectFit: 'contain', marginBottom: 20 },
        header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
        companyCol: { flex: 1, paddingRight: 20 },
        invoiceMetaCol: { flex: 1, alignItems: 'flex-end', justifyContent: 'flex-start' },
        companyName: { fontSize: sizes.sectionHeading + 4, color: colors.primary, fontWeight: 'bold', marginBottom: 6 },
        textNormal: { fontSize: sizes.bodyText, color: colors.textMuted, marginBottom: 3 },
        invoiceTitle: { fontSize: sizes.invoiceTitle + 10, fontWeight: 'bold', color: colors.secondary, textTransform: 'uppercase', marginBottom: 15, letterSpacing: 2 },
        metaGrid: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 6, width: '100%' },
        metaLabel: { width: 100, color: colors.textMuted, fontSize: sizes.bodyText, textAlign: 'right', paddingRight: 15 },
        metaValue: { width: 120, fontWeight: 'bold', color: colors.text, textAlign: 'right', fontSize: sizes.bodyText },
        
        infoBox: { backgroundColor: colors.border, padding: 20, borderRadius: 12, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between' },
        billToCol: { flex: 1, paddingRight: 10 },
        paymentCol: { flex: 1, paddingLeft: 10, borderLeft: `1px solid ${colors.textMuted}` },
        sectionTitle: { fontSize: sizes.sectionHeading, color: colors.primary, marginBottom: 8, textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 1 },
        textBold: { fontSize: sizes.bodyText, color: colors.text, fontWeight: 'bold', marginBottom: 3 },
        
        table: { width: '100%', marginBottom: 30 },
        tableHeader: { flexDirection: 'row', paddingVertical: 12, borderBottom: `2px solid ${colors.secondary}` },
        thText: { color: colors.secondary, fontSize: sizes.tableText, textTransform: 'uppercase', fontWeight: 'bold' },
        tableRow: { flexDirection: 'row', paddingVertical: 14, borderBottom: `1px solid ${colors.border}` },
        tdText: { fontSize: sizes.tableText, color: colors.text },
        tdTextBold: { fontSize: sizes.tableText, color: colors.text, fontWeight: 'bold' },
        
        summaryContainer: { flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: 40 },
        summaryBox: { alignSelf: 'flex-end', width: 300, backgroundColor: colors.border, padding: 20, borderRadius: 12 },
        summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
        grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16, marginTop: 8, borderTop: `2px solid ${colors.primary}` },
        grandTotalText: { fontSize: sizes.totalAmount, color: colors.primary, fontWeight: 'bold' },
        
        footer: { marginTop: 'auto', paddingTop: 20, borderTop: `1px solid ${colors.border}` },
        footerText: { fontSize: sizes.footerText, color: colors.textMuted, textAlign: 'center' }
    });

    return (
        <Page size="A4" style={styles.page} wrap>
            <WatermarkLayer ds={ds} companyLogo={company?.logoUrl} />

            <View style={styles.header}>
                <View style={styles.companyCol}>
                    <CompanyInfo company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }}} />
                </View>
                <View style={styles.invoiceMetaCol}>
                    <Text style={styles.invoiceTitle}>INVOICE</Text>
                    <InvoiceMeta data={data} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, metaValue: { ...styles.metaValue, color: colors.text }}} />
                </View>
            </View>

            <View style={styles.infoBox}>
                <View style={styles.billToCol}>
                    <Text style={styles.sectionTitle}>Billed To</Text>
                    <ClientInfo client={selectedClient} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, textBold: { ...styles.textBold, color: colors.text }}} />
                </View>
                <View style={styles.paymentCol}>
                    <Text style={styles.sectionTitle}>Payment Details</Text>
                    <InvoicePayment company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, textBold: { ...styles.textBold, color: colors.text }}} />
                </View>
            </View>

            <InvoiceTable data={data} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }}} />
            
            <InvoiceTotals totals={totals} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, textBold: { ...styles.textBold, color: colors.text }}} />

            <View style={{ marginTop: 20 }}>
                <InvoiceTermsAndNotes data={data} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }}} />
            </View>
            
            <View style={{ marginTop: 40 }}>
                <InvoiceSignatures company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, textBold: { ...styles.textBold, color: colors.text }}} />
            </View>

            <View style={styles.footer}>
                <InvoiceFooter company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }}} />
            </View>
        </Page>
    );
}
