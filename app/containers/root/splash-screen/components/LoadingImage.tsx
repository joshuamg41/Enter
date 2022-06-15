import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Images from '../../../../assets/images';
import { COLORS } from '../../../../themes';
import { moderateScale } from '../../../../utils/StyleHelpers';

const LoadingImage: FunctionComponent<propTypes> = props => {
  return (
    <View style={Styles.container}>
      <Image
         style={Styles.imageIcon}
         resizeMode='contain'
         source={Images.logo_blue_white}
      />
    </View>
  )
}

interface propTypes {

}

LoadingImage.defaultProps = {

}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  imageIcon: {
    width: '100%',
    height: moderateScale(250),
  },
})

export default React.memo(LoadingImage)