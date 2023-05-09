import { useCallback, useMemo } from 'react';
import {
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
	erc20ABI,
} from 'wagmi';
import { registerContract } from '../config/contract';

const num =
	'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

const useWriteApprove = ({
	tokenAddress = '',
	spenderAddress = registerContract,
	onSuccess,
}) => {
	const { config } = usePrepareContractWrite({
		address: tokenAddress,
		abi: erc20ABI,
		functionName: 'approve',
		args: [spenderAddress, num],
		onError: (error) => {
			console.log(error, 'approve', [spenderAddress, num]);
		},
	});
	const { isLoading, data, write } = useContractWrite(config);

	const { isLoading: waitingLoading } = useWaitForTransaction({
		hash: data?.hash,
		onSuccess: () => {
			onSuccess && onSuccess();
		},
	});

	const loadingContract = useMemo(
		() => isLoading || waitingLoading,
		[isLoading, waitingLoading]
	);

	const approve = useCallback(() => {
		write?.();
	}, [write]);

	return {
		approve,
		loading: loadingContract,
	};
};

export default useWriteApprove;
