import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { requestAPI } from '../services/api';

type ServiceType = 'report' | 'help' | 'feedback' | null;

export default function CitizenServiceScreen() {
  const [activeService, setActiveService] = useState<ServiceType>(null);
  const [reportText, setReportText] = useState('');
  const [helpText, setHelpText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [requestAmbulance, setRequestAmbulance] = useState(false);
  const [requestPolice, setRequestPolice] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleServiceSelect = (service: ServiceType) => {
    setActiveService(service);
  };

  const handleSend = async () => {
    if (!activeService) {
      Alert.alert('Erro', 'Por favor, selecione um serviço');
      return;
    }

    try {
      setIsLoading(true);

      let requestData: any = {
        type: activeService,
      };

      switch (activeService) {
        case 'report':
          if (!reportText.trim()) {
            Alert.alert('Erro', 'Por favor, descreva o problema');
            setIsLoading(false);
            return;
          }
          requestData.description = reportText.trim();
          break;

        case 'help':
          if (!helpText.trim()) {
            Alert.alert('Erro', 'Por favor, descreva sua situação');
            setIsLoading(false);
            return;
          }
          requestData.description = helpText.trim();
          requestData.request_ambulance = requestAmbulance ? 1 : 0;
          requestData.request_police = requestPolice ? 1 : 0;
          break;

        case 'feedback':
          if (!feedbackText.trim()) {
            Alert.alert('Erro', 'Por favor, escreva seu feedback');
            setIsLoading(false);
            return;
          }
          requestData.feedback_text = feedbackText.trim();
          break;
      }

      await requestAPI.create(requestData);

      setShowModal(true);
      
      setReportText('');
      setHelpText('');
      setFeedbackText('');
      setRequestAmbulance(false);
      setRequestPolice(false);
    } catch (error: any) {
      console.error('Erro ao enviar solicitação:', error);
      Alert.alert(
        'Erro',
        error.message || 'Erro ao enviar solicitação. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setActiveService(null);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Atendimento ao cidadão</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          
          <Text style={styles.selectServiceText}>Selecione um serviço</Text>

          {/* Card 1: Relatar problema */}
          <View style={[styles.serviceCard, activeService === 'report' && styles.activeCard]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconPlaceholder, styles.greenIcon]}>
                <Ionicons name="mail" size={24} color="#4CAF50" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Relatar problema</Text>
                <Text style={styles.cardDescription}>
                  Algum lugar da cidade precisa de reparos? Nos avise!
                </Text>
              </View>
            </View>

            {activeService === 'report' && (
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Realizar solicitação</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Descreva o problema..."
                    placeholderTextColor="#999"
                    value={reportText}
                    onChangeText={setReportText}
                    multiline
                  />
                  {reportText.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setReportText('')}
                      style={styles.clearButton}>
                      <Ionicons name="close-circle" size={20} color="#999" />
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity 
                  style={[styles.sendButton, isLoading && styles.sendButtonDisabled]} 
                  onPress={handleSend}
                  disabled={isLoading}>
                  <Text style={styles.sendButtonText}>
                    {isLoading ? 'Enviando...' : 'Enviar'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {activeService !== 'report' && (
              <TouchableOpacity
                style={styles.cardTouchable}
                onPress={() => handleServiceSelect('report')}
                activeOpacity={0.7}
              />
            )}
          </View>

          {/* Card 2: Preciso de ajuda */}
          <View style={[styles.serviceCard, activeService === 'help' && styles.activeCard]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconPlaceholder, styles.yellowIcon]}>
                <Ionicons name="warning" size={24} color="#FFC107" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Preciso de ajuda!</Text>
                <Text style={styles.cardDescription}>
                  Você pode solicitar ajuda médica ou policial por aqui.
                </Text>
              </View>
            </View>

            {activeService === 'help' && (
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Realizar solicitação</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Descreva sua situação..."
                    placeholderTextColor="#999"
                    value={helpText}
                    onChangeText={setHelpText}
                    multiline
                  />
                  {helpText.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setHelpText('')}
                      style={styles.clearButton}>
                      <Ionicons name="close-circle" size={20} color="#999" />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setRequestAmbulance(!requestAmbulance)}>
                    <View style={[styles.checkboxBox, requestAmbulance && styles.checkboxChecked]}>
                      {requestAmbulance && (
                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                      )}
                    </View>
                    <Text style={styles.checkboxLabel}>Solicitar ambulância</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setRequestPolice(!requestPolice)}>
                    <View style={[styles.checkboxBox, requestPolice && styles.checkboxChecked]}>
                      {requestPolice && (
                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                      )}
                    </View>
                    <Text style={styles.checkboxLabel}>Solicitar polícia</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  style={[styles.sendButton, isLoading && styles.sendButtonDisabled]} 
                  onPress={handleSend}
                  disabled={isLoading}>
                  <Text style={styles.sendButtonText}>
                    {isLoading ? 'Enviando...' : 'Enviar'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {activeService !== 'help' && (
              <TouchableOpacity
                style={styles.cardTouchable}
                onPress={() => handleServiceSelect('help')}
                activeOpacity={0.7}
              />
            )}
          </View>

          {/* Card 3: Fornecer feedback */}
          <View style={[styles.serviceCard, activeService === 'feedback' && styles.activeCard]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconPlaceholder, styles.greenIcon]}>
                <Ionicons name="document-text" size={24} color="#4CAF50" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Fornecer feedback</Text>
                <Text style={styles.cardDescription}>
                  Avalie o atendimento e o aplicativo.
                </Text>
              </View>
            </View>

            {activeService === 'feedback' && (
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Realizar feedback</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Escreva seu feedback..."
                    placeholderTextColor="#999"
                    value={feedbackText}
                    onChangeText={setFeedbackText}
                    multiline
                  />
                  {feedbackText.length > 0 && (
                    <TouchableOpacity
                      onPress={() => setFeedbackText('')}
                      style={styles.clearButton}>
                      <Ionicons name="close-circle" size={20} color="#999" />
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity 
                  style={[styles.sendButton, isLoading && styles.sendButtonDisabled]} 
                  onPress={handleSend}
                  disabled={isLoading}>
                  <Text style={styles.sendButtonText}>
                    {isLoading ? 'Enviando...' : 'Enviar'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {activeService !== 'feedback' && (
              <TouchableOpacity
                style={styles.cardTouchable}
                onPress={() => handleServiceSelect('feedback')}
                activeOpacity={0.7}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de Confirmação */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notificação de solicitação</Text>
            <Text style={styles.modalMessage}>
              Solicitação enviada com sucesso, dentro de alguns minutos sua solicitação será
              atualizada!
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonOk]}
                onPress={handleCloseModal}>
                <Text style={styles.modalButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardView: {
    flex: 1,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'left',
  },
  headerPlaceholder: {
    width: 34,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  selectServiceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeCard: {
    borderWidth: 2,
    borderColor: 'rgb(177 177 48)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  greenIcon: {
    backgroundColor: '#E8F5E9',
  },
  yellowIcon: {
    backgroundColor: '#FFF9C4',
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
  inputSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 40,
    maxHeight: 120,
  },
  clearButton: {
    padding: 4,
  },
  checkboxContainer: {
    marginBottom: 16,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: 'rgb(177 177 48)',
    borderColor: 'rgb(177 177 48)',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    backgroundColor: 'rgb(177 177 48)',
    borderRadius: 25,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonOk: {
    backgroundColor: 'rgb(177, 177, 48)',
  },
  modalButtonCancel: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalButtonCancelText: {
    color: '#333',
  },
});

