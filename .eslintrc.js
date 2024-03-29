module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser"
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    // add your custom rules here
    rules: {
        // vue specific config
        "vue/no-unused-vars": "off",
        "vue/order-in-components": "off",
        "vue/html-closing-bracket-newline": "off",
        "vue/html-indent": [
            "error",
            4
        ],
        "vue/singleline-html-element-content-newline": "off",
        "vue/max-attributes-per-line": [
            "error",
            {
                "singleline": {
                    "max": 3
                },
                "multiline": {
                    "max": 1
                }
            }
        ],
        "vue/multi-word-component-names": "off",

        // typescript specific config
        "@typescript-eslint/no-unused-vars": "off",

        // general eslint config
        "array-element-newline": [
            "error",
            {
                multiline: true,
                minItems: 2
            }
        ],
        "array-bracket-newline": [
            "error",
            "consistent"
        ],
        "arrow-parens": [
            "error",
            "always"
        ],
        "curly": "off",
        "comma-dangle": [
            "error",
            "never"
        ],
        "indent": [
            "error",
            4,
            {
                SwitchCase: 1
            }
        ],
        "import/order": "off",
        "no-array-constructor": "off",
        "no-console": "off",
        "no-undef": "off",
        "no-unused-vars": "off",
        "object-shorthand": "off",
        "prefer-promise-reject-errors": "off",
        "quotes": [
            "error",
            "double"
        ],
        "quote-props": "off",
        "semi": [
            "error",
            "always"
        ],
        "semi-spacing": "error",
        "semi-style": [
            "error",
            "last"
        ],
        "space-before-function-paren": "off"
    }
};
