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

const DashboardAvatars = ({ DASHBOARD, generalAnalytics }) => 
{
    const history = useHistory();

    if (DASHBOARD.isLoading) {
        return (
            <Grid container spacing={ 10 } justify='center' alignItems='center'>
                <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                    <BoxContentLoader width={ '100%' } height={ 200 } />
                </Grid>
                <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                    <BoxContentLoader width={ '100%' } height={ 200 } />
                </Grid>
                <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                    <BoxContentLoader width={ '100%' } height={ 200 } />
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container spacing={1} justify='center' alignItems='center'>
            <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                <AvatarWithLabel 
                    label='Users' 
                    Icon={ GroupIcon }
                    counter={ generalAnalytics?.total_number_of_users } 
                    avatarStyle={{
                        backgroundColor: Colors.info
                    }}
                    counterStyle={{
                        backgroundColor: Colors.darkMode
                    }}
                    onClick={ () => 1 }
                />
            </Grid>
            <Grid item xs={ 12 } sm={ 4 } md={ 4 } lg={ 4 }>
                <AvatarWithLabel 
                    label='Movies' 
                    Icon={ MovieIcon }
                    counter={ generalAnalytics?.total_number_of_movies } 
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
                    counter={ generalAnalytics?.total_number_of_coming_soon_movies } 
                    avatarStyle={{
                        backgroundColor: Colors.warning
                    }}
                    counterStyle={{
                        backgroundColor: Colors.darkMode
                    }}
                    onClick={ () => history.push(PATH.VIDEO_MANAGEMENT_COMING_SOON_MOVIES) }
                />
            </Grid>
        </Grid>
    )
}

const mapStateToProps = createStructuredSelector({
    DASHBOARD: selectDashboard
});

export default connect(mapStateToProps)(DashboardAvatars)
