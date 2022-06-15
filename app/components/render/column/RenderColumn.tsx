import React, { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { COLORS, FONTS, METRICS } from '../../../themes';
import { horizontalScale, moderateScale, viewportWidth } from '../../../utils/StyleHelpers';
import CheckRender from '../../security/CheckRender';
import Separator from '../../separator/Separator';
import Text from '../../text/Text';
import { RenderColumnSize } from './RenderColumnConstants';

const RenderColumn = (props: propTypes) => {
  return (
    <>
      <View style={Styles.columnContainer}>
        <View>
          <Text style={[Styles.columnTitle, RenderColumnSize[props.size || 'small'].title]}>{props.title}</Text>
          <Text style={[Styles.columnBody, RenderColumnSize[props.size || 'small'].body]}>{props.body} {props.extraBody}</Text>
        </View>
      </View>
      <CheckRender allowed={props.bottomSeparate}>
        <Separator height={RenderColumnSize[props.size || 'small'].separator} />
      </CheckRender>
    </>
  )
}

interface propTypes {
  title?: string;
  body?: string;
  bottomSeparate?: boolean;
  isLoading?: boolean;
  size?: 'small' | 'regular' | 'large';
  extraBody?: any;
}

RenderColumn.defaultProps = {
  bottomSeparate: true,
  size: 'small',
  isLoading: false,
}

const Styles = StyleSheet.create({
  columnContainer: {
    flexDirection: 'column',
  },
  columnTitle: {
    fontSize: FONTS.medium,
  },
  columnBody: {
    fontSize: FONTS.regular,
    color: COLORS.primary,
  },
})

export default RenderColumn