import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Toast from './components/Toast'
import routes from './routes';
import useToast from './hooks/toast';

function App() {
  const [toasts, addToast, deleteToast] = useToast();
  return (
    <Router>
      <NavBar />
      <Toast
        toasts={toasts}
        deleteToast={deleteToast}
      />
      <div className="container mt-3">
        <Switch>
          {routes.map((route) => {
            const Component = route.component;
            return <Route
              exact
              key={route.path}  
              path={route.path}
              // component={route.component}
              >
                <Component addToast={addToast} />
              </Route>
          })}
        </Switch>
      </div>
    </Router>
  );
}

export default App;