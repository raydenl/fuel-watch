import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { StationWithData } from "../stations";
import { connect } from "react-redux";
import { StoreState } from "../libraries/redux/types";
import { settingsDefaults } from "../settings";
import Layout from "../constants/Layout"

interface OwnProps {
    station: StationWithData,
}

interface StateProps {
    petrolType: string,
}

type Props = OwnProps & StateProps;

class StationListItem extends React.PureComponent<Props, {}> {

    // _renderItem = ({ item }: { item: Station }) => (
    //     // <TouchableHighlight onPress={this._navigateToStation(item)}>
    //     // <StationListItem station={item} />
    //     // // </TouchableHighlight>
    //     <View style={styles.card}>
    //         <Text >{item.name}</Text>
    //     </View>
    // );

    render() {
        return (
            <View style={styles.card}>
                <Text>{this.props.petrolType}</Text>
                <Text>{this.props.station.name}</Text>
                {this.props.station.price &&
                    <Text>{this.props.station.price[this.props.petrolType]}</Text>
                }

            </View>
            // <FlatList
            //     data={[this.props.station]}
            //     renderItem={this._renderItem}
            //     keyExtractor={item => item.place_id}
            //     horizontal={true}
            //     style={styles.container}
            //     decelerationRate={0}
            //     snapToInterval={width - 60}
            //     snapToAlignment={"center"}
            //     contentInset={{
            //         top: 0,
            //         left: 30,
            //         bottom: 0,
            //     }}>
            // </FlatList>
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
        width: Layout.window.width - 80,
        margin: 10,
        height: 100,
        borderRadius: 10,
        left: 30,
        padding: 10,
        //paddingHorizontal : 30
    }
});

const mapStateToProps = (state: StoreState): StateProps => ({
    petrolType: (state.settings.settings && state.settings.settings.petrolType) ? state.settings.settings.petrolType : settingsDefaults.petrolType!,
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(StationListItem)