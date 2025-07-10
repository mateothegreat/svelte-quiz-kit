import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import svelteParser from "svelte-eslint-parser";
import tseslint from "typescript-eslint";

/** @type { import('eslint').Linter.FlatConfig[] } */
const config = [
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2017,
        ...globals.node
      }
    }
  },
  // {
  //   files: ["**/*.js", "**/*.ts"],
  //   ...js.configs.recommended
  // },
  {
    files: ["./src/**/*.svelte"],
    plugins: {
      svelte
    },
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tseslint.parser
      }
    },
    rules: {
      ...svelte.configs.recommended.rules
    }
  },
  // },
  //     ...[...tseslint.configs.strict, ...tseslint.configs.stylistic].map((conf) => ({
  //   ...conf,
  //   files: ["./src/**/*.svelte"],
  //   languageOptions: {
  //     parserOptions: {
  //       extraFileExtensions: [".svelte"]
  //     }
  //   }
  // },
  {
    plugins: {
      "better-tailwindcss": betterTailwindcss
    },
    rules: {
      // https://github.com/schoero/eslint-plugin-better-tailwindcss/tree/main/docs/rules
      "better-tailwindcss/enforce-consistent-line-wrapping": [
        "error",
        {
          group: "newLine"
          // preferSingleLine: true,
          // printWidth: 80
        }
      ],
      "better-tailwindcss/enforce-consistent-variable-syntax": [
        "error",
        {
          syntax: "arbitrary"
        }
      ],
      "better-tailwindcss/no-duplicate-classes": "error",
      "better-tailwindcss/no-restricted-classes": [
        "error",
        {
          restrict: [
            {
              fix: "$1$2-success$3",
              message: "Restricted class: Use '$1$2-success$3' instead.",
              pattern: "^([a-zA-Z0-9:/_-]*:)?(text|bg)-green-500(\\/[0-9]{1,3})?$"
            }
          ]
        }
      ],
      "better-tailwindcss/no-unnecessary-whitespace": "error",
      "better-tailwindcss/no-unregistered-classes": [
        "error",
        {
          detectComponentClasses: true
        }
      ],
      "better-tailwindcss/enforce-consistent-class-order": [
        "error",
        {
          order: "asc"
        }
      ]
    }
  }
];
// ...[...tseslint.configs.strict, ...tseslint.configs.stylistic].map((conf) => ({
//   ...conf,
//   files: ["**/*.ts"]
// })),
// {
//   files: ["**/*.yaml", "**/*.yml"],
//   plugins: {
//     yml
//   },
//   languageOptions: {
//     parser: yamlParser
//   },
//   rules: {
//     ...yml.configs.standard.rules,
//     "yml/quotes": ["error", { prefer: "single" }]
//   }
// },
// prettier

export default config;
