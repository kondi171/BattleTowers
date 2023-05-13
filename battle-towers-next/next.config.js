/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig;
module.exports = {
  webpack: (config, { isServer }) => {
    config.module.rules.push(
      {
        test: /\.(wav)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/audio/',
              outputPath: `${isServer ? '../' : ''}static/audio/`,
              name: '[name].[ext]',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(mp3)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/audio/',
              outputPath: `${isServer ? '../' : ''}static/audio/`,
              name: '[name].[ext]',
              esModule: false,
            },
          },
        ],
      }
    );

    return config;
  },
};
