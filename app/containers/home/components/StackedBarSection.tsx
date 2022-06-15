import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import StackedBar from './StackBar';

const StackedBarSection: FunctionComponent<propTypes> = props => {
  const scrollView = useRef<ScrollView>(null);
  const [renderData, setRenderData] = useState<Element[]>()

  //componentDidMount
  useEffect(() => {
    const data: Element[] = []
    for (const [index, item] of props.data.entries()) {
      data.push(
        <StackedBar
          key={String(index)}
          scrollViewRef={scrollView.current}
          item={item}
          dataLength={props.data.length}
          index={index}
        />
      )
      setRenderData(data)
    }
  }, [props.data, scrollView.current])

  //rendering
  return (
    <ScrollView
      ref={scrollView}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={false}
      style={{ flexGrow: 0 }}
    >
      {renderData}
    </ScrollView>
  )
};

interface propTypes {
  data: any[]
}

StackedBarSection.defaultProps = {

}

const Styles = StyleSheet.create({

})

export default StackedBarSection