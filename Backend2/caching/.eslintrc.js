module.exports = {
    parser: "@typescript-eslint/parser", // Garante que o ESLint entenda TypeScript
    env: {
        // Ambientes onde o código será executado
        browser: true,
        es2021: true,
        node: true,
    },
    plugins: ["react", "prettier", "@typescript-eslint"], // Plugins que serão utilizados
    extends: [
        // Configurações que serão utilizadas
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    overrides: [],
    parserOptions: {// Configurações do parser, no caso o TypeScript
        ecmaVersion: "latest",
        sourceType: "module",
    },
    settings: { // Configurações do projeto
        // react: {
        //     version: "detect",
        // }, Se fosse um projeto React
    },
    ignorePatterns: ["node_modules/", "dist/"], // Pastas que serão ignoradas
    // Cherry of the Cake
    rules: { // Regras que serão aplicadas, aqui você pode adicionar ou remover regras, esse é interessante para personalizar o seu projeto
        "no-console": "error",
        //"react/no-unknown-property": ["error", { ignore: ["jsx", "global"] }], // Se fosse um projeto React
    },
};

//Linter serve para padronizar o código, para que todos os desenvolvedores sigam o mesmo padrão de código.
//O ESLint é um linter para JavaScript e TypeScript que identifica e reporta padrões no código.
