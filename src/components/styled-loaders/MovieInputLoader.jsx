import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Card, CardContent, CardHeader } from '@material-ui/core'
import BoxContentLoader from './../content-loader/BoxContentLoader';
import TextContentLoader from './../content-loader/TextContentLoader';

const MovieInputLoader = () => 
{
    return (
        <Container maxWidth="lg">
            <Grid container spacing={ 3 }>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Card>
                    <CardHeader title={
                        <TextContentLoader height={ 50 } />
                    } />
                    <CardContent>
                        <Grid container spacing={1} justify='center' >
                            <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                                <BoxContentLoader height={ 65 } width='100%' />
                                <BoxContentLoader height={ 230 } width='100%' />
                                <BoxContentLoader height={ 65 } width='100%' />
                            </Grid>
                            <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                                <BoxContentLoader height={ '23.2rem' } width='100%' />
                            </Grid>
                            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                <Grid container spacing={1}>
                                    <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                                        <BoxContentLoader height={ 65 } width='100%' />
                                    </Grid>
                                    <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                                        <BoxContentLoader height={ 65 } width='100%' />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                <Grid container spacing={1}>
                                    <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                                        <BoxContentLoader height={ 65 } width='100%' />
                                    </Grid>
                                    <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 6 }>
                                        <BoxContentLoader height={ 65 } width='100%' />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                </Grid>
                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                    <Card>
                        <CardHeader title={
                            <TextContentLoader height={ 50 } />
                        } />
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                    <BoxContentLoader height={ 400 } width='100%' />
                                </Grid>
                              {
                                  ['', '', ''].map((_, index) => (
                                    <Grid key={ index } item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                        <Grid container spacing={1}>
                                            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                                <BoxContentLoader height={ 400 } width='100%' />
                                            </Grid>
                                            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                                                <BoxContentLoader height={ 50 } width='100%' />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                  ))
                              }
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default MovieInputLoader
