import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FONTS, FONTS_FAMILY } from '../../themes';
import COLORS from "../../themes/Colors";
import METRICS from '../../themes/Metrics';
import { localToString } from '../../utils/StringUtil';
import { horizontalScale, verticalScale } from '../../utils/StyleHelpers';
import TrashIcon from '../icon/TrashIcon';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';

const InputSearch: FunctionComponent<propTypes> = props => {
  const [inputRef, setInputRef] = useState({ focus: () => { } });

  const leftIconPress = () => {
    inputRef?.focus()
  }

  const setRef = (ref: any) => {
    setInputRef(ref)
  }

  return (
    <View style={[
      Styles.container,
      props.containerStyle,
    ]}>
      <Ionicons
        name="search"
        size={FONTS.smallIcon}
        color={COLORS.white}
        style={Styles.iconLeft}
        onPress={leftIconPress}
      />
      <Separator width={10} />
      <TextInput
        ref={setRef}
        style={Styles.input}
        placeholderTextColor={COLORS.white}
        placeholder={props.placeholder}
        underlineColorAndroid="transparent"
        onChangeText={props.onValueChange}
        value={props.value}
        editable={!props.disabled}
        hitSlop={{ top: 15, right: 0, bottom: 15, left: 30 }}
      />
      <Separator width={10} />
      <CheckRender allowed={localToString(props.value).length > 0}>
        <TrashIcon
          onTouchablePress={() => props.onValueChange('')}
          color={COLORS.white}
        />
      </CheckRender>
    </View>
  )
};

interface propTypes {
  bottomSeparate?: boolean;
  placeholder?: string;
  value?: any;
  onValueChange: (val?: string) => void;
  disabled?: any;
  showFilter?: any;
  containerStyle?: object;
  children?: JSX.Element | JSX.Element[] | undefined;
}

InputSearch.defaultProps = {
  bottomSeparate: true,
  placeholder: 'Buscar',
  value: '',
  onValueChange: (val) => console.log(val),
  disabled: false,
  showFilter: true,
  containerStyle: {},
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingHorizontal: horizontalScale(METRICS.large15),
    minHeight: verticalScale(55),
    borderColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: FONTS.regular,
    color: COLORS.white,
    paddingLeft: 0,
    fontFamily: FONTS_FAMILY.regular.body,
  },
  iconLeft: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});

export default InputSearch;
