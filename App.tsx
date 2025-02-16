import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Header from './src/components/Header/Header';
import ListOptions from './src/components/ListOptions/ListOptions';
import DocumentsList from './src/components/DocumentsList/DocumentsList';
import Footer from './src/components/Footer/Footer';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ListOptions />
      <DocumentsList />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
