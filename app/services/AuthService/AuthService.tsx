// AuthService.js
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';

// Configure Google Sign In
GoogleSignin.configure({
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
});

// Function to sign in
export const signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
        return userInfo;
    } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // Handle sign-in cancelled case
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // Handle in-progress case
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // Handle play services not available case
        } else {
            // Handle other errors
        }
        throw error; // Rethrow the error if you need to handle it in the calling component
    }
};

// Function to check if the user is signed in
export const isSignedIn = async () => {
    return await GoogleSignin.isSignedIn();
};

// Function to get the current user
export const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log(currentUser);
    return currentUser;
};

// Function to sign out
export const signOut = async () => {
    try {
        await GoogleSignin.signOut();
        console.log("signed out")
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error if needed
    }
};


export const GoogleSignInButton = () => {
  return(
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
    />
  )
}