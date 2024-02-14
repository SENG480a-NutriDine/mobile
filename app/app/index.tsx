import { Redirect } from "expo-router";
import useConfigureGoogleSignIn from "../custom/useConfigureGoogleSignIn";

export default function Index() {
  useConfigureGoogleSignIn();
  return <Redirect href="/App" />;
}
