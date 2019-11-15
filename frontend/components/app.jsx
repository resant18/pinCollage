import React from 'react';

import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import Modal from './modal/modal';
import NavBarContainer from './navbar/navbar_container';
import UserProfileContainer from './user/user_profile_container';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import { AuthRoute, ProtectedRoute, SessionRoute } from '../util/route_util';
import Dashboard from './modal/dashboard';

const App = () => (
  <div>
    <Modal />
    <Switch>
      <SessionRoute exact path="/" />
      <Route path="/" component={NavBarContainer} />
    </Switch>
    <Switch>
      <Route path="/:username/boards" component={UserProfileContainer} />
      <Route path="/:username/pins" component={UserProfileContainer} />
      <Route exact path="/:username" component={UserProfileContainer} />
    </Switch>
    {/* <Switch>
            <Route path="/:username/:boardId" component={BoardItemShowContainer} />
            <Route path="/:username/pins" component={UserPinsShowContainer} />
        </Switch> */}
  </div>
);

export default App;
