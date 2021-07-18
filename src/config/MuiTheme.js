import { createMuiTheme } from '@material-ui/core/styles'
import Colors from './../constants/Colors';

const THEME = createMuiTheme({
	palette: {
		primary: {
			main: Colors.tomato,
		},
		type: 'dark',
	},
	// overrides: {
	// 	MuiFormLabel: {
	// 		root: {
	// 			'&$focused': {
	// 				color: Colors.tomato,
	// 				fontWeight: 'bold'
	// 			}
	// 		}, 
	// 	  	focused: {}
	// 	},
	// 	MuiTextField: {
	// 		root: {
	// 			'& .MuiInput-underline:after': {
	// 				borderBottomColor: 'tomato',
	// 			},
	// 			'& .MuiFilledInput-underline:after': {
	// 				borderBottomColor: 'tomato',
	// 			},
	// 			'& .MuiOutlinedInput-root': {
	// 				'& fieldset': {
	// 					borderColor: 'white',
	// 				},
	// 				'&:hover fieldset': {
	// 					borderColor: 'white',
	// 				},
	// 				'&.Mui-focused fieldset': {
	// 					borderColor: 'tomato',
	// 				},
	// 			},
	// 		}
	// 	}
    // }
});

export default THEME