import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Colors from './../constants/Colors';
import { MoonLoader } from 'react-spinners';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
    errorText: {
        paddingLeft: '1rem'
    }
}));

const defaultEmptyImgStyle = {
    width: '100%',
    height: '20rem'
};

const defaultWithImgStyle = {
    width: '100%',
    backgroundSize: 'contain'
};

const ImageWithPreview = ({ 
    inputID, 
    inputName, 
    apiSource = '',
    accept = 'image/*',
    name,
    filePreview = null, 
    styleOnEmptyImg = defaultEmptyImgStyle, 
    styleWithImg = defaultWithImgStyle, 
    handleChangeFile,
    error = false,
    helperText = '',
    isUploading = false
}) => 
{
    const classes = useStyles();

    const showPreview = () => {

        if (apiSource && !filePreview) {
            return <img src={ apiSource } style={ styleWithImg } />
        }

        return (
            !filePreview 
                ? <img src={ filePreview }  style={ styleOnEmptyImg } />
                : <img src={ filePreview } style={ styleWithImg } />
        )
    }

    return (
        <Grid container spacing={1} justify='center'>
            <Grid item>{ showPreview() }</Grid>
            <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 }>
                <input
                    accept={ accept }
                    className={classes.input}
                    id={ inputID }
                    name={ inputName }
                    type='file'
                    onChange={ handleChangeFile }
                />
                <label htmlFor={ inputID }>
                    <Button 
                        variant='contained' 
                        color='primary' 
                        style={{ color: error ? Colors.tomato : Colors.white }} 
                        component='span' 
                        fullWidth
                    >
                        { 
                            !isUploading 
                                ? name 
                                : <MoonLoader size={ 19 } color={ Colors.white } />
                        }
                    </Button>
                    { error && <FormHelperText error={ error } className={ classes.errorText }>{ helperText }</FormHelperText> }
                </label>
            </Grid>
        </Grid>
    )
}

export default ImageWithPreview
