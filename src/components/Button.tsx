import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'


// Creat my type for the button component
type ButtonProps = TouchableOpacityProps & {
    label: string
}

// Button component style and implementation, rest of the props are passed to TouchableOpacity
export function Button({label, ...rest}: ButtonProps){
    return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6} {...rest}>
        <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
    )
}

// Define styles for the button component
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#7C4DFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    label: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
})