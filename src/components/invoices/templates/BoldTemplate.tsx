import React from 'react';
import { Page, View, StyleSheet, Text } from '@react-pdf/renderer';
import { WatermarkLayer } from './WatermarkLayer';
import { CompanyInfo, ClientInfo, InvoiceMeta, InvoicePayment, InvoiceTermsAndNotes, InvoiceSignatures, InvoiceFooter, InvoiceTable, InvoiceTotals } from './shared-sections';
import { getFontFamily } from './font-utils';

export function BoldTemplate({ data, company, clients, totals, ds }: any) {
    const selectedClient = clients?.find((c: any) => c.id === data.clientId) || null;
    const colors = {
        primary: ds.colors.primary || '#3b82f6', // Blue
        secondary: ds.colors.secondary || '#64748b',
        background: '#1e293b', // Slate 800
        cardBg: '#0f172a', // Slate 900
        text: '#f8fafc', // Slate 50
        textMuted: '#cbd5e1', // Slate 300
        border: '#334155', // Slate 700
        tableHeader: '#334155',
    };
    const sizes = ds.typography.sizes;
    const vis = ds.visibility;

    const styles = StyleSheet.create({
        page: { padding: 40, fontFamily: getFontFamily(ds.typography.fontFamily), backgroundColor: colors.background, color: colors.text },
        header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
        headerLeft: { flex: 1, paddingRight: 20 },
        headerRight: { flex: 1, alignItems: 'flex-end' },
        
        logo: { width: ds.layout.logoSize || 80, height: 'auto', objectFit: 'contain', marginBottom: 20 },
        companyName: { fontSize: sizes.sectionHeading + 4, color: colors.text, fontWeight: 'bold', marginBottom: 8 },
        textNormal: { fontSize: sizes.bodyText, color: colors.textMuted, marginBottom: 3 },
        textBold: { fontSize: sizes.bodyText, color: colors.text, fontWeight: 'bold', marginBottom: 3 },
        
        invoiceTitle: { fontSize: sizes.invoiceTitle + 14, fontWeight: 'bold', color: colors.primary, textTransform: 'uppercase', marginBottom: 15, letterSpacing: 1 },
        sectionTitle: { fontSize: sizes.sectionHeading, color: colors.primary, marginBottom: 8, textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 1 },
        
        metaGrid: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 6, width: '100%' },
        metaLabel: { width: 90, color: colors.textMuted, fontSize: sizes.bodyText, paddingRight: 10, textAlign: 'right' },
        metaValue: { width: 120, fontWeight: 'bold', color: colors.text, fontSize: sizes.bodyText, textAlign: 'right' },
        
        infoCard: { backgroundColor: colors.cardBg, padding: 24, borderRadius: 8, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-between', border: `1px solid ${colors.border}` },
        infoCol: { flex: 1 },
        
        table: { width: '100%', marginBottom: 30 },
        tableHeader: { flexDirection: 'row', paddingVertical: 12, borderBottom: `2px solid ${colors.primary}`, backgroundColor: colors.cardBg, paddingHorizontal: 10, borderRadius: 4 },
        thText: { color: colors.primary, fontSize: sizes.tableText, textTransform: 'uppercase', fontWeight: 'bold' },
        tableRow: { flexDirection: 'row', paddingVertical: 12, borderBottom: `1px solid ${colors.border}`, paddingHorizontal: 10 },
        tdText: { fontSize: sizes.tableText, color: colors.text },
        tdTextBold: { fontSize: sizes.tableText, color: colors.text, fontWeight: 'bold' },
        
        summaryContainer: { flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: 40 },
        summaryBox: { alignSelf: 'flex-end', width: '50%', backgroundColor: colors.cardBg, padding: 20, borderRadius: 8, border: `1px solid ${colors.border}` },
        summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
        grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, marginTop: 8, borderTop: `1px solid ${colors.border}` },
        grandTotalText: { fontSize: sizes.totalAmount, color: colors.primary, fontWeight: 'bold' },
        
        footer: { marginTop: 'auto', paddingTop: 20, borderTop: `1px solid ${colors.border}` },
        footerText: { fontSize: sizes.footerText, color: colors.textMuted, textAlign: 'center' }
    });

    return (
        <Page size="A4" style={styles.page} wrap>
            <WatermarkLayer ds={ds} companyLogo={company?.logoUrl} />

            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <CompanyInfo company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }}} />
                </View>
                <View style={styles.headerRight}>
                    <Text style={styles.invoiceTitle}>INVOICE</Text>
                    <InvoiceMeta data={data} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, metaValue: { ...styles.metaValue, color: colors.text }}} />
                </View>
            </View>

            <View style={styles.infoCard}>
                <View style={[styles.infoCol, { paddingRight: 20 }]}>
                    <Text style={styles.sectionTitle}>Billed To</Text>
                    <ClientInfo client={selectedClient} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, textBold: { ...styles.textBold, color: colors.text }}} />
                </View>
                <View style={[styles.infoCol, { paddingLeft: 20, borderLeft: `1px solid ${colors.border}` }]}>
                    <Text style={styles.sectionTitle}>Payment Details</Text>
                    <InvoicePayment company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, textBold: { ...styles.textBold, color: colors.text }}} />
                </View>
            </View>
            
            <InvoiceTable data={data} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }}} />
            
            <InvoiceTotals totals={totals} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, textBold: { ...styles.textBold, color: colors.text }}} />

            <InvoiceTermsAndNotes data={data} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }}} />
            
            <View style={{ marginTop: 40 }}>
                <InvoiceSignatures company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, textBold: { ...styles.textBold, color: colors.text }}} />
            </View>

            <View style={styles.footer}>
                <InvoiceFooter company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, footerText: { ...styles.footerText, color: colors.textMuted }}} />
            </View>
        </Page>
    );
}
