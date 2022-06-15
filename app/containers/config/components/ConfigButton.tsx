
import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Separator from '../../../components/separator/Separator';
import Text from '../../../components/text/Text';
import { COLORS, METRICS } from '../../../themes';
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/StyleHelpers';

const ConfigButton: FunctionComponent<propTypes> = (props) => {
  return (
    <TouchableHighlight
      style={Styles.buttonContainer}
      onPress={props.onPress}
      underlayColor={COLORS.lightGray}
    >
      <View style={Styles.buttonContent}>
        <View style={Styles.iconContainer}>
          <Ionicons
            name={props.leftIcon || "log-out-outline"}
            style={Styles.icon}
          />
        </View>
        <Separator />
        <View style={Styles.bottomBorder}>
          <Text style={Styles.buttonText}>{props.label}</Text>
          <Separator />
          <Ionicons
            name={props.rightIcon || "chevron-forward"}
            style={Styles.rightIcon}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

interface propTypes {
  onPress?: any;
  leftIcon?: string;
  label?: string;
  rightIcon?: string;
}

ConfigButton.defaultProps = {
  onPress: () => { },
}

const Styles = StyleSheet.create({
  //account button
  buttonContainer: {
    paddingTop: verticalScale(METRICS.medium10),
    paddingLeft: horizontalScale(METRICS.medium10),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: COLORS.secondary,
    paddingVertical: moderateScale(METRICS.small5),
    paddingHorizontal: moderateScale(METRICS.small5),
    borderRadius: moderateScale(METRICS.small5),
    marginBottom: verticalScale(METRICS.medium10),
  },
  bottomBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: moderateScale(1),
    paddingBottom: verticalScale(METRICS.medium10),
  },
  icon: {
    fontSize: moderateScale(METRICS.xLargeMedium25),
    color: COLORS.tertiary,
  },
  buttonText: {
    // flex: 1,
  },
  rightIcon: {
    fontSize: moderateScale(METRICS.xLargeMedium25),
    color: COLORS.gray,
    marginRight: horizontalScale(METRICS.medium10),
  },
});

export default React.memo(ConfigButton)