import {useFocusEffect} from '@react-navigation/core';
import {StackScreenProps} from '@react-navigation/stack';
import update from 'immutability-helper';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TouchableHighlight, FlatList, ScrollView} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import Container from '../../components/container/Container';
import Content from '../../components/content/Content';
import Header from '../../components/header/Header';
import InputSearch from '../../components/input-search/InputSearch';
import Text from '../../components/text/Text';
import {COLORS, FONTS, METRICS} from '../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ExampleRequest} from '../../services/example/ExampleServiceConstants';
import {RootState} from '../../stores/AppReducers';
import VisitActions from '../../stores/visit/Actions';
import {MainNavigatorParamList} from '../root/navigators/MainNavigator';
import {VisitState} from './VisitConstants';
import Styles from './VisitStyles';
import CheckRender from '../../components/security/CheckRender';
import {PermissionsAndroid, RefreshControl, View} from 'react-native';
import ApplicationStyles from '../../themes/ApplicationStyles';
import Button from '../../components/button/Button';
import Separator from '../../components/separator/Separator';
import PermissionUtil from '../../utils/PermissionUtil';
import ContentFlatList from '../../components/content/ContentFlatList';
import ListEmpty from '../../components/list-empty/ListEmpty';
import VisitListItem from './components/VisitListItem';
import {filterArray} from '../../utils/ArrayUtil';
import ModalizeOrderBy, {
  ModalizeOrderByRef,
  OrderByProps,
} from '../../components/modalize/ModalizeOrderBy';
import {dataOption, sortGetData} from './VisitConstants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {BaseApi} from '../../services/BaseApi';
import {RefreshControlBaseProps} from '../../utils/ConstantsUtil';

const Visit = (props: ScreenProps) => {
  const mounted = useRef(false);
  const [state, setState] = useState<VisitState>({});
  const modalizeOrderByRef = useRef<ModalizeOrderByRef>(null);
  const [visitData, setVisitData] = useState<any[]>([]);
  const [query, setQuery] = useState<string>();
  const [orderBy, setOrderBy] = useState<OrderByProps>({
    orderName: undefined,
    orderBy: 'asc',
  });
  const nav = useNavigation();

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      getScreen();
      getVisitList();
      return () => {};
    }, [props.navigation]),
  );

  //componentDidUpdate
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return () => {
      mounted.current = false;
    };
  }, []);

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
  const getScreen = () => {
    const request = {
      proyectoID: props.user.data.proyectoID,
    };
  };
  const getVisitList = () => {
    BaseApi.post('Visits/filterVisit')
      .then(res => setVisitData(res.data))
      .catch(err => console.log(err));
  };
  //Value change handlers

  const getData = useCallback(() => {
    if (props.getLoading) {
      return [];
    }
    return filterArray(query, [...visitData], ['name']).sort(
      sortGetData(orderBy),
    );
  }, [orderBy, visitData, props.getLoading, query]);

  //rendering
  const HeaderComponent = useCallback(() => {
    return (
      <View style={Styles.headerSection}>
        <View style={Styles.filterContent}>
          <InputSearch value={query} onValueChange={setQuery} />
          <TouchableHighlight
            style={Styles.filterTouchable}
            onPress={() => modalizeOrderByRef.current?.openModalize()}
            underlayColor={COLORS.lightGray}>
            <MaterialCommunityIcons
              name="sort"
              color={COLORS.white}
              size={FONTS.mediumIcon}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }, [query, orderBy]);

  return (
    <Container style={Styles.container}>
      <Header title="Visitas" leftIcon />
      <ScrollView>
        <FlatList
          data={getData()}
          //@ts-ignore

          renderItem={({item}) => (
            <VisitListItem
              item={item}
              userRole={props.user.data.role?.name}
              projectId={props.user.data.proyectoID || ''}
              index={0}
            />
          )}
          ListHeaderComponent={HeaderComponent()}
          ListEmptyComponent={<ListEmpty isLoading={props.getLoading} />}
          refreshControl={
            <RefreshControl
              {...RefreshControlBaseProps}
              onRefresh={getScreen}
            />
          }
        />
      </ScrollView>
      <Content>
        <CheckRender allowed={props.user.data.role?.name != 'Admin'}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <TouchableHighlight
              onPress={() =>
                nav.navigate('ScanQr', {
                  entry: '/visits/visitEntry',
                  exit: '/visits/visitEntry',
                  visit: true,
                  proyectoID: props.user.data.proyectoID,
                })
              }
              style={Styles.createTouchable}
              underlayColor={COLORS.gray}>
              <Ionicons name={'qr-code-outline'} style={Styles.createIcon} />
            </TouchableHighlight>
            <View
              style={[ApplicationStyles.row, ApplicationStyles.pLarge]}></View>
          </View>
        </CheckRender>
      </Content>
      <ModalizeOrderBy
        ref={modalizeOrderByRef}
        order={orderBy}
        setOrderBy={setOrderBy}
        dataOption={dataOption}
      />
    </Container>
  );
};

interface ScreenProps
  extends ReduxProps,
    StackScreenProps<MainNavigatorParamList, 'Example'> {}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.visit.getData,
  getLoading: state.visit.getLoading,
  getError: state.visit.getError,
});

const mapDispatchToProps = {
  doSomething: VisitActions.visitPayload,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Visit);
