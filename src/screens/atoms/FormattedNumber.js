import { View, Text } from 'react-native'
import React from 'react'

function FormattedNumber(number) {
    const formattedNumber = number?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return formattedNumber?.replace(/\.00$/, '');
}

export default FormattedNumber