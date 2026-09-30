import React from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';

export const CompanyInfo = ({ company, vis, styles }: any) => {
    if (!company) return null;
    return (
        <View style={styles.companyContainer || {}}>
            {vis.logo !== false && company?.logoUrl && (
                <Image src={company.logoUrl} style={styles.logo || { width: 80, height: 80, objectFit: 'contain', marginBottom: 10 }} />
            )}
            {company?.name && <Text style={styles.companyName}>{company.name}</Text>}
            {company?.address && <Text style={styles.textNormal}>{company.address}</Text>}
            {company?.city && (
                <Text style={styles.textNormal}>
                    {[company.city, company.state, company.postalCode].filter(Boolean).join(', ')}
                </Text>
            )}
            {company?.country && <Text style={styles.textNormal}>{company.country}</Text>}
            
            {company?.email && <Text style={styles.textNormal}>{company.email}</Text>}
            {company?.phone && <Text style={styles.textNormal}>{company.phone}</Text>}
            {company?.website && <Text style={styles.textNormal}>{company.website}</Text>}
            
            {vis.gstin !== false && company?.gstin && <Text style={styles.textNormal}>GSTIN: {company.gstin}</Text>}
            {vis.pan !== false && company?.pan && <Text style={styles.textNormal}>PAN: {company.pan}</Text>}
        </View>
    );
};

export const ClientInfo = ({ client, vis, styles }: any) => {
    if (!client) return (
        <View style={styles.clientContainer || {}}>
            <Text style={styles.textBold}>Select Client</Text>
        </View>
    );
    return (
        <View style={styles.clientContainer || {}}>
            {client.name && <Text style={styles.textBold}>{client.name}</Text>}
            {client.clientCompany && <Text style={styles.textNormal}>{client.clientCompany}</Text>}
            
            {client.email && <Text style={styles.textNormal}>{client.email}</Text>}
            {client.phone && <Text style={styles.textNormal}>{client.phone}</Text>}
            
            {vis.billingAddress !== false && client.address && (
                <View style={{ marginTop: 4 }}>
                    <Text style={styles.textNormal}>{client.address}</Text>
                    {client.city && (
                        <Text style={styles.textNormal}>
                            {[client.city, client.state, client.postalCode].filter(Boolean).join(', ')}
                        </Text>
                    )}
                    {client.country && <Text style={styles.textNormal}>{client.country}</Text>}
                </View>
            )}
        </View>
    );
};

export const InvoiceMeta = ({ data, vis, styles }: any) => {
    return (
        <View style={styles.metaContainer || {}}>
            {data.invoiceNumber && (
                <View style={styles.metaGrid}>
                    <Text style={styles.metaLabel}>Invoice No:</Text>
                    <Text style={styles.metaValue}>{data.invoiceNumber}</Text>
                </View>
            )}
            {data.issueDate && (
                <View style={styles.metaGrid}>
                    <Text style={styles.metaLabel}>Issue Date:</Text>
                    <Text style={styles.metaValue}>{format(new Date(data.issueDate), "MMM dd, yyyy")}</Text>
                </View>
            )}
            {data.dueDate && (
                <View style={styles.metaGrid}>
                    <Text style={styles.metaLabel}>Due Date:</Text>
                    <Text style={styles.metaValue}>{format(new Date(data.dueDate), "MMM dd, yyyy")}</Text>
                </View>
            )}
            {data.status && (
                <View style={styles.metaGrid}>
                    <Text style={styles.metaLabel}>Status:</Text>
                    <Text style={styles.metaValue}>{data.status}</Text>
                </View>
            )}
            {data.paymentTerms && (
                <View style={styles.metaGrid}>
                    <Text style={styles.metaLabel}>Terms:</Text>
                    <Text style={styles.metaValue}>{data.paymentTerms}</Text>
                </View>
            )}
            {data.poReference && (
                <View style={styles.metaGrid}>
                    <Text style={styles.metaLabel}>PO Ref:</Text>
                    <Text style={styles.metaValue}>{data.poReference}</Text>
                </View>
            )}
        </View>
    );
};

export const InvoicePayment = ({ company, vis, styles }: any) => {
    if (vis.paymentInfo === false) return null;
    
    return (
        <View style={styles.paymentContainer || {}}>
            {vis.bankDetails !== false && (
                <View>
                    {company?.bankName && <Text style={styles.textNormal}>Bank: {company.bankName}</Text>}
                    {company?.accountName && <Text style={styles.textNormal}>Acct Name: {company.accountName}</Text>}
                    {company?.accountNumber && <Text style={styles.textNormal}>Acct No: {company.accountNumber}</Text>}
                    {company?.ifsc && <Text style={styles.textNormal}>IFSC: {company.ifsc}</Text>}
                    {company?.swift && <Text style={styles.textNormal}>SWIFT: {company.swift}</Text>}
                </View>
            )}
            {vis.upiQr !== false && company?.upiId && (
                <Text style={styles.textNormal}>UPI: {company.upiId}</Text>
            )}
            {vis.paymentInstructions !== false && company?.paymentInstructions && (
                <Text style={styles.textNormal}>{company.paymentInstructions}</Text>
            )}
        </View>
    );
};

export const InvoiceTermsAndNotes = ({ data, vis, styles }: any) => {
    if ((vis.notes === false || !data.notes) && (vis.terms === false || !data.terms)) return null;
    
    return (
        <View style={styles.termsContainer || { marginTop: 20 }} wrap={false}>
            {vis.notes !== false && data.notes && (
                <View style={styles.notesBlock || { marginBottom: 12 }}>
                    <Text style={styles.sectionTitle}>Notes</Text>
                    <Text style={styles.textNormal}>{data.notes}</Text>
                </View>
            )}
            {vis.terms !== false && data.terms && (
                <View style={styles.termsBlock || {}}>
                    <Text style={styles.sectionTitle}>Terms & Conditions</Text>
                    <Text style={styles.textNormal}>{data.terms}</Text>
                </View>
            )}
        </View>
    );
};

export const InvoiceSignatures = ({ company, vis, styles }: any) => {
    if (vis.signature === false && vis.seal === false) return null;
    
    return (
        <View style={styles.signatureContainer || { flexDirection: 'row', justifyContent: 'space-between', marginTop: 40 }} wrap={false}>
            <View style={styles.sealBlock || { width: 150, alignItems: 'center' }}>
                {vis.seal !== false && company?.sealUrl && <Image src={company.sealUrl} style={styles.sealImage || { width: 80, height: 80, objectFit: 'contain' }} />}
            </View>
            <View style={styles.signatureBlock || { width: 200, alignItems: 'center' }}>
                {vis.signature !== false && company?.signatureUrl ? (
                    <Image src={company.signatureUrl} style={styles.signatureImage || { width: 120, height: 60, objectFit: 'contain', marginBottom: 5 }} />
                ) : (
                    vis.signature !== false ? <View style={{ height: 60, marginBottom: 5 }} /> : null
                )}
                {vis.signature !== false && <Text style={styles.signatureText || { borderTop: '1px solid #000', paddingTop: 4, width: '100%', textAlign: 'center' }}>Authorized Signature</Text>}
            </View>
        </View>
    );
};

export const InvoiceFooter = ({ company, vis, styles }: any) => {
    if (vis.footer === false) return null;
    return (
        <View style={styles.footerContainer || { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center' }} fixed>
            <Text style={styles.footerText}>{company?.name} • Generated by DocuFlow</Text>
        </View>
    );
};

export const InvoiceTable = ({ data, vis, styles }: any) => {
    const hasDiscount = data.items?.some((i: any) => i.discount > 0);
    const hasTax = data.items?.some((i: any) => i.tax > 0);
    const hasHsn = vis.hsnSac && data.items?.some((i: any) => i.hsnSac);

    return (
        <View style={styles.table}>
            <View style={styles.tableHeader}>
                <Text style={[styles.thText, { flex: 4 }]}>Item</Text>
                {hasHsn && <Text style={[styles.thText, { flex: 1.5 }]}>HSN/SAC</Text>}
                <Text style={[styles.thText, { flex: 1, textAlign: 'right' }]}>Qty</Text>
                <Text style={[styles.thText, { flex: 1.5, textAlign: 'right' }]}>Rate</Text>
                {hasDiscount && <Text style={[styles.thText, { flex: 1.5, textAlign: 'right' }]}>Discount</Text>}
                {hasTax && <Text style={[styles.thText, { flex: 1.5, textAlign: 'right' }]}>Tax</Text>}
                <Text style={[styles.thText, { flex: 1.5, textAlign: 'right' }]}>Amount</Text>
            </View>
            {data.items?.map((item: any, i: number) => (
                <View style={styles.tableRow} key={i}>
                    <View style={{ flex: 4, paddingRight: 8 }}>
                        <Text style={styles.tdTextBold || styles.tdText}>{item.name || item.description}</Text>
                        {item.name && item.description && <Text style={[styles.tdText, { fontSize: (styles.tdText?.fontSize || 10) - 2, color: '#64748b' }]}>{item.description}</Text>}
                    </View>
                    {hasHsn && <Text style={[styles.tdText, { flex: 1.5 }]}>{item.hsnSac || '-'}</Text>}
                    <Text style={[styles.tdText, { flex: 1, textAlign: 'right' }]}>{item.quantity}</Text>
                    <Text style={[styles.tdText, { flex: 1.5, textAlign: 'right' }]}>{Number(item.unitPrice || 0).toFixed(2)}</Text>
                    {hasDiscount && <Text style={[styles.tdText, { flex: 1.5, textAlign: 'right' }]}>{item.discount > 0 ? Number(item.discount).toFixed(2) : '-'}</Text>}
                    {hasTax && <Text style={[styles.tdText, { flex: 1.5, textAlign: 'right' }]}>{item.tax > 0 ? Number(item.tax).toFixed(2) : '-'}</Text>}
                    <Text style={[styles.tdText, { flex: 1.5, textAlign: 'right' }]}>{Number((item.quantity * item.unitPrice) - (item.discount || 0) + (item.tax || 0)).toFixed(2)}</Text>
                </View>
            ))}
        </View>
    );
};

export const InvoiceTotals = ({ totals, vis, styles }: any) => {
    return (
        <View style={styles.summaryContainer} wrap={false}>
            <View style={styles.summaryBox}>
                <View style={styles.summaryRow}>
                    <Text style={styles.textNormal}>Subtotal</Text>
                    <Text style={styles.textBold}>{totals.subtotal.toFixed(2)}</Text>
                </View>
                {totals.discountTotal > 0 && (
                    <View style={styles.summaryRow}>
                        <Text style={styles.textNormal}>Discount</Text>
                        <Text style={styles.textBold}>-{totals.discountTotal.toFixed(2)}</Text>
                    </View>
                )}
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
    );
};
