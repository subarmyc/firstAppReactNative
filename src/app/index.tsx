import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Input } from '@/components/input';

// Define the main index component that render the UI for the app
export default function Index() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    // Validate the email and password fields and show an alert if they are empty, otherwise show a success message
    function handleSignIn() {
        if (!email.trim() || !password.trim()) {
           return  Alert.alert('You Stupid!', 'Please fill in all fields');
        }

        Alert.alert('Success', 'You have successfully signed in!');
    }

    return (
        // Use KeyboardAvoidingView to adjust the view when the keyboard is open
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.select({ ios: 'padding', android: 'height' })}>
            
            {/* ScrollView to contain the form elements */}
            <ScrollView contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>    
                <View style={styles.container}>
                    <Image
                        source={require("@/assets/logo.png")} 
                        style={styles.illustration}
                    />
                    <Text style={styles.title}>Hello World!</Text>    
                    <Text style={styles.subtitle}>Join with your email and password</Text>
                    
                    <View style={styles.form}>
                        <Input placeholder="Email" keyboardType="email-address" onChangeText={setEmail}/>
                        <Input placeholder="Password" secureTextEntry={true} onChangeText={setPassword} />
                        <Button label="Let's Get Started" onPress={handleSignIn}/>
                    </View>
                    {/* Add a Link  */}
                    <Text style={styles.footerText}>
                        Don't have an account? 
                        <Link href="/singup" style={{color: '#7C4DFF'}}> Sign Up</Link>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

// Define styles for the index component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFD',
        padding: 50,
    },  
    illustration: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginTop: 50,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    form: {
        marginTop: 50,
        gap: 12,
    },
    footerText: {
        textAlign: 'center',
        color: '#666',
    }
})
