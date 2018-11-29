module.exports = function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(
        path,
        _ref = {
          opts: {
            libraries: {},
          },
        },
      ) {
        const specifiers = path.node.specifiers
        const source = path.node.source
        const library = _ref.opts.libraries[source.value]

        if (library) {
          const declarations = []
          const importSpecifiers = []

          specifiers.forEach(specifier => {
            if (t.isImportDefaultSpecifier(specifier)) {
              declarations.push(
                t.VariableDeclaration('const', [
                  t.VariableDeclarator(
                    t.Identifier(specifier.local.name),
                    t.MemberExpression(t.Identifier('window'), t.Identifier(library)),
                  ),
                ]),
              )
            } else if (t.isImportSpecifier(specifier)) {
              importSpecifiers.push(specifier)
            }
          })

          if (importSpecifiers.length) {
            const declaration = t.VariableDeclaration('const', [
              t.VariableDeclarator(
                t.ObjectPattern(
                  importSpecifiers.map(specifier =>
                    t.ObjectProperty(t.Identifier(specifier.imported.name), t.Identifier(specifier.imported.name)),
                  ),
                ),
                t.MemberExpression(t.Identifier('window'), t.Identifier(library)),
              ),
            ])

            declarations.push(declaration)
          }

          path.replaceWithMultiple(declarations)
        }
      },
    },
  }
}
