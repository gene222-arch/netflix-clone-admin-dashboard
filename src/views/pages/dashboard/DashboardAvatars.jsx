import React from 'react'
import { Grid } from '@material-ui/core';
import AvatarWithLabel from './../../../components/AvatarWithLabel';
import GroupIcon from '@material-ui/icons/Group';
import MovieIcon from '@material-ui/icons/Movie';
import TimerIcon from '@material-ui/icons/Timer';
import Colors from './../../../constants/Colors';
import { useHistory } from 'react-router-dom';
import PATH from './../../../routes/path';
import { createStructuredSelector } from 'reselect';
import { selectDashboard } from './../../../redux/modules/dashboard/selector';
import { connect } from 'react-redux';
import BoxContentLoader from './../../../components/content-loader/BoxContentLoader';
import Subscriptions from '@material-ui/icons/Subscriptions';
import CheckIcon from '@material-ui/icons/Check';
import { Home } from '@material-ui/icons';

const DashboardAvatars = ({ DASHBOARD, generalAnalytics }) => 
{
    const history = useHistory();

    if (DASHBOARD.isLoading && !DASHBOARD.hasLoaded) {
        return (
            <Grid container spacing={ 10 } justify='center' alignItems='center'>
                {
                    [0, 1, 2, 3, 4, 5].map(loading => (
                        <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                            <BoxContentLoader width={ '100%' } height={ 200 } />
                        </Grid>
                    ))
                }
            </Grid>
        )
    }

    return (
        <Grid container spacing={1} justify='center' alignItems='center'>
            <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                <AvatarWithLabel 
                    label='Revenue' 
                    Icon={ Home }
                    counter={ `P${ parseFloat(generalAnalytics.revenue).toFixed(2) }` } 
                    avatarStyle={{
                        backgroundColor: Colors.success
                    }}
                    counterStyle={{
                        backgroundColor: Colors.darkMode
                    }}
                    onClick={ () => 1 }
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                <AvatarWithLabel 
                    label='Employees' 
                    Icon={ GroupIcon }
                    counter={ generalAnalytics.total_number_of_employees } 
                    avatarStyle={{
                        backgroundColor: Colors.info
                    }}
                    counterStyle={{
                        backgroundColor: Colors.darkMode
                    }}
                    onClick={ () => 1 }
                    onClick={ () => history.push(PATH.EMPLOYEE) }
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                <AvatarWithLabel 
                    label='Movies' 
                    Icon={ MovieIcon }
                    counter={ generalAnalytics.total_number_of_movies } 
                    avatarStyle={{
                        backgroundColor: Colors.tomato
                    }}
                    counterStyle={{
                        backgroundColor: Colors.darkMode
                    }}
                    onClick={ () => history.push(PATH.VIDEO_MANAGEMENT_MOVIES) }
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                <AvatarWithLabel 
                    label='Coming Soon' 
                    Icon={ TimerIcon }
                    counter={ generalAnalytics.total_number_of_coming_soon_movies } 
                    avatarStyle={{
                        backgroundColor: Colors.warning
                    }}
                    counterStyle={{
                        backgroundColor: Colors.darkMode
                    }}
                    onClick={ () => history.push(PATH.VIDEO_MANAGEMENT_COMING_SOON_MOVIES) }
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                <AvatarWithLabel 
                    label='Subscribers' 
                    Icon={ Subscriptions }
                    counter={ generalAnalytics.total_number_of_subscribers } 
                    avatarStyle={{
                        backgroundColor: Colors.netflixRed
                    }}
                    counterStyle={{
                        backgroundColor: Colors.darkMode
                    }}
                    onClick={ () => history.push(PATH.SUBSCRIPTIONS) }
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                <AvatarWithLabel 
                    label='Active Subscribers' 
                    Icon={ CheckIcon }
                    counter={ generalAnalytics.total_active_subscribers } 
                    avatarStyle={{
                        backgroundColor: Colors.success
                    }}
                    counterStyle={{
                        backgroundColor: Colors.darkMode
                    }}
                    onClick={ () => 1 }
                />
            </Grid>
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector({
    DASHBOARD: selectDashboard
});

export default connect(mapStateToProps)(DashboardAvatars)
