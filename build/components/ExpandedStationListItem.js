var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import { FlatList, Text, StyleSheet, Dimensions, View, Button } from "react-native";
import { stationsActions, petrolTypes } from "../stations";
import { connect } from "react-redux";
import Sentry from '../libraries/sentry';
const { width } = Dimensions.get('window');
class ExpandedStationListItem extends React.PureComponent {
    constructor() {
        super(...arguments);
        this._saveStationData = (station) => () => __awaiter(this, void 0, void 0, function* () {
            yield this.props.saveStation(this.props.user.uid, station);
        });
        this._mapToItems = () => {
            return petrolTypes.map(type => ({
                petrolType: type,
                station: this.props.station,
            }));
        };
        this._renderItem = ({ item }) => (React.createElement(View, { style: [styles.card] },
            React.createElement(Text, null, item.petrolType),
            React.createElement(Text, null, item.station.name),
            React.createElement(Text, null, item.station.vicinity),
            React.createElement(Text, null, item.station.price[item.petrolType]),
            React.createElement(Button, { title: "Save", onPress: this._saveStationData(item.station) })));
    }
    render() {
        return (React.createElement(FlatList, { data: this._mapToItems(), renderItem: this._renderItem, keyExtractor: item => item.petrolType, horizontal: true, showsHorizontalScrollIndicator: false, style: styles.container, decelerationRate: 0, snapToInterval: width - 60, snapToAlignment: "center", contentOffset: { x: -30, y: 0 }, contentInset: {
                top: 0,
                left: 30,
                bottom: 0,
                right: 30,
            } }, ">"));
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
    }
});
const saveStation = (uid, station) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    try {
        const key = "91";
        station.confirmedBy[key] = uid;
        station.confirmedAt[key] = new Date();
        yield stationsActions.saveStationData(station)(dispatch);
        return Promise.resolve();
    }
    catch (err) {
        Sentry.captureException(err);
        return Promise.reject();
    }
});
const mapStateToProps = (state) => ({
    user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
    saveStation: (uid, station) => saveStation(uid, station)(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpandedStationListItem);
//# sourceMappingURL=ExpandedStationListItem.js.map