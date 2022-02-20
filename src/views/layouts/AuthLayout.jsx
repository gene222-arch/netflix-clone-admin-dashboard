import React from 'react'
import Container from '@material-ui/core/Container'
import AuthLayoutHeader from './../../components/app/AuthLayoutHeader';
import { makeStyles } from '@material-ui/core/styles';
import BACKGROUND_IMG from './../../assets/images/app/auth-background-image.jpg'
import { useLocation } from 'react-router-dom';
import PATH from './../../routes/path';

const authLayoutUseStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        width: '100%',
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${ BACKGROUND_IMG })`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
}));

const AuthLayout = ({ children }) => 
{
    const { pathname } = useLocation();
    const classes = authLayoutUseStyles();

    let height = PATH.SELECT_PLAN === pathname ? 'auto' : '100vh';
    height = PATH.REGISTER === pathname ? 'auto' : '100vh';
    height = PATH.SELECT_PLAN === pathname ? 'auto' : '100vh';

    if (PATH.LOGIN !== pathname) 
    {
        return (
            <Container maxWidth="xl" className={ classes.container } style={{ height }}>
                <AuthLayoutHeader />
                { children }
            </Container>
        )
    }

    return (
        <Container maxWidth="xl" className={ classes.container } style={{ height }}>
            <AuthLayoutHeader signInButton={ false } />
            { children }
        </Container>
    )
}

export default AuthLayout
