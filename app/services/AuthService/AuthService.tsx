import {
    GoogleSignin,
    GoogleSigninButton,
    User,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { Button } from 'react-native';


export const AuthService = () => {

    GoogleSignin.configure({
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    });
    
    const signIn: () => Promise<User | undefined> = async () =>{
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log(userInfo)
          return userInfo;
        } catch (error: any) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          } else if (error.code === statusCodes.IN_PROGRESS) {
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          } else {
          }
        }
    };

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        return isSignedIn;
    };

    const getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        console.log(currentUser)
        console.log("HELLLLO")
        return currentUser;
    };

    const signOut = async () => {
        try {
          await GoogleSignin.signOut();
        } catch (error) {
          console.error(error);
        }
    };
    
      
    return (
        <>
            <Button
            title="Google Sign-In"
            onPress={() => signIn().then(() => console.log('Signed in with Google!'))}
            />

            <Button
            title="Google current user"
            onPress={() => getCurrentUser().then(() => console.log('Signed in with Google!'))}
            />

            <Button
            title="Google Sign-out"
            onPress={() => signOut().then(() => console.log('Signed out from Google!'))}
            />
        </>
        );
}