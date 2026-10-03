import React from 'react';
import { Page, View, StyleSheet, Text } from '@react-pdf/renderer';
import { WatermarkLayer } from './WatermarkLayer';
import { CompanyInfo, ClientInfo, InvoiceMeta, InvoicePayment, InvoiceTermsAndNotes, InvoiceSignatures, InvoiceFooter, InvoiceTable, InvoiceTotals } from './shared-sections';
import { getFontFamily } from './font-utils';

export function PremiumQuotationTemplate({ data, company, clients, totals, ds }: any) {
    const selectedClient = clients?.find((c: any) => c.id === data.clientId) || null;
    
    // Forcing premium quotation aesthetic while respecting user overrides where possible
    const colors = {
        primary: ds.colors?.primary || '#0f172a', // Slate 900
        secondary: '#3b82f6', // Blue 500 (Subtle blue accent)
        background: '#ffffff',
        text: '#334155', // Slate 700
        textMuted: '#64748b', // Slate 500
        border: '#e2e8f0', // Slate 200
        tableHeader: '#f8fafc', // Slate 50
        tableText: '#334155',
        totalAmount: '#3b82f6'
    };
    
    const sizes = ds.typography?.sizes || {
        invoiceTitle: 28,
        sectionHeading: 12,
        bodyText: 10,
        tableText: 10,
        totalAmount: 14,
        footerText: 8
    };
    const vis = ds.visibility || {};

    const isQuotation = !!data.quotationNumber;
    const documentTitle = isQuotation ? "QUOTATION" : "INVOICE";

    const styles = StyleSheet.create({
        page: { 
            padding: 40, 
            fontFamily: getFontFamily(ds.typography?.fontFamily), 
            backgroundColor: colors.background,
            paddingBottom: 80 
        },
        logo: { 
            width: ds.layout?.logoSize || 100, 
            height: 'auto', 
            objectFit: 'contain', 
            marginBottom: 20 
        },
        headerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 40,
        },
        companyCol: {
            flex: 1,
            paddingRight: 20
        },
        titleCol: {
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-start'
        },
        companyName: { 
            fontSize: sizes.sectionHeading + 4, 
            color: colors.primary, 
            fontWeight: 'bold', 
            marginBottom: 6 
        },
        textNormal: { 
            fontSize: sizes.bodyText, 
            color: colors.textMuted, 
            marginBottom: 3 
        },
        invoiceTitle: { 
            fontSize: sizes.invoiceTitle, 
            fontWeight: 'bold', 
            color: colors.secondary, 
            textTransform: 'uppercase', 
            marginBottom: 15, 
            letterSpacing: 2 
        },
        metaGrid: { 
            flexDirection: 'row', 
            justifyContent: 'flex-end', 
            marginBottom: 6, 
            width: '100%' 
        },
        metaLabel: { 
            width: 100, 
            color: colors.textMuted, 
            fontSize: sizes.bodyText, 
            textAlign: 'right', 
            paddingRight: 15 
        },
        metaValue: { 
            width: 120, 
            fontWeight: 'bold', 
            color: colors.primary, 
            textAlign: 'right', 
            fontSize: sizes.bodyText 
        },
        
        infoBox: { 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            marginBottom: 40,
            paddingTop: 20,
            borderTop: `2px solid ${colors.border}`
        },
        billToCol: { 
            flex: 1, 
            paddingRight: 10 
        },
        paymentCol: { 
            flex: 1, 
            paddingLeft: 20, 
            borderLeft: `1px solid ${colors.border}` 
        },
        sectionTitle: { 
            fontSize: sizes.sectionHeading, 
            color: colors.secondary, 
            marginBottom: 10, 
            textTransform: 'uppercase', 
            fontWeight: 'bold', 
            letterSpacing: 1 
        },
        textBold: { 
            fontSize: sizes.bodyText, 
            color: colors.primary, 
            fontWeight: 'bold', 
            marginBottom: 3 
        },
        
        table: { 
            width: '100%', 
            marginBottom: 40 
        },
        tableHeader: { 
            flexDirection: 'row', 
            paddingVertical: 12,
            paddingHorizontal: 10,
            backgroundColor: colors.tableHeader,
            borderBottom: `2px solid ${colors.secondary}`,
            borderRadius: 4
        },
        thText: { 
            color: colors.primary, 
            fontSize: sizes.tableText, 
            textTransform: 'uppercase', 
            fontWeight: 'bold' 
        },
        tableRow: { 
            flexDirection: 'row', 
            paddingVertical: 12, 
            paddingHorizontal: 10,
            borderBottom: `1px solid ${colors.border}` 
        },
        tdText: { 
            fontSize: sizes.tableText, 
            color: colors.text 
        },
        tdTextBold: { 
            fontSize: sizes.tableText, 
            color: colors.primary, 
            fontWeight: 'bold' 
        },
        
        summaryContainer: { 
            flexDirection: 'row', 
            justifyContent: 'flex-end', 
            width: '100%', 
            marginBottom: 40 
        },
        summaryBox: { 
            width: 320, 
            backgroundColor: colors.tableHeader, 
            padding: 24, 
            borderRadius: 8 
        },
        summaryRow: { 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            paddingVertical: 8 
        },
        grandTotalRow: { 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            paddingTop: 16, 
            marginTop: 8, 
            borderTop: `2px solid ${colors.secondary}` 
        },
        grandTotalText: { 
            fontSize: sizes.totalAmount, 
            color: colors.secondary, 
            fontWeight: 'bold' 
        },
        
        footer: { 
            position: 'absolute', 
            bottom: 30, 
            left: 40, 
            right: 40,
            paddingTop: 20, 
            borderTop: `1px solid ${colors.border}` 
        },
        footerText: { 
            fontSize: sizes.footerText, 
            color: colors.textMuted, 
            textAlign: 'center' 
        }
    });

    return (
        <Page size="A4" style={styles.page} wrap>
            <WatermarkLayer ds={ds} companyLogo={company?.logoUrl} />

            <View style={styles.headerContainer}>
                <View style={styles.companyCol}>
                    <CompanyInfo company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }}} />
                </View>
                <View style={styles.titleCol}>
                    <Text style={styles.invoiceTitle}>{documentTitle}</Text>
                    {/* Custom Meta to handle "Valid Until" for quotations */}
                    <View style={styles.metaGrid}>
                        <Text style={styles.metaLabel}>{isQuotation ? "Quote No:" : "Invoice No:"}</Text>
                        <Text style={styles.metaValue}>{data.invoiceNumber || data.quotationNumber || "DRAFT"}</Text>
                    </View>
                    {vis.showIssueDate !== false && data.issueDate && (
                        <View style={styles.metaGrid}>
                            <Text style={styles.metaLabel}>{isQuotation ? "Quote Date:" : "Issue Date:"}</Text>
                            <Text style={styles.metaValue}>{new Date(data.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
                        </View>
                    )}
                    {vis.showDueDate !== false && data.dueDate && (
                        <View style={styles.metaGrid}>
                            <Text style={styles.metaLabel}>{isQuotation ? "Valid Until:" : "Due Date:"}</Text>
                            <Text style={styles.metaValue}>{new Date(data.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
                        </View>
                    )}
                    {vis.showStatus !== false && vis.status !== false && data.status && (
                        <View style={styles.metaGrid}>
                            <Text style={styles.metaLabel}>Status:</Text>
                            <Text style={styles.metaValue}>{data.status}</Text>
                        </View>
                    )}
                    {vis.showPO !== false && data.poReference && (
                        <View style={styles.metaGrid}>
                            <Text style={styles.metaLabel}>PO Ref:</Text>
                            <Text style={styles.metaValue}>{data.poReference}</Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.infoBox}>
                <View style={styles.billToCol}>
                    <Text style={styles.sectionTitle}>{isQuotation ? "Prepared For" : "Billed To"}</Text>
                    <ClientInfo client={selectedClient} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, textBold: { ...styles.textBold, color: colors.primary }}} />
                </View>
                <View style={styles.paymentCol}>
                    <Text style={styles.sectionTitle}>Payment Details</Text>
                    <InvoicePayment company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, textBold: { ...styles.textBold, color: colors.primary }}} />
                </View>
            </View>

            <InvoiceTable data={data} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }}} />
            
            <InvoiceTotals totals={totals} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, textBold: { ...styles.textBold, color: colors.primary }}} />

            <View style={{ marginTop: 10 }}>
                <InvoiceTermsAndNotes data={data} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }}} />
            </View>
            
            <View style={{ marginTop: 40 }}>
                <InvoiceSignatures company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }, textBold: { ...styles.textBold, color: colors.primary }}} />
            </View>

            <View style={styles.footer} fixed>
                <InvoiceFooter company={company} vis={vis} styles={{...styles, textNormal: { ...styles.textNormal, color: colors.textMuted }}} />
            </View>
        </Page>
    );
}
