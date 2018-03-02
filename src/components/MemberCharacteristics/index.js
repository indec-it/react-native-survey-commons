import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {ListItem, Divider} from 'react-native-elements';
import {getFontAwesome} from '@indec/react-native-commons/util';

import Form from '../Form';
import {Member} from '../../model';
import {chapterPropTypes} from '../../util';
import styles from './styles';

const MemberCharacteristics = ({
    member, chapter, onSelect, onRemove, onChange, isSelected
}) => (
    <Fragment>
        <ListItem
            key={member.order}
            onPress={() => onSelect(member)}
            onPressRightIcon={!member.isHomeBoss() ? () => onRemove(member) : undefined}
            title={member.characteristics.name}
            rightIcon={member.isHomeBoss() ? getFontAwesome('user') : getFontAwesome('trash', 'red')}
            leftIcon={isSelected ? getFontAwesome('chevron-down') : getFontAwesome('chevron-right')}
        />
        {isSelected &&
        <Fragment>
            <Form
                rows={chapter.rows}
                chapter={member.characteristics}
                onChange={answer => onChange(answer, chapter.rows)}
            />
            <Divider style={styles.divider}/>
        </Fragment>}
    </Fragment>
);

MemberCharacteristics.propTypes = {
    onSelect: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    chapter: chapterPropTypes.isRequired,
    member: PropTypes.instanceOf(Member).isRequired,
    isSelected: PropTypes.bool
};

MemberCharacteristics.defaultProps = {
    isSelected: false
};

export default MemberCharacteristics;
