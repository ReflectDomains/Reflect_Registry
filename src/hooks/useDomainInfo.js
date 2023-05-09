import { useContractRead } from 'wagmi';
import { useMemo } from 'react';
import { NameWrapper } from '../config/ABI';
import { NameWrapperContract } from '../config/contract';
import { ensHashName } from '../utils';
import moment from 'moment';

const useDomainInfo = (name) => {
	const { data: ensData } = useContractRead({
		abi: NameWrapper,
		address: NameWrapperContract,
		functionName: 'getData',
		args: [ensHashName(name)],
	});

	const expiryNumber = useMemo(
		() => ensData?.expiry?.toString() ?? 0,
		[ensData]
	);

	const expiration = useMemo(
		() =>
			!Number(expiryNumber)
				? '0'
				: moment(expiryNumber * 1000).format('YYYY-MM-DD HH:mm'),
		[expiryNumber]
	);

	const days = useMemo(
		() =>
			!Number(expiryNumber)
				? '0'
				: moment(expiryNumber * 1000).diff(moment(), 'days'),
		[expiryNumber]
	);

	return { expiration, days };
};

export default useDomainInfo;
