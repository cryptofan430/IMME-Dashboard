import React, {createContext} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Staking from '../Staking';
import Reward from '../Reward';
import Layout from '../Layout';
const Routes = () => (
  
    <main>
      <Layout />
       <Switch>
        {/* <Route exact path="/" component={LogIn} /> */}
        {/* <PublicRoute restricted={true} component={LogIn} path="/login" exact /> */}
        <Route exact path="/" component={Staking} restricted={true} />
        <Route exact path="/reward" component={Reward} restricted={true} />
        
      </Switch>
    </main>
  
);

export default Routes;
