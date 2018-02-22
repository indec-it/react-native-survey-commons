import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    tableHeader: {
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    tableRow: {
        marginLeft: 15,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    syncRow: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    surveyCount: {
        fontSize: 30
    },
    syncStatusRow: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    syncStatusText: {
        padding: 8,
        marginLeft: 15,
        marginRight: 15
    },
    network: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    networkConnection: {
        flexDirection: 'row',
        padding: 10
    },
    networkText: {
        padding: 6
    },
    buttonContainer: {
        marginLeft: 15,
        marginRight: 15
    }
});
