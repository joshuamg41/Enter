import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {moderateScale, viewportWidth} from '../../../utils/StyleHelpers';
import Absence from '../../absence/Absence';
import AccidentForm from '../../accident/form/AccidentForm';
import AccidentList from '../../accident/list/AccidentList';
import Config from '../../config/Config';
import EmployeeForm from '../../employee/form/EmployeeForm';
import EmployeeList from '../../employee/list/EmployeeList';
import Entry from '../../entry/Entry';
import Exit from '../../exit/Exit';
import Home from '../../home/Home';
import Visit from '../../visit/Visit';
import Security from '../../security/Security';
import DrawerMenu from '../drawer-menu/DrawerMenu';
import {MainNavigatorParamList} from './MainNavigator';
const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();
const DrawerNavigator = () => {
  //Rendering
  const LocalDrawerMenu = (props: any) => {
    return <DrawerMenu {...props} />;
  };
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={LocalDrawerMenu}
      useLegacyImplementation={true}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: viewportWidth * 0.8,
          borderBottomRightRadius: moderateScale(30),
          borderTopRightRadius: moderateScale(30),
        },
      }}
      backBehavior="history">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen
        name="Security"
        component={Security}
        options={{swipeEnabled: false}}
      />
      <Drawer.Screen name="Absence" component={Absence} />
      <Drawer.Screen name="Config" component={Config} />
      <Drawer.Screen name="Exit" component={Exit} />
      <Drawer.Screen name="Entry" component={Entry} />
      <Drawer.Screen name="Visit" component={Visit} />

      <Drawer.Group>
        <Drawer.Screen name="EmployeeList" component={EmployeeList} />
        <Drawer.Screen
          name="EmployeeForm"
          component={EmployeeForm}
          options={{swipeEnabled: false}}
        />
      </Drawer.Group>
      <Drawer.Group>
        <Drawer.Screen name="AccidentList" component={AccidentList} />
        <Drawer.Screen
          name="AccidentForm"
          component={AccidentForm}
          options={{swipeEnabled: false}}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  );
};

export type DrawerNavigatorParamList = MainNavigatorParamList & {
  Home?: any;
  EmployeeNavigator?: any;
  Security?: {
    type?: 'entry' | 'exit';
  };
  EmployeeList?: any;
  EmployeeForm?: any;
  AccidentList?: any;
  AccidentForm?: any;
  InOut?: any;
  Absence?: any;
  Config?: any;
  Exit?: any;
  Entry?: any;
  Visit?: any;
};

export default DrawerNavigator;
