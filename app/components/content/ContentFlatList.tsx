import React, { FunctionComponent } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareFlatList, KeyboardAwareFlatListProps } from 'react-native-keyboard-aware-scroll-view';
import { METRICS } from '../../themes';
import Separator from '../separator/Separator';

const ContentFlatList: FunctionComponent<ContentFlatListProps> = props => {
  const LocalSeparator = () => {
    return <Separator height={METRICS.medium10} />
  }
  return (
    <KeyboardAwareFlatList
      {...props}
      ItemSeparatorComponent={props.ItemSeparatorComponent || LocalSeparator}
      contentContainerStyle={[Styles.container, props.contentContainerStyle]}
      showsVerticalScrollIndicator={false}
    />
  )
};

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
})

interface ItemT { }

export interface ContentFlatListProps extends KeyboardAwareFlatListProps<ItemT> {
  
}

const defaultProps = {
  ListHeaderComponent: <Separator />,
  ListFooterComponent: <Separator />,
}

ContentFlatList.defaultProps = defaultProps;

export default ContentFlatList