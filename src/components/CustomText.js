import {StyleSheet, Text} from 'react-native';
import {
  Caption,
  Headline,
  Paragraph,
  Subheading,
  Title,
} from 'react-native-paper';

const CustomText = ({type, style, children, ...props}) => {
  return (
    <>
      {type === 'caption' ? (
        <Caption style={[styles.text, style]}>{children}</Caption>
      ) : type === 'paragraph' ? (
        <Paragraph style={[styles.text, style]}>{children}</Paragraph>
      ) : type === 'subheading' ? (
        <Subheading style={[styles.text, style]}>{children}</Subheading>
      ) : type === 'title' ? (
        <Title style={[styles.text, style]}>{children}</Title>
      ) : type === 'headline' ? (
        <Headline style={[styles.text, style]}>{children}</Headline>
      ) : (
        <Text style={[styles.text, style]} {...props}>
          {children}
        </Text>
      )}
    </>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
