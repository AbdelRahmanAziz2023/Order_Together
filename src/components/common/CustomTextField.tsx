import { Colors } from '@/src/constants/colors';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { Icons } from '../../constants/images';
import CustomText from './CustomText';

type Props = {
  name: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
} & Partial<
  Pick<
    TextInputProps,
    'onSubmitEditing' | 'keyboardType' | 'returnKeyType' | 'maxLength' | 'blurOnSubmit'
  >
>;

const CustomTextField = ({
  name,
  placeholder,
  containerStyle,
  isPassword = false,
  onChangeText,
  value,
  onSubmitEditing,
  returnKeyType,
  keyboardType,
  maxLength,
  blurOnSubmit,
}: Props) => {
  const [isSecure, setIsSecure] = useState(isPassword);

  const changeSecure = () => {
    setIsSecure(prev => !prev);
  };

  const Eye = Icons.eye;
  const EyeOff = Icons.eyeOff;

  const icon = isSecure ? (
    <Eye stroke={'#B4B9CA'} />
  ) : (
    <EyeOff stroke={'#B4B9CA'} />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <CustomText text={name} />
      <View style={styles.textFieldContainer}>
        <TextInput
          cursorColor={Colors.lightred}
          placeholder={placeholder}
          style={styles.textFieldStyle}
          secureTextEntry={isSecure}
          placeholderTextColor={'#A0A5BA'}
          onChangeText={onChangeText}
          value={value}
          selectionHandleColor={Colors.lightred}
          autoCapitalize='none'
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          keyboardType={keyboardType}
          maxLength={maxLength}
          blurOnSubmit={blurOnSubmit}
        />
        {isPassword && <Pressable onPress={changeSecure}>{icon}</Pressable>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 10,
  },
  textFieldContainer: {
    backgroundColor: '#F0F5FA',
    width: '100%',
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textFieldStyle: {
    color: '#32343E',
    width: '90%',
    fontSize: 16,
    fontFamily: 'SenRegular',
  },
});

export default CustomTextField;
