import React from 'react';
import { StyleSheet, Button, ScrollView, Switch, Text, Slider, TextInput } from 'react-native'
import { authActions } from '../auth'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { settingsActions } from '../settings'
import { StoreState } from '../libraries/redux/types';
import { NavigationInjectedProps, withNavigation } from 'react-navigation'
import { TextInputMask } from 'react-native-masked-text'
import { Settings, settingsDefaults, radiusSettings } from '../settings';
import { appActions } from '../app/index';
import Sentry from '../libraries/sentry'
import { User } from '../auth/types';
import { throttle } from 'throttle-debounce'

interface OwnState {
  isDirty: boolean,
  setLocation: boolean,
}

interface SettingsState extends Settings {
}

interface OwnProps {
}

interface StateProps {
  user?: User,
  settings?: Settings,
}

interface DispatchProps {
  signOut: () => void,
  saveSettings: (uid: string, settings: Settings, setLocation: boolean) => Promise<void>,
}

type Props = OwnProps & StateProps & DispatchProps & NavigationInjectedProps;
type State = OwnState & SettingsState

class SettingsScreen extends React.PureComponent<Props, State> {
  static navigationOptions = ({ navigation }: any) => ({
    title: 'Settings',
    headerRight: (
      <Button
        onPress={() => navigation.state.params.saveSettings()}
        title="Save"
        disabled={navigation.getParam('saveDisabled', true)}
      />
    ),
  });

  constructor(props: Props) {
    super(props)
    this.state = {
      ...this._getSettingsDefaults(),
      isDirty: false,
      setLocation: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ saveSettings: this._saveSettings, saveDisabled: !this.state.isDirty });
  }

  _getSettingsDefaults = (): SettingsState => {
    if (!this.props.settings) {
      return settingsDefaults
    }

    return {
      postcode: this.props.settings.postcode || settingsDefaults.postcode,
      useLocation: this.props.settings.useLocation,
      radius: this.props.settings.radius || settingsDefaults.radius,
      name: this.props.settings.name || this.props.user!.displayName || settingsDefaults.name,
    }
  }

  _signOut = () => {
    this.props.signOut();
  }

  _saveSettings = () => {
    const settings: Settings = {
      ...this.state as SettingsState
    };
    this.props.saveSettings(this.props.user!.uid, settings, this.state.setLocation).then(() => {
      this.setState({ isDirty: false, setLocation: false })
      this.props.navigation.setParams({ saveDisabled: true });
    })
  }

  _setState = (key: keyof SettingsState, value: any, postChange?: () => void) => {
    this.setState({ [key]: value } as Pick<SettingsState, keyof SettingsState>, () => {
      if (postChange) {
        postChange();
      }
    });
  }

  _throttleSetState = throttle(250, (key: keyof SettingsState, value: any, postChange?: () => void) => this._setState(key, value, postChange))

  _handleChange = (key: keyof SettingsState, postChange?: () => void) => (value: any) => {
    this.setState({ isDirty: true })
    this.props.navigation.setParams({ saveDisabled: false });
    this._throttleSetState(key, value, postChange)
  }

  _setLocation = () => {
    this.setState({ setLocation: true })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TextInput placeholder="Name" keyboardType="default" value={this.state.name} onChangeText={this._handleChange("name")}></TextInput>
        <TextInputMask placeholder="Postcode" maxLength={4} type={"only-numbers"} value={this.state.postcode} onChangeText={this._handleChange("postcode", this._setLocation)} editable={!this.state.useLocation}></TextInputMask>
        <Switch value={this.state.useLocation} onValueChange={this._handleChange("useLocation", this._setLocation)}></Switch>
        <Text>{this.state.radius}</Text>
        <Slider value={this.state.radius} onValueChange={this._handleChange("radius")} minimumValue={radiusSettings.min} maximumValue={radiusSettings.max} step={radiusSettings.step}></Slider>
        <Button title="Sign out" onPress={this._signOut} />
      </ScrollView>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

const saveSettings = (uid: string, settings: Settings, setLocation: boolean) => async (dispatch: Dispatch) => {
  try {
    await settingsActions.saveSettings(uid, settings)(dispatch)

    if (setLocation) {
      await appActions.setLocation(settings)(dispatch)
    }

    return Promise.resolve()
  } catch (err) {
    Sentry.captureException(err);

    return Promise.reject()
  }
}

const mapStateToProps = (state: StoreState): StateProps => ({
  user: state.auth.user,
  settings: state.settings.settings,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signOut: () => authActions.signOut()(dispatch),
  saveSettings: (uid: string, settings: Settings, setLocation: boolean) => saveSettings(uid, settings, setLocation)(dispatch),
})

const redux = connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)

export default withNavigation(redux);