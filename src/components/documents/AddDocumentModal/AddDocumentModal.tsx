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
import {pick} from '@react-native-documents/picker';
import Colors from 'constants/colors';

type AddDocumentModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreateDocument: (doc: {
    name: string;
    version: string;
    file: string;
  }) => void;
};

export const AddDocumentModal = ({
  visible,
  onClose,
  onCreateDocument,
}: AddDocumentModalProps) => {
  const [name, setName] = useState('');
  const [version, setVersion] = useState('');
  const [file, setFile] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    version?: string;
    file?: string;
  }>({});

  const validate = () => {
    const newErrors: {name?: string; version?: string; file?: string} = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!version.trim()) {
      newErrors.version = 'Version is required';
    }
    if (!file.trim()) {
      newErrors.file = 'File selection is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChooseFile = async () => {
    try {
      const result = await pick({mode: 'open'});

      if (result && result[0].name) {
        setFile(result[0]?.name);
      }
    } catch (error: any) {
      if (error.code === 'DOCUMENT_PICKER_CANCELED') {
        console.log('User cancelled file picker');
      } else {
        console.error('Error picking file:', error);
      }
    }
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }
    onCreateDocument({name, version, file});

    setName('');
    setVersion('');
    setFile('');
    setErrors({});
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
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View>
            <Text style={styles.subtitle}>Version</Text>
            <TextInput
              placeholder="Version"
              value={version}
              onChangeText={setVersion}
              style={styles.input}
            />
            {errors.version && (
              <Text style={styles.errorText}>{errors.version}</Text>
            )}
          </View>
          <View>
            <Text style={styles.subtitle}>File</Text>
            <TouchableOpacity
              onPress={handleChooseFile}
              style={styles.chooseButton}>
              <Icon name="file" color={Colors.filledIcon} size={12} />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.chooseFileText}>
                {file ? file : 'Choose file'}
              </Text>
            </TouchableOpacity>
            {errors.file && <Text style={styles.errorText}>{errors.file}</Text>}
          </View>
        </View>
        <View style={styles.submitContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};
