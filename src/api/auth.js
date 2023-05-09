import http from '../utils/http';

export const login = async (data) => {
	const res = await http({
		url: '/api/v1/login',
		data: {
			...data,
			source: 'ens-tool',
		},
		method: 'post',
	});
	return res;
};

export const logout = async (data) => {
	const res = await http({
		url: '/api/v1/ping',
		params: {
			...data,
		},
		method: 'get',
	});
	return res;
};
