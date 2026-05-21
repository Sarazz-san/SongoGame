import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useUserStatsStore } from './src/store/useUserStatsStore';

function App(): React.JSX.Element {
  React.useEffect(() => {
    useUserStatsStore.getState().touchActive();
  }, []);

  return (
    <SafeAreaProvider style={styles.safe}>
      <View style={styles.container}>
        <RootNavigator />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#181210',
  },
  container: {
    flex: 1,
  },
});

export default App;
