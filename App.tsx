import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Header from './src/components/Header/Header';
import DocumentsList from './src/components/DocumentsList/DocumentsList';
import Footer from './src/components/Footer/Footer';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <DocumentsList />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    gap: 5,
  },
});

export default App;
