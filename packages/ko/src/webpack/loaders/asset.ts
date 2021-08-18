const assetModules = [
  {
    test: /\.(woff|woff2|ttf|eot)$/,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[hash][ext][query]',
    },
  },
  {
    test: /\.(png|jpg|jpeg|gif|webp|svg)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'images/[hash][ext][query]',
    },
  },
]

export default assetModules;