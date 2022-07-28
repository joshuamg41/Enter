// import * as React from 'react';
// import {BaseApi} from '../../services/BaseApi';
// import {
//   Text,
//   Linking,
//   Dimensions,
//   SafeAreaView,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   Platform,
//   Alert,
//   Switch,
//   BackHandler,
// } from 'react-native';
// import {
//   Camera,
//   useCameraDevices,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import {
//   DBRConfig,
//   decode,
//   TextResult,
// } from 'vision-camera-dynamsoft-barcode-reader';
// import * as REA from 'react-native-reanimated';

// import {Polygon, Text as SVGText, Svg, Rect} from 'react-native-svg';
// import ActionSheet from '@alessiocancian/react-native-actionsheet';
// import {useNavigation} from '@react-navigation/native';

// let pressedResult: TextResult | undefined;

// export default function BarcodeScanner({route, navigation}) {
//   const mounted = REA.useSharedValue(true);
//   const rotated = REA.useSharedValue(false);
//   const regionEnabledShared = REA.useSharedValue(false);
//   const [continuous, setContinuous] = React.useState(true);
//   const [hasPermission, setHasPermission] = React.useState(false);
//   const [barcodeResults, setBarcodeResults] = React.useState(
//     [] as TextResult[],
//   );
//   const [buttonText, setButtonText] = React.useState('Pause');
//   const [isActive, setIsActive] = React.useState(true);
//   const [frameWidth, setFrameWidth] = React.useState(1280);
//   const [frameHeight, setFrameHeight] = React.useState(720);
//   const [regionEnabled, setRegionEnabled] = React.useState(false);
//   const [torchEnabled, setTorchEnabled] = React.useState(false);
//   const [useFront, setUseFront] = React.useState(false);
//   const useFrontShared = REA.useSharedValue(false);

//   const devices = useCameraDevices();
//   const frontCam = devices.front;
//   const backCam = devices.back;

//   let actionSheetRef = React.useRef(null);
//   let scanned = false;

//   const nav = useNavigation();

//   React.useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'authorized');
//     })();

//     const backAction = () => {
//       setIsActive(false);
//       navigation.goBack();
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );

//     return () => backHandler.remove();
//   }, []);

//   React.useEffect(() => {
//     mounted.value = true; // to avoid the error: Can’t perform a React state update on an unmounted component.
//     return () => {
//       mounted.value = false;
//     };
//   });

//   const onBarCodeDetected = (results: TextResult[]) => {
//     if (continuous === true && scanned === false) {
//       console.log('Barcodes detected. Navigating');
//       setIsActive(false);
//       scanned = true;
//       // navigation.navigate({
//       //   params: {results: results},
//       //   name: 'Home',
//       // });
//     }
//   };

//   const toggleCameraStatus = () => {
//     if (buttonText == 'Pause') {
//       setButtonText('Resume');
//       setIsActive(false);
//     } else {
//       setButtonText('Pause');
//       setIsActive(true);
//     }
//   };

//   const getPointsData = (lr: TextResult) => {
//     var pointsData = lr.x1 + ',' + lr.y1 + ' ';
//     pointsData = pointsData + lr.x2 + ',' + lr.y2 + ' ';
//     pointsData = pointsData + lr.x3 + ',' + lr.y3 + ' ';
//     pointsData = pointsData + lr.x4 + ',' + lr.y4;
//     return pointsData;
//   };

//   const getViewBox = () => {
//     const frameSize = getFrameSize();
//     const viewBox = '0 0 ' + frameSize[0] + ' ' + frameSize[1];
//     console.log('viewBox' + viewBox);
//     updateRotated();
//     return viewBox;
//   };

//   const getFrameSize = (): number[] => {
//     let width: number, height: number;
//     if (HasRotation()) {
//       width = frameHeight;
//       height = frameWidth;
//     } else {
//       width = frameWidth;
//       height = frameHeight;
//     }
//     return [width, height];
//   };

//   const HasRotation = () => {
//     let value = false;
//     if (Platform.OS === 'android') {
//       if (
//         !(
//           frameWidth > frameHeight &&
//           Dimensions.get('window').width > Dimensions.get('window').height
//         )
//       ) {
//         value = true;
//       }
//     }
//     return value;
//   };

//   const updateRotated = () => {
//     rotated.value = HasRotation();
//   };

//   const updateFrameSize = (width: number, height: number) => {
//     if (mounted.value) {
//       setFrameWidth(width);
//       setFrameHeight(height);
//     }
//   };

//   const onBarcodeScanned = (results: TextResult[]) => {
//     if (mounted.value) {
//       setBarcodeResults(results);
//       if (results.length > 0) {
//         onBarCodeDetected(results);
//       }
//     }
//   };

//   const format = React.useMemo(() => {
//     const desiredWidth = 1280;
//     const desiredHeight = 720;
//     let selectedCam;
//     if (useFront) {
//       selectedCam = frontCam;
//     } else {
//       selectedCam = backCam;
//     }
//     if (selectedCam) {
//       for (let index = 0; index < selectedCam.formats.length; index++) {
//         const format = selectedCam.formats[index];
//         console.log('h: ' + format.videoHeight);
//         console.log('w: ' + format.videoWidth);
//         if (
//           format.videoWidth === desiredWidth &&
//           format.videoHeight === desiredHeight
//         ) {
//           console.log('select format: ' + format);
//           return format;
//         }
//       }
//     }
//     return undefined;
//   }, [useFront]);

//   const frameProcessor = useFrameProcessor(frame => {
//     'worklet';
//     console.log('height: ' + frame.height);
//     console.log('width: ' + frame.width);
//     REA.runOnJS(updateFrameSize)(frame.width, frame.height);
//     const config: DBRConfig = {};
//     //config.template="{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}";
//     config.isFront = useFrontShared.value;
//     if (regionEnabledShared.value) {
//       let settings;
//       if (config.template) {
//         settings = JSON.parse(config.template);
//       } else {
//         const template = `{
//           "ImageParameter": {
//             "Name": "Settings"
//           },
//           "Version": "3.0"
//         }`;
//         settings = JSON.parse(template);
//       }
//       settings['ImageParameter']['RegionDefinitionNameArray'] = ['Settings'];
//       settings['RegionDefinition'] = {
//         Left: 10,
//         Right: 90,
//         Top: 20,
//         Bottom: 65,
//         MeasuredByPercentage: 1,
//         Name: 'Settings',
//       };
//       config.template = JSON.stringify(settings);
//     }

//     const results: TextResult[] = decode(frame, config);
//     REA.runOnJS(onBarcodeScanned)(results);
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       {backCam != null && hasPermission && (
//         <>
//           <Camera
//             style={StyleSheet.absoluteFill}
//             device={useFront ? frontCam : backCam}
//             isActive={isActive}
//             format={format}
//             torch={torchEnabled ? 'on' : 'off'}
//             frameProcessor={frameProcessor}
//             frameProcessorFps={5}
//           />
//         </>
//       )}
//       <ActionSheet
//         ref={actionSheetRef}
//         title={'Seleccione la Accion'}
//         options={['Registrar Entrada', 'Registrar Salida', 'Cancel']}
//         cancelButtonIndex={2}
//         onPress={async index => {
//           try {
//             if (pressedResult) {
//               if (index === 0) {
//                 navigation.navigate('EntryCard', {
//                   id: pressedResult.barcodeText,
//                   proyectID: route.params.proyectoID,
//                 });
//                 const res = await BaseApi.post(route.params.entry, {
//                   id: pressedResult.barcodeText,
//                   proyectoID: route.params.proyectoID,
//                 });
//                 console.log(res.data);
//                 if (res.data) {
//                   Alert.alert(res.data.message || res.data);
//                 } else {
//                   Alert.alert('Entrada registrada');
//                 }
//               } else if (index === 1) {
//                 const res = await BaseApi.post(route.params.exit, {
//                   id: pressedResult.barcodeText,
//                   proyectoID: route.params.proyectoID,
//                 });
//                 if (res.data) {
//                   Alert.alert(res.data.message || res.data);
//                 } else {
//                   Alert.alert('Salida registrada');
//                 }
//               } else {
//                 nav.goBack();
//               }
//             }
//           } catch (error) {
//             console.log(error);
//           }
//         }}
//       />
//       <Svg style={StyleSheet.absoluteFill} viewBox={getViewBox()}>
//         {regionEnabled && (
//           <Rect
//             x={0.1 * getFrameSize()[0]}
//             y={0.2 * getFrameSize()[1]}
//             width={0.8 * getFrameSize()[0]}
//             height={0.45 * getFrameSize()[1]}
//             strokeWidth="2"
//             stroke="red"
//           />
//         )}
//         {barcodeResults.map((barcode, idx) => (
//           <Polygon
//             key={'poly-' + idx}
//             points={getPointsData(barcode)}
//             fill="lime"
//             stroke="green"
//             opacity="0.5"
//             strokeWidth="1"
//             onPress={() => {
//               setButtonText('Resume');
//               setIsActive(false);
//               pressedResult = barcode;
//               actionSheetRef.current.show();
//             }}
//           />
//         ))}
//         {barcodeResults.map((barcode, idx) => (
//           <SVGText
//             key={'text-' + idx}
//             fill="white"
//             stroke="purple"
//             fontSize={(getFrameSize()[0] / 400) * 20}
//             fontWeight="bold"
//             x={barcode.x1}
//             y={barcode.y1}>
//             {barcode.barcodeText}
//           </SVGText>
//         ))}
//       </Svg>
//       <View style={styles.control}>
//         <View style={{flex: 0.8}}>
//           <View style={styles.switchContainer}>
//             <Text style={{alignSelf: 'center', color: 'black'}}>
//               Scan Region
//             </Text>
//             <Switch
//               style={{alignSelf: 'center'}}
//               trackColor={{false: '#767577', true: 'black'}}
//               thumbColor={regionEnabled ? 'white' : '#f4f3f4'}
//               ios_backgroundColor="#3e3e3e"
//               onValueChange={newValue => {
//                 regionEnabledShared.value = newValue;
//                 setRegionEnabled(newValue);
//               }}
//               value={regionEnabled}
//             />
//           </View>
//           <View style={styles.switchContainer}>
//             <Text style={{alignSelf: 'center', color: 'black'}}>Front</Text>
//             <Switch
//               style={{alignSelf: 'center'}}
//               trackColor={{false: '#767577', true: 'black'}}
//               thumbColor={useFront ? 'white' : '#f4f3f4'}
//               ios_backgroundColor="#3e3e3e"
//               onValueChange={newValue => {
//                 useFrontShared.value = newValue;
//                 setUseFront(newValue);
//               }}
//               value={useFront}
//             />
//             <Text style={{alignSelf: 'center', color: 'black'}}>Torch</Text>
//             <Switch
//               style={{alignSelf: 'center'}}
//               trackColor={{false: '#767577', true: 'black'}}
//               thumbColor={torchEnabled ? 'white' : '#f4f3f4'}
//               ios_backgroundColor="#3e3e3e"
//               onValueChange={newValue => {
//                 setTorchEnabled(newValue);
//               }}
//               value={torchEnabled}
//             />
//           </View>
//         </View>
//         <TouchableOpacity
//           onPress={toggleCameraStatus}
//           style={styles.toggleCameraStatusButton}>
//           <Text style={{fontSize: 15, color: 'black', alignSelf: 'center'}}>
//             {buttonText}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   barcodeText: {
//     fontSize: 20,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   toggleCameraStatusButton: {
//     flex: 0.2,
//     justifyContent: 'center',
//     borderColor: 'black',
//     borderWidth: 2,
//     borderRadius: 5,
//     padding: 8,
//     margin: 5,
//   },
//   control: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 0,
//     height: '15%',
//     width: '100%',
//     alignSelf: 'flex-start',
//     borderColor: 'white',
//     borderWidth: 0.1,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     alignItems: 'center',
//   },
//   switchContainer: {
//     alignItems: 'flex-start',
//     flexDirection: 'row',
//   },
// });
import * as React from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Modal,
  Image,
} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {COLORS, FONTS, METRICS} from '../../themes';
import {moderateScale} from '../../utils/StyleHelpers';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {BaseApi} from '../../services/BaseApi';
import ApplicationStyles from '../../themes/ApplicationStyles';
import Button from '../button/Button';
import CheckRender from '../security/CheckRender';

export default function BarcodeScanner(props) {
  const [hasPermission, setHasPermission] = React.useState(false);
  //const [localLoading, setLocalLoading] = React.useState(false);
  const [user, setUser] = React.useState();
  const devices = useCameraDevices();
  const device = devices.back;
  const frontCamera = devices.front;
  const backCamera = devices.back;
  const [cameraUse, setCameraUse] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  //const id = {id: props.route.params.id};
  const navigation = useNavigation();
  const [userId, setUserId] = React.useState('');
  const [active, setActive] = React.useState(true);
  const [message, setMessage] = React.useState('');
  const [continuous, setContinuos] = React.useState(false);
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  // Alternatively you can use the underlying function:
  //
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  //   runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);
  const getUser = async Id => {
    try {
      const res = await BaseApi.post('/employees/getEntryInfo/', {id: Id});
      if (res.data.employee) {
        setUser(res.data);
      } else {
        Alert.alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const registerEntry = async () => {
    try {
      const resApi = await BaseApi.post('/employees/employeeEntry', {
        id: userId,
        proyectoID: props.route.params.proyectoID,
      });
      setContinuos(false);
      console.log(resApi);
      if (resApi.data) {
        Alert.alert(resApi.data.message || resApi.data);
        setModal(false);
      } else {
        setMessage('Entrada Registrada');
        setModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const registerExit = async () => {
    try {
      const resApi = await BaseApi.post('/employees/employeeExit', {
        id: userId,
        proyectoID: props.route.params.proyectoID,
      });
      setContinuos(false);
      console.log(resApi);
      if (resApi.data) {
        Alert.alert(resApi.data.message || resApi.data);
        setModal(false);
      } else {
        setMessage('Salida Registrada');
        setModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const registerVisitEntry = async () => {
    try {
      const resApi = await BaseApi.post('/visits/visitEntry', {
        id: userId,
        proyectoID: props.route.params.proyectoID,
      });
      setContinuos(false);
      console.log(resApi);
      if (resApi.data) {
        Alert.alert(resApi.data.message || resApi.data);
        setModal(false);
      } else {
        setMessage('Entrada Registrada');
        setModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={cameraUse ? frontCamera : backCamera}
          isActive={active}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        {barcodes.map((barcode, idx) =>
          barcode.displayValue?.length > 0 && continuous === false ? (
            (setModal(true),
            setContinuos(true),
            setUserId(barcode.displayValue),
            getUser(barcode.displayValue))
          ) : (
            // <Text key={idx} style={Styles.barcodeTextURL}>
            //   {barcode.displayValue}
            // </Text>
            <Text>Buscando Qr</Text>
          ),
        )}
        <Modal
          style={{width: '100%', height: '100%', zIndex: 1}}
          transparent={false}
          visible={modal}>
          <View style={Styles.container}>
            <Image
              style={{width: 250, height: 250}}
              source={{
                uri: user?.employeePhoto,
              }}
            />
            <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
              <Text style={[Styles.textAlign, {fontSize: FONTS.regular}]}>
                Nombre:{' '}
              </Text>
              <Text style={Styles.label}>{user?.employee?.name}</Text>
            </View>
            <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
              <Text style={[Styles.textAlign, {fontSize: FONTS.regular}]}>
                Documento de Identificacion:
              </Text>
              <Text style={Styles.label}>{user?.employee?.docNumber}</Text>
            </View>
            <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
              <Text style={[Styles.textAlign, {fontSize: FONTS.regular}]}>
                Fecha de Contracto:
              </Text>
              <Text style={Styles.label}>{user?.employee?.contractDate}</Text>
            </View>
            <CheckRender allowed={props.route.params.visit}>
              <Button
                title="Aceptar Visita"
                theme="green"
                onPress={registerVisitEntry}
              />
            </CheckRender>
            <CheckRender
              allowed={
                props.route.params.visit === false &&
                props.route.params.salida === false
              }>
              <Button
                title="Aceptar Entrada"
                theme="green"
                onPress={registerEntry}
              />
            </CheckRender>
            <CheckRender allowed={props.route.params.salida}>
              <Button
                title="Aceptar Salida"
                theme="green"
                onPress={registerExit}
              />
            </CheckRender>

            <Button
              title="Cancelar"
              theme="errorOutline"
              onPress={() => {
                setContinuos(false);
                navigation.navigate('DrawerNavigator');
              }}
            />
          </View>
        </Modal>
        <TouchableHighlight
          underlayColor={COLORS.gray}
          style={Styles.change}
          onPress={() => setCameraUse(!cameraUse)}>
          <View>
            <Ionicons name={'md-sync'} style={{fontSize: 30}} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={COLORS.gray}
          style={Styles.back}
          onPress={() => {
            navigation.goBack();
            setContinuos(false);
          }}>
          <View>
            <Ionicons
              name={'chevron-back'}
              style={{fontSize: 30, color: 'white'}}
            />
          </View>
        </TouchableHighlight>
        {/* <Modal
          style={{width: '100%', height: '100%', zIndex: 1}}
          visible={modal}>
          <View>
            <Image
              style={{width: 250, height: 250}}
              source={{
                uri: user?.employeePhoto,
              }}
            />
            <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
              <Text style={{fontSize: FONTS.regular}}>Nombre: </Text>
              <Text style={Styles.label}>{user?.employee?.name}</Text>
            </View>
            <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
              <Text style={{fontSize: FONTS.regular}}>
                Documento de Identificacion:
              </Text>
              <Text style={Styles.label}>{user?.employee?.docNumber}</Text>
            </View>
            <View style={(ApplicationStyles.row, ApplicationStyles.vPMedium)}>
              <Text style={{fontSize: FONTS.regular}}>Fecha de Contracto:</Text>
              <Text style={Styles.label}>{user?.employee?.contractDate}</Text>
            </View>

            <Button title="Aceptar" onPress={() => setModal(false)} />
        
            <Button
              title="Cancelar"
              theme="errorOutline"
              onPress={() => navigation.navigate('DrawerNavigator')}
            />
          </View>
        </Modal> */}
        {/* <TouchableOpacity
          onPress={()=>setUseFront(useFront)}
          style={styles.toggleCameraStatusButton}>
          <Text style={{fontSize: 15, color: 'black', alignSelf: 'center'}}>
            {buttonText}
          </Text>
        </TouchableOpacity> */}
        {/* <TouchableHighlight
          underlayColor={COLORS.gray}
          style={Styles.circle}
          // onPress={takePhoto}
        >
          <Text>hola</Text>
        </TouchableHighlight> */}
      </>
    )
  );
}

const Styles = StyleSheet.create({
  textAlign: {
    textAlign: 'center',
  },
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    padding: 30,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  circle: {
    backgroundColor: COLORS.transparent,
    height: moderateScale(70),
    width: moderateScale(70),
    borderRadius: moderateScale(70),
    borderColor: COLORS.lightGray,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  change: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: COLORS.white,
    height: 55,
    width: 100,
    borderColor: COLORS.lightGray,
    borderRadius: moderateScale(70),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: COLORS.transparent,
    height: 55,
    width: 100,
    borderColor: COLORS.lightGray,
    borderRadius: moderateScale(70),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: COLORS.black,
    fontSize: FONTS.large,
    textAlign: 'center',
  },
  buttonSection: {
    position: 'absolute',
    bottom: moderateScale(METRICS.medium10),
    right: moderateScale(METRICS.medium10),
  },
  createTouchable: {
    backgroundColor: COLORS.primary,
    padding: moderateScale(METRICS.large15),
    borderRadius: moderateScale(50),
  },
  createIcon: {
    color: COLORS.white,
    fontSize: FONTS.mediumIcon,
    alignSelf: 'center',
  },
});

{
  /* <Modal
style={{height: '100%', width: '100%', zIndex: 1}}
visible={modal}>
<View>
  <Image
    style={{width: 250, height: 250}}
    source={{
      uri: user?.data?.employeePhoto,
    }}
  />
  <View
    style={
      (ApplicationStyles.row, ApplicationStyles.vPMedium)
    }>
    <Text style={{fontSize: FONTS.regular}}>Nombre: </Text>
    <Text style={Styles.label}>
      {user?.data?.employee?.name}
    </Text>
  </View>
  <View
    style={
      (ApplicationStyles.row, ApplicationStyles.vPMedium)
    }>
    <Text style={{fontSize: FONTS.regular}}>
      Documento de Identificacion:
    </Text>
    <Text style={Styles.label}>
      {user?.data?.employee?.docNumber}
    </Text>
  </View>
  <View
    style={
      (ApplicationStyles.row, ApplicationStyles.vPMedium)
    }>
    <Text style={{fontSize: FONTS.regular}}>
      Fecha de Contracto:
    </Text>
    <Text style={Styles.label}>
      {user?.data?.employee?.contractDate}
    </Text>
  </View>
  <Button title="Aceptar" onPress={setModal(false)} />
  {/* <Button
title="Registrar Salida"
onPress={registerExit}
theme="primaryOutline"
/> 
  <Button
    title="Cancelar"
    theme="errorOutline"
    onPress={() =>
      props.route.params.navigation.navigate(
        'DrawerNavigator',
      )
    }
  />
</View>
</Modal>; */
}
