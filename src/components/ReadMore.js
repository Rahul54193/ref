import {COLORS, SPACING} from '@app/resources';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Spacer from './Spacer';

const ReadMore = ({content, maxCharacters = 50}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  var dots = content?.length > maxCharacters ? '...' : '';

  const toggleShowContent = () => {
    setShowFullContent(!showFullContent);
  };

  const truncatedContent = content?.substring(0, maxCharacters);
  const displayContent = showFullContent ? content : truncatedContent + dots;

  return (
    <View style={{width: '98%'}}>
      <Text style={styles.contentText}>{displayContent}</Text>
      {content?.length > maxCharacters && (
        <TouchableOpacity onPress={toggleShowContent}>
          <Text style={styles.readMoreText}>
            {showFullContent ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentText: {
    fontSize: 15,
    lineHeight: 21,
  },
  readMoreText: {
    color: COLORS.APPGREEN,
    //marginTop: SPACING.SCALE_5,
    textDecorationLine: 'underline',
    fontSize: 15,
    //position: 'absolute',
  },
});

export default ReadMore;
