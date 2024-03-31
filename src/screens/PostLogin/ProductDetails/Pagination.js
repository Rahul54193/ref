import {CustomIcon, Spacer} from '@app/components';
import {ICON_TYPE} from '@app/components/CustomIcon';
import {FlatList, Image, Pressable, StyleSheet, View} from 'react-native';

const Pagination = ({data, currentPage, handleImageClick}) => {
  const scrollOrNot = data.length > 5 ? true : false;
  console.log('scrollOrNot', scrollOrNot);
  return (
    <>
      {scrollOrNot ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({item, index}) => {
              return (
                <Pressable
                  key={index}
                  style={{
                    height: 50,
                    width: 50,
                    margin: 5,
                    borderRadius: 10,
                    padding: 5,
                    borderWidth: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: index === currentPage ? '#00958C' : '#F0F2FA',
                  }}
                  onPress={() => handleImageClick(index)}>
                  {item.type === 'video' ? (
                    <CustomIcon
                      name={'video'}
                      origin={ICON_TYPE.OCTICONS}
                      size={35}
                      color={'black'}
                    />
                  ) : (
                    <Image
                      source={{uri: item?.file}}
                      resizeMode="cover"
                      style={{
                        height: 45,
                        width: 45,
                        borderRadius: 8,
                      }}
                    />
                  )}
                </Pressable>
              );
            }}
          />
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {data.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={{
                  height: 50,
                  width: 50,
                  margin: 5,
                  borderRadius: 10,
                  padding: 5,
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: index === currentPage ? '#00958C' : '#F0F2FA',
                }}
                onPress={() => handleImageClick(index)}>
                {item.type === 'video' ? (
                  <CustomIcon
                    name={'video'}
                    origin={ICON_TYPE.OCTICONS}
                    size={35}
                    color={'black'}
                  />
                ) : (
                  <Image
                    source={{uri: item?.file}}
                    resizeMode="cover"
                    style={{
                      height: 45,
                      width: 45,
                      borderRadius: 8,
                    }}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      )}
      <Spacer />
      <View style={styles.dotContainer}>
        {data.map((item, index) => (
          <>
            {item.type === 'image' ? (
              <View
                key={index}
                style={{
                  height: index === currentPage ? 8 : 6,
                  width: index === currentPage ? 8 : 6,
                  borderRadius: index === currentPage ? 4 : 3,
                  margin: 5,
                  backgroundColor:
                    index === currentPage ? '#000000' : '#D9D9D9',
                }}
              />
            ) : (
              <CustomIcon
                style={{
                  margin: 4,
                }}
                name={index === currentPage ? 'video' : 'video-outline'}
                origin={ICON_TYPE.MATERIAL_COMMUNITY}
                size={10}
                color={index === currentPage ? '#000000' : '#D9D9D9'}
              />
            )}
          </>
        ))}
      </View>
    </>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
