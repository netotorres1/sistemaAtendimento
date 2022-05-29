import {Switch} from 'react-router-dom';
import Rotas from './Route';

import singIn from '../pages/singIn';
import singUp from '../pages/singUp'
import Dashboard from '../pages/dashboard';
import Profile from '../pages/Profile';
import Employees from '../pages/Employees';
import New from '../pages/New';

function Routes(){
    return(
        <Switch>
            <Rotas exact path='/' component={singIn} />
            <Rotas exact path='/register' component={singUp} />
            <Rotas exact path='/dashboard' component={Dashboard} isPrivate/>
            <Rotas exact path='/profile' component={Profile} isPrivate/>
            <Rotas exact path='/employees' component={Employees} isPrivate/>
            <Rotas exact path='/new' component={New} isPrivate/>
        </Switch>
    )
}

export default Routes;