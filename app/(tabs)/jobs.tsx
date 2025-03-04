import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JobListScreen() {
    const router = useRouter();
    const [jobs, setJobs] = useState([]);

    //Dummy Data Generator
    const generateDummyJobs = async () => {
        try {
            const existingJobs = await AsyncStorage.getItem('jobs');
            if (existingJobs) return; // Skip if jobs already exist
    
            const dummyJobs = [];
            const paymentMethods = ["Cash", "Check", "Zelle", "Charge", "Square"];
            const statuses = ["Paid", "Unpaid"];
            const companies = ["ABC Concrete", "XYZ Builders", "Mega Paving", "Solid Foundations"];
            const cities = ["Los Angeles", "San Diego", "San Francisco", "Sacramento"];
    
            for (let i = 0; i < 365; i++) {
                const randomDate = new Date();
                randomDate.setDate(randomDate.getDate() - i);
    
                dummyJobs.push({
                    id: Date.now().toString() + i,
                    date: randomDate.toISOString().split('T')[0],
                    companyName: companies[Math.floor(Math.random() * companies.length)],
                    address: `${Math.floor(Math.random() * 9999)} Main St`,
                    city: cities[Math.floor(Math.random() * cities.length)],
                    yards: Math.floor(Math.random() * 20) + 5,
                    total: Math.floor(Math.random() * 5000) + 1000,
                    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
                    paymentStatus: statuses[Math.floor(Math.random() * statuses.length)],
                });
            }
    
            await AsyncStorage.setItem('jobs', JSON.stringify(dummyJobs));
            console.log("Dummy jobs added!");
            loadJobs(); // Refresh the job list
        } catch (error) {
            console.error("Error generating dummy jobs:", error);
        }
    };
    

    // Load jobs from AsyncStorage
    const loadJobs = async () => {
        try {
            const storedJobs = await AsyncStorage.getItem('jobs');
            if (storedJobs) {
                setJobs(JSON.parse(storedJobs));
            }
        } catch (error) {
            console.error('Error loading jobs:', error);
        }
    };

    //Delete Function
    const deleteJob = async (jobId: string) => {
        try {
            const storedJobs = await AsyncStorage.getItem('jobs');
            if (!storedJobs) return;
    
            const jobsArray = JSON.parse(storedJobs);
            const updatedJobs = jobsArray.filter((job: any) => job.id !== jobId);
    
            await AsyncStorage.setItem('jobs', JSON.stringify(updatedJobs));
            setJobs(updatedJobs);
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };
    
    useEffect(() => {
        generateDummyJobs(); // Auto-fill data
        loadJobs();          // Load jobs from AsyncStorage
    }, []);

    return (
        <View style={styles.container}>
            <Button title="Add Job" onPress={() => router.push('/add-job')} />

            <Text style={styles.title}>Job List</Text>

            {jobs.length === 0 ? (
                <Text style={styles.noJobs}>No jobs added yet.</Text>
            ) : (
                <FlatList
                    data={jobs}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.jobCard}>
                            <Text style={styles.company}>{item.companyName}</Text>
                            <Text>{item.date} - ${item.total}</Text>
                            <Button title="Delete" color="red" onPress={() => deleteJob(item.id)} />
                            <Button title="Edit" onPress={() => router.push(`/add-job?id=${item.id}`)} />
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    noJobs: { fontSize: 16, color: 'gray', textAlign: 'center', marginTop: 20 },
    jobCard: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        elevation: 3
    },
    company: { fontSize: 18, fontWeight: 'bold' }
});
