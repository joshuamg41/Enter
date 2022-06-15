import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, TouchableHighlight, View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect, ConnectedProps } from "react-redux";
import Container from '../../../components/container/Container';
import ContentFlatList from '../../../components/content/ContentFlatList';
import DateRange from '../../../components/date-range/DateRange';
import Header from '../../../components/header/Header';
import HorizontalLine from '../../../components/horizontal-line/HorizontalLine';
import InputSearch from '../../../components/input-search/InputSearch';
import ListEmpty from '../../../components/list-empty/ListEmpty';
import ModalizeOrderBy, { ModalizeOrderByRef, OrderByProps } from '../../../components/modalize/ModalizeOrderBy';
import Separator from '../../../components/separator/Separator';
import { GetAccidentResponseItem } from '../../../services/accident/AccidentServiceConstants';
import AccidentListActions from '../../../stores/accident/list/Actions';
import { RootState } from '../../../stores/AppReducers';
import { COLORS, FONTS } from '../../../themes';
import { filterArray } from '../../../utils/ArrayUtil';
import { RefreshControlBaseProps } from '../../../utils/ConstantsUtil';
import { DrawerNavigatorParamList } from '../../root/navigators/DrawerNavigator';
import { AccidentListState, dataOption, sortGetData } from './AccidentListConstants';
import Styles from './AccidentListStyles';
import AccidentListItem from './components/AccidentListItem';
import ModalAccident from './components/ModalAccident';

const AccidentList = (props: ScreenProps) => {
  const mounted = useRef(false);
  const modalizeOrderByRef = useRef<ModalizeOrderByRef>(null);
  const [query, setQuery] = useState<string>()
  const [accident, setAccident] = useState<GetAccidentResponseItem | undefined>()
  const [state, setState] = useState<AccidentListState>({
    dateRange: {
      min: moment().subtract(3, 'month').toDate(),
      max: new Date(),
    },
  })
  const [orderBy, setOrderBy] = useState<OrderByProps>({
    orderName: undefined,
    orderBy: 'asc',
  })

  //Screen Initiators
  useFocusEffect(
    useCallback(() => {
      //function
      getScreen()
      return () => {
        setAccident(undefined)
      }
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

    }
    props.getAccidentList(request)
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  const getData = useCallback(() => {
    if (props.getLoading) {
      return []
    }
    return filterArray(query, [...props.getData], ['employeeName']).sort(sortGetData(orderBy))
  }, [orderBy, props.getData, props.getLoading, query])

  //rendering
  const HeaderComponent = useCallback(() => {
    return (
      <View style={Styles.headerSection}>
        <DateRange
          value={state.dateRange}
          onValueChange={onStateChange('dateRange')}
        />
        <HorizontalLine color={COLORS.lightGray} />
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
  }, [state.dateRange, query, orderBy])

  const LocalAccidentListItem = (itemProps: any) => {
    return (
      <AccidentListItem
        {...itemProps}
        setAccident={setAccident}
      />
    )
  }

  return (
    <Container style={Styles.container}>
      <Header
        title='Accidentes'
        iconName='menu'
        leftIcon
      />
      <ContentFlatList
        data={getData()}
        //@ts-ignore
        renderItem={LocalAccidentListItem}
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
          onPress={() => props.navigation.navigate('AccidentForm')}
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
      <ModalAccident
        isVisible={accident}
        onVisibleChange={setAccident}
      />
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<DrawerNavigatorParamList, 'AccidentList'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.accidentList.getData,
  getLoading: state.accidentList.getLoading,
  getError: state.accidentList.getError,
});

const mapDispatchToProps = {
  getAccidentList: AccidentListActions.getAccidentList,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(AccidentList)