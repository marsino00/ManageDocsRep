import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {styles} from './AddDocumentModal.styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../../constants/colors';

type AddDocumentModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (doc: {name: string; version: string; file: string}) => void;
};

const AddDocumentModal = ({
  visible,
  onClose,
  onSubmit,
}: AddDocumentModalProps) => {
  const [name, setName] = useState('');
  const [version, setVersion] = useState('');
  const [file, setFile] = useState('');

  const handleChooseFile = async () => {
    console.log('choose File');
  };

  const handleSubmit = () => {
    onSubmit({name, version, file});
    setName('');
    setVersion('');
    setFile('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Add document</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Document informations</Text>
          <View>
            <Text style={styles.subtitle}>Name</Text>

            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </View>

          <View>
            <Text style={styles.subtitle}>Version</Text>
            <TextInput
              placeholder="Version"
              value={version}
              onChangeText={setVersion}
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.subtitle}>File</Text>
            <TouchableOpacity
              onPress={handleChooseFile}
              style={styles.chooseButton}>
              <Icon name="file" color={Colors.filledIcon} size={12} />
              <Text style={styles.chooseFileText}>Choose file</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.submitContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export default AddDocumentModal;
