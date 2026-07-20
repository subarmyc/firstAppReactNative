import { Feather } from '@expo/vector-icons';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function Home() {
    return (
            // Use KeyboardAvoidingView to adjust the view when the keyboard is open
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.select({ ios: 'padding', android: 'height' })}>
            {/* ScrollView to contain the form elements */}
                <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>    
                    <View style={styles.container}>
                        {/* // Add a top banner with a logo and welcome message */}
                        <View style={styles.topBanner}>
                            <View style={styles.logoBox}>
                                <Image source={require('@/assets/home.png')} style={styles.logo}/>
                                <View>  
                                    <Text style={styles.logoText}>Welcome</Text>
                                    <Text style={styles.logoSubtitle}>You join in future </Text>
                                </View>
                            </View>
                            {/* Bell button */}
                            <TouchableOpacity style={styles.bellButton}>
                                 <Feather name="bell" color="#F8F9FA" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.bottomBanner}>

                    </View>
                </ScrollView>
        </KeyboardAvoidingView>
    )
}

// Define styles for the index component
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#FDFDFD',
    },

     illustration: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginTop: 50,
    },
   
    topBanner: {
        width: '100%',
        height: '15%',
        backgroundColor: '#11172A',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 5,
    },
    
    logoBox: {
        height: '100%',
        paddingTop: 50,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    logo: {
        width: 50,
        height: 50,
        borderRadius: 100,
        resizeMode: 'cover',
    },

     logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#F8F9FA',
    },

    logoSubtitle: {
        fontSize: 12,
        color: '#F8F9FA',
    },

    bellButton: {
        paddingTop: 50,
        width: 50,
    },

    bottomBanner: {
        width: '100%',
        height: '10%',
        backgroundColor: '#11172A',
    },

})
