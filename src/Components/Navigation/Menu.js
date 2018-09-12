import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WeeklyProjections from '../Projections/WeeklyProjections';
import Games from "../Games/Games";
import WeeklyStats from "../Stats/WeeklyStats";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import "./Menu.scss";
import GoogleLoginClient from "../Login/GoogleLoginClient";

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <WeeklyProjections />
  },
  {
    path: "/weekly-stats",
    exact: true,
    main: () => <WeeklyStats />
  },  
  {
      path: "/games",
      exact: true,
      main: () => <Games />
  }
];

const Menu = () => (
  <Router>
    <div style={{ display: "flex" }}>
      <div
        className="menu-container"
        style={{
          width: "15%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          overflowX: "hidden",
          background: "#f0f0f0"
        }}
      >
        <Link to="/" style={{display: "flex", justifyContent: "center"}}>
          <h3 className="menu-header">FFI</h3>
        </Link>
        <List component="nav" style={{ listStyleType: "none", padding: 0 }}>
          <Link to="/">
            <ListItem button>
              <ListItemText primary="Weekly Projections"></ListItemText>
            </ListItem>
          </Link>
          <Divider light />
          <Link to="/weekly-stats">
            <ListItem button>
              <ListItemText primary="Weekly Stats"></ListItemText>
            </ListItem>
          </Link>
          <Divider light />
          <Link to="/games">
            <ListItem button>
              <ListItemText primary="Games"></ListItemText>
            </ListItem>
          </Link>
        </List>
        <GoogleLoginClient />

        {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Route>s.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />
        ))}
      </div>

      <div style={{ flex: 1, marginLeft: "15%" }}>
        {routes.map((route, index) => (
          // Render more <Route>s with the same paths as
          // above, but different components this time.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </Router>
);

export default Menu;