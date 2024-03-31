import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'

const Item = (
    { id,
        userId,
        post_Title,
        postImage,
        city,
        username,
        notification,
        Date,
        day,

        status }
) => {
    return (
        <View style={{ backgroundColor: status == 'unread' ? '#F0F2FA' : 'white' }}>
            {/* <Text>{id}</Text>
        <Text>{post_Title}</Text>
        <View>
          <Image source={postImage} style={{height:100, width:100, borderRadius:50}}/>
        </View>
        <Text>{city}</Text>
        <Text>{username}</Text>
        <Text>{notification}</Text>
        <Text>{Date}</Text> */}

            <View style={[styles.container,
            {
               
                flexDirection: 'row',
                justifyContent: 'space-evenly',
               marginVertical:5,
               flexWrap:'wrap'
             
            },]}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
                    <Image source={postImage} style={{ height: 40, width: 40, borderRadius: 20, }} />
                </View>
                <View style={{ flex: 3, marginVertical:5}}>
                    <Text style={{ fontFamily: 'OpenSans-Regular', color: 'black', fontSize: 14, width:'95%' }}>{username ? username : post_Title} {notification}</Text>
                    <Text style={{ marginTop: 5, fontFamily: 'OpenSans-Regular', fontSize: 11 }}>{day}</Text>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ height: 1, width: '90%', backgroundColor: 'black', opacity: 0.2 }} />

            </View>     
     </View>
    )

}
const NotificationCard = ({ data }) => {



    const renderItem = ({ item, index }) => (
        <Item
            id={item.id}
            userId={item.userId}
            post_Title={item.post_Title}
            postImage={item.postImage}
            city={item.city}
            username={item.username}
            notification={item.notification}
            Date={item.Date}
            status={item.status}
            day={item.day}
            index={index}
        />
    );
    return (
        <View>
            <FlatList data={data}
                renderItem={renderItem}
                nestedScrollEnabled />
        </View>
    )
}

export default NotificationCard