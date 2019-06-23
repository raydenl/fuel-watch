import React from 'react';
import { connect } from 'react-redux';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { mainRoute, authRoute } from './constants';
class AppNavigator extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const navigator = createSwitchNavigator({
            [mainRoute]: MainNavigator,
            [authRoute]: AuthNavigator,
        }, {
            initialRouteName: this.props.isLoggedIn ? mainRoute : authRoute
        });
        const NavigatorContainer = createAppContainer(navigator);
        return React.createElement(NavigatorContainer, null);
    }
}
const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.authenticated
});
export default connect(mapStateToProps)(AppNavigator);
//# sourceMappingURL=AppNavigator.js.map