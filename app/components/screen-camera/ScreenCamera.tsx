import {useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {connect, ConnectedProps} from 'react-redux';
import {MainNavigatorParamList} from '../../containers/root/navigators/MainNavigator';
import {RootState} from '../../stores/AppReducers';
import PhotoActions from '../../stores/photo/Actions';
import {COLORS} from '../../themes';
import {useIsAppForeground} from '../../utils/FunctionUtil';
import Container from '../container/Container';
import Header from '../header/Header';
import Loading from '../loading/Loading';
import ScreenLoading from '../screen-loading/ScreenLoading';
import Styles from './ScreenCameraStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ScreenCamera = (props: ScreenProps) => {
  const [localLoading, setLocalLoading] = useState(false);
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.front;
  const [cameraUse, setCameraUse] = useState(false);
  const frontCamera = devices.front;
  const backCamera = devices.back;
  const isFocused = useIsFocused();
  const isForeground = useIsAppForeground();

  const takePhoto = async () => {
    if (localLoading) {
      return;
    }
    setLocalLoading(true);
    const options = {
      skipMetadata: true,
    };
    const photo = await camera.current?.takePhoto(options);
    console.log(photo, 'aqi');
    props.setPhoto(photo);
    setLocalLoading(false);
    props.navigation.goBack();
  };

  //rendering
  if (!device) return <ScreenLoading />;
  return (
    <Container>
      <Header leftIcon />
      <Camera
        ref={camera}
        style={Styles.camera}
        device={cameraUse ? frontCamera : backCamera}
        isActive={isFocused && isForeground}
        orientation="portrait"
        photo
      />
      <View style={Styles.absolute}>
        <TouchableHighlight
          underlayColor={COLORS.gray}
          style={Styles.circle}
          onPress={takePhoto}>
          <Loading isLoading={localLoading} />
        </TouchableHighlight>
      </View>
      <View style={Styles.absoluteChange}>
        <TouchableHighlight
          underlayColor={COLORS.gray}
          style={Styles.change}
          onPress={() => setCameraUse(!cameraUse)}>
          <View>
            <Loading
              isLoading={localLoading || props.postLoading}
              color={COLORS.white}
            />
            <Ionicons name={'md-sync'} style={{fontSize: 30}} />
          </View>
        </TouchableHighlight>
      </View>
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    StackScreenProps<MainNavigatorParamList, 'ScreenCamera'> {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  photo: state.photo.photoData,
});

const mapDispatchToProps = {
  setPhoto: PhotoActions.setPhoto,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ScreenCamera);
