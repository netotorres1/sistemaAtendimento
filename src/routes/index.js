import {Switch} from 'react-router-dom';
import Rotas from './Route';

import singIn from '../pages/singIn';
import singUp from '../pages/singUp'
import Dashboard from '../pages/dashboard';
import Profile from '../pages/Profile';

function Routes(){
    return(
        <Switch>
            <Rotas exact path='/' component={singIn} />
            <Rotas exact path='/register' component={singUp} />
            <Rotas exact path='/dashboard' component={Dashboard} isPrivate/>
            <Rotas exact path='/profile' component={Profile} isPrivate/>
        </Switch>
    )
}

export default Routes;