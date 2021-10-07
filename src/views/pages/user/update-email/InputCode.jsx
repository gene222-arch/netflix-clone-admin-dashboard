import React from 'react'
import Grid from '@material-ui/core/Grid'
import { TextField } from '@material-ui/core'

const InputCode = ({ hasError, code, handleChange }) => 
{
    return (
        <Grid container spacing={1} justify='center'>
            <Grid item xs={ 3 } sm={ 2 } md={ 2 } lg={ 2 }>
                <TextField
                    name='num1'
                    variant='outlined'
                    inputProps={{ 
                        min: 1, 
                        style: { textAlign: 'center', fontSize: '2rem' },
                        maxLength: 1
                    }}
                    error={ hasError }
                    value={ code.num1 }
                    onChange={ (e) => handleChange(e, 'num2') }
                />
            </Grid>
            <Grid item xs={ 3 } sm={ 2 } md={ 2 } lg={ 2 }>
                <TextField
                    name='num2'
                    variant='outlined'
                    inputProps={{ 
                        min: 1, 
                        style: { textAlign: 'center', fontSize: '2rem' },
                        maxLength: 1
                    }}
                    error={ hasError }
                    value={ code.num2 }
                    onChange={ (e) => handleChange(e, 'num3') }
                />
            </Grid>
            <Grid item xs={ 3 } sm={ 2 } md={ 2 } lg={ 2 }>
                <TextField
                    name='num3'
                    variant='outlined'
                    inputProps={{ 
                        min: 1, 
                        style: { textAlign: 'center', fontSize: '2rem' },
                        maxLength: 1
                    }}
                    error={ hasError }
                    value={ code.num3 }
                    onChange={ (e) => handleChange(e, 'num4') }
                />
            </Grid>
            <Grid item xs={ 3 } sm={ 2 } md={ 2 } lg={ 2 }>
                <TextField
                    name='num4'
                    variant='outlined'
                    inputProps={{ 
                        min: 1, 
                        style: { textAlign: 'center', fontSize: '2rem' },
                        maxLength: 1
                    }}
                    error={ hasError }
                    value={ code.num4 }
                    onChange={ (e) => handleChange(e, 'num5') }
                />
            </Grid>
            <Grid item xs={ 3 } sm={ 2 } md={ 2 } lg={ 2 }>
                <TextField
                    name='num5'
                    variant='outlined'
                    inputProps={{ 
                        min: 1, 
                        style: { textAlign: 'center', fontSize: '2rem' },
                        maxLength: 1
                    }}
                    error={ hasError }
                    value={ code.num5 }
                    onChange={ (e) => handleChange(e, 'num6') }
                />
            </Grid>
            <Grid item xs={ 3 } sm={ 2 } md={ 2 } lg={ 2 }>
                <TextField
                    name='num6'
                    variant='outlined'
                    inputProps={{ 
                        min: 1, 
                        style: { textAlign: 'center', fontSize: '2rem' },
                        maxLength: 1
                    }}
                    error={ hasError }
                    value={ code.num6 }
                    onChange={ (e) => handleChange(e, '') }
                />
            </Grid>
        </Grid>
    )
}

export default InputCode
