# About

Action Sheet is a slide-up pane for presenting the user with a set of alternatives for how to proceed with a given task. You can also use action sheets to prompt the user to confirm a potentially dangerous action. The action sheet contains an optional title and one or more buttons, each of which corresponds to an action to take

## Features

- Native feel on each OS
- RTL and LTR layout direction support
- Dark and light theme
- customizable colors

## Preview

|                                                    IOS APP                                                     |                                                    ANDROID APP                                                     |
| :------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: |
| ![ios preview](https://github.com/alialkorsani/react-native-ui-action-sheet/blob/master/blob/ios.png?raw=true) | ![ios preview](https://github.com/alialkorsani/react-native-ui-action-sheet/blob/master/blob/android.png?raw=true) |

## Install

```bash
yarn add react-native-ui-action-sheet
```

or

```bash
npm i react-native-ui-action-sheet
```

## Usage

```bash
import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Button} from 'react-native';

import ActionSheet from 'react-native-ui-action-sheet';

export default function App() {
  const ActionSheetRef = useRef();
  return (
    <View style={styles.container}>
      <Button
        onPress={() => ActionSheetRef.current.show()}
        title="Show Action Sheet"
      />
      <ActionSheet
        ref={ActionSheetRef}
        title={'What do you need ?'}
        options={[
          {title: 'Edit', onPress: () => alert(' Edit pressed')},
          {title: 'Share', onPress: () => alert(' Share pressed')},
          {title: 'Delete', onPress: () => alert('Delete pressed')},
        ]}
        cancelTitle="cancel"

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

# Available Props

| prop                                  | description                                                              |
| ------------------------------------- | ------------------------------------------------------------------------ |
| ref (required)                        | make an action sheet component reference                                 |
| options (required)                    | **array** that contain **objects** which has a **title** and **onPress** |
| title (optional)                      | add a title to the action sheet                                          |
| cancelTitle (optional)                | title of the cancel button                                               |
| titleColor (optional)                 | customize the action sheet title color                                   |
| backgroundColor (optional)            | customize the action sheet background color                              |
| textColor (optional)                  | customize the action sheet buttons text color                            |
| cancelTextColor (optional)            | customize the cancel button text color                                   |
| separatorColor (optional)             | customize the separator color                                            |
| direction (optional **Android Only**) | set the layout direction to **left** or **right**                        |
| onPressColor (optional)               | customize the button underlayColor and ripple color                      |
| dark (optional)                       | set action sheet to dark mode                                            |
| mode (optional)                       | show ios style on android                                                |
