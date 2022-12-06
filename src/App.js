import { BrowserRouter, NavLink, Redirect, Route, Switch, useParams, useRouteMatch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>App page</h1>
      <BrowserRouter>
      <NavLink to='/users'>Users list page</NavLink>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/users" component={UsersPage}/>
          <Redirect to="/"/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function HomePage (){
  return <h1>HomePage</h1>
}
function UsersPage() {
  const { path } = useRouteMatch()
  return (
    <>
      <h1>UsersPage</h1>
      <NavLink to='/'>Home page</NavLink>
      <div>
        <Switch>
          <Route path={path + "/:userId/profile"} component={UserProfilePage} />
          <Route path={path + "/:userId/edit"} component={UserEditPage} />
          <Route path={path} exact component={UserListPage} />
          <Redirect from={path + "/:userId"} to={path+"/:userId/profile"} />
        </Switch>
      </div>
    </>
  )
}
function UserListPage() {
  const { path } = useRouteMatch()
  const users = ['Jack', 'John', "Mark"]
  return (
    <div>
      <h1>User list page</h1>
      <ul>
        {users.map((user, i) => <li key={i}>
          <NavLink to={`${path}/${i + 1}`}>{user}</NavLink>
        </li>)}
      </ul>
    </div>
  )
}
function UserProfilePage() {
  const { userId } = useParams()
  return (
    <>
    <h1>User profile - {userId} </h1>
    <NavLink to="/users" >Users list page</NavLink>
    <NavLink to={`/users/${userId}/edit`} >Edit user</NavLink>
    </>
  )
}
function UserEditPage() {
  const { userId } = useParams()
  return (
    <>
      <h1>User edit - {userId} </h1>)
      <NavLink to={'/users/'+ userId}>User profile</NavLink>
      <NavLink to={'/users/'+ (userId+1)}>Another user page</NavLink>
      <NavLink to={'/users'}>User list page</NavLink>
    </>
  )
}

export default App;
