import {Stack} from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="[SearchSlot]"
        options={{
          headerTitle: 'Search',
        }}
      />
      <Stack.Screen
        name="FilterPage"
        options={{
          headerTitle: 'Filter',
        }}
      />
    </Stack>
  );
}
