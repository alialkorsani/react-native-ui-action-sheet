import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {darkColors, lightColors} from './Colors';

export default function Wrapper({backgroundColor, dark, children, mode}) {
  const theme = dark ? darkColors : lightColors;

  const styles = StyleSheet.create({
    wrapper: {
      borderRadius: Platform.OS === 'ios' || mode === 'ios' ? 15 : 0,
      alignItems: 'center',
      overflow: 'hidden',
    },
  });
  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: backgroundColor ? backgroundColor : theme.background,
        },
      ]}>
      {children}
    </View>
  );
}
