import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { DataState } from './components/context/DataState'
import { Characters } from './components/pages/characters/Characters';
import { PageNotFound } from './components/pages/404/404-page';
import { Favourites } from './components/pages/favourites/Favourites';

function App() {
  return (
    <DataState>
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Characters} />
            <Route exact path='/favourites' component={Favourites} />
            <Route component={PageNotFound}/>
          </Switch>
        </div>
      </Router>
    </DataState>
  );
}

export default App;
