module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react", "react-hooks", "eslint-plugin-import", "prettier"],
    env: {
        browser: true,
        jest: true
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended"
    ],
    parserOptions: {
        project: ["tsconfig.json"],
        tsconfigRootDir: __dirname,
        ecmaVersion: 2019,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        "@typescript-eslint/explicit-function-return-type": "error",
        "react/jsx-filename-extension": ["error", {extensions: [".tsx"]}],
        "react/prop-types": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "no-console": "off",
        camelcase: "off",
        "spaced-comment": ["error", "always", {exceptions: ["-", "+"]}],
        "@typescript-eslint/camelcase": ["off"]
    },
    settings: {
        react: {
            version: "detect"
        }
    }
};
