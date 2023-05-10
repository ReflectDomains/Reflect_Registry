import { useMemo, useState } from 'react';
import { useContractReads, erc20ABI, useAccount } from 'wagmi';
import { reflectContract } from '../config/contract';

const useApprove = (tokenAddress = [], spenderAddress = reflectContract) => {
	const { address } = useAccount();
	const [isApprove, setIsApprove] = useState(false);
	const [readLoading, setReadLoading] = useState(true);

	const contracts = useMemo(() => {
		return tokenAddress.map((item) => {
			return {
				address: item,
				abi: erc20ABI,
				functionName: 'allowance',
				args: [address, spenderAddress],
			};
		});
	}, [tokenAddress, spenderAddress, address]);

	useContractReads({
		contracts: [...contracts],
		enabled: tokenAddress.length > 0,
		onSuccess: (data) => {
			const res = data[0]?.toString();
			setIsApprove(res > 0);
		},
		onSettled: () => {
			setReadLoading(false);
		},
	});

	return {
		isApprove,
		setIsApprove,
		readLoading,
	};
};

export default useApprove;
