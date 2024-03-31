import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Spacer = ({ height, width }) => {
    return (
        <View style={ { height: height ?? 10, width: width } }>

        </View>
    )
}

export default Spacer
