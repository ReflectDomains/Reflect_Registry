import { useCallback, useEffect, useMemo } from 'react';
import { registerABI } from '../config/ABI';
import {
	useAccount,
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
} from 'wagmi';
import { registerContract } from '../config/contract';

const useWriteContract = ({
	functionName,
	args = [],
	enabled = true,
	onSuccess,
	onError,
	onSetteled,
	contractAddress = '',
	ABIJSON = null,
	setTxHash,
}) => {
	const { address } = useAccount();
	const successFn = useCallback(() => {
		console.log('success');
		onSuccess && typeof onSuccess === 'function' && onSuccess();
	}, [onSuccess]);

	const errorFn = useCallback(() => {
		onError && typeof onError === 'function' && onError();
	}, [onError]);

	const settledFn = useCallback(() => {
		onSetteled && typeof onSetteled === 'function' && onSetteled();
	}, [onSetteled]);

	const {
		config,
		isSuccess: prepareSuccess,
		refetch,
	} = usePrepareContractWrite({
		address: contractAddress || registerContract,
		abi: ABIJSON || registerABI,
		functionName: functionName,
		args: [...args],
		enabled: enabled && address,
		overrides: {
			from: address,
		},
		onError: (error) => {
			console.log([...args]);
			console.log(
				error?.error?.message || error?.error?.data?.message,
				functionName
			);
		},
	});
	const {
		isLoading,
		data,
		write,
		isSuccess: writeStartSuccess,
	} = useContractWrite(config);

	useEffect(() => {
		if (data && data.hash) {
			setTxHash?.(data.hash);
		}
	}, [data, setTxHash]);

	const { isLoading: waitingLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
		onSuccess() {
			successFn();
		},
		onError() {
			errorFn();
		},
		onSettled() {
			settledFn();
		},
	});

	const loadingContract = useMemo(
		() => isLoading || waitingLoading,
		[isLoading, waitingLoading]
	);

	return {
		isLoading: loadingContract,
		prepareSuccess,
		writeStartSuccess,
		write,
		isSuccess,
		txHash: data?.hash,
		refetch,
	};
};

export default useWriteContract;
