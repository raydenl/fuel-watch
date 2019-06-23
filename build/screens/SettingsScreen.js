var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { StyleSheet, Button, ScrollView, Switch, Text, Slider, TextInput, Picker } from 'react-native';
import { authActions } from '../auth';
import { connect } from 'react-redux';
import { settingsActions } from '../settings';
import { withNavigation } from 'react-navigation';
import { TextInputMask } from 'react-native-masked-text';
import { settingsDefaults, radiusSettings } from '../settings';
import { appActions } from '../app/index';
import Sentry from '../libraries/sentry';
import { throttle } from 'throttle-debounce';
class SettingsScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this._getSettingsDefaults = () => {
            if (!this.props.settings) {
                return settingsDefaults;
            }
            return {
                postcode: this.props.settings.postcode || settingsDefaults.postcode,
                useLocation: this.props.settings.useLocation,
                radius: this.props.settings.radius || settingsDefaults.radius,
                name: this.props.settings.name || this.props.user.displayName || settingsDefaults.name,
                petrolType: this.props.settings.petrolType || settingsDefaults.petrolType,
            };
        };
        this._signOut = () => {
            this.props.signOut();
        };
        this._saveSettings = () => {
            const settings = Object.assign({}, this.state);
            this.props.saveSettings(this.props.user.uid, settings, this.state.setLocation).then(() => {
                this.setState({ isDirty: false, setLocation: false });
                this.props.navigation.setParams({ saveDisabled: true });
            });
        };
        this._setState = (key, value, postChange) => {
            this.setState({ [key]: value }, () => {
                if (postChange) {
                    postChange();
                }
            });
        };
        this._throttleSetState = throttle(250, (key, value, postChange) => this._setState(key, value, postChange));
        this._handleChange = (key, postChange) => (value) => {
            this.setState({ isDirty: true });
            this.props.navigation.setParams({ saveDisabled: false });
            this._throttleSetState(key, value, postChange);
        };
        this._setLocation = () => {
            this.setState({ setLocation: true });
        };
        this.state = Object.assign({}, this._getSettingsDefaults(), { isDirty: false, setLocation: false });
    }
    componentDidMount() {
        this.props.navigation.setParams({ saveSettings: this._saveSettings, saveDisabled: !this.state.isDirty });
    }
    render() {
        return (React.createElement(ScrollView, { style: styles.container },
            React.createElement(TextInput, { placeholder: "Name", keyboardType: "default", value: this.state.name, onChangeText: this._handleChange("name") }),
            React.createElement(TextInputMask, { placeholder: "Postcode", maxLength: 4, type: "only-numbers", value: this.state.postcode, onChangeText: this._handleChange("postcode", this._setLocation), editable: !this.state.useLocation }),
            React.createElement(Switch, { value: this.state.useLocation, onValueChange: this._handleChange("useLocation", this._setLocation) }),
            React.createElement(Text, null, this.state.radius),
            React.createElement(Slider, { value: this.state.radius, onValueChange: this._handleChange("radius"), minimumValue: radiusSettings.min, maximumValue: radiusSettings.max, step: radiusSettings.step }),
            React.createElement(Picker, { selectedValue: this.state.petrolType, style: { height: 50, width: 100 }, onValueChange: this._handleChange("petrolType") },
                React.createElement(Picker.Item, { label: "91", value: "91" }),
                React.createElement(Picker.Item, { label: "95", value: "95" })),
            React.createElement(Button, { title: "Sign out", onPress: this._signOut })));
    }
}
SettingsScreen.navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerRight: (React.createElement(Button, { onPress: () => navigation.state.params.saveSettings(), title: "Save", disabled: navigation.getParam('saveDisabled', true) })),
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
const saveSettings = (uid, settings, setLocation) => (dispatch) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield settingsActions.saveSettings(uid, settings)(dispatch);
        if (setLocation) {
            yield appActions.setLocation(settings)(dispatch);
        }
        return Promise.resolve();
    }
    catch (err) {
        Sentry.captureException(err);
        return Promise.reject();
    }
});
const mapStateToProps = (state) => ({
    user: state.auth.user,
    settings: state.settings.settings,
});
const mapDispatchToProps = (dispatch) => ({
    signOut: () => authActions.signOut()(dispatch),
    saveSettings: (uid, settings, setLocation) => saveSettings(uid, settings, setLocation)(dispatch),
});
const redux = connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
export default withNavigation(redux);
//# sourceMappingURL=SettingsScreen.js.map