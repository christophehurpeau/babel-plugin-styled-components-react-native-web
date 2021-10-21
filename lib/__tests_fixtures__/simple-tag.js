'use strict';

exports.actual = `
import styled from 'styled-components/native';
const Button = styled.View\`
  display: flex;
\`;
`;

exports.expected = `
import * as BabelPluginStyledComponentsReactNative from "react-native";
import styled from 'styled-components/native';
const Button = styled(BabelPluginStyledComponentsReactNative.View)\`
  display: flex;
\`;
`;
