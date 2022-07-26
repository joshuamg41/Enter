import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Images from '../../assets/images';
import { moderateScale } from '../../utils/StyleHelpers';

const CompanyLogo: FunctionComponent<propTypes> = props => {
  return (
    <Image
      style={Styles.imageIcon}
      resizeMode='contain'
      source={Images.logo_transparent}
    />
  );
}

interface propTypes {

}

CompanyLogo.defaultProps = {

}

const Styles = StyleSheet.create({
  imageIcon: {
    width: moderateScale(250),
    height: moderateScale(250),
  },
})

export default CompanyLogo;