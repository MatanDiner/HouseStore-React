import React from 'react'
import storeHouseLogo from '../../assets/images/logo.png'
import classes from './Logo.css'

const logo = (props) =>(

<div className={classes.Logo}>
    <img src={storeHouseLogo}/>
</div>    
);

export default logo;