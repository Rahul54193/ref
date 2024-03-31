import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '@app/resources'

const styles = StyleSheet.create({
    TextStyle1:{
        color:COLORS.HYPERLINK,
        fontFamily:'OpenSans-Bold',
        fontSize:16,
        margin:10
        
    },
    lineColor:{
        height: 2,
        width:'100%',
        marginHorizontal:5,
        backgroundColor: 'black',
        flexShrink: 1,
        marginVertical:20,
        opacity:0.2
       
    }
})

export default styles
