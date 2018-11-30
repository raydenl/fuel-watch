import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { authActions } from './auth'
import { appActions, Response } from './app/index'
import { Dispatch } from 'redux'
import store from './libraries/redux/store'
import { connectWithStore } from './libraries/redux/helpers'
import Spinner from 'react-native-loading-spinner-overlay';
import { StoreState } from './libraries/redux/types';
import Dialog from "react-native-dialog";
import { settingsActions } from './settings';
import { Settings } from './settings/types';
import Sentry from './libraries/sentry'

const configureStore = store();

interface State {
  isLoadingComplete: boolean,
}

interface OwnProps {
  skipLoadingScreen: boolean,
}

interface StateProps {
  processing: boolean,
  response?: Response,
  settings?: Settings,
  uid?: string,
}

interface DispatchProps {
  initialise: () => void,
  closeDialog: () => void,
  signOut: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class App extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    props.initialise()
    this.state = {
      isLoadingComplete: false,
    }
  }

  componentDidMount() {
    // set a custom message
    // Sentry.captureMessage("App started.", {
    //   level: SentrySeverity.Info
    // });
  }

  _closeDialog = () => {
    this.props.closeDialog();
    // run post close actions, if any
    if (this.props.response && this.props.response.actions) {
      const actions = this.props.response.actions
      if (actions.signOut) {
        this.props.signOut()
      }
    }
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Dialog.Container visible={!!this.props.response}>
            <Dialog.Title>{this.props.response ? this.props.response.title : ""}</Dialog.Title>
            <Dialog.Description>
              {this.props.response ? this.props.response.message : ""}
            </Dialog.Description>
            <Dialog.Button label="OK" onPress={this._closeDialog} />
          </Dialog.Container>
          <Spinner
            visible={this.props.processing}
            textStyle={StyleSheet.flatten(styles.spinnerTextStyle)}
          />
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider store={configureStore}>
            <AppNavigator />
          </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = (): Promise<void> => {
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

  _handleLoadingError = (error: any) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
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

const mapStateToProps = (state: StoreState): StateProps => ({
  processing: state.app.processing,
  response: state.app.response,
  settings: state.settings.settings,
  uid: state.auth.user ? state.auth.user.uid : undefined,
})

const initialise = () => async (dispatch: Dispatch) => {
  try {
    const user = await authActions.startAuthListener()(dispatch)
    if (!user) return;

    const settings = await settingsActions.loadSettings(user.uid)(dispatch)

    await appActions.setLocation(settings)(dispatch)
  } catch (err) {
    Sentry.captureException(err);
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  initialise: () => initialise()(dispatch),
  closeDialog: () => appActions.clearResponse()(dispatch),
  signOut: () => authActions.signOut()(dispatch),
})

export default connectWithStore(configureStore, App, mapStateToProps, mapDispatchToProps)