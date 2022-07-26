import { StyleSheet } from "react-native";
import { COLORS, FONTS, METRICS } from "../../../themes";
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/StyleHelpers';

export default StyleSheet.create({
  container: {
    paddingLeft: horizontalScale(METRICS.medium10),
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
  },
  logoContent: {
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  logo: {
    width: '100%',
    height: verticalScale(75),
  },
  arrowBack: {
    width: FONTS.mediumIcon,
    height: FONTS.mediumIcon,
    tintColor: COLORS.black,
  },
  tournamentImage: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  title: {
    fontSize: FONTS.xLarge,
  },
  textStyle: {
    color: COLORS.primary
  },
  drawerLabel: {
    fontSize: FONTS.medium,
    color: COLORS.gray,
  },
  logoutView: {
    flex: 0,
    justifyContent: 'flex-end',
  },
  logoutOption: {
    paddingTop: METRICS.medium10,
    paddingBottom: METRICS.medium10,
  },
});
