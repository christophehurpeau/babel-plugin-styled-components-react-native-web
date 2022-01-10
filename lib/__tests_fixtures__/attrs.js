'use strict';

exports.actual = `
import { View } from "react-native";
import styled from 'styled-components/native';
const Button = styled.View.attrs({ className: 'foo' })\`
  display: flex;
\`;
`;

exports.expected = `
import * as BabelPluginStyledComponentsReactNative from "react-native";
import { View } from "react-native";
import styled from 'styled-components/native';
const Button = styled(BabelPluginStyledComponentsReactNative.View).attrs({
  className: 'foo'
})\`
  display: flex;
\`;`;
