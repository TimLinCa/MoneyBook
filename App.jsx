/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import Tabs from './navigation/Tabs';
import { NavigationContainer } from '@react-navigation/native';
function App() {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>

  );
}

export default App;
