import React from 'react';
import LinearProgress_ from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Colors from './../constants/Colors';

const LinearProgress = ({ value, maxValue }) => 
{
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1, backgroundColor: Colors.grey }}>
                <LinearProgress_ 
                    variant='determinate'
                    value={ parseInt(value) }
                    style={{ 
                        width: `${ ((value / maxValue) * 100).toFixed(2) }%`,
                        backgroundColor: Colors.info
                    }}
                />
            </Box>
            <Box>
                <Typography variant="caption" color='textSecondary'>{ value }/{ maxValue }</Typography>
            </Box>
        </Box>
    )
}

export default LinearProgress
