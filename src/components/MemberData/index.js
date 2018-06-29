import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

import {Member} from '../../model';
import {getMemberAge, getMemberName} from '../../util';
import styles from './styles';

const MemberData = ({member, style}) => (
    <View style={[styles.nameContainer, style.nameContainer]}>
        <Text style={[styles.nameText, style.nameText]}>
            {`${member.order} - ${getMemberName(member)} (${getMemberAge(member)} años)`}
        </Text>
    </View>
);

MemberData.propTypes = {
    member: PropTypes.instanceOf(Member).isRequired,
    style: PropTypes.shape({})
};

MemberData.defaultProps = {
    style: {}
};

export default MemberData;
