import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Job = {
    id: string;
    date: string;
    companyName: string;
    address: string;
    city: string;
    yards: number;
    total: number;
    paymentMethod: string;
    paymentStatus: string;
};

const dummyJobs: Job[] = [
    {
        id: '1',
        date: '2025-03-03',
        companyName: 'ABC Concrete',
        address: '123 Main St',
        city: 'Los Angeles',
        yards: 10,
        total: 1200,
        paymentMethod: 'Cash',
        paymentStatus: 'Paid'
    },
    {
        id: '2',
        date: '2025-03-02',
        companyName: 'XYZ Builders',
        address: '456 Elm St',
        city: 'San Diego',
        yards: 8,
        total: 950,
        paymentMethod: 'Check',
        paymentStatus: 'Unpaid'
    }
];

export default function JobListScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Job List</Text>
            <FlatList
                data={dummyJobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.jobCard}>
                        <Text style={styles.company}>{item.companyName}</Text>
                        <Text>{item.date} - {item.city}</Text>
                        <Text>Yards: {item.yards} | Total: ${item.total}</Text>
                        <Text>Payment: {item.paymentMethod} - {item.paymentStatus}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    jobCard: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3
    },
    company: { fontSize: 18, fontWeight: 'bold' }
});
