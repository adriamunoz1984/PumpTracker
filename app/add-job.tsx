import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AddJobScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams(); // Get job ID if editing

    const [job, setJob] = useState({
        companyName: '',
        address: '',
        city: '',
        yards: '',
        total: '',
        paymentMethod: '',
        paymentStatus: '',
    });

    // Load job data if editing
    useEffect(() => {
        const loadJob = async () => {
            if (!id) return;
            const storedJobs = await AsyncStorage.getItem('jobs');
            if (!storedJobs) return;

            const jobsArray = JSON.parse(storedJobs);
            const foundJob = jobsArray.find((j: any) => j.id === id);
            if (foundJob) setJob(foundJob);
        };

        loadJob();
    }, [id]);

    const handleInputChange = (field: string, value: string) => {
        setJob({ ...job, [field]: value });
    };

    const handleSave = async () => {
        if (!job.companyName || !job.yards || !job.total) {
            Alert.alert('Error', 'Please fill in required fields.');
            return;
        }

        try {
            const storedJobs = await AsyncStorage.getItem('jobs');
            const jobsArray = storedJobs ? JSON.parse(storedJobs) : [];

            let updatedJobs;
            if (id) {
                updatedJobs = jobsArray.map((j: any) => (j.id === id ? job : j));
            } else {
                const newJob = { id: Date.now().toString(), ...job };
                updatedJobs = [...jobsArray, newJob];
            }

            await AsyncStorage.setItem('jobs', JSON.stringify(updatedJobs));
            Alert.alert('Success', id ? 'Job updated!' : 'Job added!');
            router.push('/jobs'); // Go back to job list
        } catch (error) {
            console.error('Error saving job:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{id ? 'Edit Job' : 'Add New Job'}</Text>

            <TextInput 
                style={styles.input} 
                placeholder="Company Name" 
                value={job.companyName}
                onChangeText={(text) => handleInputChange('companyName', text)}
            />

            <TextInput 
                style={styles.input} 
                placeholder="Address" 
                value={job.address}
                onChangeText={(text) => handleInputChange('address', text)}
            />

            <TextInput 
                style={styles.input} 
                placeholder="City" 
                value={job.city}
                onChangeText={(text) => handleInputChange('city', text)}
            />

            <TextInput 
                style={styles.input} 
                placeholder="Yards Poured" 
                keyboardType="numeric"
                value={job.yards}
                onChangeText={(text) => handleInputChange('yards', text)}
            />

            <TextInput 
                style={styles.input} 
                placeholder="Total Cost ($)" 
                keyboardType="numeric"
                value={job.total}
                onChangeText={(text) => handleInputChange('total', text)}
            />

            <TextInput 
                style={styles.input} 
                placeholder="Payment Method (Cash, Check, etc.)" 
                value={job.paymentMethod}
                onChangeText={(text) => handleInputChange('paymentMethod', text)}
            />

            <TextInput 
                style={styles.input} 
                placeholder="Payment Status (Paid/Unpaid)" 
                value={job.paymentStatus}
                onChangeText={(text) => handleInputChange('paymentStatus', text)}
            />

            <Button title={id ? "Update Job" : "Save Job"} onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});
