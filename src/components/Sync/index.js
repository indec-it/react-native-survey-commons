import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {Button, Col, Grid} from '@indec/react-native-commons';
import {getFontAwesome} from '@indec/react-native-commons/util';

import NetworkStatus from './NetworkStatus';
import SyncStatus from './SyncStatus';
import {requestNetworkStatus, requestPing} from '../../actions/network';
import {cleanSyncStatus, requestSync} from '../../actions/sync';

import styles from './styles';

class Sync extends Component {
    static propTypes = {
        cleanSyncStatus: PropTypes.func.isRequired,
        requestPing: PropTypes.func.isRequired,
        requestNetworkStatus: PropTypes.func.isRequired,
        requestSync: PropTypes.func.isRequired,
        isPinging: PropTypes.bool,
        isConnected: PropTypes.bool.isRequired,
        surveys: PropTypes.number,
        endpoint: PropTypes.string.isRequired,
        pong: PropTypes.bool,
        syncStatus: PropTypes.string.isRequired
    };

    static defaultProps = {
        isPinging: false,
        surveys: 0,
        pong: false
    };

    constructor(props) {
        super(props);
        this.state = {
            syncPressed: false
        };
    }

    componentDidMount() {
        const {endpoint} = this.props;
        this.props.requestPing(endpoint);
        this.props.requestNetworkStatus();
        this.props.cleanSyncStatus();
    }

    handleSync() {
        const {endpoint} = this.props;
        this.setState({syncPressed: true});
        this.props.requestSync(endpoint);
    }

    render() {
        const {
            isConnected,
            isPinging,
            pong,
            surveys,
            syncStatus
        } = this.props;
        return (
            <Grid>
                <Col>
                    <View style={styles.syncRow}>
                        <NetworkStatus isConnected={isConnected} isPinging={isPinging} pong={pong}/>
                    </View>
                    <View style={styles.syncRow}>
                        <Text style={styles.surveyCount}>
                            {surveys} encuesta(s) para enviar.
                        </Text>
                    </View>
                    <View style={styles.syncRow}>
                        <SyncStatus syncStatus={syncStatus}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            disabled={this.state.syncPressed}
                            icon={getFontAwesome('refresh')}
                            title="Sincronizar"
                            onPress={() => this.handleSync()}
                        />
                    </View>
                </Col>
            </Grid>
        );
    }
}

export default connect(
    state => ({
        isPinging: state.network.isPinging,
        pong: state.network.pong,
        isConnected: state.network.isConnected,
        syncStatus: state.sync.status
    }),
    dispatch => ({
        cleanSyncStatus: () => dispatch(cleanSyncStatus()),
        requestPing: endpoint => dispatch(requestPing(endpoint)),
        requestNetworkStatus: () => dispatch(requestNetworkStatus()),
        requestSync: endpoint => dispatch(requestSync(endpoint))
    })
)(Sync);
