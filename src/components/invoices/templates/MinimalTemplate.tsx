import React from 'react';
import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { WatermarkLayer } from './WatermarkLayer';

export function MinimalTemplate({ data, company, clients, totals, ds }: any) {
    const selectedClient = clients?.find((c: any) => c.id === data.clientId) || null;
    const colors = ds.colors;
    const sizes = ds.typography.sizes;
    const vis = ds.visibility;

    const styles = StyleSheet.create({
        page: {
            padding: 60, // Larger margins for minimal aesthetic
            fontFamily: 'Helvetica',
            backgroundColor: '#ffffff',
            paddingBottom: 80
        },
        topSection: { marginBottom: 50 },
        invoiceTitle: { fontSize: sizes.invoiceTitle + 4, color: colors.invoiceTitle, letterSpacing: -1, marginBottom: 20 },
        gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
        col: { flex: 1 },
        sectionLabel: { fontSize: sizes.sectionHeading - 2, color: colors.secondary, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
        textNormal: { fontSize: sizes.bodyText, color: colors.primary, marginBottom: 4 },
        textBold: { fontSize: sizes.bodyText, color: colors.primary, fontWeight: 'bold', marginBottom: 4 },
        tableHeader: { flexDirection: 'row', paddingBottom: 10, borderBottom: `1px solid #f1f5f9`, marginBottom: 10 },
        thText: { color: colors.secondary, fontSize: sizes.tableText - 1, textTransform: 'uppercase', letterSpacing: 1 },
        tableRow: { flexDirection: 'row', paddingVertical: 10 },
        tdText: { fontSize: sizes.tableText, color: colors.primary },
        summaryBox: { alignSelf: 'flex-end', width: 200, marginTop: 40 },
        summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
        grandTotalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, marginTop: 10, borderTop: `1px solid #000000` },
        grandTotalText: { fontWeight: 'bold', fontSize: sizes.totalAmount, color: colors.primary }
    });

    return (
        <Page size="A4" style={styles.page} wrap>
            <WatermarkLayer ds={ds} companyLogo={company?.logoUrl} />

            <View style={styles.topSection}>
                <Text style={styles.invoiceTitle}>Invoice</Text>
                {vis.logo && company?.logoUrl && (
                    <Image src={company.logoUrl} style={{ width: 60, height: 60, objectFit: 'contain', marginBottom: 15 }} />
                )}
                <Text style={styles.textBold}>{company?.name}</Text>
                {vis.billingAddress && company?.address && <Text style={styles.textNormal}>{company.address}</Text>}
            </View>

            <View style={styles.gridRow}>
                <View style={styles.col}>
                    <Text style={styles.sectionLabel}>Client</Text>
                    <Text style={styles.textBold}>{selectedClient?.name || "Select Client"}</Text>
                    {selectedClient?.clientCompany && <Text style={styles.textNormal}>{selectedClient.clientCompany}</Text>}
                </View>
                <View style={styles.col}>
                    <Text style={styles.sectionLabel}>Invoice No.</Text>
                    <Text style={styles.textNormal}>{data.invoiceNumber || "DRAFT"}</Text>
                </View>
                <View style={styles.col}>
                    <Text style={styles.sectionLabel}>Date</Text>
                    <Text style={styles.textNormal}>{data.issueDate ? format(new Date(data.issueDate), "MMM dd, yyyy") : ""}</Text>
                </View>
            </View>

            <View>
                <View style={styles.tableHeader}>
                    <Text style={[styles.thText, { flex: 4 }]}>Item</Text>
                    <Text style={[styles.thText, { flex: 1, textAlign: 'right' }]}>Qty</Text>
                    <Text style={[styles.thText, { flex: 1.5, textAlign: 'right' }]}>Price</Text>
                    <Text style={[styles.thText, { flex: 1.5, textAlign: 'right' }]}>Amount</Text>
                </View>
                {data.items?.map((item: any, i: number) => (
                    <View style={styles.tableRow} key={i}>
                        <Text style={[styles.tdText, { flex: 4, fontWeight: 'bold' }]}>{item.description}</Text>
                        <Text style={[styles.tdText, { flex: 1, textAlign: 'right', color: colors.secondary }]}>{item.quantity}</Text>
                        <Text style={[styles.tdText, { flex: 1.5, textAlign: 'right', color: colors.secondary }]}>{item.unitPrice}</Text>
                        <Text style={[styles.tdText, { flex: 1.5, textAlign: 'right' }]}>{(item.quantity * item.unitPrice).toFixed(2)}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.summaryBox} wrap={false}>
                <View style={styles.summaryRow}>
                    <Text style={[styles.textNormal, { color: colors.secondary }]}>Subtotal</Text>
                    <Text style={styles.textNormal}>{totals.subtotal.toFixed(2)}</Text>
                </View>
                {totals.taxTotal > 0 && (
                    <View style={styles.summaryRow}>
                        <Text style={[styles.textNormal, { color: colors.secondary }]}>Tax</Text>
                        <Text style={styles.textNormal}>{totals.taxTotal.toFixed(2)}</Text>
                    </View>
                )}
                <View style={styles.grandTotalRow}>
                    <Text style={styles.grandTotalText}>Total</Text>
                    <Text style={styles.grandTotalText}>{totals.grandTotal.toFixed(2)}</Text>
                </View>
            </View>
        </Page>
    );
}