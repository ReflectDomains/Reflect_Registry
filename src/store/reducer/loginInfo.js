const initialLoginState = {
	token: null,
	preAccount: '',
	avatar: '',
	medium: '',
	telegram: '',
	discord: '',
	twitter: '',
	slogan: '',
};

const LoginReducer = (state = initialLoginState, action) => {
	switch (action.type) {
		case 'SET_TOKEN':
			return { ...state, token: action.value };
		case 'SET_PRE_ACCOUNT': {
			return { ...state, preAccount: action.value };
		}
		case 'SET_PROFILE': {
			return { ...state, ...action.value };
		}
		case 'LOGOUT':
			return { ...initialLoginState };
		default:
			return state;
	}
};

export default LoginReducer;
