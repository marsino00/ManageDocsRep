import React, {useState} from 'react';
import {View, Button} from 'react-native';
import {styles} from './Footer.styles';
import AddDocumentModal from '../../documents/AddDocumentModal/AddDocumentModal';
import {useDocuments} from '../../../hooks/useDocuments/useDocuments';
const Footer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {onCreate} = useDocuments();
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    console.log('close');

    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="+ Add document" onPress={handleOpenModal} />
      <AddDocumentModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onCreateDocument={onCreate}
      />
    </View>
  );
};

export default Footer;
