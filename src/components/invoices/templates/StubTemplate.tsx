import React from 'react';
import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export function StubTemplate(props: any) {
    return (
        <Page size="A4" style={{ padding: 60, fontFamily: 'Helvetica' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, color: '#94a3b8', marginBottom: 10 }}>Template Under Construction</Text>
                <Text style={{ fontSize: 12, color: '#cbd5e1' }}>Select Classic, Modern, or Minimal to view live rendering.</Text>
            </View>
        </Page>
    );
}