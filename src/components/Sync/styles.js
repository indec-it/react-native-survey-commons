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
        fontSize: 22,
        color: '#004e84'
    },
    syncStatusRow: {
        paddingRight: 10,
        flexDirection: 'row'
    },
    syncStatusText: {
        padding: 8,
        marginLeft: 15,
        marginRight: 15
    },
    network: {
        flex: 1,
        padding: 20,
        flexDirection: 'column'
    },
    networkConnection: {
        flexDirection: 'row'
    },
    networkText: {
        paddingRight: 10
    },
    buttonContainer: {
        marginLeft: 15,
        marginRight: 15
    }
});
