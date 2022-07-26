import {FormikErrors} from 'formik';
import React, {FunctionComponent, useRef, useState} from 'react';
import {
  ImageSourcePropType,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import {FONTS, FONTS_FAMILY} from '../../themes';
import COLORS from '../../themes/Colors';
import METRICS from '../../themes/Metrics';
import {localToString} from '../../utils/StringUtil';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/StyleHelpers';
import {isEmpty} from '../../utils/ValidationUtil';
import Loading from '../loading/Loading';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text from '../text/Text';

const Input: FunctionComponent<InputProps> = props => {
  const [localError, setLocalError] = useState<boolean>(false);
  const inputRef = useRef<TextInput>();
  interface maskTypesProps {
    [key: string]: string;
  }
  const maskTypes: maskTypesProps = {
    phone: '([000]) [000] [0000]',
    identification: '[000]-[0000000]-[0]',
    passport: '[00000000000]',
    card: '[0000] [0000] [0000] [0000]',
    rnc: '[0]-[00]-[00000]-[0]',
    expiration: '[00]/[00]',
    pin: '[0000]',
    'solo numero': '[000000000000000000000000000]',
    'id-haiti': '[00]-[00]-[00]-[0000]-[00]-[00000]',
  };

  //Misc
  const onValueChange = (value: string) => {
    props.onValueChange(value);
  };

  const shouldShowError = props.showError || localError;
  const errorStyle: StyleProp<ViewStyle> = {
    borderBottomColor:
      (shouldShowError && COLORS.secondary) || COLORS.lightGray,
    borderBottomWidth: moderateScale(1),
  };
  const textColorStyle: string =
    (shouldShowError && COLORS.secondary) || COLORS.grayPlaceholder;
  const hitSlop = {
    top: verticalScale(20),
    right: 10,
    bottom: verticalScale(20),
    left: 10,
  };

  //Rendering
  return (
    <View
      style={[props.containerStyle, {marginHorizontal: props.widthSeparator}]}>
      <View style={[Styles.content, props.inputContentStyle, errorStyle]}>
        <Loading
          size="small"
          isLoading={props.loadingType == 'default' && props.isLoading}
        />
        <CheckRender
          allowed={props.loadingType == 'withString' && props.isLoading}>
          <Loading size="small" isLoading={true} color={COLORS.primary} />
          <Text>Validando...</Text>
        </CheckRender>
        <CheckRender allowed={!props.isLoading}>
          <View style={Styles.column}>
            <CheckRender allowed={props.title}>
              <Text>{props.title}</Text>
            </CheckRender>
            <CheckRender allowed={props.mask}>
              <TextInputMask
                {...props}
                onChangeText={onValueChange}
                placeholderTextColor={textColorStyle}
                style={[Styles.input, props.inputStyle]}
                keyboardType="number-pad"
                hitSlop={hitSlop}
                returnKeyType={props.returnKeyType || 'next'}
                mask={maskTypes[localToString(props.mask)]}
              />
            </CheckRender>
            <CheckRender allowed={!props.mask}>
              <TextInput
                {...props}
                onChangeText={onValueChange}
                placeholderTextColor={textColorStyle}
                style={[Styles.input, props.inputStyle]}
                hitSlop={hitSlop}
              />
            </CheckRender>
          </View>
          <View>
            <CheckRender allowed={props.rightSection}>
              {props.rightSection}
              <Separator height={METRICS.small5} />
            </CheckRender>
          </View>
        </CheckRender>
      </View>
      <CheckRender allowed={!props.isLoading && shouldShowError}>
        <Separator height={METRICS.small5} />
        <Text style={[Styles.errorText]}>
          {typeof props.showError == 'string'
            ? props.showError
            : props.errorText}
        </Text>
      </CheckRender>
    </View>
  );
};

export interface InputProps
  extends Omit<TextInputProps, 'onChangeText' | 'onBlur'> {
  bottomSeparate?: boolean;
  isLoading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  inputContentStyle?: StyleProp<ViewStyle>;
  setRef?: any;
  onValueChange: (text: string) => void;
  showError?:
    | boolean
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[];
  simpleError?: boolean;
  complexError?: (value?: string) => boolean;
  onInputBlur?: (e?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  fieldIsValid?: (value?: boolean) => void;
  widthSeparator?: number;
  label?: string;
  errorText?: string;
  iconName?: string;
  image?: ImageSourcePropType;
  rightSection?: JSX.Element | JSX.Element[] | undefined;
  loadingType?: 'default' | 'withString';
  mask?: string;
  title?: string;
}

Input.defaultProps = {
  maxLength: 27,
  bottomSeparate: true,
  isLoading: false,
  showError: false,
  simpleError: false,
  complexError: undefined,
  errorText: 'Campo llenado de forma incorrecta',
  widthSeparator: horizontalScale(METRICS.large15),
  loadingType: 'default',
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  column: {
    flex: 1,
    paddingTop: verticalScale(METRICS.medium10),
    paddingLeft: horizontalScale(METRICS.small5),
  },

  input: {
    flex: 1,
    fontSize: FONTS.regular,
    color: COLORS.gray,
    fontFamily: FONTS_FAMILY.regular.body,
    paddingTop: 0,
    paddingLeft: 0,
    paddingBottom: verticalScale(METRICS.medium10),
  },

  label: {
    color: COLORS.tertiary,
    fontSize: FONTS.word,
  },

  errorText: {
    color: COLORS.secondary,
    fontSize: FONTS.word,
  },
});

export default Input;
