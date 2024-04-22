module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript'],
  rules: {
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    "@typescript-eslint/no-explicit-any": "off",
    "react/display-name": "off",
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
  },
};
