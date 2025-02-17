import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Header from './src/components/layout/Header/Header';
import DocumentsList from './src/components/documents/DocumentsList/DocumentsList';
import Footer from './src/components/layout/Footer/Footer';
import Colors from './src/constants/colors';

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
    backgroundColor: Colors.appBackground,
    gap: 5,
  },
});

export default App;
