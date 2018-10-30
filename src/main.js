/* eslint-disable */
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './login';
import Register from './register';
import Timeline from './timeline';
import Error from './error';
import Forgot_Password from './forgot_password';
import Verify from './verify';
import New_Password from './new_password';
import Single_Post from './single_post';



const Main = () => (
	<Switch>
	<Route path = '/single_post:id' component = {Single_Post} />
	<Route path = '/login' component = {Login} />
	<Route path = '/timeline' component = {Timeline} />
	<Route path = '/error' component = {Error} />
	<Route path = '/forgot_password' component = {Forgot_Password} />
	<Route path = '/verify/:id' component = {Verify} />
	<Route path = '/new_password/:id' component = {New_Password} />
	<Route exact path = '/' component = {Register} />
	</Switch>
	)


export default Main;