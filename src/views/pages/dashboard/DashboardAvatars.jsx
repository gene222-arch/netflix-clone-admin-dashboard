import React from 'react'
import { Grid } from '@material-ui/core';
import AvatarWithLabel from './../../../components/AvatarWithLabel';
import GroupIcon from '@material-ui/icons/Group';
import MovieIcon from '@material-ui/icons/Movie';
import TimerIcon from '@material-ui/icons/Timer';
import Colors from './../../../constants/Colors';

const DashboardAvatars = ({ generalAnalytics }) => 
{
    return (
        <Grid container spacing={1} justify='space-evenly' >
            <Grid item>
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
                />
            </Grid>
            <Grid item>
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
                />
            </Grid>
            <Grid item>
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
                />
            </Grid>
        </Grid>
    )
}

export default DashboardAvatars
