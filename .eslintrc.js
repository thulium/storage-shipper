module.exports = {
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:jest/all",
        "standard-with-typescript"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": [
            "./tsconfig.json"
        ]
    },
    "plugins": [
        "jest"
    ],
    "rules": {
        "jest/prefer-expect-assertions": 0
    }
}
