import { Navigate, NavLink, Outlet, useParams, useRoutes } from 'react-router-dom';

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <HomePage />
    }, {
      path: "users",
      element: <UsersPage />,
      children: [{
        index: true,
        element: <UserListPage />
      },
        {
          path: ":userId",
          element: <Outlet />,
          children: [
            { path: "profile", element: <UserProfilePage /> },
            { path: "edit", element: <UserEditPage /> },
            { index: true, element: <Navigate to='./profile'/>  },
            { path: "*", element: <Navigate to='../profile'/>  },
          ]
        }
      ]
    },
    {path: "*", element: <Navigate to='/'/>}
  ])
  return (
    <div className="App">
      <h1>App page</h1>
        <NavLink to='/users'>Users list page</NavLink>
        {routes}
    </div>
  );
}

function HomePage (){
  return <h1>HomePage</h1>
}
function UsersPage() {
  // const { path } = useRouteMatch()
  return (
    <>
      <h1>UsersPage</h1>
      <NavLink to='/'>Home page</NavLink>
      <Outlet />
    </>
  )
}
function UserListPage() {
  // const { path } = useRouteMatch()
  const users = ['Jack', 'John', "Mark"]
  return (
    <div>
      <h1>User list page</h1>
      <ul>
        {users.map((user, i) => <li key={i}>
          <NavLink to={user}>{user}</NavLink>
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
