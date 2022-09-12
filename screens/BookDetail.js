import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import {FONTS, COLORS, SIZES, icons} from '../constants';

const LineDivider = () => {
  return (
    <View style={{width: 1, paddingVertical: 5}}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray2,
          borderLeftWidth: 1,
          opacity: 0.2,
        }}></View>
    </View>
  );
};

const BookDetail = ({route, navigation}) => {
  const [book, setBook] = React.useState(null);

  const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
  const [scrollViewVisibleHeight, setScrollViewVisibleHeight] =
    React.useState(0);

  const indicator = new Animated.Value(0);

  React.useEffect(() => {
    let {book} = route.params;
    setBook(book);
  }, [book]);

  function renderBookInfoSection() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={book.bookCover}
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        />
        <View
          source={book.bookCover}
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: book.backgroundColor,
          }}
        />
        {/* Navigation Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            paddingHorizontal: SIZES.padding,
            height: 60,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={icons.back_arrow_icon}
              resizeMode="contain"
              style={{width: 25, height: 25, tintColor: book.navTintColor}}
            />
          </TouchableOpacity>

          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: COLORS.white, ...FONTS.h3}}>Deatil Book</Text>
          </View>
          <TouchableOpacity onPress={() => console.log('Click More')}>
            <Image
              source={icons.more_icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: book.navTintColor,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* Book Cover */}
        <View
          style={{flex: 5, alignItems: 'center', paddingTop: SIZES.padding2}}>
          <Image
            source={book.bookCover}
            resizeMode="contain"
            style={{flex: 1, width: 150, height: 'auto'}}
          />
        </View>
        {/* Book Name and Author */}
        <View
          style={{
            flex: 1.8,
            alignItems: 'center',
            justifyContent: 'center',
            padding: SIZES.radius,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: (100, 100),
          }}>
          <Text style={{color: book.navTintColor, ...FONTS.h2}}>
            {book.bookName}
          </Text>
          <Text style={{color: book.navTintColor, ...FONTS.body3}}>
            {book.author}
          </Text>
        </View>

        {/* Book Info */}
        <View
          style={{
            flexDirection: 'row',
            margin: SIZES.padding,
            paddingVertical: 20,
            justifyContent: 'space-around',
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: SIZES.radius,
          }}>
          {/* Rating */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {book.rating}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white, opacity: 0.6}}>
              Rating
            </Text>
          </View>

          <LineDivider />

          {/* Pages */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {book.pageNo}
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.white,
                opacity: 0.6,
                textAlign: 'center',
                width: 80,
              }}>
              Number of Page
            </Text>
          </View>

          <LineDivider />

          {/* Language */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...FONTS.h3, color: COLORS.white}}>
              {book.language}
            </Text>
            <Text style={{...FONTS.body4, color: COLORS.white, opacity: 0.6}}>
              Language
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderDescription() {
    const indicatorSize =
      scrollViewWholeHeight > scrollViewVisibleHeight
        ? (scrollViewVisibleHeight * scrollViewVisibleHeight) /
          scrollViewWholeHeight
        : scrollViewVisibleHeight;

    const difference =
      scrollViewVisibleHeight > indicatorSize
        ? scrollViewVisibleHeight - indicatorSize
        : 1;

    return (
      <View style={{flex: 1, flexDirection: 'row', padding: SIZES.padding}}>
        {/* Custom Scrollbar */}
        <View
          style={{
            width: 4,
            borderRadius: 2,
            height: '100%',
            backgroundColor: COLORS.gray1,
          }}>
          <Animated.View
            style={{
              width: 4,
              borderRadius: 2,
              height: indicatorSize,
              backgroundColor: COLORS.lightGray3,
              transform: [
                {
                  translateY: Animated.multiply(
                    indicator,
                    scrollViewVisibleHeight / scrollViewWholeHeight,
                  ).interpolate({
                    inputRange: [0, difference],
                    outputRange: [0, difference],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          />
        </View>
        {/* Description */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: SIZES.padding2,
          }}
          scrollEventThrottle={16}
          onContentSizeChange={(white, height) => {
            setScrollViewWholeHeight(height);
          }}
          onLayout={({
            nativeEvent: {
              layout: {x, y, width, height},
            },
          }) => {
            setScrollViewVisibleHeight(height);
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: indicator}}}],
            {useNativeDriver: false},
          )}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
              marginBottom: SIZES.padding,
            }}>
            Description
          </Text>

          <Text
            style={{
              color: COLORS.lightGray,
              ...FONTS.body2,
            }}>
            {book.description}
          </Text>
        </ScrollView>
      </View>
    );
  }

  function renderBottomButton() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        {/* Bookmark */}
        <TouchableOpacity
          style={{
            width: 60,
            backgroundColor: COLORS.secondary,
            marginLeft: SIZES.padding,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('Book Mark')}>
          <Image
            source={icons.bookmark}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.lightGray2,
            }}
          />
        </TouchableOpacity>

        {/* Start Reading */}

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: COLORS.primary,
            marginHorizontal: SIZES.base,
            marginVertical: SIZES.base,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('Start Reading')}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>Start Reading</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (book) {
    return (
      <View style={{flex: 1, backgroundColor: COLORS.black}}>
        {/* Book Cover Section */}
        <View style={{flex: 4}}>{renderBookInfoSection()}</View>
        {/* Description */}
        <View style={{flex: 2}}>{renderDescription()}</View>
        {/* Buttons */}
        <View style={{height: 70}}>{renderBottomButton()}</View>
      </View>
    );
  } else {
    return <></>;
  }
};

export default BookDetail;
