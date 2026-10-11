import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  onLogin: (email: string) => void;
};

const EMAIL_VALIDO = 'expo@email.com';
const SENHA_VALIDA = '123456';

export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async () => {
    setErro('');

    if (!email.trim() || !senha) {
      setErro('Preencha o e-mail e a senha.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErro('Digite um e-mail válido.');
      return;
    }
    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setCarregando(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setCarregando(false);

    if (email.trim().toLowerCase() !== EMAIL_VALIDO || senha !== SENHA_VALIDA) {
      setErro('E-mail ou senha incorretos.');
      return;
    }

    onLogin(email.trim());
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.titulo}>Bem-vindo 👋</Text>
        <Text style={styles.subtitulo}>Entre na sua conta para continuar</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="expo@email.com"
          placeholderTextColor="#9ca3af"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Senha</Text>
        <View style={styles.senhaContainer}>
          <TextInput
            style={[styles.input, styles.senhaInput]}
            placeholder="••••••••"
            placeholderTextColor="#9ca3af"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.mostrar}
            onPress={() => setMostrarSenha(!mostrarSenha)}
          >
            <Text style={styles.mostrarTexto}>
              {mostrarSenha ? 'Ocultar' : 'Mostrar'}
            </Text>
          </TouchableOpacity>
        </View>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <TouchableOpacity
          style={[styles.botao, carregando && styles.botaoDesabilitado]}
          onPress={entrar}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  titulo: { fontSize: 26, fontWeight: '700', color: '#111827' },
  subtitulo: { fontSize: 14, color: '#6b7280', marginTop: 4, marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    marginBottom: 16,
  },
  senhaContainer: { position: 'relative' },
  senhaInput: { paddingRight: 80 },
  mostrar: { position: 'absolute', right: 14, top: 13 },
  mostrarTexto: { color: '#4f46e5', fontWeight: '600', fontSize: 13 },
  erro: { color: '#dc2626', fontSize: 13, marginBottom: 12 },
  botao: {
    backgroundColor: '#4f46e5',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  botaoDesabilitado: { opacity: 0.7 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '600' },
  link: {
    color: '#4f46e5',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 13,
    fontWeight: '500',
  },
});