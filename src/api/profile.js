import http from '../utils/http';

export const getProfile = async (data) => {
	const res = await http({
		url: '/api/v1/account/profile',
		params: data,
		method: 'get',
	});
	return res;
};

export const setProfile = async (data) => {
	const res = await http({
		url: '/api/v1/account/profile',
		data: data,
		method: 'post',
	});
	return res;
};

export const getAvatar = async (data) => {
	const res = await http({
		url: '/api/v1/upload/getPreSign',
		params: data,
		method: 'get',
	});
	return res;
};

export const getUploadOSSUrl = async (data) => {
	const res = await http({
		url: '/api/v1/upload/putPreSign',
		data: data,
		method: 'post',
	});
	return res;
};

export const uploadAvatar = async ({ url, file }) => {
	console.log(file, 'file', url);
	const res = await http({
		url,
		data: file,
		method: 'put',
		contentType: file.type,
		withCredentials: false,
		auth: false,
	});
	return res;
};
