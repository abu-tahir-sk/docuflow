import React from 'react';
import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns'; //[cite: 2]
import { WatermarkLayer } from './WatermarkLayer';

// Helper functions for fonts and currency formatting would be imported from a shared utils file here.

export function ModernTemplate({ data, company, clients, totals, ds }: any) {
    const selectedClient = clients?.find((c: any) => c.id === data.clientId) || null; //[cite: 2]
    const colors = ds.colors; //[cite: 6]
    const sizes = ds.typography.sizes; //[cite: 6]
    const vis = ds.visibility; //[cite: 6]

    const styles = StyleSheet.create({
        page: { padding: 0, fontFamily: 'Helvetica', backgroundColor: '#ffffff' },
        topBanner: { backgroundColor: colors.primary, padding: 40, color: '#ffffff', flexDirection: 'row', justifyContent: 'space-between' },
        invoiceTitle: { fontSize: sizes.invoiceTitle + 8, fontWeight: 'bold', color: '#ffffff', textTransform: 'uppercase' },
        contentWrapper: { padding: 40 },
        clientGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, paddingBottom: 20, borderBottom: `2px solid ${colors.tableHeader}` },
        sectionLabel: { fontSize: sizes.sectionHeading, color: colors.secondary, marginBottom: 4, textTransform: 'uppercase' },
        valueText: { fontSize: sizes.bodyText, color: colors.primary, marginBottom: 2 },
        valueTextBold: { fontSize: sizes.bodyText, color: colors.primary, fontWeight: 'bold', marginBottom: 2 },
        tableHeader: { flexDirection: 'row', paddingVertical: 10, borderBottom: `1px solid ${colors.secondary}` },
        thText: { color: colors.secondary, fontSize: sizes.tableText, textTransform: 'uppercase' },
        tableRow: { flexDirection: 'row', paddingVertical: 12, borderBottom: `1px solid ${colors.tableHeader}` },
        tdText: { fontSize: sizes.tableText, color: colors.tableText },
        summaryBox: { alignSelf: 'flex-end', width: 280, backgroundColor: colors.tableHeader, padding: 20, borderRadius: 8, marginTop: 20 },
        summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
        grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 12, marginTop: 6, borderTop: `1px solid ${colors.secondary}` },
        grandTotalText: { fontSize: sizes.totalAmount, color: colors.totalAmount, fontWeight: 'bold' }
    });

    return (
        <Page size="A4" style={styles.page} wrap>
            <WatermarkLayer ds={ds} companyLogo={company?.logoUrl} />

            {/* Modern Header Banner */}
            <View style={styles.topBanner}>
                <View>
                    {vis.logo && company?.logoUrl && <Image src={company.logoUrl} style={{ width: 100, height: 40, objectFit: 'contain', marginBottom: 10 }} />}
                    <Text style={{ fontSize: sizes.sectionHeading, color: '#ffffff', fontWeight: 'bold' }}>{company?.name}</Text>
                    <Text style={{ fontSize: sizes.bodyText, color: '#e2e8f0' }}>{company?.address}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.invoiceTitle}>Invoice</Text>
                    <Text style={{ fontSize: sizes.bodyText, color: '#e2e8f0', marginTop: 10 }}>#{data.invoiceNumber || "DRAFT"}</Text>
                    <View style={{ backgroundColor: '#ffffff', color: colors.primary, padding: '4 12', borderRadius: 4, marginTop: 8 }}>
                        <Text style={{ fontSize: sizes.bodyText, fontWeight: 'bold' }}>{data.status}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.contentWrapper}>
                <View style={styles.clientGrid}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.sectionLabel}>Billed To</Text>
                        <Text style={styles.valueTextBold}>{selectedClient?.name}</Text>
                        {selectedClient?.clientCompany && <Text style={styles.valueText}>{selectedClient.clientCompany}</Text>}
                        <Text style={styles.valueText}>{selectedClient?.email}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={styles.sectionLabel}>Invoice Details</Text>
                        <Text style={styles.valueText}>Date: {data.issueDate ? format(new Date(data.issueDate), "MMM dd, yyyy") : ""}</Text>
                        <Text style={styles.valueText}>Due: {data.dueDate ? format(new Date(data.dueDate), "MMM dd, yyyy") : ""}</Text>
                    </View>
                </View>

                {/* Minimalist modern table without vertical borders */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.thText, { flex: 4 }]}>Description</Text>
                    <Text style={[styles.thText, { flex: 1, textAlign: 'right' }]}>Qty</Text>
                    <Text style={[styles.thText, { flex: 1.5, textAlign: 'right' }]}>Price</Text>
                    <Text style={[styles.thText, { flex: 1.5, textAlign: 'right' }]}>Total</Text>
                </View>
                {data.items?.map((item: any, i: number) => (
                    <View style={styles.tableRow} key={i}>
                        <Text style={[styles.tdText, { flex: 4, fontWeight: 'bold' }]}>{item.description}</Text>
                        <Text style={[styles.tdText, { flex: 1, textAlign: 'right' }]}>{item.quantity}</Text>
                        <Text style={[styles.tdText, { flex: 1.5, textAlign: 'right' }]}>{item.unitPrice}</Text>
                        <Text style={[styles.tdText, { flex: 1.5, textAlign: 'right' }]}>{item.quantity * item.unitPrice}</Text>
                    </View>
                ))}

                {/* SaaS Style Summary Box */}
                <View style={styles.summaryBox}>
                    <View style={styles.summaryRow}><Text style={styles.valueText}>Subtotal</Text><Text style={styles.valueTextBold}>{totals.subtotal}</Text></View>
                    {totals.taxTotal > 0 && <View style={styles.summaryRow}><Text style={styles.valueText}>Tax</Text><Text style={styles.valueTextBold}>{totals.taxTotal}</Text></View>}
                    <View style={styles.grandTotalRow}><Text style={styles.grandTotalText}>Total Due</Text><Text style={styles.grandTotalText}>{totals.grandTotal}</Text></View>
                </View>

                {/* Dynamic Footer Signatures[cite: 2] */}
                {(vis.signature || vis.seal) && (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }} wrap={false}>
                        <View style={{ width: 150, alignItems: 'center' }}>
                            {vis.seal && company?.sealUrl && <Image src={company.sealUrl} style={{ width: 80, height: 80, objectFit: 'contain' }} />}
                        </View>
                        <View style={{ width: 200, alignItems: 'center' }}>
                            {vis.signature && company?.signatureUrl && <Image src={company.signatureUrl} style={{ width: 120, height: 60, objectFit: 'contain', marginBottom: 5 }} />}
                            {vis.signature && <Text style={{ fontSize: sizes.footerText, color: colors.primary, borderTop: `1px solid ${colors.primary}`, paddingTop: 4, width: '100%', textAlign: 'center' }}>Authorized Signature</Text>}
                        </View>
                    </View>
                )}
            </View>
        </Page>
    );
}