import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { Button } from 'react-native';
export const AuthService = () => {

    GoogleSignin.configure({
        iosClientId:'188208814441-v2nphv6ree54ij5jo4b33d12lj3us8df.apps.googleusercontent.com',
        webClientId: '188208814441-8u30auacid9g4d5pfjufaotqrgp53q1r.apps.googleusercontent.com',
    });
    
    const signIn: () => Promise<void> = async () =>{
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log(userInfo)
        } catch (error: any) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          } else if (error.code === statusCodes.IN_PROGRESS) {
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          } else {
          }
        }
    };

    const getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        console.log(currentUser)
        console.log("HELLLLO")
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