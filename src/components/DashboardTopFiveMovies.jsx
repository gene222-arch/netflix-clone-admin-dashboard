import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import { Avatar, Grid } from '@material-ui/core';
import Colors from './../constants/Colors';
import { useHistory } from 'react-router-dom';
import PATH from './../routes/path';
import { connect } from 'react-redux';
import BoxContentLoader from './content-loader/BoxContentLoader';
import { selectDashboard } from './../redux/modules/dashboard/selector';
import { createStructuredSelector } from 'reselect';
import TextContentLoader from './content-loader/TextContentLoader';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 500
	},
	subheader: {
		padding: theme.spacing(1.5)
	},
	listContainer: {
		backgroundColor: theme.palette.background.paper,
		borderRadius: '.5rem',
		padding: theme.spacing(1),
		boxShadow: theme.shadows[2]
	},
	avatar: {
		width: theme.spacing(3),
		height: theme.spacing(3),
		fontSize: '.9rem',
		fontWeight: 'bold',
		color: Colors.darkMode,
		backgroundColor: Colors.white 
	},
	headerContainer: {
		paddingLeft: theme.spacing(2)
	}
}));

const DisplayListItem = ({ id, index, title, count }) => 
{
	const history = useHistory();

	return (
		<ListItem button onClick={ () => history.push(PATH.UPDATE_MOVIE.replace(':id', id)) }>
			<ListItemIcon>{ index }</ListItemIcon>
			<ListItemText primary={ title } />
			<ListItemSecondaryAction>
				<Typography variant="subtitle1" color='textSecondary'>{ count }</Typography>
			</ListItemSecondaryAction>
		</ListItem>
	)
}

const DashboardTopFiveMovies = ({ DASHBOARD, movies = [], HeaderIcon, listHeaderTitle = '' }) =>
{
    const classes = useStyles();

	if (DASHBOARD.isLoading) {
		return (
			<>
				<TextContentLoader height={ 30 } />
				<BoxContentLoader 
					width={ '100%' }
					height={ 250 }
				/>
			</>
		)
	}

    return (
        <div className={ classes.root }>
			<Grid container spacing={1} alignItems='center' className={ classes.headerContainer } >
				<Grid item>
					<HeaderIcon />
				</Grid>
				<Grid item>
					<Typography variant="h6" color="initial" className={ classes.subheader }>{ listHeaderTitle }</Typography>
				</Grid>
			</Grid>
            <List 
				component="nav" 
				aria-label="main mailbox folders"
				className={ classes.listContainer }
			>
				<ListItem button>
					<ListItemIcon>Title</ListItemIcon>
					<ListItemSecondaryAction>Count</ListItemSecondaryAction>
				</ListItem>
                {
					movies.map(({ id, title, count }, index) => (
						<DisplayListItem 
							key={ id }
							id={ id } 
							index={ index + 1 } 
							title={ title } 
							count={ count } 
						/>
					))
				}
            </List>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    DASHBOARD: selectDashboard
});

export default connect(mapStateToProps)(DashboardTopFiveMovies)