import { Image, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native'
import {Link} from 'expo-router'

import { Button } from '@/components/Button'
import { Input } from '@/components/input'

// Define the main index component that render the UI for the app
export default function SingUp() {
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
                    <Text style={styles.subtitle}>Let`s make the future</Text>
                    
                    <View style={styles.form}>
                        <Input placeholder="Your Name" />
                        <Input placeholder="Email" keyboardType="email-address" />
                        <Input placeholder="Password" secureTextEntry />
                        <Input placeholder="Confirm Password" secureTextEntry />
                        <Button label="Create Account"/>
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
