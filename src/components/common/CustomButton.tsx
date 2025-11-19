import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import CustomText from './CustomText';

type Props = {
  onPress?: () => void;
  title: string;
  isBordered?: boolean;
  isDisabled?: boolean;
  btnStyle?: ViewStyle;
};

const CustomButton = ({
  onPress,
  title,
  isBordered = false,
  isDisabled = false,
  btnStyle,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[isBordered ? styles.roundedStyle : styles.mainStyle, btnStyle]}
    >
      <CustomText text={title} textStyle={styles.textStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    width: '100%',
    height: 60,
    backgroundColor: '#0672CB',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  roundedStyle: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2b6cb0',
  },
  textStyle: {
    fontFamily: 'SenBold',
    fontSize: 18,
    color: '#fff',
  },
});

export default CustomButton;
