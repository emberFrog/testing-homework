import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'

module.exports = {
	plugins: ['simple-import-sort'],
	rules: {
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
	},
	overrides: [
		{
			files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
			rules: {
				'simple-import-sort/imports': [
					'error',
					{
						groups: [
							// Packages `react` related packages come first.
							['^react', '^\\w', '^@hookform', '^@radix-ui'],
							// npm packages
							// Anything that starts with a letter (or digit or underscore), or `@` followed by a letter.
							// ['^\\w'],
							// Internal packages.
							['^@store(/.*|$)'],
							['^@components(/.*|$)'],
							['^@ui(/.*|$)'],
							['^@lib(/.*|$)'],
							['^@pages(/.*|$)'],
							['^@utils(/.*|$)'],
							['^@hooks(/.*|$)'],
							['^@services(/.*|$)'],
							// Side effect imports.
							['^\\u0000'],
							// Parent imports. Put `..` last.
							['^\\.\\.(?!/?$)', '^\\.\\./?$'],
							// Other relative imports. Put same-folder imports and `.` last.
							['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
							// Style imports.
							['^.+\\.?(css)$'],
						],
					},
				],
			},
		},
	],
}

export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
	{ languageOptions: { globals: globals.browser } },
	...tseslint.configs.recommended,
	pluginReactConfig,
]
