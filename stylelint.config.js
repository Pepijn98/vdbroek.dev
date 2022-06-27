module.exports = {
    // add your custom config here
    // https://stylelint.io/user-guide/configuration
    processors: ["stylelint-processor-html"],
    extends: "stylelint-config-recommended-scss",
    rules: {
        "indentation": [4, { baseIndentLevel: 4 }],
        "no-empty-source": null,
        "no-descending-specificity": null,
        "font-family-no-missing-generic-family-keyword": null,
        "no-duplicate-selectors": null,
        "property-no-unknown": null
    }
};
