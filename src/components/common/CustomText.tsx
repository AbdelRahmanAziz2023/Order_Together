import { StyleSheet, Text, TextStyle } from 'react-native';

type Props = {
  text: string;
  textStyle?: TextStyle[];
  numOfLines?: number;
};

const CustomText = ({ text, textStyle, numOfLines=2 }: Props) => {
  return <Text lineBreakMode='middle' numberOfLines={numOfLines} style={[styles.text, textStyle]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color : '#32343E',
    fontSize:16,
    fontFamily: 'SenRegular',
  },
});

export default CustomText;
