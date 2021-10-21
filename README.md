<h3 align="center">
  babel-plugin-styled-components-react-native-web
</h3>

<p align="center">
  babel plugin for styled-components/native with react-native-web
</p>

<p align="center">
  <a href="https://npmjs.org/package/babel-plugin-styled-components-react-native-web"><img src="https://img.shields.io/npm/v/babel-plugin-styled-components-react-native-web.svg?style=flat-square"></a>
</p>

## Features

This plugin was created because by default, `styled-components/native` imports all react-native-web without any possibilities for tree-shaking. For example, if you use only `View` in your project, you will still have animations and virtualized lists in the final bundle. That takes a huge space ! Plus, in my testing, react-native-web was included twice because of the two ways it was imported (by the app with import and by `styled-components/native` with require maybe).

This plugin transforms `styled.View` into `styled(View)` and adds the import if necessary.

Note that it works if you use this plugin with react-native and metro, but it might not have the same impact.

## Install

```bash
npm install --save-dev --save-exact babel-plugin-styled-components-react-native-web
```

Then, patch `styled-components/native`

### With [patch-package](https://npmjs.org/package/patch-package)

Install the lib:

```bash
npm install --save-dev --save-exact patch-package
```

Add in `package.json`

```json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

Edit `node_modules/styled-components/native/dist/styled-components.native.esm.js` to change these lines at the end of the file:

```
import { StyleSheet as ReactNativeStyleSheet } from 'react-native';
// var reactNative = require('react-native');

var InlineStyle = _InlineStyle(ReactNativeStyleSheet);

var StyledNativeComponent$1 = _StyledNativeComponent(InlineStyle);

var styled = function styled(tag) {
  return constructWithOptions(StyledNativeComponent$1, tag);
};

/* React native lazy-requires each of these modules for some reason, so let's
 *  assume it's for a good reason and not eagerly load them all */


// var aliases = "ActivityIndicator ActivityIndicatorIOS ART Button DatePickerIOS DrawerLayoutAndroid\n Image ImageBackground ImageEditor ImageStore KeyboardAvoidingView ListView MapView Modal NavigatorIOS\n Picker PickerIOS ProgressBarAndroid ProgressViewIOS ScrollView SegmentedControlIOS Slider\n SliderIOS SnapshotViewIOS Switch RecyclerViewBackedScrollView RefreshControl SafeAreaView StatusBar\n SwipeableListView SwitchAndroid SwitchIOS TabBarIOS Text TextInput ToastAndroid ToolbarAndroid\n Touchable TouchableHighlight TouchableNativeFeedback TouchableOpacity TouchableWithoutFeedback\n View ViewPagerAndroid WebView FlatList SectionList VirtualizedList Pressable";
// /* Define a getter for each alias which simply gets the reactNative component
//  * and passes it to styled */

// aliases.split(/\s+/m).forEach(function (alias) {
//   return Object.defineProperty(styled, alias, {
//     enumerable: true,
//     configurable: false,
//     get: function get() {
//       return styled(reactNative[alias]);
//     }
//   });
// });
```

## Usage

### Via `babel.config.json`

```json
{
  "plugins": ["babel-plugin-styled-components-react-native-web"]
}
```
