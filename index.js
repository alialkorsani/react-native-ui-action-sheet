import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
  SafeAreaView,
} from "react-native";
import { darkColors, lightColors } from "./src/Colors";

import Modal from "react-native-modal";
import ActionSheetButton from "./src/ActionSheetButton";
import Wrapper from "./src/Wrapper";
const ActionSheet = (
  {
    options,
    cancelTitle,
    title,
    backgroundColor,
    textColor,
    cancelTextColor,
    separatorColor,
    direction,
    titleColor,
    onPressColor,
    dark,
  },
  ref
) => {
  const theme = dark ? darkColors : lightColors;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    modal: { margin: Platform.OS === "ios" ? 10 : 0 },

    headerIOS: { padding: 10, width: "100%", alignItems: "center" },
    headerAndroid: {
      padding: 10,
      flexDirection: direction === "right" ? "row-reverse" : "row",
      width: "100%",
    },
    headerTitle: { fontSize: 16 },
    flatList: { width: "100%" },

    itemSeparatorComponent: {
      height: 0.5,
    },
    cancelInner: { borderRadius: Platform.OS === "ios" ? 15 : 0 },
    cancelTouchable: { borderRadius: Platform.OS === "ios" ? 15 : 0 },
    backdrop: { flex: 1 },
    iosWrapperMargin: { marginTop: 10 },
  });

  useImperativeHandle(ref, () => ({
    show() {
      setVisiable(true);
    },
  }));
  const [visiable, setVisiable] = useState(false);

  const close = () => {
    setVisiable(false);
  };
  const onPress = (item) => {
    close();
    setTimeout(() => {
      item.onPress();
    }, 500);
  };
  return (
    <Modal
      onBackButtonPress={close}
      backdropOpacity={0.2}
      onSwipeComplete={close}
      style={styles.modal}
      swipeDirection="down"
      isVisible={visiable}
    >
      <>
        <TouchableWithoutFeedback pointerEvents="none" onPress={close}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <Wrapper dark={dark} backgroundColor={backgroundColor}>
          {title ? (
            Platform.OS === "ios" ? (
              <View
                style={{
                  ...styles.headerIOS,
                }}
              >
                <Text
                  style={{
                    ...styles.headerTitle,
                    color: titleColor ? titleColor : theme.secondaryLabel,
                  }}
                >
                  {title}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  ...styles.headerAndroid,
                }}
              >
                <Text
                  style={{
                    ...styles.headerTitle,
                    color: titleColor ? titleColor : theme.secondaryLabel,
                  }}
                >
                  {title}
                </Text>
              </View>
            )
          ) : null}
          <FlatList
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() =>
              Platform.OS === "ios" ? (
                <View
                  style={{
                    ...styles.itemSeparatorComponent,
                    backgroundColor: separatorColor
                      ? separatorColor
                      : theme.separator,
                  }}
                />
              ) : null
            }
            style={styles.flatList}
            data={options}
            renderItem={({ item }) => (
              <ActionSheetButton
                dark={dark}
                direction={direction}
                textColor={textColor}
                title={item.title}
                onPressColor={onPressColor}
                onPress={() => onPress(item)}
              />
            )}
            keyExtractor={(item, i) => i.toString()}
          />
        </Wrapper>
        {Platform.OS === "android" ? (
          <View
            style={{
              ...styles.itemSeparatorComponent,
              backgroundColor: separatorColor
                ? separatorColor
                : theme.separator,
            }}
          />
        ) : (
          <View style={styles.iosWrapperMargin} />
        )}
        {cancelTitle ? (
          <Wrapper dark={dark} backgroundColor={backgroundColor}>
            <ActionSheetButton
              direction={direction}
              title={cancelTitle}
              onPressColor={onPressColor}
              textColor={cancelTextColor ? cancelTextColor : theme.red}
              onPress={close}
            />
          </Wrapper>
        ) : null}
      </>
      <SafeAreaView />
    </Modal>
  );
};

export default forwardRef(ActionSheet);
