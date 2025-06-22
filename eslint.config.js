import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react"; // ✅ Added
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react, // ✅ Added
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules, // ✅ Added
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-undef": "error", // ✅ Ensures undefined components like <NotFound /> are caught
      "react/react-in-jsx-scope": "off", // ✅ Disable old rule (or let jsxRuntime handle it)
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: "detect",
        jsxRuntime: "automatic", // ✅ Tells ESLint to use the new JSX transform (React 17+)
      },
    },
  },
];
