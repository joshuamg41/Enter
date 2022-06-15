import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, TouchableHighlight, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect, ConnectedProps } from "react-redux";
import Container from '../../../components/container/Container';
import ContentFlatList from '../../../components/content/ContentFlatList';
import Header from '../../../components/header/Header';
import HorizontalLine from '../../../components/horizontal-line/HorizontalLine';
import InputSearch from '../../../components/input-search/InputSearch';
import ListEmpty from '../../../components/list-empty/ListEmpty';
import ModalizeOrderBy, { ModalizeOrderByRef, OrderByProps } from '../../../components/modalize/ModalizeOrderBy';
import Separator from '../../../components/separator/Separator';
import { RootState } from '../../../stores/AppReducers';
import EmployeeListActions from '../../../stores/employee/list/Actions';
import { COLORS, FONTS } from '../../../themes';
import { filterArray } from '../../../utils/ArrayUtil';
import { RefreshControlBaseProps } from '../../../utils/ConstantsUtil';
import { DrawerNavigatorParamList } from '../../root/navigators/DrawerNavigator';
import EmployeeListItem from './components/EmployeeListItem';
import { dataOption, sortGetData } from './EmployeeListConstants';
import Styles from './EmployeeListStyles';

const EmployeeList = (props: ScreenProps) => {
  const mounted = useRef(false);
  const modalRef = useRef<Modalize>();
  const modalizeOrderByRef = useRef<ModalizeOrderByRef>(null);
  const [query, setQuery] = useState<string>()
  const [orderBy, setOrderBy] = useState<OrderByProps>({
    orderName: undefined,
    orderBy: 'asc',
  })

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      getScreen()
      return () => { }
    }, [props.navigation])
  );

  //componentDidMount
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return () => { mounted.current = false }
  }, [])

  //Misc
  const getScreen = () => {
    const request = {
      proyectoID: props.user.data.proyectoID,
    }
    props.getEmployeeList(request)
  }

  //Value change handlers
  const getData = useCallback(() => {
    if (props.getLoading) {
      return []
    }
    return filterArray(query, [...props.getData], ['name']).sort(sortGetData(orderBy))
  }, [orderBy, props.getData, props.getLoading, query])

  //rendering
  const HeaderComponent = useCallback(() => {
    return (
      <View style={Styles.headerSection}>
        <View style={Styles.filterContent}>
          <InputSearch
            value={query}
            onValueChange={setQuery}
          />
          <TouchableHighlight
            style={Styles.filterTouchable}
            onPress={() => modalizeOrderByRef.current?.openModalize()}
            underlayColor={COLORS.lightGray}
          >
            <MaterialCommunityIcons
              name='sort'
              color={COLORS.white}
              size={FONTS.mediumIcon}
            />
          </TouchableHighlight>
        </View>
        <Separator />
      </View>
    )
  }, [query, orderBy])

  return (
    <Container style={Styles.container}>
      <Header
        title='Empleados'
        iconName='menu'
        leftIcon
      />
      <ContentFlatList
        data={getData()}
        //@ts-ignore
        renderItem={EmployeeListItem}
        ListHeaderComponent={HeaderComponent()}
        ListEmptyComponent={
          <ListEmpty
            isLoading={props.getLoading}
          />
        }
        refreshControl={
          <RefreshControl
            {...RefreshControlBaseProps}
            onRefresh={getScreen}
          />
        }
      />
      <View style={Styles.buttonSection}>
        <TouchableHighlight
          onPress={() => props.navigation.navigate('EmployeeForm')}
          style={Styles.createTouchable}
          underlayColor={COLORS.gray}
        >
          <Ionicons
            name={"add-sharp"}
            style={Styles.createIcon}
          />
        </TouchableHighlight>
      </View>
      <ModalizeOrderBy
        ref={modalizeOrderByRef}
        order={orderBy}
        setOrderBy={setOrderBy}
        dataOption={dataOption}
      />
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<DrawerNavigatorParamList, 'EmployeeList'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.employeeList.getData,
  getLoading: state.employeeList.getLoading,
  getError: state.employeeList.getError,
});

const mapDispatchToProps = {
  getEmployeeList: EmployeeListActions.getEmployeeList,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(EmployeeList)