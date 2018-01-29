import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 8
    },
    tab: {
        flex: 1,
        backgroundColor: '#e4e4e4',
        padding: 16,
        marginRight: 8,
        marginLeft: 8,
        borderColor: '#cecece',
        borderWidth: 0.5,
        marginTop: 8
    },
    tabSelected: {
        backgroundColor: '#008BC7',
        color: 'white',
        marginTop: 0
    },
    tabNavigatorFooter: {
        backgroundColor: '#cecece',
        height: 1
    }
});
