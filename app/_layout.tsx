import { DEFAULT_BACKGROUND_COLOR } from '@/constants/Colors';
import { Stack } from 'expo-router/stack';

export default function Layout() {
  return <Stack screenOptions={{
    headerTitleAlign:'center',
    headerStyle: {backgroundColor:DEFAULT_BACKGROUND_COLOR},
  }}>
    <Stack.Screen
      name='index' 
      options={{
        title: 'List page',

      }}
      />
      <Stack.Screen
        name='edit-page' 
        options={{
          title: 'Edit page',
      }}
      />
      <Stack.Screen
        name='add-page' 
        options={{
          title: 'Add page',
      }}
      />
  </Stack>;
}