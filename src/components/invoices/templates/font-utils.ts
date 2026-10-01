export const getFontFamily = (family: string) => {
    if (!family) return 'Helvetica';
    if (family.includes('serif') || family.includes('Georgia')) return 'Times-Roman';
    if (family.includes('mono') || family.includes('Courier')) return 'Courier';
    return 'Helvetica';
};

export const getFontFamilyBold = (family: string) => {
    if (!family) return 'Helvetica-Bold';
    if (family.includes('serif') || family.includes('Georgia')) return 'Times-Bold';
    if (family.includes('mono') || family.includes('Courier')) return 'Courier-Bold';
    return 'Helvetica-Bold';
};
