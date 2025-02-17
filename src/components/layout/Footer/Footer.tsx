import React, {useState} from 'react';
import {View, Button} from 'react-native';
import {styles} from './Footer.styles';
import AddDocumentModal from '../../documents/AddDocumentModal/AddDocumentModal';
const Footer = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    console.log('close');

    setModalVisible(false);
  };

  const handleSubmitDocument = (doc: {
    name: string;
    version: string;
    file: string;
  }) => {
    console.log('Document submitted:', doc);
  };

  return (
    <View style={styles.container}>
      <Button title="+ Add document" onPress={handleOpenModal} />
      <AddDocumentModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitDocument}
      />
    </View>
  );
};

export default Footer;
