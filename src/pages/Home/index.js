import { Stack, Typography, styled } from '@mui/material';
import PopularDomainCard from './PopularDomainCard';
import avatar from '../../assets/images/avatar.png';
import SearchInput from '../../components/SearchInput';

const Title = styled(Typography)(() => ({
	fontSize: '36px',
	fontWeight: 800,
	textAlign: 'center',
	marginTop: '20vh',
}));

const PopularDomainsText = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	fontSize: '28px',
	fontWeight: 800,
	marginTop: theme.spacing(14),
}));

const Home = () => {
	return (
		<>
			<Title>One click to launch your own Top Level Domain.</Title>

			<SearchInput />

			<PopularDomainsText>🔥 Recommended TLDs</PopularDomainsText>

			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				mt={5}
			>
				<PopularDomainCard avatar={avatar} name=".key" cup={'🥇'} />
				<PopularDomainCard avatar={avatar} name=".uni" cup={'🥈'} />
				<PopularDomainCard avatar={avatar} name=".bit" cup={'🥉'} />
				<PopularDomainCard avatar={avatar} name=".eth" />
			</Stack>
		</>
	);
};

export default Home;
