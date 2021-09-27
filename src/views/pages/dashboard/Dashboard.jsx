import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDashboardData } from './../../../redux/modules/dashboard/selector';
import * as DASHBOARD_DATA_ACTION from './../../../redux/modules/dashboard/actions'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded';
import DashboardAvatars from './DashboardAvatars';
import DashboardTopFiveMovies from './../../../components/DashboardTopFiveMovies';
import MonthlySubscriber from './charts/MonthlySubscriber';


const Dashboard = ({ DASHBOARD_DATA }) => 
{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(DASHBOARD_DATA_ACTION.fetchDashboardDataStart());
    }, []);

    return (
        <Container maxWidth="lg">
            <Grid container spacing={ 10 }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <DashboardAvatars  generalAnalytics={ DASHBOARD_DATA?.general_analytics }/>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                    <DashboardTopFiveMovies 
                        movies={ DASHBOARD_DATA?.top_five_most_rated_movies } 
                        listHeaderTitle='Top 5 Most Rated Movies' 
                        HeaderIcon={ StarsRoundedIcon }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                    <DashboardTopFiveMovies 
                        movies={ DASHBOARD_DATA?.top_five_most_liked_movies } 
                        listHeaderTitle='Top 5 Most Liked Movies' 
                        HeaderIcon={ ThumbUpRoundedIcon }
                    />
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <MonthlySubscriber />
                </Grid>
            </Grid>
        </Container>
    )
}


const mapStateToProps = createStructuredSelector({
    DASHBOARD_DATA: selectDashboardData
});

export default connect(mapStateToProps)(Dashboard)
