/* eslint-disable complexity */

'use strict';

module.exports = function babelPluginStyledComponentsReactNativeWeb(
  { types },
  opts,
) {
  const reactNativeImportName = 'BabelPluginStyledComponentsReactNative';

  const transformStyledComponentsMemberExpressions = {
    TaggedTemplateExpression({ node, scope }, { file }) {
      const { tag } = node;

      const addToReactNativeImport = (name) => {
        const requireImportsReactNative = file.get('requireImportsReactNative');
        requireImportsReactNative.add(name);
      };

      const isBindingFromStyledComponentsNative = (name) => {
        const binding = scope.getBinding(name);
        if (!binding || !types.isImportDeclaration(binding.path.parent)) {
          return;
        }
        if (!types.isStringLiteral(binding.path.parent.source)) return;
        return binding.path.parent.source.value === 'styled-components/native';
      };

      const isValidStyledMemberExpression = (memberExpression) => {
        const object = memberExpression.object;
        if (!types.isIdentifier(object)) return false;
        if (!isBindingFromStyledComponentsNative(object.name)) {
          return false;
        }
        return true;
      };

      const createCallExpression = (memberExpression) => {
        addToReactNativeImport(memberExpression.property.name);
        return types.callExpression(memberExpression.object, [
          types.memberExpression(
            types.identifier(reactNativeImportName),
            memberExpression.property,
          ),
        ]);
      };

      // styled.View``
      if (types.isMemberExpression(tag)) {
        const memberExpression = tag;
        if (!isValidStyledMemberExpression(tag)) return;
        node.tag = createCallExpression(memberExpression);
        // styled.View.attrs({})``
      } else if (
        types.isCallExpression(tag) &&
        types.isMemberExpression(tag.callee) &&
        types.isMemberExpression(tag.callee.object)
      ) {
        const memberExpression = tag.callee.object;
        if (!isValidStyledMemberExpression(memberExpression)) return;
        tag.callee.object = createCallExpression(memberExpression);
      }
    },
  };

  return {
    name: 'plugin-style-components-react-native-web', // not required
    visitor: {
      Program: {
        enter(path, state) {
          state.file.set('requireImportsReactNative', new Set());
          path.traverse(transformStyledComponentsMemberExpressions, state);
        },
        exit({ node, scope }, { file }) {
          const requireImportsReactNative = file.get(
            'requireImportsReactNative',
          );
          if (requireImportsReactNative.size === 0) return;

          if (!scope.hasBinding(reactNativeImportName)) {
            const declaration = types.importDeclaration(
              [
                types.importNamespaceSpecifier(
                  types.identifier(reactNativeImportName),
                ),
              ],
              types.stringLiteral('react-native'),
            );

            node.body.unshift(declaration);
          }
        },
      },
    },
  };
};
