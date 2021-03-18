module.exports = {
    "env": {
        "amd": false,
        "node": true,
        "es2021": true,
        "es6": false,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "@typescript-eslint/no-var-requires": 0,
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        // "react/button-has-type": ["error", {reset: true, button: true, submit: true}],
        "react/boolean-prop-naming": ["error", {
            "propTypeNames": ["bool", "mutuallyExclusiveTrueProps"],
            "rule": "^(is|has)[A-Z]([A-Za-z0-9]?)+",
            "validateNested": true
        }]
    }
};
