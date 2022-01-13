'use strict';

exports.babelPlugins = [
  [
    'babel-plugin-styled-components',
    {
      ssr: true,
    },
  ],
];

exports.actual = `
import styled from 'styled-components/native';
const Button = styled.View\`
  display: flex;
\`;
`;

exports.expected = `
import * as BabelPluginStyledComponentsReactNative from "react-native";
import styled from 'styled-components/native';
const Button = styled(BabelPluginStyledComponentsReactNative.View).withConfig({
  displayName: "with-babel-plugin-styled-components__Button",
  componentId: "sc-1s36hzg-0"
})(["display:flex;"]);
`;
