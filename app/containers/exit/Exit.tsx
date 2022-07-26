import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, TouchableHighlight, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect, ConnectedProps } from "react-redux";
import Container from '../../components/container/Container';
import ContentFlatList from '../../components/content/ContentFlatList';
import DateRange from '../../components/date-range/DateRange';
import Header from '../../components/header/Header';
import HorizontalLine from '../../components/horizontal-line/HorizontalLine';
import InputSearch from '../../components/input-search/InputSearch';
import ListEmpty from '../../components/list-empty/ListEmpty';
import ModalizeOrderBy, { ModalizeOrderByRef, OrderByProps } from '../../components/modalize/ModalizeOrderBy';
import Separator from '../../components/separator/Separator';
import { RootState } from '../../stores/AppReducers';
import ExitActions from '../../stores/exit/Actions';
import { COLORS, FONTS } from '../../themes';
import { filterArray, localToArray } from '../../utils/ArrayUtil';
import { RefreshControlBaseProps } from '../../utils/ConstantsUtil';
import { DrawerNavigatorParamList } from '../root/navigators/DrawerNavigator';
import ExitItem from './components/ExitListItem';
import { dataOption, ExitState, sortGetData } from './ExitConstants';
import Styles from './ExitStyles';

const Exit = (props: ScreenProps) => {
  const mounted = useRef(false);
  const modalizeOrderByRef = useRef<ModalizeOrderByRef>(null);
  const [query, setQuery] = useState<string>()
  const [state, setState] = useState<ExitState>({
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

    }
    props.getExit(request)
  }

  const filterByDate = (records: any[]) => {
    const from = moment(state.dateRange?.min)
    const to = moment(state.dateRange?.max)
    return localToArray(records).filter(inOut => moment(inOut.createdAt, 'YYYY-MM-DD').isBetween(from, to))
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

  const data = useCallback(() => {
    if (props.getLoading) {
      return []
    }

    return filterArray(query, filterByDate(props.getData), ['employeeName']).sort(sortGetData(orderBy))
  }, [state.dateRange, props.getData, query, orderBy])

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

  return (
    <Container style={Styles.container}>
      <Header
        title='Salidas'
        iconName='menu'
        leftIcon
      />
      <ContentFlatList
        data={data()}
        //@ts-ignore
        renderItem={ExitItem}
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
      <ModalizeOrderBy
        ref={modalizeOrderByRef}
        order={orderBy}
        setOrderBy={setOrderBy}
        dataOption={dataOption}
      />
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<DrawerNavigatorParamList, 'Exit'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.exit.getData,
  getLoading: state.exit.getLoading,
  getError: state.exit.getError,
});

const mapDispatchToProps = {
  getExit: ExitActions.getExit,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Exit)