const { createTheme } = require('@mui/material');

// font-size
let theme = createTheme({
	color: {
		success: '#41BF82',
		main: '#2A13AE',
		error: '#D85C4B',
		backColor: '#F2F4F5',
		mentionColor: '#999',
		text: '#333',
		disabled: '#0000001A',
	},
	palette: {
		primary: {
			main: '#2A13AE',
			contrastText: '#FFFFFFE5',
			hover: '#2A13EA',
			active: '#2A1372',
			disabled:
				'linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), #2A13AE',
		},
		secondary: {
			main: '#F2F4F5',
			contrastText: '#333333',
			hover: '#E2E2E2',
		},
		black: {
			main: '#333',
			contrastText: '#fff',
			hover: '#000',
			disabled: '#666666',
		},
	},
	spacing: 10,
	typography: {
		fontFamily: ['Inter'].join(','),
		fontSize: 16,
		caption: {
			color: '#333',
			fontWeight: 500,
		},
		subtitle1: {
			color: '#666',
		},
		body1: {
			fontWeight: 500,
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 800,
			lg: 1200,
			xl: 1536,
		},
	},
});

theme = createTheme(theme, {
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				color: '#333',
				fontWeight: 500,
			},
		},
		MuiButton: {
			styleOverrides: {
				root: ({ ownerState, theme }) => ({
					minWidth: '120px',
					height: '44px',
					background: '#FFF',
					color: theme.palette.secondary.contrastText,
					fontSize: theme.typography.fontSize,
					fontWeight: 800,
					borderRadius: theme.spacing(1),
					textTransform: 'initial',
					boxShadow: 'unset',
					':hover': {
						backgroundColor: theme.palette.secondary.hover,
						boxShadow: 'unset',
					},
					...(ownerState.shape === 'round' && {
						minWidth: '180px',
						borderRadius: '50px',
					}),
					...(ownerState.color === 'black' && {
						backgroundColor: theme.palette.black.main,
						color: theme.palette.black.contrastText,
						':hover': {
							backgroundColor: theme.palette.black.hover,
							color: theme.palette.black.contrastText,
						},
						'&.Mui-disabled': {
							color: theme.palette.black.contrastText,
							background: theme.palette.black.disabled,
						},
					}),
				}),
				contained: ({ theme }) => ({
					background: theme.palette.primary.main,
					color: theme.palette.primary.contrastText,
					':hover': {
						backgroundColor: theme.palette.primary.hover,
					},
					':active': {
						backgroundColor: theme.palette.primary.active,
					},
					'&.Mui-disabled': {
						color: theme.palette.primary.contrastText,
						background: theme.palette.primary.disabled,
					},
				}),
				outlined: ({ theme, ownerState }) => ({
					color: theme.palette.primary.main,
					':hover': {
						backgroundColor: '#fff',
						borderRadius: theme.palette.primary.hover,
						color: theme.palette.primary.hover,
					},
					...(ownerState.color === 'grey' && {
						color: theme.palette.black.main,
						borderColor: 'rgba(0, 0, 0, 0.1);',
					}),
				}),
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: theme.spacing(1),
					boxShadow: '0px 4px 34px -8px rgba(39, 23, 132, 0.2)',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {},
			},
		},
		MuiList: {
			styleOverrides: {
				root: {
					display: 'grid',
					gap: '10px',
					padding: theme.spacing(1),
				},
			},
		},
		MuiListItem: {
			styleOverrides: {
				root: ({ theme }) => ({
					padding: theme.spacing(1, 2),
					borderRadius: theme.spacing(1),
					fontSize: theme.typography.fontSize,
					transition: 'all 0.25s',
					':hover': {
						backgroundColor: theme.color.backColor,
					},
				}),
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					minWidth: 'unset',
				},
			},
		},
		MuiMenu: {
			styleOverrides: {
				root: {
					padding: theme.spacing(1),
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					minWidth: 'unset',
					padding: theme.spacing(1),
					borderRadius: theme.spacing(1),
					fontSize: theme.typography.fontSize,
					transition: 'all 0.25s',
					':hover': {
						backgroundColor: theme.color.backColor,
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontSize: theme.typography.fontSize,
					color: theme.typography.caption.color,
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				root: ({ ownerState, theme }) => ({
					minWidth: '320px',
					height: '44px',
					border: '1px solid #00000033',
					borderRadius: theme.spacing(1),
					padding: theme.spacing(1),
					transition: 'border-width .1s',
					'&.Mui-focused': {
						border: '2px solid #2A13AE66',
					},
					':hover': {
						borderWidth: '2px',
					},
					...(ownerState.variant === 'filled' && {
						backgroundColor: theme.palette.secondary.main,
						border: '1px solid transparent',
						transition: 'border-width .1s',
						...theme.typography.caption,
						'&:hover': {
							border: '1px solid #0000001A',
						},
						'&.Mui-focused': {
							border: '1px solid #0000001A',
						},
						'&::placeholder': {
							fontSize: '16px',
							fontWeight: 500,
							color: theme.color.mentionColor,
						},
					}),
				}),
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					width: '350px',
					'& .MuiOutlinedInput-root': {
						padding: theme.spacing(1),
						paddingBottom: theme.spacing(3.5),
						fieldset: {
							transition: 'border-width .1s',
							borderRadius: theme.spacing(1),
						},
						':hover fieldset': {
							border: '2px solid #00000033',
						},
						'&.Mui-focused fieldset': {
							borderColor: '#2A13AE66',
						},
					},
					input: {
						padding: 0,
					},
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					textTransform: 'unset',
				},
			},
		},
		MuiAccordion: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderTop: '0px',
					boxShadow: 'unset',
					'&:before': {
						height: '0px',
					},
					'&.Mui-expanded': {
						margin: 'unset',
						marginTop: '10px',
					},
					'&:hover': {},
				}),
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: ({ theme }) => ({
					height: '60px',
					padding: theme.spacing(0, 2),
					minHeight: 'unset',
					borderRadius: theme.spacing(1),
					'&:hover': {
						backgroundColor: theme.palette.secondary.main,
					},
					'&.Mui-expanded': {
						minHeight: 'unset',
						backgroundColor: theme.palette.secondary.main,
						borderRadius: theme.spacing(1, 1, 0, 0),
					},
					'& .MuiAccordionSummary-content': {
						margin: 0,
						'&.Mui-expanded': {
							margin: 0,
						},
					},
				}),
			},
		},
		MuiAccordionDetails: {
			styleOverrides: {
				root: ({ theme }) => ({
					padding: theme.spacing(0, 2, 2),
					backgroundColor: theme.palette.secondary.main,
					borderRadius: theme.spacing(0, 0, 1, 1),
					'&.Mui-expanded': {
						transition: 'unset',
					},
				}),
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					fontSize: '16px',
					color: '#333',
					fontWeight: 500,
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				root: ({ theme }) => ({
					height: '40px',
				}),
			},
		},
	},
});

export default theme;
