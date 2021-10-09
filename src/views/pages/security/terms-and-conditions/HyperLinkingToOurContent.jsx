import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemIcon } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const organizations = [
    'Government agencies;',
    'Search engines;',
    'News organizations;',
    'Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and',
    'System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.'
];

const consideredOrgs = [
    'commonly-known consumer and/or business information sources;',
    'dot.com community sites;',
    'associations or other groups representing charities;',
    'online directory distributors;',
    'internet portals;',
    'accounting, law and consulting firms; and',
    'educational institutions and trade associations.'
];

const approvedOrgs = [
    'By use of our corporate name; or',
    'By use of the uniform resource locator being linked to; or',
    'By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.',
];

const HyperLinkingToOurContent = () => 
{
    return (
        <Grid container spacing={1}>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <Typography variant="h6" color="initial">
                    <strong>Hyper Linking to our Content</strong>
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    The following organizations may link to our Website without prior written approval:
                </Typography>
                <List>
                    {
                        organizations.map((org, index) => (
                            <ListItem key={ index }>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant="body2" color="textSecondary">{ org }</Typography>
                                }/>
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    We may consider and approve other link requests from the following types of organizations:
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    The following organizations may link to our Website without prior written approval:
                </Typography>
                <List>
                    {
                        consideredOrgs.map((consideredOrg, index) => (
                            <ListItem key={ index }>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant="body2" color="textSecondary">{ consideredOrg }</Typography>
                                }/>
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Flicklify Organization; and (d) the link is in the context of general resource information.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Flicklify Organization. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    Approved organizations may hyperlink to our Website as follows:
                </Typography>
                <List>
                    {
                        approvedOrgs.map((approvedOrg, index) => (
                            <ListItem key={ index }>
                                <ListItemIcon>
                                    <CheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant="body2" color="textSecondary">{ approvedOrg }</Typography>
                                }/>
                            </ListItem>
                        ))
                    }
                </List>
            </Grid>
            <Grid item>
                <Typography variant="body1" color="textSecondary">
                    No use of Flicklify Organization's logo or other artwork will be allowed for linking absent a trademark license agreement.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default HyperLinkingToOurContent
