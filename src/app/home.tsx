import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
                } catch (error) {
                    console.error('Erro ao buscar dados do GitHub:', error)
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
                                <Text style={styles.logoSubtitle}>You join in future </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.bellButton}>
                            <Feather name="bell" color="#F8F9FA" size={20} />
                        </TouchableOpacity>
                    </View>

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
                                        </View>q

                                        <View style={styles.infoRow}>
                                            <Feather name="git-commit" color='#dbd7d7'  />
                                            <Text style={styles.infoText}>{repoData?.totalCommits} commits</Text>
                                        </View>

                                        <View style={styles.infoRow}>
                                            <Feather name="clock" color ='#dbd7d7'/>
                                            <Text style={styles.infoText}>
                                                Último commit: {formatDate(repoData?.lastCommitDate ?? '')}
                                            </Text>
                                        </View>
                                    </View>
                            <Image source={require('@/assets/logo.png')} style = {styles.imageCard}/>

                                </View>
                           
                    </LinearGradient>
                    
                </View>
                <View style={styles.bottomBanner}></View>
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
        padding: 20,
        justifyContent: 'center',
    },
    imageCard:{
        width: 80,
        height:  100,
        resizeMode: 'contain',
        borderRadius: 5
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
        marginBottom: 8,
    },

    infoText: {
        color: '#dbd7d7',
        fontSize: 14,
    },

    bottomBanner: {
        width: '100%',
        height: '10%',
        backgroundColor: '#11172A',
    },
})