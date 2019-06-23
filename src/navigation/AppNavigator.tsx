import React from 'react'
import { connect } from 'react-redux'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { StoreState } from '../libraries/redux/types'

import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator';
import { mainRoute, authRoute } from './constants';

interface OwnProps {
}

interface StateProps {
  isLoggedIn: boolean
}

type Props = OwnProps & StateProps;

class AppNavigator extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const navigator = createSwitchNavigator({
      [mainRoute]: MainNavigator,
      [authRoute]: AuthNavigator,
    },
      {
        initialRouteName: this.props.isLoggedIn ? mainRoute : authRoute
      })
    const NavigatorContainer = createAppContainer(navigator);
    return <NavigatorContainer />
  }
}

const mapStateToProps = (state: StoreState): StateProps => ({
  isLoggedIn: state.auth.authenticated
});

export default connect(mapStateToProps)(AppNavigator)