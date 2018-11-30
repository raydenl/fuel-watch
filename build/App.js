var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { authActions } from './auth';
import { appActions } from './app/index';
import store from './libraries/redux/store';
import { connectWithStore } from './libraries/redux/helpers';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from "react-native-dialog";
import { settingsActions } from './settings';
import Sentry from './libraries/sentry';
const configureStore = store();
class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this._closeDialog = () => {
            this.props.closeDialog();
            // run post close actions, if any
            if (this.props.response && this.props.response.actions) {
                const actions = this.props.response.actions;
                if (actions.signOut) {
                    this.props.signOut();
                }
            }
        };
        this._loadResourcesAsync = () => {
            return Promise.all([
                Asset.loadAsync([
                    require('./assets/images/robot-dev.png'),
                    require('./assets/images/robot-prod.png'),
                ]),
                Font.loadAsync({
                    // We include SpaceMono because we use it in HomeScreen.js. Feel free
                    // to remove this if you are not using it in your app
                    'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                }),
            ]).then(() => { });
        };
        this._handleLoadingError = (error) => {
            // In this case, you might want to report the error to your error
            // reporting service, for example Sentry
            console.warn(error);
        };
        this._handleFinishLoading = () => {
            this.setState({ isLoadingComplete: true });
        };
        props.initialise();
        this.state = {
            isLoadingComplete: false,
        };
    }
    componentDidMount() {
        // set a custom message
        // Sentry.captureMessage("App started.", {
        //   level: SentrySeverity.Info
        // });
    }
    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (React.createElement(AppLoading, { startAsync: this._loadResourcesAsync, onError: this._handleLoadingError, onFinish: this._handleFinishLoading }));
        }
        else {
            return (React.createElement(View, { style: styles.container },
                React.createElement(Dialog.Container, { visible: !!this.props.response },
                    React.createElement(Dialog.Title, null, this.props.response ? this.props.response.title : ""),
                    React.createElement(Dialog.Description, null, this.props.response ? this.props.response.message : ""),
                    React.createElement(Dialog.Button, { label: "OK", onPress: this._closeDialog })),
                React.createElement(Spinner, { visible: this.props.processing, textStyle: StyleSheet.flatten(styles.spinnerTextStyle) }),
                Platform.OS === 'ios' && React.createElement(StatusBar, { barStyle: "default" }),
                React.createElement(Provider, { store: configureStore },
                    React.createElement(AppNavigator, null))));
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    spinnerTextStyle: {
        color: '#fff'
    },
});
const mapStateToProps = (state) => ({
    processing: state.app.processing,
    response: state.app.response,
    settings: state.settings.settings,
    uid: state.auth.user ? state.auth.user.uid : undefined,
});
const initialise = () => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield authActions.startAuthListener()(dispatch);
        if (!user)
            return;
        const settings = yield settingsActions.loadSettings(user.uid)(dispatch);
        yield appActions.setLocation(settings)(dispatch);
    }
    catch (err) {
        Sentry.captureException(err);
    }
});
const mapDispatchToProps = (dispatch) => ({
    initialise: () => initialise()(dispatch),
    closeDialog: () => appActions.clearResponse()(dispatch),
    signOut: () => authActions.signOut()(dispatch),
});
export default connectWithStore(configureStore, App, mapStateToProps, mapDispatchToProps);
//# sourceMappingURL=App.js.map