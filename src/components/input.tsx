import {TextInput, StyleSheet, TextInputProps} from 'react-native'

// Define the Input component that accepts all TextInputProps
export function Input({...rest}: TextInputProps) {
    return (
        <TextInput
            style={styles.input}
            {...rest}
        />
    )
}

// Define styles for the input component
const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 40,
        borderColor: '#c7c7c7',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        paddingVertical: 5,
        borderRadius: 5,
    }
})