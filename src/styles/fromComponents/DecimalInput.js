import {StyleSheet} from 'react-native';

import {textBox} from './common';

const style = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 0,
        paddingTop: 0
    },
    field: {
        height: 40
    },
    wrapper: {
        paddingTop: 5,
        position: 'relative'
    },
    label: {
        height: 50,
        marginTop: -25,
        marginLeft: 15
    }
});

const textWithBadgeStyle = {
    textBox: textBox.defaultStyle
};

export default {
    style,
    textWithBadgeStyle
};
