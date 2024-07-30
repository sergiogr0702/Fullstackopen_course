import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "eslint.config.mjs",
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      "**/build/**",
    ],
    files: ["**/*.ts"], // Use a glob pattern to match all TypeScript files
    plugins: {
      ["@typescript-eslint"]: typescriptEslint,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsParser,
      ecmaVersion: 2020, // Update ECMAScript version
      sourceType: "module", // Change to 'module' for ES modules
      parserOptions: {
        project: "./tsconfig.json", // Ensure this path is correct
        createDefaultProgram: true, // Create default program for compatibility
      },
    },
    rules: {
      "@typescript-eslint/semi": ["error"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "no-case-declarations": "off",
    },
  },
];
