// const stylistic = import('@stylistic/eslint-plugin')
// const js = import("@eslint/js")
// const simpleImportSort = import("eslint-plugin-simple-import-sort");
// const FlatCompat = import('@eslint/eslintrc')
// const compat = new FlatCompat.FlatCompat();

// export default [
//   stylistic.configs['recommended-flat'],
//   {
//     ignores: ["**/node_modules/**", "**/.next/**", "**/.vscode/**"]
//   },
//   js.configs.recommended,
//   ...compat.extends('plugin:node/recommended', 'plugin:@typescript-eslint/eslint-recommended'),
//   {
//     plugins: {
//       '@stylistic': stylistic,
//       "simple-import-sort": simpleImportSort,
//     },
//     rules: {
//       'indent': ['error', 2],
//       '@stylistic/indent': ['error', 2],
//       "@stylistic/jsx-sort-props": ['warn'],
//       "simple-import-sort/imports": "error",
//       "simple-import-sort/exports": "error",
//       // ...
//     }
//   }

//   // ...your other config items
// ]
import jsPlugin from "@eslint/js";
import stylisticTs from '@stylistic/eslint-plugin-ts'
import typescriptEslintParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import sortKeysCustomOrder from "eslint-plugin-sort-keys-custom-order";
import globals from "globals";
import { configs } from "typescript-eslint";
// import { settings } from 'eslint-plugin-import/config/react';

export default [
	{
		files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
		ignores: ["**/node_modules/**", "**/.next/**", "**/.vscode/**"],
		languageOptions: {
			/**
			 * global 変数がエラーが出るのでその防止
			 * $ pnpm add -d globals
			 */
			globals: {
				...globals.browser,
				...globals.node,

				/**
				 * react 用
				 */
				JSX: true,
				React: true,
			},

			/**
			 * Unexpected token ... とか言われるので parser を追加する
			 */
			parser: typescriptEslintParser,

			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {

			/**
			 * ts indent 用
			 */
			'@stylistic/ts': stylisticTs,
			/**
			 * eslint-plugin-react
			 * react 用 lint
			 */
			react: reactPlugin
			// "sort-keys-custom-order": sortKeysCustomOrder    // sortKeysCustomOrder.configs["flat/recommended"], があればいらない
		},
		rules: {

			// /**
			//  * tab でインデント
			//  */
			// "indent": ["error", "tab", {
			// 	"ArrayExpression": 1,
			// 	"flatTernaryExpressions": true,
			// 	"FunctionExpression": { "parameters": 1 },
			// 	"MemberExpression": 1,
			// 	"ObjectExpression": 1,
			// 	"SwitchCase": 1
			// }],
			"@stylistic/ts/indent": ["warn", "tab", {
				"ArrayExpression": 1,
				"flatTernaryExpressions": true,
				"FunctionExpression": { "parameters": 1 },
				"MemberExpression": 1,
				"ObjectExpression": 1,
				"SwitchCase": 1
			}],
			 
			"@typescript-eslint/consistent-type-imports": [
				"warn",
				{
					prefer: "type-imports",
				},
			],

			/**
			 * 
			 */
			"@typescript-eslint/no-unused-expressions": "off",

			/**
			 * TypeScriptで型定義にno-unused-varsのエラーが出ないようにする.
			 */
			"@typescript-eslint/no-unused-vars": ["warn"],

			"import/no-dynamic-require": "warn",

			"import/no-nodejs-modules": "warn",

			/**
			 * react 用の recommended
			 */
			// ...reactPlugin.configs.flat.recommended.rules,

			/**
			 * import を自動ソート
			 * hiroki. "ESlint で import を自動ソートする". Zenn より
			 */
			"import/order": [
				"warn",
				{
					alphabetize: {
						order: "asc",
					},
					groups: [
						"builtin",
						"external",
						"parent",
						"sibling",
						"index",
						"object",
						"type",
					],
					"newlines-between": "always",
					pathGroups: [
						{
							group: "builtin",
							pattern: "{react,react-dom/**,react-router-dom}",
							position: "before",
						},
						{
							group: "parent",
							pattern: "@src/**",
							position: "before",
						},
					],
					pathGroupsExcludedImportTypes: ["builtin"],
				},
			],

			/**
			 * eslint-plugin-react
			 * props の sort
			 */
			"react/jsx-sort-props": "warn",

			// "sort-imports": ["error"],
			// "sort-keys": ["warn", "asc"]
		},
		settings: {
			/**
			 * 'eslint-plugin-import' を使うと ファイルのresolveが失敗することがある。
			 * その防止
			 * 以下をインストールして
			 * $ pnpm install -D eslint-import-resolver-typescript
			 */
			"import/resolver": {
				typescript: {},
			},

			/**
			 * eslint-plugin-react
			 * 'Warning: React version not specified in eslint-plugin-react settings.'
			 * を防ぐ
			 */
			react: {
				version: "detect",
			},
		},
	},

	/**
	 * recommended たち
	 * もし rule だけを適用させたい場合、ここではなく
	 * plugins に書いたうえで
	 * rules: {...XXX.configs.recommended.rules} 等を追加する
	 */
	...configs.recommended,
	importPlugin.flatConfigs.recommended,
	jsPlugin.configs.recommended,
	sortKeysCustomOrder.configs["flat/recommended"],
];
