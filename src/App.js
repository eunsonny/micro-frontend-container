import React from "react";
import { BrowserRouter, Route, Routes, Redirect } from "react-router-dom";
import AppHeader from "./AppHeader";
import MicroFrontend from "./MicroFrontend";
import About from "./About";

const {
  REACT_APP_BROWSE_HOST: browseHost,
  REACT_APP_RESTAURANT_HOST: restaurantHost,
} = process.env;

let numRestaurants = 0;
fetch(`${process.env.REACT_APP_CONTENT_HOST}/restaurants.json`)
  .then((res) => res.json())
  .then((restaurants) => {
    numRestaurants = restaurants.length;
  });

const getRandomRestaurantId = () =>
  Math.floor(Math.random() * numRestaurants) + 1;

const Browse = ({ history }) => {
  return <MicroFrontend history={history} host={browseHost} name="Browse" />;
};

const Restaurant = ({ history }) => (
  <MicroFrontend history={history} host={restaurantHost} name="Restaurant" />
);

// const Random = () => <Redirect to={`/restaurant/${getRandomRestaurantId()}`} />;

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        {/* <Route path="/random" element={<Random />} /> */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
