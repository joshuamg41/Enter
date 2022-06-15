import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Example from '../../example/Example';
import FaceId from '../../user-access/face-id/FaceId';
import ForgotPassword from '../../user-access/forgot-password/ForgotPassword';
import Pin from '../../user-access/pin/Pin';
import Signin from '../../user-access/signin/Signin';
import Signup from '../../user-access/signup/Signup';
import Welcome from '../../user-access/welcome/Welcome';
import SplashScreen from '../splash-screen/SplashScreen';
import DrawerNavigator from './DrawerNavigator';
import ScreenCamera from '../../../components/screen-camera/ScreenCamera';
import BarcodeScanner from '../../../components/scan-qr/ScanQr';
import ScanID from '../../../components/scan-id/ScanID';
const Stack = createStackNavigator<MainNavigatorParamList>();
const MainStackNavigator = () => {
  //Rendering
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Example" component={Example} />
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="ScreenCamera" component={ScreenCamera} />

      {/* flow stack */}
      {/* <Stack.Screen name="ScanID" component={ScanID} /> */}
      <Stack.Screen name="ScanQr" component={BarcodeScanner} />
      <Stack.Screen name="Pin" component={Pin} />
      <Stack.Screen name="FaceId" component={FaceId} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export type MainNavigatorParamList = {
  Welcome?: {
    comeFrom?: 'ForgotPassword';
  };
  Signin?: any;
  FaceId?: {
    touchSupported?: boolean;
    from?: string;
  };
  Pin?: {
    touchSupported?: boolean;
    from?: string;
  };
  Signup?: any;
  ForgotPassword?: any;
  Example?: any;
  SplashScreen?: {
    from?: string;
  };
  DrawerNavigator?: any;
  BottomTabNavigator?: any;
  ScreenCamera?: any;
  ScanQr?: any;
  ScanID?: any;
};

export default MainStackNavigator;
