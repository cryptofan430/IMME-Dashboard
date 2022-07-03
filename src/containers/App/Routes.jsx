import React, {createContext} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Staking from '../Staking';
import Reward from '../Reward';
const Routes = () => (
    <main>
       <Switch>
        {/* <Route exact path="/" component={LogIn} /> */}
        {/* <PublicRoute restricted={true} component={LogIn} path="/login" exact /> */}
        <Route exact path="/" component={Staking} restricted={true} />
        <Route exact path="/reward" component={Reward} restricted={true} />
      </Switch>
    </main>
  
);

export default Routes;
