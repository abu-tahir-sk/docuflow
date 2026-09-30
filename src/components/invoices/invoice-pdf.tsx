// import React from 'react'
// import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'
// import { calculateInvoiceTotals } from '@/lib/invoices/calculations'
// import { format } from 'date-fns'
// import { defaultDesignSettings, DesignSettings } from '@/lib/design-system/schema'

// // Helper to map font families to React-PDF built-ins
// const getFontFamily = (family: string) => {
//   if (family?.includes('serif') || family?.includes('Georgia')) return 'Times-Roman';
//   if (family?.includes('mono') || family?.includes('Courier')) return 'Courier';
//   return 'Helvetica';
// }

// const getFontFamilyBold = (family: string) => {
//   if (family?.includes('serif') || family?.includes('Georgia')) return 'Times-Bold';
//   if (family?.includes('mono') || family?.includes('Courier')) return 'Courier-Bold';
//   return 'Helvetica-Bold';
// }

// export function InvoicePdf({ data, company, clients }: any) {
//   const selectedClient = clients?.find((c: any) => c.id === data.clientId) || null
//   const items = data.items || []
//   const discountValue = parseFloat(data.discountValue) || 0
//   const totals = calculateInvoiceTotals(
//     items.map((i: any) => ({
//       quantity: parseFloat(i.quantity) || 0,
//       unitPrice: parseFloat(i.unitPrice) || 0,
//       discountValue: parseFloat(i.discountValue) || 0,
//       discountType: i.discountType,
//       taxRate: parseFloat(i.taxRate) || 0
//     })),
//     discountValue,
//     data.discountType
//   )
//   const issueDateStr = data.issueDate ? format(new Date(data.issueDate), "MMM dd, yyyy") : ""
//   const dueDateStr = data.dueDate ? format(new Date(data.dueDate), "MMM dd, yyyy") : ""
//   const currency = data.currency || "INR"

//   const ds: DesignSettings = data.designSettings || defaultDesignSettings;
//   const layout = ds.layout;
//   const colors = ds.colors;
//   const sizes = ds.typography.sizes;
//   const fontNorm = getFontFamily(ds.typography.fontFamily);
//   const fontBold = getFontFamilyBold(ds.typography.fontFamily);
//   const vis = ds.visibility;

//   const formatCurrency = (amount: number, curr: string = 'INR') => {
//     return new Intl.NumberFormat('en-IN', { style: 'currency', currency: curr }).format(amount)
//   }

//   const paddingVal = layout.tableDensity === 'COMPACT' ? 4 : layout.tableDensity === 'SPACIOUS' ? 12 : 8;

//   const styles = StyleSheet.create({
//     page: {
//       padding: layout.spacing.pageMargins,
//       fontFamily: fontNorm,
//       color: colors.primary,
//       lineHeight: 1.5,
//       position: 'relative',
//       backgroundColor: '#ffffff',
//     },
//     headerRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'flex-start',
//       marginBottom: layout.spacing.header * 4,
//       width: '100%',
//     },
//     companyColumn: {
//       flex: 1,
//       flexDirection: 'column',
//       paddingRight: 20,
//     },
//     invoiceMetaColumn: {
//       flex: 1,
//       flexDirection: 'column',
//       alignItems: 'flex-end',
//     },
//     companyName: {
//       fontSize: sizes.sectionHeading + 4,
//       fontFamily: fontBold,
//       color: colors.primary,
//       marginBottom: 4,
//     },
//     invoiceTitle: {
//       fontSize: sizes.invoiceTitle,
//       fontFamily: fontBold,
//       color: colors.invoiceTitle,
//       textTransform: 'uppercase',
//       marginBottom: 8,
//     },
//     infoRow: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: layout.spacing.section * 4,
//       width: '100%',
//     },
//     billToColumn: {
//       flex: 1,
//       flexDirection: 'column',
//       paddingRight: 20,
//     },
//     paymentColumn: {
//       flex: 1,
//       flexDirection: 'column',
//       alignItems: 'flex-start',
//       paddingLeft: 20,
//     },
//     sectionTitle: {
//       fontSize: sizes.sectionHeading,
//       fontFamily: fontBold,
//       color: colors.secondary,
//       marginBottom: 6,
//       textTransform: 'uppercase',
//     },
//     textMain: {
//       fontSize: sizes.bodyText + 1,
//       fontFamily: fontBold,
//       color: colors.primary,
//       marginBottom: 2,
//     },
//     textNormal: {
//       fontSize: sizes.bodyText,
//       color: colors.primary,
//       marginBottom: 2,
//     },
//     metaGrid: {
//       flexDirection: 'row',
//       justifyContent: 'flex-end',
//       marginBottom: 4,
//       width: '100%',
//     },
//     metaLabel: {
//       width: 100,
//       fontFamily: fontBold,
//       color: colors.secondary,
//       fontSize: sizes.bodyText,
//       textAlign: 'right',
//       paddingRight: 10,
//     },
//     metaValue: {
//       width: 120,
//       fontFamily: fontBold,
//       color: colors.primary,
//       textAlign: 'right',
//       fontSize: sizes.bodyText,
//     },
//     table: { 
//       width: '100%', 
//       marginBottom: layout.spacing.section * 4 
//     },
//     tableHeader: {
//       flexDirection: 'row',
//       borderBottomWidth: 1,
//       borderBottomColor: colors.secondary,
//       paddingVertical: paddingVal,
//       backgroundColor: colors.tableHeader,
//     },
//     colDesc: { flex: 4, paddingLeft: 8, paddingRight: 8 },
//     colQty: { flex: 1, textAlign: 'right', paddingRight: 8 },
//     colPrice: { flex: 1.5, textAlign: 'right', paddingRight: 8 },
//     colTotal: { flex: 1.5, textAlign: 'right', paddingRight: 8 },
//     thText: {
//       fontFamily: fontBold,
//       color: colors.tableText,
//       fontSize: sizes.tableText,
//       textTransform: 'uppercase',
//     },
//     tableRow: {
//       flexDirection: 'row',
//       paddingVertical: paddingVal,
//       borderBottomWidth: 1,
//       borderBottomColor: '#e2e8f0',
//     },
//     tdText: {
//       fontSize: sizes.tableText,
//       color: colors.tableText,
//     },
//     summaryContainer: {
//       flexDirection: 'row',
//       justifyContent: 'flex-end',
//       width: '100%',
//       marginBottom: layout.spacing.section * 4,
//     },
//     totalsBox: {
//       width: 250,
//     },
//     totalRow: { 
//       flexDirection: 'row', 
//       justifyContent: 'space-between', 
//       paddingVertical: 6,
//       borderBottomWidth: 1,
//       borderBottomColor: '#f1f5f9',
//     },
//     totalLabel: { 
//       color: colors.secondary, 
//       fontSize: sizes.bodyText 
//     },
//     totalValue: { 
//       fontFamily: fontBold, 
//       color: colors.primary, 
//       fontSize: sizes.bodyText 
//     },
//     grandTotalRow: {
//       flexDirection: 'row', 
//       justifyContent: 'space-between', 
//       paddingVertical: 10,
//       marginTop: 4, 
//       borderTopWidth: 2, 
//       borderTopColor: colors.totalAmount,
//     },
//     grandTotalLabel: { 
//       fontFamily: fontBold, 
//       fontSize: sizes.totalAmount, 
//       color: colors.totalAmount,
//       textTransform: 'uppercase',
//     },
//     grandTotalValue: { 
//       fontFamily: fontBold, 
//       fontSize: sizes.totalAmount, 
//       color: colors.totalAmount 
//     },
//     notesSection: {
//       width: '100%',
//       marginTop: 10,
//       paddingTop: 10,
//       borderTopWidth: 1,
//       borderTopColor: '#e2e8f0',
//     },
//     signaturesSection: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginTop: 40,
//       width: '100%',
//     },
//     signatureBox: {
//       width: 200,
//       alignItems: 'center',
//     },
//     sealBox: {
//       width: 150,
//       alignItems: 'center',
//       position: 'relative',
//     },
//     footerSection: {
//       marginTop: 'auto',
//       paddingTop: 20,
//       borderTopWidth: 1,
//       borderTopColor: '#e2e8f0',
//       width: '100%',
//       alignItems: 'center',
//     },
//     footerText: {
//       fontSize: sizes.footerText,
//       color: colors.footer,
//       textAlign: 'center',
//     },
//     watermarkContainer: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: -1,
//     }
//   });

//   return (
//     <Document>
//       <Page size="A4" style={styles.page} wrap>
//         {/* WATERMARK */}
//         {ds.watermark.enabled && (
//           <View style={{ ...styles.watermarkContainer, overflow: 'hidden' }} fixed>
//             {ds.watermark.type === 'TEXT' && ds.watermark.text.content && (() => {
//               const config = ds.watermark.text;
//               const hGap = config.horizontalGap || 70;
//               const vGap = config.verticalGap || 55;
//               const scale = config.tileScale || 1;
//               const offsetX = config.offsetX || 0;
//               const offsetY = config.offsetY || 0;

//               const cols = 8;
//               const rows = 15;
//               const startX = -300 + offsetX;
//               const startY = -300 + offsetY;

//               const tiles = [];
//               for (let r = 0; r < rows; r++) {
//                 for (let c = 0; c < cols; c++) {
//                   const staggerX = r % 2 !== 0 ? hGap / 2 : 0;
//                   const x = startX + (c * hGap * 2.5) + staggerX;
//                   const y = startY + (r * vGap * 2);

//                   tiles.push(
//                     <Text key={`txt-${r}-${c}`} style={{
//                       position: 'absolute',
//                       left: x,
//                       top: y,
//                       color: config.color || '#000000',
//                       opacity: config.opacity || 0.1,
//                       transform: `scale(${scale}) rotate(${config.rotation || 0}deg)`,
//                       fontSize: config.fontSize || 48,
//                       fontFamily: getFontFamilyBold(config.fontFamily),
//                       letterSpacing: config.letterSpacing || 0,
//                     }}>
//                       {config.content}
//                     </Text>
//                   );
//                 }
//               }
//               return tiles;
//             })()}

//             {ds.watermark.type === 'LOGO' && vis.logo && company?.logoUrl && (() => {
//               const config = ds.watermark.logo;
//               const hGap = config.horizontalGap || 60;
//               const vGap = config.verticalGap || 50;
//               const scale = config.tileScale || 1;
//               const offsetX = config.offsetX || 0;
//               const offsetY = config.offsetY || 0;

//               const cols = 8;
//               const rows = 15;
//               const startX = -300 + offsetX;
//               const startY = -300 + offsetY;

//               const tiles = [];
//               for (let r = 0; r < rows; r++) {
//                 for (let c = 0; c < cols; c++) {
//                   const staggerX = r % 2 !== 0 ? hGap / 2 : 0;
//                   const x = startX + (c * hGap * 2.5) + staggerX;
//                   const y = startY + (r * vGap * 2);

//                   tiles.push(
//                     <Image key={`img-${r}-${c}`} src={company.logoUrl} style={{
//                       position: 'absolute',
//                       left: x,
//                       top: y,
//                       width: config.size || 100,
//                       opacity: config.opacity || 0.1,
//                       transform: `scale(${scale}) rotate(${config.rotation || 0}deg)`
//                     }} />
//                   );
//                 }
//               }
//               return tiles;
//             })()}
//           </View>
//         )}

//         {/* HEADER */}
//         <View style={styles.headerRow}>
//           <View style={styles.companyColumn}>
//             {vis.logo && company?.logoUrl && (
//               <Image src={company.logoUrl} style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 10 }} />
//             )}
//             <Text style={styles.companyName}>{company?.name || "Your Company"}</Text>
//             {company?.address && <Text style={styles.textNormal}>{company.address}</Text>}
//             {company?.email && <Text style={styles.textNormal}>{company.email}</Text>}
//             {company?.phone && <Text style={styles.textNormal}>{company.phone}</Text>}
//             {vis.gstin && company?.taxId && <Text style={styles.textNormal}>GSTIN: {company.taxId}</Text>}
//             {vis.pan && company?.registrationNumber && <Text style={styles.textNormal}>PAN: {company.registrationNumber}</Text>}
//           </View>

//           <View style={styles.invoiceMetaColumn}>
//             <Text style={styles.invoiceTitle}>INVOICE</Text>

//             <View style={styles.metaGrid}>
//               <Text style={styles.metaLabel}>Invoice No:</Text>
//               <Text style={styles.metaValue}>{data.invoiceNumber || "DRAFT"}</Text>
//             </View>
//             <View style={styles.metaGrid}>
//               <Text style={styles.metaLabel}>Issue Date:</Text>
//               <Text style={styles.metaValue}>{issueDateStr}</Text>
//             </View>
//             <View style={styles.metaGrid}>
//               <Text style={styles.metaLabel}>Due Date:</Text>
//               <Text style={styles.metaValue}>{dueDateStr}</Text>
//             </View>
//             <View style={styles.metaGrid}>
//               <Text style={styles.metaLabel}>Status:</Text>
//               <Text style={styles.metaValue}>{data.status}</Text>
//             </View>
//           </View>
//         </View>

//         {/* BILL TO & PAYMENT INFO */}
//         <View style={styles.infoRow}>
//           <View style={styles.billToColumn}>
//             <Text style={styles.sectionTitle}>Bill To</Text>
//             <Text style={styles.textMain}>{selectedClient ? selectedClient.name : "Select a Client"}</Text>
//             {selectedClient?.clientCompany && <Text style={styles.textNormal}>{selectedClient.clientCompany}</Text>}
//             {vis.billingAddress && selectedClient?.address && <Text style={styles.textNormal}>{selectedClient.address}</Text>}
//             {selectedClient?.email && <Text style={styles.textNormal}>{selectedClient.email}</Text>}
//             {selectedClient?.phone && <Text style={styles.textNormal}>{selectedClient.phone}</Text>}
//           </View>

//           <View style={styles.paymentColumn}>
//             {vis.paymentInfo && company?.accountNumber && (
//               <>
//                 <Text style={styles.sectionTitle}>Payment Details</Text>
//                 <Text style={styles.textNormal}>Bank: {company.bankName}</Text>
//                 <Text style={styles.textNormal}>Account Name: {company.accountName}</Text>
//                 <Text style={styles.textNormal}>Account No: {company.accountNumber}</Text>
//                 {company.ifsc && <Text style={styles.textNormal}>IFSC: {company.ifsc}</Text>}
//                 {vis.upiQr && company.upiId && <Text style={styles.textNormal}>UPI ID: {company.upiId}</Text>}
//               </>
//             )}
//           </View>
//         </View>

//         {/* ITEMS TABLE */}
//         <View style={styles.table}>
//           <View style={styles.tableHeader}>
//             <Text style={[styles.thText, styles.colDesc]}>Description</Text>
//             <Text style={[styles.thText, styles.colPrice]}>Price</Text>
//             <Text style={[styles.thText, styles.colQty]}>Qty</Text>
//             <Text style={[styles.thText, styles.colTotal]}>Total</Text>
//           </View>
//           {items.map((item: any, i: number) => {
//             const qty = parseFloat(item.quantity) || 0
//             const price = parseFloat(item.unitPrice) || 0
//             return (
//               <View style={styles.tableRow} key={i} wrap={false}>
//                 <Text style={[styles.tdText, styles.colDesc]}>{item.description || "Item description"}</Text>
//                 <Text style={[styles.tdText, styles.colPrice]}>{formatCurrency(price, currency)}</Text>
//                 <Text style={[styles.tdText, styles.colQty]}>{qty} {item.unit !== "Item" ? item.unit : ""}</Text>
//                 <Text style={[styles.tdText, styles.colTotal]}>{formatCurrency(qty * price, currency)}</Text>
//               </View>
//             )
//           })}
//         </View>

//         {/* SUMMARY */}
//         <View style={styles.summaryContainer} wrap={false}>
//           <View style={styles.totalsBox}>
//             <View style={styles.totalRow}>
//               <Text style={styles.totalLabel}>Subtotal</Text>
//               <Text style={styles.totalValue}>{formatCurrency(totals.subtotal, currency)}</Text>
//             </View>
//             {totals.discountTotal > 0 && (
//               <View style={styles.totalRow}>
//                 <Text style={styles.totalLabel}>Discount</Text>
//                 <Text style={styles.totalValue}>-{formatCurrency(totals.discountTotal, currency)}</Text>
//               </View>
//             )}
//             {totals.taxTotal > 0 && (
//               <View style={styles.totalRow}>
//                 <Text style={styles.totalLabel}>Tax</Text>
//                 <Text style={styles.totalValue}>{formatCurrency(totals.taxTotal, currency)}</Text>
//               </View>
//             )}
//             <View style={styles.grandTotalRow}>
//               <Text style={styles.grandTotalLabel}>Total Due</Text>
//               <Text style={styles.grandTotalValue}>{formatCurrency(totals.grandTotal, currency)}</Text>
//             </View>
//           </View>
//         </View>

//         {/* NOTES & TERMS */}
//         {(vis.notes && data.notes) || (vis.terms && data.terms) ? (
//           <View style={styles.notesSection} wrap={false}>
//             {vis.notes && data.notes && (
//               <View style={{ marginBottom: 12 }}>
//                 <Text style={styles.sectionTitle}>Notes</Text>
//                 <Text style={styles.textNormal}>{data.notes}</Text>
//               </View>
//             )}
//             {vis.terms && data.terms && (
//               <View>
//                 <Text style={styles.sectionTitle}>Terms & Conditions</Text>
//                 <Text style={styles.textNormal}>{data.terms}</Text>
//               </View>
//             )}
//           </View>
//         ) : null}

//         {/* SIGNATURE & SEAL */}
//         {(vis.signature || vis.seal) && (
//           <View style={styles.signaturesSection} wrap={false}>
//              <View style={styles.sealBox}>
//                 {vis.seal && company?.sealUrl && (
//                   <Image src={company.sealUrl} style={{ width: 80, height: 80, objectFit: 'contain' }} />
//                 )}
//              </View>
//              <View style={styles.signatureBox}>
//                 {vis.signature && company?.signatureUrl ? (
//                   <Image src={company.signatureUrl} style={{ width: 120, height: 60, objectFit: 'contain', marginBottom: 5 }} />
//                 ) : (
//                   <View style={{ height: 60, marginBottom: 5 }} />
//                 )}
//                 {vis.signature && <Text style={{ fontSize: sizes.footerText, color: colors.primary, borderTopWidth: 1, borderTopColor: colors.primary, paddingTop: 4, width: '100%', textAlign: 'center' }}>Authorized Signature</Text>}
//              </View>
//           </View>
//         )}

//         {/* FOOTER */}
//         {vis.footer && (
//           <View style={styles.footerSection} fixed>
//             <Text style={styles.footerText}>{company?.name} • Generated by DocuFlow</Text>
//           </View>
//         )}
//       </Page>
//     </Document>
//   )
// }


import React from 'react';
import { Document } from '@react-pdf/renderer';
import { INVOICE_TEMPLATES } from './templates/registry';
import { defaultDesignSettings } from '@/lib/design-system/schema'; //[cite: 6]
import { calculateInvoiceTotals } from '@/lib/invoices/calculations'; //[cite: 2]

export function InvoicePdf({ data, company, clients }: any) {
  // Resolve Template
  const templateId = data.template || 'classic';
  const selectedTemplate = INVOICE_TEMPLATES.find(t => t.id === templateId) || INVOICE_TEMPLATES[0];
  const TemplateComponent = selectedTemplate.component;

  // Global calculations[cite: 2]
  const items = data.items || [];
  const discountValue = parseFloat(data.discountValue) || 0;
  const totals = calculateInvoiceTotals(
    items.map((i: any) => ({
      quantity: parseFloat(i.quantity) || 0,
      unitPrice: parseFloat(i.unitPrice) || 0,
      discountValue: parseFloat(i.discountValue) || 0,
      discountType: i.discountType,
      taxRate: parseFloat(i.taxRate) || 0
    })),
    discountValue,
    data.discountType
  );

  const ds = data.designSettings || defaultDesignSettings; //[cite: 2]

  return (
    <Document>
      <TemplateComponent
        data={data}
        company={{ ...company, ...(data.companyDetails || {}) }}
        clients={clients}
        totals={totals}
        ds={ds}
      />
    </Document>
  );
}