// useConfigureGoogleSignIn.js
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const useConfigureGoogleSignIn = () => {
  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
      webClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    });
  }, []);
};

export default useConfigureGoogleSignIn;
