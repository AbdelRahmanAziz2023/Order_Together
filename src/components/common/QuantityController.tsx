import { Colors } from '@/src/constants/colors';
import { Icons } from '@/src/constants/images';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface QuantityControllerProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantityController: React.FC<QuantityControllerProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  const MinusIcon = Icons.minus as React.FC<SvgProps>;
  const PlusIcon = Icons.plus as React.FC<SvgProps>;

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={onDecrease}
      >
        <MinusIcon width={12} height={12} fill={Colors.white} />
      </Pressable>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={onIncrease}
      >
        <PlusIcon width={12} height={12} fill={Colors.white} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: Colors.mustard,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 16,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  buttonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  quantityContainer: {
    minWidth: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontFamily: 'SenBold',
    color: Colors.white,
  },
});
