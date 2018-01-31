import {Dimensions, StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    streetColumn: {
        flex: 4
    },
    column: {
        flex: 1
    }
});
