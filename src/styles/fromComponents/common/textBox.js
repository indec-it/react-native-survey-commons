import {StyleSheet} from 'react-native';

const defaultStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#8b8b8b',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 16,
        marginBottom: 16,
        alignItems: 'center',
        backgroundColor: '#e3e3e3'
    },
    text: {
        color: '#333'
    }
});

const white = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#8b8b8b',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 16,
        marginBottom: 16,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        color: '#333'
    }
});

export default {
    defaultStyle,
    white
};
