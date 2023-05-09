const CracoLessPlugin = require('craco-less');

module.exports = {
	webpack: {
		configure: (config, { env, paths }) => {
			config.module.rules.push({
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			});
			return config;
		},
		// resolve: {
		//   alias: {
		//     "@material-ui/styled-engine": "@material-ui/styled-engine-sc",
		//   },
		// },
	},
	plugins: [{ plugin: CracoLessPlugin }],
	devServer: {
		proxy: {
			'/api': {
				target: 'http://107.148.33.51:8080',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/',
				},
			},
		},
	},
};
