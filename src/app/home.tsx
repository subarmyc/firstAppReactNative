import { Link } from 'expo-router'
import { useState } from 'react'
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'

import { Button } from '@/components/Button'
import { Input } from '@/components/input'

// Define the main index component that render the UI for the app
export default function SingUp() {

    const [name, setName] = useState("")
    const [createEmail, setEmail] = useState("")
    const [createPassword, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    // Validate the email and password fields and show an alert if they are empty, invalid, or do not match, otherwise show a success message
    function handleSignIn() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(createEmail.trim())) {
                    return Alert.alert('Failed', 'Please enter a valid email address');
            }

            if (!createEmail.trim() || !createPassword.trim() || !name.trim() || !confirmPassword.trim()) {
               return  Alert.alert('You Stupid!', 'Please fill in all fields');
            }

            if (createPassword != confirmPassword) {
                return Alert.alert('Error', 'Passwords do not match');
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
                        source={require("@/assets/signup-logo.png")} 
                        style={styles.illustration}
                    />
                    <Text style={styles.title}>Create Account</Text>    
                    
                    <View style={styles.form}>
                        <Input placeholder="Your Name" value={name} onChangeText={setName} />
                        <Input placeholder="Email" keyboardType="email-address" value={createEmail} onChangeText={setEmail} />
                        <Input placeholder="Password" secureTextEntry value={createPassword} onChangeText={setPassword} />
                        <Input placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
                        <Button label="Create Account" onPress={handleSignIn}/>
                    </View>
                    {/* Add a Link  */}
                    <Text style={styles.footerText}>
                        Have an account? 
                        <Link href="/" style={{color: '#7C4DFF'}}> Sign In</Link>
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
        fontSize: 24,
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
        marginTop: 15,
        gap: 5,
    },
    footerText: {
        textAlign: 'center',
        color: '#666',
    }
})
