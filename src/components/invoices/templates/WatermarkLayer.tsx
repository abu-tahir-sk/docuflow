import React from 'react';
import { View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { DesignSettings } from '@/lib/design-system/schema'; //

// Helper to map font families[cite: 2]
const getFontFamilyBold = (family: string) => {
    if (family?.includes('serif') || family?.includes('Georgia')) return 'Times-Bold';
    if (family?.includes('mono') || family?.includes('Courier')) return 'Courier-Bold';
    return 'Helvetica-Bold';
};

export function WatermarkLayer({ ds, companyLogo }: { ds: DesignSettings, companyLogo?: string }) {
    if (!ds.watermark.enabled) return null;

    const config = ds.watermark.type === 'TEXT' ? ds.watermark.text : ds.watermark.logo;
    const hGap = config.horizontalGap || 70;
    const vGap = config.verticalGap || 55;
    const scale = config.tileScale || 1;
    const startX = -300 + (config.offsetX || 0);
    const startY = -300 + (config.offsetY || 0);
    const cols = 8;
    const rows = 15;

    const tiles = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const staggerX = r % 2 !== 0 ? hGap / 2 : 0;
            const x = startX + (c * hGap * 2.5) + staggerX;
            const y = startY + (r * vGap * 2);

            if (ds.watermark.type === 'TEXT' && ds.watermark.text.content) {
                tiles.push(
                    <Text key={`txt-${r}-${c}`} style={{
                        position: 'absolute', left: x, top: y,
                        color: ds.watermark.text.color || '#000000',
                        opacity: ds.watermark.text.opacity || 0.1,
                        transform: `scale(${scale}) rotate(${ds.watermark.text.rotation || 0}deg)`,
                        fontSize: ds.watermark.text.fontSize || 48,
                        fontFamily: getFontFamilyBold(ds.watermark.text.fontFamily),
                    }}>
                        {ds.watermark.text.content}
                    </Text>
                );
            } else if (ds.watermark.type === 'LOGO' && (ds.watermark.logo.url || companyLogo)) {
                tiles.push(
                    <Image key={`img-${r}-${c}`} src={ds.watermark.logo.url || companyLogo} style={{
                        position: 'absolute', left: x, top: y,
                        width: ds.watermark.logo.size || 100,
                        opacity: ds.watermark.logo.opacity || 0.1,
                        transform: `scale(${scale}) rotate(${ds.watermark.logo.rotation || 0}deg)`
                    }} />
                );
            }
        }
    }

    return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden' }} fixed>
            {tiles}
        </View>
    );
}