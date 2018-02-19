import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    messagesContainer: {
        paddingHorizontal: 20
    },
    messageContainer: {
        padding: 7,
        borderRadius: 5
    },
    errorMessageContainer: {
        backgroundColor: 'red'
    },
    warningMessageContainer: {
        backgroundColor: 'orange'
    },
    message: {
        fontWeight: 'bold',
        color: 'white'
    }
});
