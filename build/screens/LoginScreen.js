var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Facebook } from 'expo';
import { config as facebookConfig } from '../parties/facebook/config';
import { authActions } from '../auth';
import { connect } from 'react-redux';
class LoginScreen extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    handleFacebookButton() {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, token } = yield Facebook.logInWithReadPermissionsAsync(facebookConfig.appId, {
                permissions: ['email']
            });
            if (token && type === 'success') {
                this.props.signInWithFacebook(token);
            }
        });
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(TouchableHighlight, { style: styles.facebookButton, underlayColor: "#3B5998", onPress: () => this.handleFacebookButton() },
                React.createElement(Text, { style: styles.facebookButtonText }, "Log in with Facebook"))));
    }
}
LoginScreen.navigationOptions = {};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    facebookButton: {
        width: 375 * 0.75,
        height: 48,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B5998'
    },
    facebookButtonText: {
        color: '#fff'
    },
    space: {
        height: 17
    }
});
const mapDispatchToProps = (dispatch) => ({
    signInWithFacebook: (token) => authActions.signInWithFacebook(token)(dispatch)
});
export default connect(null, mapDispatchToProps)(LoginScreen);
//# sourceMappingURL=LoginScreen.js.map