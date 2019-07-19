module.exports = {
  presets: [
    '@vue/app',
    ['env',      //添加 babel-preset-env 配置 
      {
        'modules': false
      }
    ]
  ],
  plugins: [        // Mint-ui官方教程   babel-plugin-component
    [
      'component',
      {
        'libraryName': 'mint-ui',
        "style": true
      }
    ]
  ]
}