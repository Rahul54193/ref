import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Container } from '../../../components';
import { IMAGES } from '../../../resources';


const SplashView = () => {
    return (
        <Container>
            {/* <ImageBackground
                source={IMAGES.Splash_logo}
                resizeMode="stretch"
                style={{ height: '90%', width: '90%' }}
            /> */}
           <View style={{flex:1 }}>
           <View style={{flex:1, justifyContent:'center',alignItems:'center',}}>
           <Image 
            source={IMAGES.Splash_logo}
            style={{resizeMode:'stretch', height:70, width:"60%", }}
            />
           </View>
            <View style={{bottom:20}}>
            <Text style={styles.copyright}>
            Copyright © 2023 SG Watch Guru Pte Ltd.
                </Text>
            </View>
           </View>
           
        </Container>
    );
};

export default SplashView;

const styles = StyleSheet.create({
    section2: {
        position: 'absolute',
        bottom: 25,
        width: '100%',
    },
    copyright: {
        alignSelf: 'center',
        color: '#4E4E4E',
        fontSize: 9,
        fontFamily:'OpenSans-Regular',
        
    },
});