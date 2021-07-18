import { createMuiTheme } from '@material-ui/core/styles'
import Colors from './../constants/Colors';

const THEME = createMuiTheme({
	palette: {
		primary: {
			main: Colors.darkMode,
		},
		type: 'dark'
	},
	overrides: {
		MuiFormLabel: {
			root: {
				'&$focused': {
					color: Colors.tomato,
					fontWeight: 'bold'
				}
			}, 
		  	focused: {}
		},
		MuiTextField: {
			root: {
				'& .MuiInput-underline:after': {
					borderBottomColor: Colors.tomato,
				},
				'& .MuiFilledInput-underline:after': {
					borderBottomColor: Colors.tomato,
				},
				'& .MuiOutlinedInput-root': {
					'& fieldset': {
						borderColor: Colors.white,
					},
					'&:hover fieldset': {
						borderColor: Colors.white,
					},
					'&.Mui-focused fieldset': {
						borderColor: Colors.tomato,
					},
				},
			}
		}
    }
});

export default THEME