import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';
import CustomHeader from './src/components/CustomHeader';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { io } from "socket.io-client";

function App(): React.JSX.Element {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const socket = io("https://de7e-178-148-161-88.ngrok-free.app", {
      jsonp: false,
      transports: ['websocket'],
    });
  
    socket.on("connect", () => {
      console.log('Connected to server');
      socket.emit('message', 'Hello from React Native!');
    });
  
    socket.on("disconnect", (reason) => {
      console.log('Disconnected: ', reason);
    });
  
    socket.on("connect_error", (error) => {
      console.error('Connection Error: ', error);
    });
  
    // Listen for custom events
    socket.on("weather_update", (data) => {
      console.log(data);
      PushNotificationIOS.addNotificationRequest({
        id: '1',
        title: 'Weather Wizzard',
        body: data.message,
      });
    });
  
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';
  const [subscribed, setSubscribed] = useState(false);

  const toggleSubscription = async () => {
    const observerId = 'unique_observer_id';

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: observerId, alert_type: 'rain' })
    };

    if (!isSubscribed) {
      const response = await fetch('https://de7e-178-148-161-88.ngrok-free.app/api/subscribe', requestOptions);
      if (response.ok) {
        alert('Subscribed for updates!');
      }
    } else {
      // Unsubscribe logic
      const response = await fetch('https://de7e-178-148-161-88.ngrok-free.app/api/unsubscribe', requestOptions);
      alert('Unsubscribed from updates!');
    }
    setIsSubscribed(!isSubscribed);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#0D6EFD' : '#FFDD59', // Example vibrant colors
  };

  const [notification] = useState('');

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <CustomHeader />
        <View style={[styles.container, { backgroundColor: backgroundStyle.backgroundColor }]}>
          <Button 
            title={isSubscribed ? "Stop Receiving Rain Updates" : "Get Rain Updates"}
            onPress={toggleSubscription}
            color={isSubscribed ? '#B0BEC5' : '#FFB830'}
          />
          {notification ? <Text>Notification: {notification}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
