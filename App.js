import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import BalanceScreen from "./src/screens/BalanceScreen";
import SavingScreen from "./src/screens/SavingScreen";
import sBreakdownScreen from "./src/screens/sBreakdownScreen";
import sGoalScreen from "./src/screens/sGoalScreen";
import SpendingScreen from "./src/screens/SpendingScreen";
import NewSpendingScreen from "./src/screens/NewSpendingScreen";
import AddSpendingScreen from './src/screens/AddSpendingScreen';
import SettingsScreen from './src/screens/SettingsScreen'
import { Provider as BalanceProvider } from "./src/context/BalanceContext";
import { Provider as SavedProvider } from './src/context/SavedContext';
import { Provider as SpentProvider } from './src/context/SpentContext';
import { Provider as GoalProvider } from './src/context/GoalContext';
import { Provider as ListProvider } from './src/context/SpendListContext';
import { Provider as CurrencyProvider } from './src/context/CurrencyContext'


const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Balance: BalanceScreen,
    Saving: SavingScreen,
    Spending: SpendingScreen,
    SavingGoal: sGoalScreen,
    SpendingBreakdown: sBreakdownScreen,
    NewSpending: NewSpendingScreen,
    AddSpending: AddSpendingScreen,
    Settings: SettingsScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#99CCFF'
      }
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return <CurrencyProvider>
    <ListProvider>
      <BalanceProvider>
        <GoalProvider>
          <SpentProvider>
            <SavedProvider>
              <App />
            </SavedProvider> 
          </SpentProvider>
        </GoalProvider>
      </BalanceProvider>
    </ListProvider>
  </CurrencyProvider>;
}
