import globals from "globals";
import stylisticsJs from "@stylistic/eslint-plugin-js"
import { plugin } from "mongoose";

export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
  {
    plugins: {
      '@stylistic/js': stylisticsJs
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
    }
  },
  {ignores: ["dist/*"]}
];