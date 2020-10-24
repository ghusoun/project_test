// delete node_modules folder to save space
// later on, restore with "npm install"

import React, { useState } from 'react';
import MealAndDishes from './MealAndDishes'
import Meals from './Meals'
import Dishes from './Dishes'
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Container style={{ backgroundColor: '#cfe8fc' }} maxWidth="md">
        <Router>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                Meals and Dishes
          </Typography>

              <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={event => setAnchorEl(event.currentTarget)}
                color="inherit"
              >
                Admin
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setAnchorEl(null)} component={Link} to="/meals">Meals</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)} component={Link} to="/dishes">Dishes</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route path="/meals/:id">
              <MealAndDishes />
            </Route>
            <Route path="/meals">
              <Meals />
            </Route>
            <Route path="/dishes">
              <Dishes />
            </Route>
            <Route path="/">
              <Meals />
            </Route>
          </Switch>
        </Router>
      </Container>
    </>
  );
}

export default App;
