import React, {FunctionComponent} from 'react';
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {FONTS, METRICS} from '../../themes';
import {horizontalScale} from '../../utils/StyleHelpers';
import Loading from '../loading/Loading';
import CheckRender from '../security/CheckRender';
import Separator from '../separator/Separator';
import Text from '../text/Text';
import Styles from './ButtonStyles';
import Themes from './ButtonThemes';

const Button: FunctionComponent<propTypes> = props => {
  const localPress = () => {
    if (props.isLoading || props.disabled) {
      return () => {};
    } else if (typeof props.onPress === 'function') {
      return props.onPress();
    } else {
      return () => {};
    }
  };

  return (
    <>
      <TouchableOpacity
        {...props.touchableProps}
        onPress={localPress}
        activeOpacity={props.activeOpacity}
        style={[
          Styles.buttonContainer,
          props.containerStyle,
          Themes[props.theme || 'primary'],
          {marginHorizontal: props.widthSeparator},
        ]}
        disabled={props.disabled || props.isLoading}>
        <View style={[Styles.buttonContent, props.contentStyle]}>
          <Loading
            size="small"
            color={Themes[props.theme || 'primary'].loader}
            style={Styles.loading}
            isLoading={props.isLoading}
          />
          <CheckRender allowed={!props.isLoading}>
            <CheckRender allowed={props.title}>
              <Text
                style={[
                  Styles.title,
                  {
                    color: Themes[props.theme || 'primary'].textColor,
                    fontSize: props.fontSize || FONTS.medium,
                  },
                ]}>
                {props.title}
              </Text>
            </CheckRender>
            <CheckRender allowed={!!props.children}>
              {props.children}
            </CheckRender>
          </CheckRender>
        </View>
      </TouchableOpacity>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator />
      </CheckRender>
    </>
  );
};

interface propTypes {
  isLoading?: boolean;
  onPress?: any;
  title?: string;
  widthSeparator?: number;
  activeOpacity?: number;
  touchableProps?: TouchableOpacityProps;
  contentStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  bottomSeparate?: boolean;
  fontSize: number;
  theme?:
    | 'primary'
    | 'primaryOutline'
    | 'secondary'
    | 'grayPlain'
    | 'plain'
    | 'tertiaryOutline'
    | 'tertiary'
    | 'errorOutline'
    | 'green';
  children?: JSX.Element | JSX.Element[] | undefined;
}

Button.defaultProps = {
  isLoading: false,
  onPress: () => {},
  title: undefined,
  widthSeparator: horizontalScale(METRICS.large15),
  activeOpacity: 0.2,
  children: undefined,
  bottomSeparate: true,
  theme: 'primary',
  fontSize: FONTS.medium,
};

export default React.memo(Button);
