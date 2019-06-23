var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { FlatList, TouchableHighlight } from 'react-native';
import { appActions } from '../app/index';
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
            this.setState({ loading: true });
            let location = this.props.fixedLocation;
            if (this.props.useLocation && this.props.currentLocation) {
                location = this.props.currentLocation;
            }
            if (location) {
                yield this.props.loadStations(location, this.props.radius);
                this.setState({ loading: false });
            }
        });
        this._tabReceivedFocus = () => __awaiter(this, void 0, void 0, function* () {
            console.log("Stations tab received focus");
            if (this.props.useLocation) {
                this.subscription = yield this.props.startLocationListener();
            }
        });
        this._tabLostFocus = () => {
            console.log("Stations tab lost focus");
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
            loading: true,
        };
    }
    componentDidMount() {
        this._loadStations();
        this.props.navigation.addListener('willFocus', this._tabReceivedFocus);
        this.props.navigation.addListener('willBlur', this._tabLostFocus);
    }
    componentDidUpdate(prevProps) {
        if (this.props.fixedLocation !== prevProps.fixedLocation ||
            this.props.currentLocation !== prevProps.currentLocation ||
            this.props.radius !== prevProps.radius ||
            this.props.useLocation !== prevProps.useLocation) {
            this._loadStations();
        }
    }
    render() {
        return (!this.state.loading &&
            (React.createElement(FlatList, { data: this.props.stations, extraData: this.state, renderItem: this._renderStation, keyExtractor: item => item.place_id })));
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
    fixedLocation: state.app.location,
    currentLocation: state.app.currentLocation,
    useLocation: (state.settings.settings && state.settings.settings.useLocation) ? true : false,
    radius: (state.settings.settings && state.settings.settings.radius) ? state.settings.settings.radius : settingsDefaults.radius,
});
const mapDispatchToProps = (dispatch) => ({
    startLocationListener: () => appActions.startLocationListener()(dispatch),
    loadStations: (location, radius) => loadStations(location, radius)(dispatch),
});
const redux = connect(mapStateToProps, mapDispatchToProps)(StationsScreen);
export default withNavigation(redux);
//# sourceMappingURL=StationsScreen.js.map