import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from './DocumentCard.styles';

export type Document = {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  Title: string;
  Attachments: string[];
  Contributors: {ID: string; Name: string}[];
  Version: string;
};

type DocumentCardProps = {
  doc: Document;
  isGrid?: boolean;
};

const DocumentCard = ({doc, isGrid = false}: DocumentCardProps) => {
  return (
    <View style={[styles.card, isGrid && styles.cardGrid]}>
      <View style={[styles.header, isGrid && styles.headerGrid]}>
        <Text style={styles.title}>{doc.Title}</Text>

        <Text style={styles.version}>Version {doc.Version}</Text>
      </View>

      {!isGrid && (
        <View style={styles.infoRow}>
          <View style={styles.column}>
            <View style={styles.section}>
              <Icon name="users" color={'#666'} size={12} />
              <Text style={styles.sectionLabel}>Contributors</Text>
            </View>
            {doc.Contributors.map(contributor => (
              <Text key={contributor.ID} style={styles.listItem}>
                {contributor.Name}
              </Text>
            ))}
          </View>

          <View style={styles.column}>
            <View style={styles.section}>
              <Icon name="link" color={'#666'} size={12} />
              <Text style={styles.sectionLabel}>Attachments</Text>
            </View>
            {doc.Attachments.map((attachment, index) => (
              <Text key={index} style={styles.listItem}>
                {attachment}
              </Text>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default DocumentCard;
