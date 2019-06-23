import React from 'react';
import { FlatList, TouchableHighlight } from 'react-native';
import { appActions, Location } from '../app/index';
import { stationsActions, Station, StationWithData } from '../stations'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { StoreState } from '../libraries/redux/types';
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { EventSubscription } from 'fbemitter';
import { settingsDefaults } from '../settings';
import StationListItem from '../components/StationListItem';
//import { stationRoute } from '../navigation/constants';
import ExpandedStationListItem from '../components/ExpandedStationListItem';
//import { stat } from 'fs';
//import { selectStation } from '../stations/actions';
import Sentry from '../libraries/sentry'

interface OwnState {
  loading: boolean,
  expandedItemPlaceId?: string,
}

interface OwnProps {
}

interface StateProps {
  stations: StationWithData[],
  fixedLocation?: Location,
  currentLocation?: Location,
  useLocation: boolean,
  radius: number,
}

interface DispatchProps {
  startLocationListener: () => Promise<EventSubscription>,
  loadStations: (location: Location, radius: number) => Promise<void>,
}

type Props = OwnProps & StateProps & DispatchProps & NavigationInjectedProps;
type State = OwnState

class StationsScreen extends React.PureComponent<Props, State> {
  static navigationOptions: any = {
    title: 'Stations',
  };

  subscription?: EventSubscription

  constructor(props: Props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this._loadStations()

    this.props.navigation.addListener('willFocus', this._tabReceivedFocus)
    this.props.navigation.addListener('willBlur', this._tabLostFocus)
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.fixedLocation !== prevProps.fixedLocation ||
      this.props.currentLocation !== prevProps.currentLocation ||
      this.props.radius !== prevProps.radius ||
      this.props.useLocation !== prevProps.useLocation) {
      this._loadStations()
    }
  }

  _loadStations = async () => {
    this.setState({ loading: true })

    let location = this.props.fixedLocation

    if (this.props.useLocation && this.props.currentLocation) {
      location = this.props.currentLocation;
    }

    if (location) {
      await this.props.loadStations(location, this.props.radius)

      this.setState({ loading: false })
    }
  }

  _tabReceivedFocus = async () => {
    console.log("Stations tab received focus")
    if (this.props.useLocation) {
      this.subscription = await this.props.startLocationListener();
    }
  }

  _tabLostFocus = () => {
    console.log("Stations tab lost focus")
    if (this.subscription) {
      this.subscription.remove();
    }
  }

  _expandStation = (station: Station) => () => {
    this.setState({ expandedItemPlaceId: station.place_id })
  }

  _renderStation = ({ item }: { item: StationWithData }) => (
    this.state.expandedItemPlaceId && this.state.expandedItemPlaceId === item.place_id ?
      (<ExpandedStationListItem station={item} />) :
      (<TouchableHighlight onPress={this._expandStation(item)}>
        <StationListItem station={item} />
      </TouchableHighlight>)
  );

  render() {
    return (
      !this.state.loading &&
      (<FlatList
        data={this.props.stations}
        extraData={this.state}
        renderItem={this._renderStation}
        keyExtractor={item => item.place_id}>
      </FlatList>)
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     backgroundColor: '#fff',
//   },
// });

const loadStations = (location: Location, radius: number) => async (dispatch: Dispatch) => {
  try {
    const stations = await stationsActions.loadStations(location, radius)(dispatch)

    if (stations) {
      await stationsActions.loadStationsData(stations)(dispatch)
    }
  } catch (err) {
    Sentry.captureException(err);
  }
}

const mapStateToProps = (state: StoreState): StateProps => ({
  stations: state.stations.stations,
  fixedLocation: state.app.location,
  currentLocation: state.app.currentLocation,
  useLocation: (state.settings.settings && state.settings.settings.useLocation) ? true : false,
  radius: (state.settings.settings && state.settings.settings.radius) ? state.settings.settings.radius : settingsDefaults.radius!,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  startLocationListener: () => appActions.startLocationListener()(dispatch),
  loadStations: (location, radius) => loadStations(location, radius)(dispatch),
})

const redux = connect(mapStateToProps, mapDispatchToProps)(StationsScreen)

export default withNavigation(redux)
