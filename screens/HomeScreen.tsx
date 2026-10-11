import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  user: { email: string };
  onLogout: () => void;
};

const ATALHOS = [
  { id: '1', icone: '📋', titulo: 'Tarefas', descricao: '5 pendentes' },
  { id: '2', icone: '📅', titulo: 'Agenda', descricao: '2 eventos hoje' },
  { id: '3', icone: '💬', titulo: 'Mensagens', descricao: '3 novas' },
  { id: '4', icone: '⚙️', titulo: 'Configurações', descricao: 'Preferências' },
];

export default function HomeScreen({ user, onLogout }: Props) {
  const nome = user.email.split('@')[0];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.ola}>Olá,</Text>
            <Text style={styles.nome}>{nome} 👋</Text>
          </View>
          <TouchableOpacity style={styles.sair} onPress={onLogout}>
            <Text style={styles.sairTexto}>Sair</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.destaque}>
          <Text style={styles.destaqueTitulo}>Tudo pronto!</Text>
          <Text style={styles.destaqueTexto}>
            Você entrou como {user.email}. Comece a construir o seu app a partir
            daqui.
          </Text>
        </View>

        <Text style={styles.secao}>Atalhos</Text>
        <View style={styles.grade}>
          {ATALHOS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.atalho}>
              <Text style={styles.atalhoIcone}>{item.icone}</Text>
              <Text style={styles.atalhoTitulo}>{item.titulo}</Text>
              <Text style={styles.atalhoDescricao}>{item.descricao}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f3f4f6' },
  container: { padding: 20, paddingTop: 40 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  ola: { fontSize: 14, color: '#6b7280' },
  nome: { fontSize: 24, fontWeight: '700', color: '#111827' },
  sair: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e5e7eb',
  },
  sairTexto: { color: '#374151', fontWeight: '600' },
  destaque: {
    backgroundColor: '#4f46e5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
  },
  destaqueTitulo: { color: '#fff', fontSize: 20, fontWeight: '700' },
  destaqueTexto: { color: '#e0e7ff', marginTop: 6, lineHeight: 20 },
  secao: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  grade: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  atalho: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  atalhoIcone: { fontSize: 28, marginBottom: 8 },
  atalhoTitulo: { fontSize: 15, fontWeight: '600', color: '#111827' },
  atalhoDescricao: { fontSize: 12, color: '#6b7280', marginTop: 2 },
});