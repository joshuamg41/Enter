import * as scale from 'd3-scale';
import moment from 'moment';
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { G, Text as SVGText } from 'react-native-svg';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import ContentFlatList from '../../../components/content/ContentFlatList';
import HorizontalLine from '../../../components/horizontal-line/HorizontalLine';
import Loading from '../../../components/loading/Loading';
import CheckRender from '../../../components/security/CheckRender';
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { ProvinceResponseItem } from '../../../services/home/HomeServiceConstants';
import { RootState } from '../../../stores/AppReducers';
import HomeActions from '../../../stores/home/Actions';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { localToArray } from '../../../utils/ArrayUtil';
import { BasicHitSlop } from '../../../utils/ConstantsUtil';
import { moderateScale, viewportWidth } from '../../../utils/StyleHelpers';
import { transformForLabor, transformForProject, transformForProvince } from './ModalizeChartFunctions';

const ModalizeChart: FunctionComponent<propTypes> = props => {
  const [step, setStep] = useState(0)
  const { getEntryLoading, getProjectEntry, getProvinceEntry, getLaborEntry, getLaborList, getMasterEntry, getMasterList } = useSelector((state: RootState) => state.home)
  const dispatch = useDispatch()
  const [project, setProject] = useState<string>()
  const [labor, setLabor] = useState<string>()
  const [master, setMaster] = useState<string>()
  const contentInset = { top: moderateScale(20), bottom: moderateScale(100) }
  const province = props.province
  const projectList = localToArray(province?.proyectos)

  //Screen Initiators
  useEffect(() => {
    const provinceRequest = {
      id: province?.id
    }
    dispatch(HomeActions.getEntryProvince(provinceRequest))
  }, [dispatch])

  //Misc
  const onNextStep = (item: any) => () => {
    const nextStep = step + 1
    switch (nextStep) {
      case 1:
        const projectRequest = {
          id: item?.id,
        }
        setProject(item?.id || '')
        dispatch(HomeActions.getEntryProject(projectRequest))
        break;
      case 2:
        const laborRequest = {
          laborEntry: {
            id: item?.laborID,
            proyectoID: project,
          },
          masterList: {
            laborID: item?.laborID,
            proyectoID: project,
          },
        }
        setLabor(item?.laborID || '')
        dispatch(HomeActions.getEntryLabor(laborRequest))
        break;
      case 3:
        const masterRequest = {
          maestroID: item?.employee?.maestroId,
          proyectoID: project,
        }
        setMaster(item?.masterName)
        dispatch(HomeActions.getEntryMaster(masterRequest))
        break;
      default:
        return;
    }
    setStep(nextStep)
  }

  const title = useCallback(() => {
    const data = barChartData()
    let totalPerson = 0
    for (const bar of data) {
      totalPerson += bar.value
    }
    switch (step) {
      case 0:
        return `${projectList.length} Proyectos en ${province?.name} | ${totalPerson} Empleados`
      case 1:
        return `Labores del Proyecto: ${data.length} | ${totalPerson} personas`
      case 2:
        return `Maestro: ${data.length} | ${totalPerson} Personas`
      case 3:
        return `${getMasterEntry.length} Empleados del maestro: ${master}`
      default:
        return ''
    }
  }, [step, projectList, getProvinceEntry, getProjectEntry, getLaborEntry, getLaborList, getMasterEntry, getMasterList])

  const barChartData = useCallback(() => {
    switch (step) {
      case 0:
        return transformForProvince(onNextStep, getProvinceEntry, projectList)
      case 1:
        return transformForProject(onNextStep, getProjectEntry, getLaborList)
      case 2:
        return transformForLabor(onNextStep, getLaborEntry, getMasterList)
      default:
        return []
    }
  }, [step, projectList, getProvinceEntry, getProjectEntry, getLaborEntry, getLaborList, getMasterList])

  const Labels = ({ x, y, bandwidth, data }: {
    x: (index: number) => number,
    y: (index: number) => number,
    bandwidth: number,
    data: any[]
  }): Element[] => (
    data.map((item, index) => (
      <SVGText
        key={index}
        x={x(index) + (bandwidth / 2)}
        y={y(item.value) - 10}
        fontSize={FONTS.word}
        fill={'black'}
        alignmentBaseline={'middle'}
        textAnchor={'middle'}
      >
        {item.value}
      </SVGText>
    ))
  )

  const BottomLabels = ({ x, y, bandwidth }: {
    x: (index: number) => number,
    y: (index: number) => number,
    bandwidth: number
  }) => (
    barChartData().map((item, index) => (
      <G
        key={`${item.name}${index}`}
        rotation="50"
        x={x(index) + (bandwidth / 2)}
        y={moderateScale(310)}
      >
        <SVGText
          key={index}
          fontSize={FONTS.word}
          fill={COLORS.gray}
        >
          {item.name}
        </SVGText>
      </G>
    ))
  )

  //rendering
  return (
    <View style={Styles.container}>

      <View
        style={Styles.headerSection}
      >
        <View style={Styles.leftHeader}>
          <CheckRender allowed={step}>
            <TouchableOpacity
              onPress={() => setStep(step - 1)}
              hitSlop={BasicHitSlop}
              disabled={getEntryLoading}
            >
              <Ionicons
                name={"chevron-back"}
                size={FONTS.mediumIcon}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          </CheckRender>
        </View>
        <Text style={Styles.title}>{title()}</Text>
        <View style={Styles.rightHeader} />
      </View>

      <View style={getEntryLoading ? Styles.loadingView : Styles.barSection}>
        <CheckRender allowed={!getEntryLoading && step != 3}>
          <YAxis
            data={barChartData()}
            contentInset={contentInset}
            yAccessor={({ index, item }) => item.value}
            svg={{ fontSize: FONTS.word, fill: COLORS.black }}
            scale={scale.scaleLinear}
            style={{ width: moderateScale(30) }}
          />
          <BarChart
            style={{ flex: 1 }}
            yAccessor={({ item }) => item.value}
            data={barChartData()}
            gridMin={0}
            contentInset={contentInset}
          >
            <Grid direction={Grid.Direction.HORIZONTAL} />
            {/* @ts-ignore */}
            <Labels />
            {/* @ts-ignore */}

            <BottomLabels />
          </BarChart>
        </CheckRender>
        <CheckRender allowed={!getEntryLoading && step == 3}>
          <FlatList
            data={getMasterEntry}
            renderItem={(item) => {
              const employee = item.item?.employee
              return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text>{employee.name}</Text>
                  <Text>{moment(item.item?.createdAt, 'YYYY-MM-DD[T]HH:mm:ss').subtract(4, 'hour').format('DD/MMM/YYYY hh:mm a')}</Text>
                </View>
              )
            }}
            ItemSeparatorComponent={HorizontalLine}
          />
        </CheckRender>
        <Loading
          isLoading={getEntryLoading}
        />
      </View>

      <Separator height={METRICS.medium10} />
    </View >
  )
}

interface propTypes {
  province?: ProvinceResponseItem;
}

ModalizeChart.defaultProps = {

}

const Styles = StyleSheet.create({
  container: {
    width: viewportWidth,
  },
  headerSection: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(METRICS.medium10),
    minHeight: moderateScale(50),
    alignItems: 'center',
  },
  leftHeader: {
    minWidth: moderateScale(30),
  },
  rightHeader: {
    minWidth: moderateScale(30),
  },
  barSection: {
    height: moderateScale(400),
    paddingHorizontal: moderateScale(METRICS.medium10),
    flexDirection: 'row',
  },
  loadingView: {
    height: moderateScale(400),
  },
  title: {
    textAlign: 'center',
    fontSize: FONTS.large,
    flex: 1,
  },
})

export default ModalizeChart