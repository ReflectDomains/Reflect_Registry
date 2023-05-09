import { useCallback, useEffect, useRef } from 'react';

const useThrottle = (fn, delay) => {
	const { current } = useRef({ fn, timer: null });
	useEffect(
		function () {
			current.fn = fn;
		},
		[fn, current]
	);

	return useCallback(
		(...args) => {
			if (!current.timer) {
				current.timer = setTimeout(() => {
					delete current.timer;
				}, delay);
				current.fn(...args);
			}
		},
		[delay, current]
	);
};

export default useThrottle;
