import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import Text from '../../../components/text/Text';
import { COLORS, FONTS, METRICS } from '../../../themes';
import ApplicationStyles from '../../../themes/ApplicationStyles';
import FONTS_FAMILY from '../../../themes/FontsFamily';
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/StyleHelpers';

const RenderTodo: FunctionComponent<propTypes> = props => {
  //Misc
  const onPress = () => {

  }

  //Rendering
  return (
    <TouchableHighlight
      underlayColor={COLORS.lightGray}
      style={Styles.outerContainer}
      onPress={onPress}
    >
      <View style={Styles.innerContainer}>
        <Text>Proyecto las Luces</Text>

        <View style={ApplicationStyles.rowSBetween}>
          <Text>Puerto Plata</Text>
          <Text>30/Marzo/2022</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

interface propTypes {

}

RenderTodo.defaultProps = {

}

const Styles = StyleSheet.create({
  outerContainer: {

  },
  innerContainer: {
    paddingVertical: verticalScale(METRICS.medium10),
    paddingHorizontal: horizontalScale(METRICS.medium10),
    borderRadius: moderateScale(METRICS.small5),
    backgroundColor: COLORS.white,
    borderColor: COLORS.tertiaryOpacity,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
})

export default RenderTodo;