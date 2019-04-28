import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";
import store from "../store";

import MainTabNavigator from "./MainTabNavigator";

const AppContainer = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator
  })
);

class AppNavigator extends React.Component {
  state = {};
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default AppNavigator;

// export default createAppContainer(createSwitchNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator,
// }));
