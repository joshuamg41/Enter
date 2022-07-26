import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import update from 'immutability-helper';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, TouchableHighlight, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import Container from '../../components/container/Container';
import ContentFlatList from '../../components/content/ContentFlatList';
import DateRange from '../../components/date-range/DateRange';
import Header from '../../components/header/Header';
import HorizontalLine from '../../components/horizontal-line/HorizontalLine';
import InputSearch from '../../components/input-search/InputSearch';
import ListEmpty from '../../components/list-empty/ListEmpty';
import ModalizeOrderBy, { ModalizeOrderByRef, OrderByProps } from '../../components/modalize/ModalizeOrderBy';
import CheckRender from '../../components/security/CheckRender';
import Separator from '../../components/separator/Separator';
import Text from '../../components/text/Text';
import { GetAbsenceResponseItem } from '../../services/absence/AbsenceServiceConstants';
import AbsenceActions from '../../stores/absence/Actions';
import { RootState } from '../../stores/AppReducers';
import { COLORS, FONTS } from '../../themes';
import { RefreshControlBaseProps } from '../../utils/ConstantsUtil';
import { DrawerNavigatorParamList } from '../root/navigators/DrawerNavigator';
import { AbsenceState, dataOption } from './AbsenceConstants';
import Styles from './AbsenceStyles';
import AbsenceItem from './components/AbsenceItem';
import ModalAbsence from './components/ModalAbsence';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Absence = (props: ScreenProps) => {
  const mounted = useRef(false);
  const modalizeOrderByRef = useRef<ModalizeOrderByRef>(null);
  const [query, setQuery] = useState<string>()
  const [absence, setAbsence] = useState<GetAbsenceResponseItem>()
  const [state, setState] = useState<AbsenceState>({
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
    props.getAbsence(request)
  }

  //Value change handlers
  const onStateChange = (key: string, format?: (value: any) => string) => (value: any) => {
    return setState(prevState => update(prevState, { [key]: { $set: format ? format(value) : value } }));
  };

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
  }, [state.dateRange])

  const LocalAbsenceItem = (itemProps: any) => {
    return (
      <AbsenceItem
        {...itemProps}
      />
    )
  }

  return (
    <Container style={Styles.container}>
      <Header
        title='Ausencias'
        iconName='menu'
        leftIcon
        onPressRightIcon={() => { }}
        rightIcon={
          <Ionicons
            name="search"
            size={FONTS.smallIcon}
            color={COLORS.white}
          />
        }
      />
      <ContentFlatList
        data={props.getData}
        //@ts-ignore
        renderItem={LocalAbsenceItem}
        ListHeaderComponent={HeaderComponent}
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
      <ModalAbsence
        isVisible={absence}
        onVisibleChange={setAbsence}
      />
    </Container>
  )
}

interface ScreenProps extends ReduxProps, StackScreenProps<DrawerNavigatorParamList, 'Absence'> {

}

const mapStateToProps = (state: RootState) => ({
  user: state.signin.user,

  getData: state.absence.getData,
  getLoading: state.absence.getLoading,
  getError: state.absence.getError,
});

const mapDispatchToProps = {
  getAbsence: AbsenceActions.getAbsence,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(Absence)