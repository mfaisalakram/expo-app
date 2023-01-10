import { AnimatedFlatList, Arrow, BackDrops, Button, Card, SearchBar } from '@components';
import { useMovie } from '@hooks';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useRef, useState, memo, FC } from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  Dimensions,
  GestureResponderEvent,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Color } from 'types';
import Animated, { Extrapolate, useValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ITEM_W } from 'components/Card';
import { getMovies } from 'api';

const { width, height } = Dimensions.get('screen');

const EMTY = (width - ITEM_W) / 2;

type List = {
  listX: Animated.Value<number>;
  data: ListRenderItemInfo<ItemsProps>;
  onPress?: (e: GestureResponderEvent) => void;
  booking?: (e: GestureResponderEvent) => void;
};

type HomeStack = StackScreenProps<StackHome<ItemsProps, ItemsProps>, 'Home'>;

const RenderItem: FC<List> = memo(({ data: { index, item }, listX, onPress, booking }: any) => {
  const inputRange = [(index - 2) * ITEM_W, (index - 1) * ITEM_W, index * ITEM_W];

  const translateY = listX.interpolate({
    inputRange,
    outputRange: [-100, 0, -100],
    extrapolate: Extrapolate.CLAMP
  });

  const opacity = listX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP
  });
  const itemTranslate = listX.interpolate({
    inputRange,
    outputRange: [100, 40, 100],
    extrapolate: Extrapolate.CLAMP
  });

  if (!item.poster) {
    return <View style={{ width: EMTY }} />;
  }

  return (
    <View style={styles.item}>
      {/* <Animated.View style={{alignItems: 'center', opacity, transform: [{translateY}]}}>
        <Button uniq={item.title} onPress={booking} color="white" style={{marginTop: 30}} text="buy ticket" backGround="#F00000" />
      </Animated.View> */}
      <TouchableOpacity onPress={onPress}>
        <Card style={{ transform: [{ translateY: itemTranslate }] }} src={{ uri: item.poster }} title={item.title} />
      </TouchableOpacity>
    </View>
  );
});

const Home: React.FC<HomeStack> = ({ navigation }: any) => {
  const scrollX = useValue(0);
  const { setPages, movie, page, pages } = useMovie();
  const [nextPage, setNext] = useState(false);
  const [prevPage, setPrevPage] = useState(false);
  const ref = useRef<Animated.ScrollView & ScrollView>(null);
  const onScroll = Animated.event<NativeSyntheticEvent<NativeScrollEvent>>([{ nativeEvent: { contentOffset: { x: scrollX } } }]);
  const next = Number(pages?.total) - Number(pages?.page);

  const actions = useCallback(
    (items: ItemsProps) => {
      console.log('movieeeeee: ', items)
      navigation.navigate('Detail', items);
    },
    [navigation]
  );

  const calback = useCallback(() => {
    setPages(page + 1);
    setNext(true);
  }, [page, setPages]);

  const prev = () => {
    setPages((old: number) => Math.max(old - 1, 1));
    setPrevPage(true);
  };

  const Rendermemo = useCallback<FC<List>>(
    ({ data, listX, booking, onPress }: any) => <RenderItem data={data} listX={listX} booking={booking} onPress={onPress} />,
    []
  );

  useEffect(() => {
    if (ref.current && nextPage) {
      //@ts-ignore
      getMovies(page + 1)

    }
    else if (ref.current && prevPage) {
      getMovies(page - 1)

    }
  }, [next, calback, nextPage]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
      <BackDrops x={scrollX} data={movie!} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '200%' }}>

        <TouchableOpacity disable={next === 0} onPress={() => calback()} style={{ top: height * 0.3, right: width * 0.04, zIndex: 21 }}>
          <AntDesign name="banckward" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity disable={page === 1 ? true : false} onPress={prev} style={{ top: height * 0.3, left: width * 0.04, zIndex: 20 }}  >
          <AntDesign name="forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* <Arrow disable={page === 1} onPress={prev} rotate="180deg" style={{ top: height * 0.4, left: width * 0.04, zIndex: 20 }} />
      <Arrow disable={next === 0} onPress={() => calback()} rotate="0deg" style={{ top: height * 0.4, right: width * 0.04, zIndex: 21 }} /> */}
      <AnimatedFlatList
        data={movie}
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.items}
        keyExtractor={(item: { key: any; }) => item.key}
        contentContainerStyle={{ paddingVertical: 60 }}
        snapToInterval={ITEM_W}
        onScroll={onScroll}
        onEndReachedThreshold={0.2}
        snapToAlignment="start"
        maxToRenderPerBatch={10}
        onEndReached={() => calback()}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.99}
        updateCellsBatchingPeriod={20}
        initialNumToRender={10}
        renderItem={(item: { item: { key: any; }; }) => (
          <Rendermemo
            key={item.item.key}
            listX={scrollX}
            data={item}
            onPress={() => actions(item?.item)}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Color.purple1
  },
  items: {
    ...StyleSheet.absoluteFillObject,
    top: height * 0.28
  },
  item: {
    padding: 10,
    width: ITEM_W
  }
});

export default memo(Home);
