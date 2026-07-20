import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



//Define name and repository name to variable
const GITHUB_OWNER = 'subarmyc'
const GITHUB_REPO = 'firstAppReactNative'

// Define variable to Datas
type RepoData = {
    language: string
    lastCommitDate: string
    totalCommits: number
}

export default function Home() {

    const [repoData, setRepoData] = useState<RepoData | null>(null)
    const [loading, setLoading] = useState(true)
        useEffect(() => {
            async function fetchGithubData() {
                try {
                    // Connect to API using nome and repository name
                    const repoResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`)
                    const repoJson = await repoResponse.json()

                    // Consult last commit
                    const commitsResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=1`)
                    const commitsJson = await commitsResponse.json()
                    const lastCommitDate = commitsJson[0]?.commit?.author?.date

                    // Consult total of commits
                    const linkHeader = commitsResponse.headers.get('link')
                    const match = linkHeader?.match(/page=(\d+)>; rel="last"/)
                    const totalCommits = match ? parseInt(match[1]) : commitsJson.length

                    setRepoData({
                        language: repoJson.language ?? 'N/A',
                        lastCommitDate: lastCommitDate ?? '',
                        totalCommits,
                    })
                } finally {
                    setLoading(false)
                }
            }

            fetchGithubData()
        },[])

        //Format date
        function formatDate(isoDate: string) {
        if (!isoDate) return '--'
        return new Date(isoDate).toLocaleDateString('pt-BR')
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: 'height' })}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.topBanner}>
                        <View style={styles.logoBox}>
                            <Image source={require('@/assets/home.png')} style={styles.logo} />
                            <View>
                                <Text style={styles.logoText}>Welcome</Text>
                                <Text style={styles.logoSubtitle}>You join in the future </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.bellButton}>
                            <Feather name="bell" color="#F8F9FA" size={20} />
                        </TouchableOpacity>
                    </View>

                    {/* Gradient of card on homepage */}
                    <LinearGradient
                        colors={['#7C4DFF', '#1E90FF']}
                        locations={[0, 0.9]}
                        start={{ x: 0.2, y: 0 }}    
                        end={{ x: 1.7, y: 1.5 }}
                        style={styles.projetCard}
                    >
                    
                        <View style ={styles.cardContent} >  
                            <View style ={styles.leftColumnCard}>  
                                <Text style={styles.cardTitle}>My First App</Text>

                                <View style={styles.infoRow}>
                                    <Feather name="code" color='#dbd7d7' />
                                    <Text style={styles.infoText}>{repoData?.language}</Text>
                                </View>

                                <View style={styles.infoRow}>
                                    <Feather name="git-commit" color='#dbd7d7'  />
                                    <Text style={styles.infoText}>{repoData?.totalCommits} commits</Text>
                                </View>

                                <View style={styles.infoRow}>
                                    <Feather name="clock" color ='#dbd7d7'/>
                                    <Text style={styles.infoText}>
                                        Last Commit: {formatDate(repoData?.lastCommitDate ?? '')}
                                    </Text>
                                </View>
                                <TouchableOpacity 
                                style={styles.repoButton} 
                                onPress={() => Linking.openURL(`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`)}>
                                    <Text style={styles.repoButtonText}>Open Respository</Text>
                                    <Feather name="arrow-right" color="#7C4DFF" size={16} />
                                </TouchableOpacity>
                            </View>
                            <Image source={require('@/assets/logo.png')} style = {styles.imageCard}/>
                        </View>
                           
                    </LinearGradient>
                    {/* Creating a navBar with items */}
                    <View style={styles.navBar}>
                        <TouchableOpacity style={styles.navItems}>
                            <Feather name ='home' color='#dbd7d7' size={22}/>
                            <Text style={styles.navName}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItems}>
                            <Feather name="search" color="#dbd7d7" size={22} />
                            <Text style={styles.navName}>Search</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItems}>
                            <Feather name="plus-square" color="#dbd7d7" size={22} />
                            <Text style={styles.navName}>New</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItems}>
                            <Feather name="star" color="#dbd7d7" size={22} />
                            <Text style={styles.navName}>Favorite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItems}>
                            <Feather name="user" color="#dbd7d7" size={22} />
                            <Text style={styles.navName}>Profile</Text>
                        </TouchableOpacity>
                    </View>

                    <View style ={styles.carouselContent}>

                    </View>
                </View>
                
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#11172A',
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
    cardContent:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftColumnCard: {
        flex: 1,        
        paddingRight: 10,
    },
    projetCard: {
        width: '90%',
        minHeight: 150,
        marginTop: 20,
        marginLeft: 20,
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center',
    },
    imageCard: {
        width: 80,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 12,
    },
    cardTitle: {
        color: '#F8F9FA',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },

    infoText: {
        color: '#dbd7d7',
        fontSize: 14,
    },
    repoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F9FA',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        gap: 8,
        marginTop: 8,
        alignSelf: 'flex-start', 
    },
    repoButtonText: {
        color: '#7C4DFF',
        fontSize: 14,
        fontWeight: '600',
    },
    carouselContent:{
        backgroundColor: '#dada',
        width: '90%',
        minHeight: 300,
        marginTop: 40,
        marginLeft: 20,
        borderRadius: 10,
        padding: 15,
        justifyContent: 'center',
    },

    navBar: {
        position: 'absolute',
        bottom: 20,        
        left: 10,          
        right: 10,          
        height: 60,
        backgroundColor: '#22293f',
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal:10,
    },
    navItems:{
        alignItems: 'center',
        gap:4
    },
    navName: {
        fontSize: 11,
        color: '#dbd7d7'
    }
})