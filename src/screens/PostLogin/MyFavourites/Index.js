import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { BackHeader, Container, NavigationBar, Spacer } from '@app/components';
import { COLORS, IMAGES } from '@app/resources';
import PageTitle from '@app/screens/atoms/PageTitle';
import ProductCard from '@app/screens/atoms/ProductCard';
import { LoadingStatus, RoutesName } from '@app/helper/strings';
import { wishlistAction } from '@app/store/wishlistSlice/wishlist.action';
import { connect } from 'react-redux';
import ProductCardFav from '@app/screens/atoms/ProductCardFav';
import { EmptyList } from '../ChatScreen/commn';
import { addWishListAction } from '@app/store/exploreProductSlice';
import { showAlert } from '@app/helper/commonFunction';

const MyFavourites = props => {
  const { getProductList, wishlistReducer, removeWishlist } = props;
  const item = wishlistReducer?.wishlistAction?.data;
  useEffect(() => {
    getProductList();
  }, []);
  const renderItem = ({ item, index }) => {
    return (
      <ProductCard
        key={index}
        item={item}
        isCrossButton = {true}
        onPress={() => {

          showAlert({
            title: 'Alert',
            message: 'Are you sure want to remove!',
            actions: [
              {
                text: 'Remove',
                style: 'default',
                onPress: () => {

                  removeWishlist({
                    product_id: item.id,
                  }).then(res => {
                    if (res?.type.includes('fulfilled')) {
                      getProductList();
                      showAlert({
                        title: 'Success !',
                        message: 'Product removed from favourites list.',
                      });
                    } else if (res?.type.includes('rejected')) {
                      showAlert({
                        title: 'Server error !',
                      });
                    }
                  });

                },
              },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => {
                  // Code to run when the "Cancel" button is pressed
                },
              },
            ],
          });




        }}
      />
    );
  };
  return (
    <Container useSafeAreaView={true} loading={wishlistReducer.wishlistActionLoadingStatus === LoadingStatus.LOADING}>
      <View>
        <Spacer height={20} />
        <BackHeader />
        <PageTitle title={'My Favourites'} />
        <FlatList
          data={item}
          numColumns={2}
          renderItem={renderItem}
          ListEmptyComponent={EmptyList}
          contentContainerStyle={styles.flatlist_container}
        />
      </View>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    wishlistReducer: state.wishlistReducer,
  };
};
const mapDispatchToProps = dispatch => ({
  getProductList: params => dispatch(wishlistAction()),
  removeWishlist: params => dispatch(addWishListAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFavourites);

const styles = StyleSheet.create({
  flatlist_container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 180,
    paddingTop: 10,
  },
});
