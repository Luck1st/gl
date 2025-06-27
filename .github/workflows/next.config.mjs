const isProd = process.env.NODE_ENV === 'production';

export default {
  output: 'export',
  basePath: isProd ? '/lakshmiresume' : '',
  assetPrefix: isProd ? 'https://Luck1st.github.io/lakshmiresume/' : '',
};

