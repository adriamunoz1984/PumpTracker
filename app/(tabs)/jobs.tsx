import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const dummyJobs = [
    { id: '1', companyName: 'ABC Concrete', date: '2025-03-03', total: 1200 },
    { id: '2', companyName: 'XYZ Builders', date: '2025-03-02', total: 950 },
];

export default function JobListScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Button title="Add Job" onPress={() => router.push('/add-job')} />

            <Text style={styles.title}>Job List</Text>
            <FlatList
                data={dummyJobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.jobCard}>
                        <Text style={styles.company}>{item.companyName}</Text>
                        <Text>{item.date} - ${item.total}</Text>
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
        elevation: 3
    },
    company: { fontSize: 18, fontWeight: 'bold' }
});
