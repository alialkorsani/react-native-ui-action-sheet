import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
  SafeAreaView,
} from "react-native";

import Modal from "react-native-modal";

const ActionSheet = forwardRef(
  (
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
      rippleColor,
      dark,
    },
    ref
  ) => {
    const [visiable, setVisiable] = useState(false);

    const Touchable = ({ children, onPress, style, innserStyle }) => {
      return Platform.OS === "android" ? (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(
            rippleColor || dark ? "#9E9E9E" : "#ECEFF1",
            false
          )}
          style={style}
          onPress={onPress}
        >
          <View
            style={[
              styles.actionSheetButton,
              {
                ...innserStyle,
                backgroundColor: backgroundColor || dark ? "#1c1c1eff" : "#fff",
                alignItems: direction === "right" ? "flex-end" : "flex-start",
              },
            ]}
          >
            {children}
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableHighlight
          style={style}
          onPress={onPress}
          underlayColor="lightgray"
        >
          <View
            style={[
              styles.actionSheetButton,
              innserStyle,
              {
                backgroundColor: backgroundColor || dark ? "#1c1c1eff" : "#fff",
              },
            ]}
          >
            {children}
          </View>
        </TouchableHighlight>
      );
    };

    useImperativeHandle(ref, () => ({
      show() {
        setVisiable(true);
      },
    }));

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
            <View style={{ flex: 1 }}></View>
          </TouchableWithoutFeedback>

          <View
            style={[
              styles.bottomSheet,
              {
                backgroundColor: backgroundColor || dark ? "#1c1c1eff" : "#fff",
              },
            ]}
          >
            {title ? (
              <View
                style={[
                  styles.header,
                  {
                    alignItems:
                      Platform.OS === "android"
                        ? direction === "right"
                          ? "flex-end"
                          : "flex-start"
                        : "center",
                  },
                ]}
              >
                <Text
                  style={[styles.headerTitle, { color: titleColor || "gray" }]}
                >
                  {title}
                </Text>
              </View>
            ) : null}
            <FlatList
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() =>
                Platform.OS === "ios" ? (
                  <View
                    style={[
                      styles.itemSeparatorComponent,
                      {
                        backgroundColor:
                          separatorColor || dark ? "#54545899" : "#3c3c4349",
                      },
                    ]}
                  />
                ) : null
              }
              style={styles.flatList}
              data={options}
              renderItem={({ item }) => (
                <Touchable onPress={() => onPress(item)}>
                  <Text
                    style={[
                      styles.actionSheetButtonText,
                      { color: textColor || dark ? "#ffff" : "#1c1c1eff" },
                    ]}
                  >
                    {item.title}
                  </Text>
                </Touchable>
              )}
              keyExtractor={(item, i) => i.toString()}
            />
          </View>
          {Platform.OS === "android" ? (
            <View
              style={[
                styles.itemSeparatorComponent,
                {
                  backgroundColor:
                    separatorColor || dark ? "#37474F" : "#3c3c4349",
                },
              ]}
            />
          ) : (
            <View style={{ marginTop: 10 }} />
          )}
          {cancelTitle ? (
            <Touchable
              innserStyle={styles.cancelInner}
              style={styles.cancelTouchable}
              onPress={close}
            >
              <Text
                style={[
                  styles.actionSheetButtonText,
                  {
                    color: cancelTextColor || dark ? "#ff453aff" : "#ff3b30ff",
                  },
                ]}
              >
                {cancelTitle}
              </Text>
            </Touchable>
          ) : null}
        </>
        <SafeAreaView />
      </Modal>
    );
  }
);
export default ActionSheet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: { margin: Platform.OS === "ios" ? 10 : 0 },
  bottomSheet: {
    width: "100%",
    borderRadius: Platform.OS === "ios" ? 15 : 0,
    alignItems: "center",
    overflow: "hidden",
  },
  header: { padding: 10, width: "100%" },
  headerTitle: { fontSize: 16 },
  flatList: { width: "100%" },
  actionSheetButton: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  actionSheetButtonText: {
    fontSize: 16,
  },
  itemSeparatorComponent: {
    height: 0.5,
  },
  cancelInner: { borderRadius: Platform.OS === "ios" ? 15 : 0 },
  cancelTouchable: { borderRadius: Platform.OS === "ios" ? 15 : 0 },
});
