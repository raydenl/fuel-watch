var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { Text, View, FlatList, TouchableHighlight } from 'react-native';
import { stationsActions } from '../stations';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { settingsDefaults } from '../settings';
import StationListItem from '../components/StationListItem';
//import { stationRoute } from '../navigation/constants';
import ExpandedStationListItem from '../components/ExpandedStationListItem';
//import { stat } from 'fs';
//import { selectStation } from '../stations/actions';
import Sentry from '../libraries/sentry';
class StationsScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this._loadStations = () => __awaiter(this, void 0, void 0, function* () {
            let location = this.props.initialLocation;
            if (this.props.useLocation && this.props.realtimeLocation) {
                location = this.props.realtimeLocation;
            }
            if (location) {
                yield this.props.loadStations(location, this.props.radius);
                this.setState({ showStations: true });
            }
            else {
                this.setState({ showStations: false });
            }
        });
        this._tabReceivedFocus = () => __awaiter(this, void 0, void 0, function* () {
            if (this.props.useLocation) {
                this.subscription = yield this.props.startLocationListener();
            }
        });
        this._tabLostFocus = () => {
            if (this.subscription) {
                this.subscription.remove();
            }
        };
        this._expandStation = (station) => () => {
            this.setState({ expandedItemPlaceId: station.place_id });
        };
        this._renderStation = ({ item }) => (this.state.expandedItemPlaceId && this.state.expandedItemPlaceId === item.place_id ?
            (React.createElement(ExpandedStationListItem, { station: item })) :
            (React.createElement(TouchableHighlight, { onPress: this._expandStation(item) },
                React.createElement(StationListItem, { station: item }))));
        this.state = {
            showStations: false,
        };
    }
    componentDidMount() {
        this._loadStations();
        this.props.navigation.addListener('willFocus', this._tabReceivedFocus);
        this.props.navigation.addListener('willBlur', this._tabLostFocus);
    }
    componentDidUpdate(prevProps) {
        if (this.props.realtimeLocation !== prevProps.realtimeLocation ||
            this.props.initialLocation !== prevProps.initialLocation ||
            this.props.radius !== prevProps.radius ||
            this.props.useLocation !== prevProps.useLocation) {
            this._loadStations();
        }
    }
    render() {
        return (this.state.showStations ?
            (React.createElement(FlatList, { data: this.props.stations, extraData: this.state, renderItem: this._renderStation, keyExtractor: item => item.place_id })) :
            (React.createElement(View, null,
                React.createElement(Text, null, "Loading stations"))));
    }
}
StationsScreen.navigationOptions = {
    title: 'Stations',
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });
const loadStations = (location, radius) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    try {
        const stations = yield stationsActions.loadStations(location, radius)(dispatch);
        if (stations) {
            yield stationsActions.loadStationsData(stations)(dispatch);
        }
    }
    catch (err) {
        Sentry.captureException(err);
    }
});
const mapStateToProps = (state) => ({
    stations: state.stations.stations,
    realtimeLocation: state.stations.location,
    initialLocation: state.app.location,
    useLocation: (state.settings.settings && state.settings.settings.useLocation) ? true : false,
    radius: (state.settings.settings && state.settings.settings.radius) ? state.settings.settings.radius : settingsDefaults.radius,
});
const mapDispatchToProps = (dispatch) => ({
    startLocationListener: () => stationsActions.startLocationListener()(dispatch),
    loadStations: (location, radius) => loadStations(location, radius)(dispatch),
});
const redux = connect(mapStateToProps, mapDispatchToProps)(StationsScreen);
export default withNavigation(redux);
//# sourceMappingURL=StationsScreen.js.map