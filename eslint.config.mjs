import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import pluginVue from 'eslint-plugin-vue';
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: [
      'dist',
      '.yarn',
      'node_modules',
      '.pnp*',
    ],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...compat.extends("plugin:vue-pug/vue3-recommended"),
  {
    rules: {
      semi: ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "space-in-parens": ["error", "never"],
      indent: ["warn", 2],
      "no-trailing-spaces": ["warn"],
      "padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: ["export", "import"], next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
      ],
      "space-before-function-paren": ["error", {
        anonymous: "never",
        named: "never",
        asyncArrow: "always",
      }],
      "no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],
      "comma-dangle": [
        "error",
        "always-multiline",
      ],
      "vue/html-closing-bracket-newline": ["off"],
      "vue/no-this-in-before-route-enter": ["error"],
      "vue/no-unused-components": ["warn"],
      "vue/max-attributes-per-line": ["warn", {
        singleline: {
          max: 4,
        },
        // "multiline": {
        //   'max': 1,
        //   'allowFirstLine': true,
        // },
      }],
    },
  },
];