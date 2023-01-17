import React from "react";
import { Text, withTheme } from "react-native-paper";

import { Cleeps, CreateCleep } from "../components";
import { useStore } from "../context";
import { Actions } from "../context/reducer";
import storage from "../storage";

const Home = () => {
  const { state } = useStore();

  return <>{state.hasSession ? <Cleeps /> : <CreateCleep />}</>;
};

export default withTheme(Home);
