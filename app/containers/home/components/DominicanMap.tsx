import React, { FunctionComponent, useRef } from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Text from '../../../components/text/Text';
import { COLORS, FONTS, METRICS } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import FONTS_FAMILY from '../../../themes/FontsFamily';
import { horizontalScale, moderateScale, verticalScale, viewportHeight, viewportWidth } from '../../../utils/StyleHelpers';
import Svg, { Path } from 'react-native-svg'
import ImageZoom from 'react-native-image-pan-zoom';
import { ProvinceResponse, ProvinceResponseItem } from '../../../services/home/HomeServiceConstants';
import ErrorContainer from '../../../components/error-container/ErrorContainer';
import ListRender from '../../../components/list-render/ListRender';
import { Modalize } from 'react-native-modalize';

const DominicanMap: FunctionComponent<propTypes> = props => {
  const imageZoomRef = useRef<ImageZoom>(null);

  //Misc
  const onPress = (province: ProvinceResponseItem) => () => {
    props.setProvince(province)
    props.modalRef?.open()
  }

  const getProvinceColor = (cant = 0) => {
    if (cant != 0 && cant <= 20) {
      return COLORS.map1
    } else if (cant > 21 && cant <= 40) {
      return COLORS.map2
    } else if (cant > 41 && cant <= 60) {
      return COLORS.map3
    } else if (cant > 61 && cant <= 80) {
      return COLORS.map4
    } else if (cant > 81 && cant <= 100) {
      return COLORS.map5
    } else if (cant > 101 && cant <= 120) {
      return COLORS.map6
    } else if (cant > 121 && cant <= 140) {
      return COLORS.map7
    } else if (cant > 141 && cant <= 160) {
      return COLORS.map8
    } else if (cant > 161 && cant <= Number.POSITIVE_INFINITY) {
      return COLORS.map9
    } else {
      return COLORS.map10
    }
  }

  const resetView = () => {
    imageZoomRef.current?.reset()
  }

  //Rendering
  const RenderPath = (itemProps: { item: ProvinceResponseItem, index: number }) => {
    const { item } = itemProps
    return (
      <Path
        d={item.path}
        id={item.id}
        fill={getProvinceColor(item.employeeEntries.length)}
        onPress={onPress(item)}
        disabled={!item.employeeEntries.length}
      />
    )
  }

  return (
    <ErrorContainer isLoading={props.loading}>
      <TouchableOpacity
        onPress={resetView}
        style={Styles.resetButton}
      >
        <Text style={Styles.text}>Reiniciar mapa</Text>
      </TouchableOpacity>
      <View style={ApplicationStyles.flex1}>
        <ImageZoom
          ref={imageZoomRef}
          cropWidth={viewportWidth}
          cropHeight={verticalScale(250)}
          imageWidth={viewportWidth}
          imageHeight={verticalScale(250)}
        >
          <Svg
            fill={COLORS.gray}
            height={verticalScale(250)}
            stroke={COLORS.white}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 1000 688"
            width={viewportWidth}
          >
            <ListRender
              renderItem={RenderPath}
              data={props.data}
            />
          </Svg>
        </ImageZoom>
      </View>
    </ErrorContainer>
  );
}

interface propTypes {
  data: ProvinceResponse;
  loading: boolean;
  setProvince: (item: ProvinceResponseItem) => void;
  modalRef?: Modalize;
}

DominicanMap.defaultProps = {

}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  //
  resetButton: {
    backgroundColor: COLORS.primary,
    height: moderateScale(METRICS.xxLarge30),
    justifyContent: 'center',
  },
  text: {
    color: COLORS.white,
    textAlign: 'center',
  },
})

export default DominicanMap;