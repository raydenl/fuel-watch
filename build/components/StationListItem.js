import React from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";
const { width } = Dimensions.get('window');
export default class StationListItem extends React.PureComponent {
    // _renderItem = ({ item }: { item: Station }) => (
    //     // <TouchableHighlight onPress={this._navigateToStation(item)}>
    //     // <StationListItem station={item} />
    //     // // </TouchableHighlight>
    //     <View style={styles.card}>
    //         <Text >{item.name}</Text>
    //     </View>
    // );
    render() {
        return (React.createElement(View, { style: styles.card },
            React.createElement(Text, null, this.props.station.name))
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
        );
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
        margin: 10,
        height: 100,
        borderRadius: 10,
        left: 30,
        padding: 10,
    }
});
//# sourceMappingURL=StationListItem.js.map