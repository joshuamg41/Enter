import moment, { Moment } from 'moment';
import React, { FunctionComponent, useState } from 'react';
import { ImageSourcePropType, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import RnDateRange, { DateTimePickerProps } from "react-native-modal-datetime-picker";
import { COLORS, FONTS, FONTS_FAMILY, METRICS } from '../../themes';
import { horizontalScale, verticalScale } from '../../utils/StyleHelpers';

const DateRange: FunctionComponent<propTypes> = props => {
  const [min, setMin] = useState<Date>(props.value?.min ?  new Date(props.value?.min) : new Date())
  const [step, setStep] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const changeVisible = () => {
    setIsVisible(!isVisible)
  }

  const onConfirm = (value: Date) => {
    if(step == 0) {
      setMin(value)
      setStep(1)
    } else {
      setIsVisible(false)
      props.onValueChange({
        min,
        max: value,
      })
    }
  }

  const onCancel = () => {
    setIsVisible(false)
    setStep(0)
    setMin(new Date())
  }

  return (
    <TouchableHighlight
      underlayColor={COLORS.primaryOpacity}
      style={[Styles.container]}
      onPress={changeVisible}
      disabled={props.disabled}
    >
      <View
        style={[
          Styles.content,
        ]}>
        <View>
          <Text style={Styles.title}>Desde - Hasta</Text>
          <Text style={Styles.input}>
            {(props.value?.min && moment(props.value?.min).format(props.labelFormat))} - {(props.value?.max && moment(props.value?.max).format(props.labelFormat))}
          </Text>
        </View>
        <RnDateRange
          isVisible={isVisible}
          minuteInterval={undefined}
          accessibilityLabel='DateRangePicker'
          onConfirm={onConfirm}
          onCancel={onCancel}
          date={(step ? props.value?.max : props.value?.min )|| new Date()}
          cancelTextIOS="Cancelar"
          confirmTextIOS="Aceptar"
          minimumDate={step ? min : undefined}
          maximumDate={new Date()}
        />
      </View>
    </TouchableHighlight>
  );
};

interface propTypes extends Omit<DateTimePickerProps, 'onConfirm' | 'onCancel'> {
  placeholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  value?: {
    min: Date;
    max: Date;
  };
  onValueChange: ({min, max}: {min: Date, max: Date}) => void;
  labelFormat?: string;
  children?: JSX.Element | JSX.Element[] | undefined;
  bottomSeparate?: boolean;
  widthSeparator?: number;
  iconName?: string;
  image?: ImageSourcePropType;
  errorText?: string;
  showError?: boolean | string;
}

DateRange.defaultProps = {
  is24Hour: false,
  isLoading: false,
  disabled: false,
  value: undefined,
  placeholder: '',
  labelFormat: 'DD/MMM/YYYY',
  onValueChange: () => console.log('Changed'),
  showError: false,
  bottomSeparate: true,
}

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    minHeight: verticalScale(55),
    backgroundColor: COLORS.primary,
    paddingHorizontal: horizontalScale(METRICS.large15),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: COLORS.white,
  },
  input: {
    fontSize: FONTS.regular,
    color: COLORS.white,
    paddingLeft: 0,
    flex: 1,
    fontFamily: FONTS_FAMILY.regular.body,
  },
});

export default DateRange;
