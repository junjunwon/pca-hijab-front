module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@vue/babel-plugin-jsx' // JSX 안 쓰면 이거 빼도 됨
  ]
};
