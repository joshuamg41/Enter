import * as scale from 'd3-scale';
import React, {FunctionComponent} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text as SVGText} from 'react-native-svg';
import {BarChart, Grid, YAxis} from 'react-native-svg-charts';
import Text from '../../../components/text/Text';
import {COLORS, FONTS, METRICS} from '../../../themes';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
  viewportWidth,
} from '../../../utils/StyleHelpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckRender from '../../../components/security/CheckRender';

const StackedBar: FunctionComponent<propTypes> = props => {
  const {item} = props;
  const contentInset = {top: moderateScale(20), bottom: moderateScale(20)};

  const Labels = ({
    x,
    y,
    bandwidth,
    data,
  }: {
    x: (index: number) => number;
    y: (index: number) => number;
    bandwidth: number;
    data: any[];
  }): Element[] =>
    data.map((item, index) => (
      <SVGText
        key={index}
        x={x(index) + bandwidth / 2}
        y={y(item) - 10}
        fontSize={FONTS.word}
        fill={'black'}
        alignmentBaseline={'middle'}
        textAnchor={'middle'}>
        {item || ''}
      </SVGText>
    ));

  const BottomLabels = ({
    x,
    y,
    bandwidth,
  }: {
    x: (index: number) => number;
    y: (index: number) => number;
    bandwidth: number;
  }) =>
    item.data.map((item, index) => (
      <SVGText
        key={index}
        x={x(index) + bandwidth / 2}
        y={moderateScale(195)}
        fontSize={FONTS.word}
        fill={COLORS.gray}
        textAnchor={'middle'}>
        {item.day}
      </SVGText>
    ));

  return (
    <View style={[Styles.container]}>
      <Text>{item.title}</Text>
      <View style={Styles.barSection}>
        <YAxis
          data={item.data}
          contentInset={contentInset}
          yAccessor={({index, item}) => item.value}
          svg={{fontSize: FONTS.word, fill: COLORS.black}}
          scale={scale.scaleLinear}
          style={{width: moderateScale(30)}}
        />
        <BarChart
          style={{flex: 1}}
          data={item.data.map(item => item.value)}
          gridMin={0}
          svg={{fill: COLORS.secondary}}
          contentInset={contentInset}>
          <Grid direction={Grid.Direction.HORIZONTAL} />
          {/* @ts-ignore */}
          <Labels />
          {/* @ts-ignore */}
          <BottomLabels />
        </BarChart>
      </View>

      <View style={Styles.arrowSection}>
        <CheckRender allowed={props.index != 0} notAllowedReturn={<View />}>
          <TouchableOpacity
            onPress={() =>
              props.scrollViewRef?.scrollTo({x: -viewportWidth, y: 0})
            }>
            <Ionicons
              style={Styles.arrow}
              size={FONTS.mediumIcon}
              name="chevron-back"
            />
          </TouchableOpacity>
        </CheckRender>

        <CheckRender
          allowed={props.dataLength != props.index + 1}
          notAllowedReturn={<View />}>
          <TouchableOpacity
            onPress={() =>
              props.scrollViewRef?.scrollTo({x: viewportWidth, y: 0})
            }>
            <Ionicons
              style={Styles.arrow}
              size={FONTS.mediumIcon}
              name="chevron-forward"
            />
          </TouchableOpacity>
        </CheckRender>
      </View>
    </View>
  );
};

interface propTypes {
  item: {
    title: string;
    data: any[];
  };
  scrollViewRef: ScrollView | null;
  dataLength: number;
  index: number;
}

StackedBar.defaultProps = {};

const Styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(METRICS.small5),
    width: viewportWidth,
  },
  barSection: {
    height: moderateScale(200),
    flexDirection: 'row',
  },

  //ArrowSection
  arrowSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrow: {
    color: COLORS.gray,
  },
});

export default StackedBar;
