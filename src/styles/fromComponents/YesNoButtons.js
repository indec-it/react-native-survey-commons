import {StyleSheet} from 'react-native';

import {badge, textBox} from './common';

const style = StyleSheet.create({
    radioButton: {
        fontSize: 14
    },
    radioGroup: {
        width: 220,
        height: 50,
        backgroundColor: '#eaeaea',
        borderWidth: 1,
        borderColor: '#8b8b8b',
        borderRadius: 4
    },
    buttonColorPressed: {
        color: '#004E84',
        fontWeight: 'bold'
    },
    buttonColorDefault: {
        color: '#000000'
    }
});

const textWithBadgeStyle = {
    badge: badge.defaultStyle,
    textBox: textBox.defaultStyle
};

export default {
    style,
    textWithBadgeStyle
};
