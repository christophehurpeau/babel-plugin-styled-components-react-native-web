'use strict';

exports.actual = `
import styled from 'styled-components/native';

const OverlayPressable = styled.Pressable(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: theme.kitt.colors.overlay.dark,
}));
`;

exports.expected = `
import styled from 'styled-components/native';
const OverlayPressable = styled.Pressable(({
  theme
}) => ({ ...StyleSheet.absoluteFillObject,
  backgroundColor: theme.kitt.colors.overlay.dark
}));
`;
