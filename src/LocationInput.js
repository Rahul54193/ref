import React, {useEffect, useState} from 'react';
import {View, TextInput, FlatList, Text, TouchableOpacity} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {SafeAreaView} from 'react-native-safe-area-context';
const LocationInput = ({autoFocus}) => {
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const GOOGLE_PLACES_API_KEY = 'AIzaSyCGz3NzE46sAz0Q7J912AJftXjdy0fOrgI';
  const [latlongValue, setLatLongValue] = useState();
  // console.log('latlongValue', latlongValue);
  // useEffect(() => {
  //   onValueChange(latlongValue);
  // }, [latlongValue]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder="Type a place"
        fetchDetails={true}
        onPress={(data, details = null) => {
          // Access the selected place data
          console.log(data);

          // Access the latitude and longitude
          if (details) {
            const {lat, lng} = details.geometry.location;
            console.log('Latitude:', lat);
            console.log('Longitude:', lng);
          }
        }}
        query={{key: GOOGLE_PLACES_API_KEY}}
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        textInputProps={{
          autoFocus: autoFocus ?? true,
          blurOnSubmit: false,
        }}
      />
    </SafeAreaView>
  );
};

export default LocationInput;
