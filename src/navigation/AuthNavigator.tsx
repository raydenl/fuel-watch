import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import { loginRoute } from './constants';

const AuthStack = createStackNavigator({ [loginRoute]: LoginScreen });

export default AuthStack