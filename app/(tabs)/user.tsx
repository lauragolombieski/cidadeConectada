import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
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
import { userAPI } from '../../services/api';

export default function UserScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    cpf: '',
    cep: '',
    fullAddress: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoadingProfile(true);
      const response = await userAPI.getProfile();
      if (response.user) {
        setFormData({
          fullName: response.user.full_name || '',
          phoneNumber: response.user.phone_number || '',
          email: response.user.email || '',
          cpf: response.user.cpf || '',
          cep: response.user.cep || '',
          fullAddress: response.user.full_address || '',
        });
      }
    } catch (error: any) {
      console.error('Erro ao carregar perfil:', error);
      Alert.alert('Erro', error.message || 'Erro ao carregar perfil');
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.fullName.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o nome completo');
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o email');
      return;
    }

    if (!formData.phoneNumber.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o número de telefone');
      return;
    }

    if (!formData.cpf.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o CPF');
      return;
    }

    if (!formData.cep.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o CEP');
      return;
    }

    if (!formData.fullAddress.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o endereço completo');
      return;
    }

    try {
      setIsLoading(true);

      await userAPI.updateProfile({
        full_name: formData.fullName.trim(),
        phone_number: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        cpf: formData.cpf.trim(),
        cep: formData.cep.trim(),
        full_address: formData.fullAddress.trim(),
      });

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao salvar perfil:', error);
      Alert.alert('Erro', error.message || 'Erro ao salvar perfil. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowPasswordModal(true);
  };

  const handleSavePassword = async () => {
    if (!passwordData.currentPassword) {
      Alert.alert('Erro', 'Por favor, preencha a senha atual');
      return;
    }

    if (!passwordData.newPassword) {
      Alert.alert('Erro', 'Por favor, preencha a nova senha');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      setIsChangingPassword(true);

      await userAPI.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      Alert.alert('Sucesso', 'Senha alterada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            setShowPasswordModal(false);
            setPasswordData({
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            });
          },
        },
      ]);
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      Alert.alert('Erro', error.message || 'Erro ao alterar senha. Tente novamente.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleCancelPasswordChange = () => {
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Perfil</Text>
          <TouchableOpacity style={styles.userIconButton}>
            <Ionicons name="person" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          
          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#999"
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              autoCapitalize="words"
            />
          </View>

          {/* Phone Number Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Número de Telefone</Text>
            <TextInput
              style={styles.input}
              placeholder="Número de Telefone"
              placeholderTextColor="#999"
              value={formData.phoneNumber}
              onChangeText={(value) => handleInputChange('phoneNumber', value)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Endereço de E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#999"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* CPF Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="CPF"
              placeholderTextColor="#999"
              value={formData.cpf}
              onChangeText={(value) => handleInputChange('cpf', value)}
              keyboardType="numeric"
              maxLength={11}
            />
          </View>

          {/* CEP Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CEP</Text>
            <TextInput
              style={styles.input}
              placeholder="CEP"
              placeholderTextColor="#999"
              value={formData.cep}
              onChangeText={(value) => handleInputChange('cep', value)}
              keyboardType="numeric"
              maxLength={8}
            />
          </View>

          {/* Full Address Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Endereço Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Rua, Av, Trav..."
              placeholderTextColor="#999"
              value={formData.fullAddress}
              onChangeText={(value) => handleInputChange('fullAddress', value)}
              autoCapitalize="words"
            />
          </View>

          {/* Change Password Link */}
          <TouchableOpacity onPress={handleChangePassword} style={styles.changePasswordContainer}>
            <Text style={styles.changePasswordText}>Modificar minha senha</Text>
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity 
            style={[styles.saveButton, (isLoading || isLoadingProfile) && styles.saveButtonDisabled]} 
            onPress={handleSave}
            disabled={isLoading || isLoadingProfile}>
            <Text style={styles.saveButtonText}>
              {isLoading ? 'Salvando...' : isLoadingProfile ? 'Carregando...' : 'Salvar'}
            </Text>
          </TouchableOpacity>

          {/* Logo at Bottom */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/assinatura.png')}
              style={styles.logoImage}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal de Alteração de Senha */}
      <Modal
        visible={showPasswordModal}
        transparent
        animationType="slide"
        onRequestClose={handleCancelPasswordChange}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalKeyboardView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Alterar Senha</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha Atual</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite sua senha atual"
                  placeholderTextColor="#999"
                  value={passwordData.currentPassword}
                  onChangeText={(value) =>
                    setPasswordData((prev) => ({ ...prev, currentPassword: value }))
                  }
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nova Senha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Digite a nova senha"
                  placeholderTextColor="#999"
                  value={passwordData.newPassword}
                  onChangeText={(value) =>
                    setPasswordData((prev) => ({ ...prev, newPassword: value }))
                  }
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirme a Nova Senha</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirme a nova senha"
                  placeholderTextColor="#999"
                  value={passwordData.confirmPassword}
                  onChangeText={(value) =>
                    setPasswordData((prev) => ({ ...prev, confirmPassword: value }))
                  }
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonCancel]}
                  onPress={handleCancelPasswordChange}
                  disabled={isChangingPassword}>
                  <Text style={styles.modalButtonCancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.modalButtonSave,
                    isChangingPassword && styles.modalButtonDisabled,
                  ]}
                  onPress={handleSavePassword}
                  disabled={isChangingPassword}>
                  <Text style={styles.modalButtonSaveText}>
                    {isChangingPassword ? 'Alterando...' : 'Salvar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfafaff',
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
    backgroundColor: '#ffffffff',
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
  userIconButton: {
    padding: 5,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffffff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  changePasswordContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  changePasswordText: {
    fontSize: 14,
    color: '#0a7ea4',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  logoImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalKeyboardView: {
    width: '100%',
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
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
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  modalButtonSave: {
    backgroundColor: '#FFD700',
  },
  modalButtonDisabled: {
    opacity: 0.6,
  },
  modalButtonCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  modalButtonSaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
