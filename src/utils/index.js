import { ethers } from 'ethers';
import moment from 'moment';

export const zeroAddress = '0x0000000000000000000000000000000000000000';

export const splitAddress = (address, start = 5, end = -4) => {
	return (
		(address && address.slice(0, start) + '...' + address.slice(end)) || ''
	);
};

export const ensHashName = (name = '') =>
	(name && ethers.utils.namehash(name)) || '';

export const parseUnitsWithDecimals = (n, dec = '') =>
	ethers.utils.parseUnits((n || '').toString(), dec);

export const pricingHash = function (name, token) {
	if (!name) return '';
	const node = ensHashName(name);
	const hash = ethers.utils.keccak256(
		ethers.utils.solidityPack(['bytes32', 'address'], [node, token])
	);

	return ethers.utils.hexlify(hash);
};

export const formatUnitsWitheDecimals = (n, dec) =>
	ethers.utils.formatUnits(n, dec);

export const splitEth = (name) => name?.split('.eth')[0];

export const throttle = (fn, delay) => {
	let throttleTimer = null;
	return function () {
		if (throttleTimer) return;
		throttleTimer = setTimeout(() => {
			fn.apply(this, arguments);
			throttleTimer = null;
		}, delay);
	};
};

export const debounce = (fn, delay) => {
	let debounceTimer = null;
	return function () {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			fn.apply(this, arguments);
			debounceTimer = null;
		}, delay);
	};
};

export const getExpiry = (expiryDate) => {
	const expiryDateFormat = moment(expiryDate).format('YYYY-MM-DD HH:mm');
	const diffDays = moment(expiryDate).diff(moment(), 'days');
	return `${expiryDateFormat} (${diffDays}) days`;
};
