import { useCallback, useMemo } from 'react';
import { subdomainABI } from '../config/ABI';
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
		abi: ABIJSON || subdomainABI,
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

	const { isLoading: waitingLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
		onSuccess() {
			console.log('success');
			successFn();
		},
		onError() {
			errorFn();
		},
		onSettled() {
			console.log('test');
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
