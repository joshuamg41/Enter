import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { connect, ConnectedProps } from "react-redux";
import Container from '../../components/container/Container';
import Content from '../../components/content/Content';
import Header from '../../components/header/Header';
import Separator from '../../components/separator/Separator';
import Text from '../../components/text/Text';
import { navigateAndReset } from '../../services/NavigationService';
import { RootState } from '../../stores/AppReducers';
import ConfigActions from '../../stores/example/Actions';
import { COLORS, METRICS } from '../../themes';
import ApplicationStyles from '../../themes/ApplicationStyles';
import { moderateScale } from '../../utils/StyleHelpers';
import DrawerItem from '../root/drawer-menu/components/DrawerItem';
import { DrawerNavigatorParamList } from '../root/navigators/DrawerNavigator';
import { ConfigState } from './ConfigConstants';
import Styles from './ConfigStyles';
import Ionicons from "react-native-vector-icons/Ionicons";
import ConfigButton from './components/ConfigButton';
import PickerSelect from '../../components/picker-select/PickerSelect';
import ModalPicker from '../../components/modal-picker/ModalPicker';
import update from 'immutability-helper';
import TextCheck from '../../components/text/TextCheck';

const Config = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<ConfigState>({
    project: undefined,
    forAccident: true,
    forDelay: true,
    forEntry: false,
    forExit: false,
  })

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  //rendering
  return (
    <Container style={Styles.container}>
      <Header
        title='Configuración'
        iconName='menu'
        leftIcon
      />
      <Content contentContainerStyle={ApplicationStyles.vPLarge}>
        <Text style={Styles.title}>Configura y actualiza los datos del proyecto</Text>
        <Separator height={METRICS.medium10} />

        <Text style={Styles.subTitle}>Más Opciones</Text>
        <ModalPicker
          onValueChange={onStateChange('project')}
          value={state.project}
          title='Proyecto'
          placeholder='Seleccionar proyecto'
          data={[]}
        />
        <Separator height={METRICS.medium10} />

        <Text style={Styles.subTitle}>Recibir notificaciones</Text>
        <Separator height={METRICS.medium10} />
        <TextCheck
          onValueChange={onStateChange('forAccident')}
          value={state.forAccident}
        >
          Por Accidentados
        </TextCheck>
        <TextCheck
          onValueChange={onStateChange('forDelay')}
          value={state.forDelay}
        >
          Por Tardanzas
        </TextCheck>
        <TextCheck
          onValueChange={onStateChange('forEntry')}
          value={state.forEntry}
        >
          Por Entrada
        </TextCheck>
        <TextCheck
          onValueChange={onStateChange('forExit')}
          value={state.forExit}
        >
          Por Salidas
        </TextCheck>

        <Text style={Styles.subTitle}>Cuenta</Text>
        <Separator height={METRICS.medium10} />
        <ConfigButton
          label='Cambiar contraseña'
          leftIcon='lock-closed-outline'
          onPress={() => { }}
        />
        <ConfigButton
          label='Cerrar sesión'
          onPress={() => navigateAndReset('Welcome')}
        />
      </Content>
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<DrawerNavigatorParamList, 'Config'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,
});

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Config)