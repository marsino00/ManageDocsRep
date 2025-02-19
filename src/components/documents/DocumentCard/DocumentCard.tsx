import React from 'react';
import {View, Text, Share, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {styles} from './DocumentCard.styles';
import Colors from 'constants/colors';
import getRelativeTime from 'utils/getRelativeTime/getRelativeTime';
import {Document} from 'hooks';

type DocumentCardProps = {
  doc: Document;
  isGrid?: boolean;
};

const DocumentCard = ({doc, isGrid = false}: DocumentCardProps) => {
  /*
  Sharing functionality using native sharing option.
  Creation of formatted message and triggering of share action.
  */
  const onShare = async () => {
    try {
      const message = `Title: ${doc.Title}
      Version: ${doc.Version}
      Created: ${getRelativeTime(doc.CreatedAt)}
      Updated: ${getRelativeTime(doc.UpdatedAt)}
      Contributors: ${doc.Contributors.map(c => c.Name).join(', ')}
      Attachments: ${doc.Attachments.join(', ')}`;
      const result = await Share.share({
        message: message,
        title: doc.Title,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Document shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing document:', error);
    }
  };
  return (
    <View style={[styles.card, isGrid && styles.cardGrid]}>
      <View style={[styles.header, isGrid && styles.headerGrid]}>
        {!isGrid && (
          <TouchableOpacity onPress={onShare}>
            <Icon name="share" color={Colors.filledIcon} size={16} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {doc.Title}
          </Text>
        </View>

        <Text style={styles.version}>Version {doc.Version}</Text>
      </View>

      {!isGrid && (
        <View style={styles.infoRow}>
          <View style={styles.column}>
            <View style={styles.section}>
              <Icon name="users" color={Colors.textSecondary} size={12} />
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
              <Icon name="link" color={Colors.textSecondary} size={12} />
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
