import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Linking, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



//Owner and repository name shown in the main card
const GITHUB_OWNER = 'subarmyc'
const GITHUB_REPO = 'firstAppReactNative'


// Shape of the main repository data 
type RepoData = {
    language: string
    lastCommitDate: string
    totalCommits: number
}

// Shape of each friend repository coming from the GitHub API
type FriendRepo = {
    id: number
    name: string
    language: string | null
    stargazers_count: number
    html_url: string
}

export default function Home() {

    // Holds the main repository data (language, commits, etc)
    const [repoData, setRepoData] = useState<RepoData | null>(null)
    const [loading, setLoading] = useState(true)


    // Holds the friend's repo list, used by the carousel
    const [friendRepos, setFriendRepos] = useState<FriendRepo[]>([])
    const [loadingFriendRepos, setLoadingFriendRepos] = useState(true)
    // Which GitHub username the carousel is currently showing
    const [githubFriend, setGithubFriend] = useState('BrunoAlm')
    // Controls whether the popup is visible
    const [modalVisible, setModalVisible] = useState(false) 
    // Holds what the user is typing, before confirming
    const [usernameInput, setUsernameInput] = useState('')
    
    // Reference to the FlatList, used to control auto-scroll
    const flatListRef = useRef<FlatList>(null)

    // Tracks which carousel item is currently visible
    const [currentIndex, setCurrentIndex] = useState(0)

        // Fetches data from the API 
        useEffect(() => {
            async function fetchGithubData() {
                try {

                    // Get general repository data
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

                    // Save everything to state to use on the screen
                    setRepoData({
                        language: repoJson.language ?? 'N/A',
                        lastCommitDate: lastCommitDate ?? '',
                        totalCommits,
                    })
                } finally {
                    // Stop showing loading,
                    setLoading(false)
                }
            }

        // Run both fetches
        fetchGithubData()
        },[])

        // Fetches the friend's repos, runs again whenever githubFriend changes
        useEffect(() => {
            async function fetchFriendRepos() {
                setLoadingFriendRepos(true)
                try {
                    const response = await fetch(`https://api.github.com/users/${githubFriend}/repos?sort=updated&per_page=10`)
                    const json = await response.json()

                    if (Array.isArray(json)) {
                        setFriendRepos(json)
                    } else {
                        console.error('Error fetching friend repos:', json.message)
                        setFriendRepos([])
                    }
                } catch (error) {
                    console.error('Error fetching friend repos:', error)
                } finally {
                    setLoadingFriendRepos(false)
                }
            }

            fetchFriendRepos()
        }, [githubFriend])

        // Controls the carousel's automatic scroll every 3 seconds
        useEffect(() => {

            // Only auto-scroll once repos have been loaded
            if (friendRepos.length === 0) return

                const interval = setInterval(() => {
                    setCurrentIndex((prevIndex) => {
                        const nextIndex = prevIndex + 1 >= friendRepos.length ? 0 : prevIndex + 1
                        flatListRef.current?.scrollToIndex({
                            index: nextIndex,
                            animated: true,
                        })
                        return nextIndex
                    })
                }, 3000)

                return () => clearInterval(interval)
        }, [friendRepos])

        //Saves the valid username, closes the modal, and resets the states
        function handleConfirmUsername() {
            if (!usernameInput.trim()) return

            setGithubFriend(usernameInput.trim())
            setModalVisible(false)
            setUsernameInput('')
            setCurrentIndex(0)
        }

        // Formats the API's ISO date into Brazilian format (dd/mm/yyyy)
        function formatDate(isoDate: string) {
        if (!isoDate) return '--'
        return new Date(isoDate).toLocaleDateString('pt-BR')
    }

    return (
        // Adjusts the screen when the keyboard opens (not relevant here, but good practice)
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding', android: 'height' })}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {/* Top of the screen: logo, greeting and notification bell */}
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

                    {/* Purple gradient card with the main repository info */}
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
                        <TouchableOpacity style={styles.navItems} onPress={() => setModalVisible(true)}>
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

                    {/* Carousel block with the friend's repositories */}
                    <View style ={styles.carouselContent}>
                        <Text style={styles.sectionTitle}>  {githubFriend} Projects</Text>
                       
                        {/* Horizontal list that auto-scrolls every 3 seconds */}
                        <FlatList
                            ref={flatListRef}
                            data={friendRepos}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.carouselList}
                            
                            // Retry if auto-scroll fails
                            onScrollToIndexFailed={(info) => {
                                setTimeout(() => {
                                    flatListRef.current?.scrollToIndex({ index: info.index, animated: true })
                                }, 100)
                            }}
                            renderItem={({ item }) => (
                                <View style={styles.repoCard}>
                                    <Text style={styles.repoCardTitle} numberOfLines={1}>{item.name}</Text>
                                    {/* Repository language */}
                                    <View style={styles.repoCardRow}>
                                        <Feather name="code" size={12} color="#dbd7d7" />
                                        <Text style={styles.repoCardText}>{item.language ?? 'N/A'}</Text>
                                    </View>
                                    {/* Star count */}
                                    <View style={styles.repoCardRow}>
                                        <Feather name="star" size={12} color="#dbd7d7" />
                                        <Text style={styles.repoCardText}>{item.stargazers_count}</Text>
                                    </View>

                                    {/* Button that opens this specific repository in the browser */}
                                    <TouchableOpacity
                                        style={styles.repoCardButton}
                                        onPress={() => Linking.openURL(item.html_url)}
                                    >
                                        <Text style={styles.repoCardButtonText}>Open Repository</Text>
                                        <Feather name="arrow-right" color="#7C4DFF" size={14} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        {/* Shows the modal on screen */}
                        <Modal
                            visible={modalVisible}
                            transparent
                            animationType="fade"
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    <Text style={styles.modalTitle}>Search a GitHub User</Text>

                                    <TextInput
                                        style={styles.modalInput}
                                        placeholder="e.g. BruninhoNits"
                                        placeholderTextColor="#9A9AB0"
                                        value={usernameInput}
                                        onChangeText={setUsernameInput}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    <View style={styles.modalButtonRow}>
                                        {/* Disable the modal */}
                                        <TouchableOpacity
                                            style={[styles.modalButton, styles.modalCancelButton]}
                                            onPress={() => setModalVisible(false)}
                                        >
                                            <Text style={styles.modalCancelText}>Close</Text>
                                        </TouchableOpacity>
                                        {/* Confirm the modal */}
                                        <TouchableOpacity
                                            style={[styles.modalButton, styles.modalConfirmButton]}
                                            onPress={handleConfirmUsername}
                                        >
                                            <Text style={styles.modalConfirmText}>Search</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
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
        backgroundColor: '#22293f',
        width: '90%',
        minHeight: 200,
        marginTop: 30,
        marginLeft: 20,
        borderRadius: 15,
        padding: 15,
    },

    carouselList: {
        gap: 10,
    },

    repoCard: {
        backgroundColor: '#2d3347',
        width: 150,
        padding: 12,
        borderRadius: 10,
    },

    repoCardTitle: {
        color: '#F8F9FA',
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 8,
    },

    repoCardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },

    repoCardText: {
        color: '#dbd7d7',
        fontSize: 11,
    },

    repoCardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F9FA',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
        gap: 6,
        marginTop: 10,
    },

    repoCardButtonText: {
        color: '#7C4DFF',
        fontSize: 11,
        fontWeight: '600',
    },

    sectionTitle:{
        color: '#F8F9FA',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#1A2138',
        width: '85%',
        borderRadius: 16,
        padding: 20,
    },
    modalTitle: {
        color: '#F8F9FA',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalInput: {
        backgroundColor: '#22293f',
        color: '#F8F9FA',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        marginBottom: 20,
    },
    modalButtonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
    },
    modalCancelButton: {
        backgroundColor: 'transparent',
    },
    modalCancelText: {
        color: '#9A9AB0',
        fontSize: 14,
    },
    modalConfirmButton: {
        backgroundColor: '#7C4DFF',
    },
    modalConfirmText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
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