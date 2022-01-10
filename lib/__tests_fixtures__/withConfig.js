'use strict';

exports.actual = `
import styled from 'styled-components/native';
const Button = styled.View.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => defaultValidatorFn(prop),
})\`
  display: flex;
\`;
`;

exports.expected = `
import * as BabelPluginStyledComponentsReactNative from "react-native";
import styled from 'styled-components/native';
const Button = styled(BabelPluginStyledComponentsReactNative.View).withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => defaultValidatorFn(prop)
})\`
  display: flex;
\`;
`;
