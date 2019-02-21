import React from 'react'
import NavigationItems from '../Navigation/NavigationItems/NavigationItems'
import Logo from '../Logo/Logo'
import classes from './Toolbar.css'
import DrawToggle from '../SideDrawer/DrawToggle/DrawToggle'

const toolbar = (props) =>(

<header className={classes.Toolbar}>
<DrawToggle clicked={props.drawerToggleClicked}/> 
    <div className={classes.Logo}>
        <Logo/>
    </div>
    <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth}/>
    </nav>
</header>

)

export default toolbar