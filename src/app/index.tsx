import BookingScreen from './booking';
import { LogBox } from 'react-native';

// Ignore the LayoutAnimation warning for the New Architecture
LogBox.ignoreLogs(['setLayoutAnimationEnabledExperimental']);

export default function Home() {
  return <BookingScreen />;
}
