import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type RequestStatus = 'waiting' | 'in_progress' | 'completed';

interface RequestItem {
  id: string;
  type: 'report' | 'help';
  title: string;
  description: string;
  status: RequestStatus;
  iconName: string;
  iconColor: string;
  details?: string[];
}

const requests: RequestItem[] = [
  {
    id: '1',
    type: 'report',
    title: 'Problema Relatado',
    description: 'Buraco na Rua Marechal Floriano',
    status: 'waiting',
    iconName: 'mail',
    iconColor: '#009688',
  },
  {
    id: '2',
    type: 'report',
    title: 'Problema Relatado',
    description: 'Iluminação fraca na Praça XV',
    status: 'completed',
    iconName: 'mail',
    iconColor: '#009688',
  },
  {
    id: '3',
    type: 'help',
    title: 'Pedido de Ajuda',
    description: 'Pessoa machucada em briga de trânsito',
    status: 'in_progress',
    iconName: 'warning',
    iconColor: '#FFC107',
    details: [
      'Ambulância enviada',
      'Polícia enviada',
      'Localização enviada via GPS',
    ],
  },
];

const statusConfig = {
  waiting: {
    label: 'Esperando Análise',
    color: '#F44336',
    icon: 'remove',
  },
  in_progress: {
    label: 'Em andamento',
    color: '#FF9800',
    icon: 'remove',
  },
  completed: {
    label: 'Concluído',
    color: '#4CAF50',
    icon: 'checkmark',
  },
};

export default function MyRequestsScreen() {
  const handleBack = () => {
    router.back();
  };

  const handleDelete = (id: string) => {
    // TODO: Implementar lógica de exclusão
    console.log('Deletar solicitação:', id);
  };

  const getStatusIndicator = (status: RequestStatus) => {
    const config = statusConfig[status];
    return (
      <View style={[styles.statusIndicator, { backgroundColor: config.color }]}>
        <Ionicons name={config.icon as any} size={16} color="#FFFFFF" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Suas Solicitações</Text>
          <Text style={styles.headerSubtitle}>
            Acompanhe suas solicitações em tempo real!
          </Text>
        </View>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Status Legend */}
        <View style={styles.statusLegend}>
          <View style={styles.statusLegendItem}>
            <View style={[styles.statusLegendIndicator, { backgroundColor: '#F44336' }]}>
              <Ionicons name="remove" size={12} color="#FFFFFF" />
            </View>
            <Text style={styles.statusLegendText}>Esperando Análise</Text>
          </View>
          <View style={styles.statusLegendItem}>
            <View style={[styles.statusLegendIndicator, { backgroundColor: '#FF9800' }]}>
              <Ionicons name="remove" size={12} color="#FFFFFF" />
            </View>
            <Text style={styles.statusLegendText}>Em andamento</Text>
          </View>
          <View style={styles.statusLegendItem}>
            <View style={[styles.statusLegendIndicator, { backgroundColor: '#4CAF50' }]}>
              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
            </View>
            <Text style={styles.statusLegendText}>Concluído</Text>
          </View>
        </View>

        {/* Requests List */}
        <View style={styles.requestsList}>
          {requests.map((request, index) => (
            <View key={request.id}>
              <View style={styles.requestItem}>
                <View style={[styles.requestIconContainer, { backgroundColor: `${request.iconColor}20` }]}>
                  <Ionicons
                    name={request.iconName as any}
                    size={24}
                    color={request.iconColor}
                  />
                </View>
                <View style={styles.requestContent}>
                  <Text style={styles.requestTitle}>{request.title}</Text>
                  <Text style={styles.requestDescription}>{request.description}</Text>
                  {request.details && request.details.length > 0 && (
                    <View style={styles.requestDetails}>
                      {request.details.map((detail, detailIndex) => (
                        <Text key={detailIndex} style={styles.requestDetailItem}>
                          • {detail}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
                <View style={styles.requestActions}>
                  <TouchableOpacity
                    onPress={() => handleDelete(request.id)}
                    style={styles.deleteButton}>
                    <Ionicons name="trash" size={20} color="#666" />
                  </TouchableOpacity>
                  {getStatusIndicator(request.status)}
                </View>
              </View>
              {index < requests.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    padding: 5,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  headerRightPlaceholder: {
    width: 34,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  statusLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  statusLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLegendIndicator: {
    width: 16,
    height: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  statusLegendText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  requestsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  requestIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  requestContent: {
    flex: 1,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  requestDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  requestDetails: {
    marginTop: 4,
  },
  requestDetailItem: {
    fontSize: 13,
    color: '#F44336',
    marginBottom: 2,
    lineHeight: 18,
  },
  requestActions: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 8,
  },
  deleteButton: {
    padding: 8,
    marginBottom: 8,
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginLeft: 68,
  },
});

