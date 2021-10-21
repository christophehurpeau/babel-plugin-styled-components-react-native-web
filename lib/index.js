/* eslint-disable complexity */

'use strict';

module.exports = function babelPluginStyledComponentsReactNativeWeb(
  { types },
  opts,
) {
  const reactNativeImportName = 'BabelPluginStyledComponentsReactNative';

  return {
    name: 'plugin-style-components-react-native-web', // not required
    visitor: {
      Program: {
        enter(path, { file, opts, filename }) {
          file.set('requireImportsReactNative', new Set());
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
      TaggedTemplateExpression({ node, scope }, { file }) {
        const { tag } = node;

        if (!types.isMemberExpression(tag)) return;

        const { object } = tag;
        if (!types.isIdentifier(object)) return;

        /* check binding is from styled-components/native */
        const binding = scope.getBinding(object.name);
        if (!binding || !types.isImportDeclaration(binding.path.parent)) return;
        if (!types.isStringLiteral(binding.path.parent.source)) return;
        if (binding.path.parent.source.value !== 'styled-components/native') {
          return;
        }

        const requireImportsReactNative = file.get('requireImportsReactNative');
        requireImportsReactNative.add(tag.property.name);

        node.tag = types.callExpression(object, [
          types.memberExpression(
            types.identifier(reactNativeImportName),
            tag.property,
          ),
        ]);
      },
    },
  };
};
