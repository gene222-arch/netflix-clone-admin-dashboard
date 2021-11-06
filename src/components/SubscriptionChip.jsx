import { Chip } from '@material-ui/core'
import React from 'react'
import Colors from './../constants/Colors'

const SubscriptionChip = ({ status }) => 
{
    const defaultStyling = {
        width: '100%', fontWeight: 'bold'
    };

    switch (status) {
        case 'subscribed': 
            return <Chip label={ status } style={{ ...defaultStyling, backgroundColor: Colors.success }} />
        case 'pending': 
            return <Chip label={ status }  style={{ ...defaultStyling, backgroundColor: Colors.warning }}/>
        case 'expired': 
            return <Chip label={ status } style={{ ...defaultStyling, backgroundColor: Colors.dark }} />
        case 'cancelled': 
            return <Chip label={ status } style={{ ...defaultStyling, backgroundColor: Colors.error }} />
    }
}

export default SubscriptionChip
