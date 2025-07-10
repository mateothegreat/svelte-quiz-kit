// import svelte from "eslint-plugin-svelte";
// import { defineConfig } from "eslint/config";
// import tseslint from "typescript-eslint";
// import svelteConfig from "./svelte.config.ts";

// // export default defineConfig([
// //   { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
// //   { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },

// // ]);
// import typescript from "@typescript-eslint/eslint-plugin";
// import betterTailwindcss from "eslint-plugin-better-tailwindcss";

// /** @type {import('eslint').Linter.Config[]} */
// export default defineConfig([
//   tseslint.configs.recommended,
//   ...svelte.configs.recommended,
//   {
//     processor: svelte.processors.svelte,
//     files: ["**/*.{svelte}"],
//     plugins: {
//       "better-tailwindcss": betterTailwindcss,
//       "@typescript-eslint": typescript,
//       /**
//        * https://github.com/sveltejs/eslint-plugin-svelte
//        */
//       svelte: svelte.configs.recommended
//     },
//     languageOptions: {
//       parser: svelte.parser,
//       parserOptions: {
//         // ecmaVersion: 2022,
//         // sourceType: "module",
//         // extraFileExtensions: [".ts", ".svelte", ".svelte.ts"]
//         svelteConfig
//       }
//     }
//   },
//   {
//     rules: {
//       // https://github.com/schoero/eslint-plugin-better-tailwindcss/tree/main/docs/rules
//       "better-tailwindcss/enforce-consistent-line-wrapping": [
//         "error",
//         {
//           group: "newLine"
//           // preferSingleLine: true,
//           // printWidth: 80
//         }
//       ],
//       "better-tailwindcss/enforce-consistent-variable-syntax": [
//         "error",
//         {
//           syntax: "arbitrary"
//         }
//       ],
//       "better-tailwindcss/no-duplicate-classes": "error",
//       "better-tailwindcss/no-restricted-classes": [
//         "error",
//         {
//           restrict: [
//             {
//               fix: "$1$2-success$3",
//               message: "Restricted class: Use '$1$2-success$3' instead.",
//               pattern: "^([a-zA-Z0-9:/_-]*:)?(text|bg)-green-500(\\/[0-9]{1,3})?$"
//             }
//           ]
//         }
//       ],
//       "better-tailwindcss/no-unnecessary-whitespace": "error",
//       "better-tailwindcss/no-unregistered-classes": [
//         "error",
//         {
//           detectComponentClasses: true
//         }
//       ],
//       "better-tailwindcss/enforce-consistent-class-order": [
//         "error",
//         {
//           order: "asc"
//         }
//       ]
//     }
//   }
//   // {
//   //   files: ["**/*.svelte"],
//   //   languageOptions: {
//   //     parser: svelteParser,
//   //     parserOptions: {
//   //       parser: typescriptParser,
//   //       extraFileExtensions: [".svelte"]
//   //     }
//   //   },
//   //   processor: svelte.processors.svelte
//   // },
//   // {
//   //   files: ["**/*.ts"],
//   //   rules: {
//   //     "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
//   //     "@typescript-eslint/explicit-function-return-type": "off",
//   //     "@typescript-eslint/explicit-module-boundary-types": "off"
//   //   }
//   // }
// ]);
// eslint.config.js
// import js from "@eslint/js";
// import svelte from "eslint-plugin-svelte";
// import globals from "globals";
// import svelteConfig from "./svelte.config.ts";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   js.configs.recommended,
//   ...svelte.configs.recommended,
//   {
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         ...globals.node // Add this if you are using SvelteKit in non-SPA mode
//       }
//     }
//   },
//   {
//     files: ["**/*.svelte", "**/*.svelte.js"],
//     languageOptions: {
//       parserOptions: {
//         // We recommend importing and specifying svelte.config.js.
//         // By doing so, some rules in eslint-plugin-svelte will automatically read the configuration and adjust their behavior accordingly.
//         // While certain Svelte settings may be statically loaded from svelte.config.js even if you don’t specify it,
//         // explicitly specifying it ensures better compatibility and functionality.
//         svelteConfig
//       }
//     }
//   },
//   {
//     rules: {
//       // Override or add rule settings here, such as:
//       // 'svelte/rule-name': 'error'
//     }
//   }
// ];
// pnpm i -D globals
// import globals from "globals";

// import jsESLint from "@eslint/js";
// // import * as espree from "espree";
// import tsESLintParser from "@typescript-eslint/parser";
// import tsESLint from "typescript-eslint";
// // TODO: I wasn't able to get the parser for extra files working, but maybe we don't need it?
// // import * as tsESLintExtraParser from 'typescript-eslint-parser-for-extra-files';
// // TODO: Turn on JSDoc, but not yet. Warning volume is already overwhelming.
// // import jsdoc from 'eslint-plugin-jsdoc';
// import markdown from "eslint-plugin-markdown";
// import eslintPluginSvelte from "eslint-plugin-svelte";
// import svelteESLintParser from "svelte-eslint-parser";

// const ignores = [
//   // "./eslint.config.js"
//   ".DS_Store",
//   "node_modules/**/*",
//   "build/**/*",
//   ".svelte-kit/**/*",
//   "package/**/*",
//   ".env",
//   ".env.*",
//   // Ignore files for PNPM, NPM and YARN
//   "pnpm-lock.yaml",
//   "package-lock.json",
//   "yarn.lock",
//   // On CI our PNPM store is local to the application source
//   ".pnpm-store/**/*",
//   "src/paraglide/**/*"
// ];
// export default tsESLint.config(
//   jsESLint.configs.recommended, // Recommended config applied to all files
//   ...tsESLint.configs.recommended,

//   // jsdoc.configs['flat/recommended'],
//   ...markdown.configs.recommended,
//   // flat/prettier: Turns off rules that may conflict with Prettier.
//   // Prettier is run separately, not through ESLint.
//   ...eslintPluginSvelte.configs["flat/prettier"],

//   {
//     ignores
//     // plugins: {
//     // 	tsESLint,
//     // },
//   },
//   {
//     languageOptions: {
//       ecmaVersion: "latest",
//       globals: {
//         $bindable: "readonly",
//         ...globals.browser,
//         ...globals.node,
//         ...globals.es6
//       }
//     }
//   },
//   // {
//   // 	files: ['**/*.js'],
//   // ...ignores,
//   // 	plugins: {
//   // 		jsdoc,
//   // 	},
//   // 	rules: {
//   // 		'jsdoc/require-description': 'warn'
//   // 	}
//   // },

//   // Configure typescript-eslint-parser for typescript
//   {
//     files: ["*.ts", "*.tsx"],
//     ignores,
//     languageOptions: {
//       sourceType: "module",
//       parser: tsESLintParser,
//       // parser: tsESLintExtraParser,
//       parserOptions: {
//         project: "./tsconfig.json"
//       }
//     }
//   },

//   // Configure svelte-eslint-parser with typescript-eslint-parser
//   // 	for the non-svelte parts
//   {
//     files: ["*.svelte"],
//     ignores,
//     languageOptions: {
//       parser: svelteESLintParser,
//       parserOptions: {
//         // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
//         parser: tsESLintParser,
//         extraFileExtensions: [".svelte"], // This is a required setting in `@typescript-eslint/parser` v4.24.0.
//         // parser: {
//         // 	ts: tsESLintExtraParser,
//         // 	js: espree,
//         // },
//         project: "./tsconfig.json"
//       }
//     }
//   }
// );
