import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import { Facebook } from 'expo'
import { config as facebookConfig } from '../parties/facebook/config'
import { authActions } from '../auth'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

interface OwnProps {
}

interface StateProps {
    loggingIn: boolean,
    signInWithFacebook: (token: string) => void
}

type Props = OwnProps & StateProps;

class LoginScreen extends React.PureComponent<Props> {
    static navigationOptions: any = {
    };

    constructor(props: Props) {
        super(props)
    }

    async handleFacebookButton() {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(facebookConfig.appId, {
            permissions: ['email']
        })

        if (token && type === 'success') {
            this.props.signInWithFacebook(token);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={styles.facebookButton}
                    underlayColor="#3B5998"
                    onPress={() => this.handleFacebookButton()}
                >
                    <Text style={styles.facebookButtonText}>Log in with Facebook</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
    signInWithFacebook: (token: string) => authActions.signInWithFacebook(token)(dispatch)
})

export default connect(null, mapDispatchToProps)(LoginScreen)
