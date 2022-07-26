import {useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {connect, ConnectedProps} from 'react-redux';
import {Face, scanFaces} from 'vision-camera-face-detector';
import Container, {ContainerRef} from '../../components/container/Container';
import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';
import ScreenLoading from '../../components/screen-loading/ScreenLoading';
import Text from '../../components/text/Text';
import {RootState} from '../../stores/AppReducers';
import SecurityActions from '../../stores/security/Actions';
import {COLORS} from '../../themes';
import {useIsAppForeground} from '../../utils/FunctionUtil';
import {DrawerNavigatorParamList} from '../root/navigators/DrawerNavigator';
import Styles from './SecurityStyles';

const Security = (props: ScreenProps) => {
  const mounted = useRef(false);
  const containerRef = useRef<ContainerRef>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [faces, setFaces] = useState<Face[]>();
  const camera = useRef<Camera>(null);
  const devices = useCameraDevices();
  const [cameraUse, setCameraUse] = useState(false);
  const frontCamera = devices.front;
  const backCamera = devices.back;
  const device = devices.back;
  const isFocused = useIsFocused();
  const isForeground = useIsAppForeground();

  //componentDidUpdate
  useEffect(() => {
    if (mounted.current && (props.postData?.date || props.postError)) {
      containerRef.current?.showSuccess();
    }
    return () => {};
  }, [props.postData, props.postError]);

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  //Misc
  const takePhoto = async () => {
    if (localLoading) {
      return;
    } else if (!faces?.length) {
      //@ts-ignore
      alert('No se han encontrado rostros en la foto');
      return;
    }
    const face = faces[0];
    setLocalLoading(true);
    const options = {
      skipMetadata: true,
    };
    const photo = await camera.current?.takePhoto(options);
    console.log(photo);
    const request = {
      photo: photo?.path,
      type: props.route.params?.type,
      proyectoID: props.user.data?.proyectoID,
    };
    props.postSecurity(request);
    setLocalLoading(false);
  };

  const getTitle = useCallback(() => {
    switch (props.route.params?.type) {
      case 'entry':
        return 'Entrada';
      case 'exit':
        return 'Salida';
      default:
        return '';
    }
  }, [props.route]);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const scannedFaces = scanFaces(frame);
    runOnJS(setFaces)(scannedFaces);
  }, []);

  //rendering
  if (!device || !isFocused || !isForeground) return <ScreenLoading />;
  return (
    <Container
      ref={containerRef}
      successMessage={
        props.postError?.message ||
        `Se ha registrado la ${getTitle()} del usuario correctamente`
      } // ${props.postData.data?.name}
      failure={!!props.postError}>
      <Header title={getTitle()} leftIcon />
      <Camera
        ref={camera}
        style={Styles.camera}
        device={cameraUse ? frontCamera : backCamera}
        orientation="portrait"
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
        preset="medium"
        isActive
        photo
      />
      <View style={Styles.absolute}>
        <TouchableHighlight
          underlayColor={COLORS.gray}
          style={Styles.circle}
          onPress={takePhoto}>
          <Loading
            isLoading={localLoading || props.postLoading}
            color={COLORS.white}
          />
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
    StackScreenProps<DrawerNavigatorParamList, 'Security'> {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  postLoading: state.security.postLoading,
  postError: state.security.postError,
  postData: state.security.postData,
});

const mapDispatchToProps = {
  postSecurity: SecurityActions.postSecurity,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Security);
