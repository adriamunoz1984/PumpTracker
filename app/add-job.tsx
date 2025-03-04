import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddJobScreen() {
    const router = useRouter();

    const [job, setJob] = useState({
        companyName: '',
        address: '',
        city: '',
        yards: '',
        total: '',
        paymentMethod: '',
        paymentStatus: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setJob({ ...job, [field]: value });
    };

    const handleSave = () => {
        if (!job.companyName || !job.yards || !job.total) {
            Alert.alert('Error', 'Please fill in required fields.');
            return;
        }
        // TODO: Save job data (using AsyncStorage or a database)
        Alert.alert('Success', 'Job added successfully!');
        router.push('/jobs'); // Navigate back to the job list
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Job</Text>

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

            <Button title="Save Job" onPress={handleSave} />
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
