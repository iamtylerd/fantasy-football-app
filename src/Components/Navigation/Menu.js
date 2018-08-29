import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import WeeklyProjections from '../Projections/WeeklyProjections';
import "./Menu.scss";
import Games from "../Games/Games";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <WeeklyProjections />
  }, {
      path: "/games",
      exact: true,
      main: () => <Games />
  }
];

const Menu = () => (
  <Router>
    <div style={{ display: "flex" }}>
      <div
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
        <h3 className="menu-header">Fantasy Updates</h3>
        <List component="nav" style={{ listStyleType: "none", padding: 0 }}>
          <ListItem button>
            <Link to="/"><ListItemText primary="Weekly Projections"></ListItemText></Link>
          </ListItem>
          <Divider light />
          <ListItem button>
            <Link to="/games"><ListItemText primary="Games"></ListItemText></Link>
          </ListItem>
        </List>

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