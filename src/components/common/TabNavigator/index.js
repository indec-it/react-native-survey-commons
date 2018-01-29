import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import styles from './styles';

const isSelected = (idGroup, selected) => (
    selected === idGroup ? styles.tabSelected : {}
);

const TabNavigator = ({tabs, onChange, selected}) => (
    <View>
        <View style={styles.container}>
            {tabs.map(({idGroup, tabName}) => (
                <Text
                    key={idGroup}
                    style={[
                        styles.tab, isSelected(idGroup, selected)
                    ]}
                    onPress={() => onChange(idGroup)}
                >
                    {tabName}
                </Text>
            ))}
        </View>
        <View style={styles.tabNavigatorFooter}/>
    </View>
);

TabNavigator.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        idGroup: PropTypes.number,
        tabName: PropTypes.string
    })).isRequired,
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired
};

export default TabNavigator;
