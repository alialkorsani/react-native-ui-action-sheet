import React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  Text,
} from 'react-native';
import {darkColors, lightColors} from './Colors';
const Wrapper = ({
  onPress,
  dark,
  onPressColor,
  title,
  textColor,
  direction,
}) => {
  const theme = dark ? darkColors : lightColors;

  const styles = StyleSheet.create({
    actionSheetButton: {
      height: 55,
      justifyContent: 'center',
      alignItems:
        Platform.OS === 'ios'
          ? 'center'
          : direction === 'right'
          ? 'flex-end'
          : 'flex-start',
      paddingHorizontal: 10,
      width: '100%',
    },
    actionSheetButtonText: {
      fontSize: 16,
      color: textColor ? textColor : theme.label,
    },
  });

  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        onPressColor ? onPressColor : theme.secondarySystemFill,
        false,
      )}
      onPress={onPress}>
      <View style={styles.actionSheetButton}>
        <Text style={styles.actionSheetButtonText}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableHighlight
      style={styles.actionSheetButton}
      onPress={onPress}
      underlayColor={onPressColor ? onPressColor : theme.secondarySystemFill}>
      <View>
        <Text
          style={[
            styles.actionSheetButtonText,
            {
              color: textColor ? textColor : theme.label,
            },
          ]}>
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};
export default Wrapper;
