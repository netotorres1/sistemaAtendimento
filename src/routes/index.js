import {Switch} from 'react-router-dom';
import Rotas from './Route';

import singIn from '../pages/singIn';
import singUp from '../pages/singUp'
import Dashboard from '../pages/dashboard';

function Routes(){
    return(
        <Switch>
            <Rotas exact path='/' component={singIn} />
            <Rotas exact path='/register' component={singUp} />
            <Rotas exact path='/dashboard' component={Dashboard} isPrivate/>
        </Switch>
    )
}

export default Routes;