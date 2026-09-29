import React from 'react';
import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { WatermarkLayer } from './WatermarkLayer';

export function ClassicTemplate({ data, company, clients, totals, ds }: any) {
    const selectedClient = clients?.find((c: any) => c.id === data.clientId) || null;
    const colors = ds.colors;
    const sizes = ds.typography.sizes;
    const vis = ds.visibility;

    const styles = StyleSheet.create({
        page: {
            padding: ds.layout.spacing.pageMargins || 40,
            fontFamily: 'Helvetica',
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
        summaryContainer: { flexDirection: 'row', justifyContent: 'flex-end', width: '100%', marginBottom: 30 },
        summaryBox: { width: 250 },
        summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottom: `1px solid #e2e8f0` },
        grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTop: `2px solid ${colors.totalAmount}`, marginTop: 4 },
        grandTotalText: { fontWeight: 'bold', fontSize: sizes.totalAmount, color: colors.totalAmount }
    });

    return (
        <Page size="A4" style={styles.page} wrap>
            <WatermarkLayer ds={ds} companyLogo={company?.logoUrl} />

            <View style={styles.headerRow}>
                <View style={styles.companyCol}>
                    {vis.logo && company?.logoUrl && (
                        <Image src={company.logoUrl} style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 10 }} />
                    )}
                    <Text style={styles.companyName}>{company?.name}</Text>
                    {vis.billingAddress && company?.address && <Text style={styles.textNormal}>{company.address}</Text>}
                    <Text style={styles.textNormal}>{company?.email}</Text>
                    <Text style={styles.textNormal}>{company?.phone}</Text>
                </View>
                <View style={styles.invoiceMetaCol}>
                    <Text style={styles.invoiceTitle}>INVOICE</Text>
                    <View style={styles.metaGrid}>
                        <Text style={styles.metaLabel}>Invoice No:</Text>
                        <Text style={styles.metaValue}>{data.invoiceNumber || "DRAFT"}</Text>
                    </View>
                    <View style={styles.metaGrid}>
                        <Text style={styles.metaLabel}>Issue Date:</Text>
                        <Text style={styles.metaValue}>{data.issueDate ? format(new Date(data.issueDate), "MMM dd, yyyy") : ""}</Text>
                    </View>
                    <View style={styles.metaGrid}>
                        <Text style={styles.metaLabel}>Due Date:</Text>
                        <Text style={styles.metaValue}>{data.dueDate ? format(new Date(data.dueDate), "MMM dd, yyyy") : ""}</Text>
                    </View>
                    {vis.status && (
                        <View style={styles.metaGrid}>
                            <Text style={styles.metaLabel}>Status:</Text>
                            <Text style={styles.metaValue}>{data.status}</Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.billToCol}>
                    <Text style={styles.sectionTitle}>Bill To</Text>
                    <Text style={styles.textBold}>{selectedClient?.name || "Select Client"}</Text>
                    {selectedClient?.clientCompany && <Text style={styles.textNormal}>{selectedClient.clientCompany}</Text>}
                    {vis.billingAddress && selectedClient?.address && <Text style={styles.textNormal}>{selectedClient.address}</Text>}
                </View>
                <View style={styles.paymentCol}>
                    {vis.paymentInfo && company?.accountNumber && (
                        <>
                            <Text style={styles.sectionTitle}>Payment Details</Text>
                            <Text style={styles.textNormal}>Bank: {company.bankName}</Text>
                            <Text style={styles.textNormal}>Acct Name: {company.accountName}</Text>
                            <Text style={styles.textNormal}>Acct No: {company.accountNumber}</Text>
                        </>
                    )}
                </View>
            </View>

            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.thText, { flex: 4 }]}>Description</Text>
                    <Text style={[styles.thText, { flex: 1, textAlign: 'right' }]}>Qty</Text>
                    <Text style={[styles.thText, { flex: 1.5, textAlign: 'right' }]}>Price</Text>
                    <Text style={[styles.thText, { flex: 1.5, textAlign: 'right' }]}>Total</Text>
                </View>
                {data.items?.map((item: any, i: number) => (
                    <View style={styles.tableRow} key={i}>
                        <Text style={[styles.tdText, { flex: 4 }]}>{item.description}</Text>
                        <Text style={[styles.tdText, { flex: 1, textAlign: 'right' }]}>{item.quantity}</Text>
                        <Text style={[styles.tdText, { flex: 1.5, textAlign: 'right' }]}>{item.unitPrice}</Text>
                        <Text style={[styles.tdText, { flex: 1.5, textAlign: 'right' }]}>{(item.quantity * item.unitPrice).toFixed(2)}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.summaryContainer} wrap={false}>
                <View style={styles.summaryBox}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.textNormal}>Subtotal</Text>
                        <Text style={styles.textBold}>{totals.subtotal.toFixed(2)}</Text>
                    </View>
                    {totals.taxTotal > 0 && (
                        <View style={styles.summaryRow}>
                            <Text style={styles.textNormal}>Tax</Text>
                            <Text style={styles.textBold}>{totals.taxTotal.toFixed(2)}</Text>
                        </View>
                    )}
                    <View style={styles.grandTotalRow}>
                        <Text style={styles.grandTotalText}>Total Due</Text>
                        <Text style={styles.grandTotalText}>{totals.grandTotal.toFixed(2)}</Text>
                    </View>
                </View>
            </View>

            {(vis.notes && data.notes) || (vis.terms && data.terms) ? (
                <View style={{ marginTop: 20, paddingTop: 10, borderTop: `1px solid ${colors.secondary}` }} wrap={false}>
                    {vis.notes && data.notes && (
                        <View style={{ marginBottom: 12 }}>
                            <Text style={styles.sectionTitle}>Notes</Text>
                            <Text style={styles.textNormal}>{data.notes}</Text>
                        </View>
                    )}
                    {vis.terms && data.terms && (
                        <View>
                            <Text style={styles.sectionTitle}>Terms & Conditions</Text>
                            <Text style={styles.textNormal}>{data.terms}</Text>
                        </View>
                    )}
                </View>
            ) : null}

            {(vis.signature || vis.seal) && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }} wrap={false}>
                    <View style={{ width: 150, alignItems: 'center' }}>
                        {vis.seal && company?.sealUrl && <Image src={company.sealUrl} style={{ width: 80, height: 80, objectFit: 'contain' }} />}
                    </View>
                    <View style={{ width: 200, alignItems: 'center' }}>
                        {vis.signature && company?.signatureUrl ? (
                            <Image src={company.signatureUrl} style={{ width: 120, height: 60, objectFit: 'contain', marginBottom: 5 }} />
                        ) : (
                            <View style={{ height: 60, marginBottom: 5 }} />
                        )}
                        {vis.signature && <Text style={{ fontSize: sizes.footerText, color: colors.primary, borderTop: `1px solid ${colors.primary}`, paddingTop: 4, width: '100%', textAlign: 'center' }}>Authorized Signature</Text>}
                    </View>
                </View>
            )}

            {vis.footer && (
                <View style={{ position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', borderTop: `1px solid #e2e8f0`, paddingTop: 10 }} fixed>
                    <Text style={{ fontSize: sizes.footerText, color: colors.footer }}>{company?.name} • Generated by DocuFlow</Text>
                </View>
            )}
        </Page>
    );
}