import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

type User = { email: string };

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <StatusBar style="auto" />
      {user ? (
        <HomeScreen user={user} onLogout={() => setUser(null)} />
      ) : (
        <LoginScreen onLogin={(email) => setUser({ email })} />
      )}
    </>
  );
}