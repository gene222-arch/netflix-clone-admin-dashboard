import React from 'react'
import * as MAIN_LAYOUT_ACTION from './../../../redux/modules/main-layout/actions'
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMainLayout } from '../../../redux/modules/main-layout/selector';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import StyledNavLink from '../../../components/styled-components/StyledNavLink';
import PATH from './../../../routes/path';
import ToolTipComponent from '../../../components/ToolTipComponent';
import { makeStyles } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';

const accessRightUseStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.success.main
    }
}));

const Payments = ({ MAIN_LAYOUT }) => 
{
    const classes = accessRightUseStyles();
    const dispatch = useDispatch();

    const handleClickPayments = () => dispatch(MAIN_LAYOUT_ACTION.selectPayments());

    return (
        <StyledNavLink 
            to={ PATH.PAYMONGO_WEBHOOK }
            text={
                <ToolTipComponent 
                    withToolTip={ !MAIN_LAYOUT.drawer }
                    title='Payments'
                    component={ 
                        <ListItem 
                            button 
                            onClick={ handleClickPayments }
                            selected={ MAIN_LAYOUT.payments }
                        >
                            <ListItemIcon>
                                <PaymentIcon className={ classes.icon } />
                            </ListItemIcon>
                            <ListItemText primary='Payments' />
                        </ListItem>
                    }
                />
            }
        />
    )
}

const mapStateToProps = createStructuredSelector({
    MAIN_LAYOUT: selectMainLayout
});

export default connect(mapStateToProps)(Payments)
