import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import GetSpot from "./components/GetSpot";
import AddSpot from "./components/AddSpotForm";
import UserSpots from "./components/UserSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/spots/current'>
            <UserSpots />
          </Route>
          <Route path='/spots/new'>
            <AddSpot />
          </Route>
          <Route path='/spots/:spotId'>
            <GetSpot />
          </Route>
          <Route path='/'>
            <AllSpots />
          </Route>
        </Switch>
      )}
      
    </>
  );
}

export default App;