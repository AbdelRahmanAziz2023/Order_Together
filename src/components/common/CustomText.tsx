import { StyleSheet, Text, TextStyle } from 'react-native';

type Props = {
  text: string;
  textStyle?: TextStyle;
};

const CustomText = ({ text, textStyle }: Props) => {
  return <Text lineBreakMode='middle' numberOfLines={2} style={[styles.text, textStyle]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color : '#32343E',
    fontSize:16,
    fontFamily: 'SenRegular',
  },
});

export default CustomText;
