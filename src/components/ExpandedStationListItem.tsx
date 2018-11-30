import React from "react";
import { FlatList, Text, StyleSheet, Dimensions, View, Button } from "react-native";
import { StationWithData, stationsActions, StationCard, petrolTypes } from "../stations";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Sentry from '../libraries/sentry'
import { StoreState } from "../libraries/redux/types";
import { User } from "../auth/types";

const { width } = Dimensions.get('window');

interface OwnProps {
    station: StationWithData,
}

interface StateProps {
    user?: User,
}

interface DispatchProps {
    saveStation: (uid: string, station: StationWithData) => Promise<void>,
}

type Props = OwnProps & StateProps & DispatchProps;

class ExpandedStationListItem extends React.PureComponent<Props, {}> {

    _saveStationData = (station: StationWithData) => async () => {
        await this.props.saveStation(this.props.user!.uid, station)
    }

    _mapToItems = (): StationCard[] => {
        return petrolTypes.map(type => ({
            petrolType: type,
            station: this.props.station,
        }))
    }

    _renderItem = ({ item }: { item: StationCard }) => (
        <View style={[styles.card]}>
            <Text >{item.petrolType}</Text>
            <Text >{item.station.name}</Text>
            <Text >{item.station.vicinity}</Text>
            <Text >{item.station.price[item.petrolType]}</Text>
            <Button title="Save" onPress={this._saveStationData(item.station)}></Button>
        </View>
    );

    render() {
        return (
            <FlatList
                data={this._mapToItems()}
                renderItem={this._renderItem}
                keyExtractor={item => item.petrolType}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.container}
                decelerationRate={0}
                snapToInterval={width - 60}
                snapToAlignment={"center"}
                contentOffset={{ x: -30, y: 0 }}
                contentInset={{
                    top: 0,
                    left: 30,
                    bottom: 0,
                    right: 30,
                }}>
                >
            </FlatList>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    card: {
        //marginTop: 100,
        backgroundColor: 'blue',
        width: width - 80,
        //margin: 10,
        height: 200,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        //left: 40,
        //right: 40,
        //marginLeft: 40,
        //marginRight: 10,
        //paddingHorizontal : 30
    }
});

const saveStation = (uid: string, station: StationWithData) => async (dispatch: Dispatch) => {
    try {
        const key = "91"
        station.confirmedBy[key] = uid
        station.confirmedAt[key] = new Date()

        await stationsActions.saveStationData(station)(dispatch)

        return Promise.resolve()
    } catch (err) {
        Sentry.captureException(err);

        return Promise.reject()
    }
}

const mapStateToProps = (state: StoreState): StateProps => ({
    user: state.auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    saveStation: (uid: string, station: StationWithData) => saveStation(uid, station)(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ExpandedStationListItem)
