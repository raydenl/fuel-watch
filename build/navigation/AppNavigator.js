import React from 'react';
import { connect } from 'react-redux';
import { createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { mainRoute, authRoute } from './constants';
class AppNavigator extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const Navigator = createSwitchNavigator({
            [mainRoute]: MainNavigator,
            [authRoute]: AuthNavigator,
        }, {
            initialRouteName: this.props.isLoggedIn ? mainRoute : authRoute
        });
        return React.createElement(Navigator, null);
    }
}
const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.authenticated
});
export default connect(mapStateToProps)(AppNavigator);
//# sourceMappingURL=AppNavigator.js.map