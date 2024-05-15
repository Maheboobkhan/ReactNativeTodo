import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import TodoApp from './components/Task';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <TodoApp />
    </SafeAreaView>
  );
};

export default App;
