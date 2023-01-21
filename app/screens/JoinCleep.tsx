import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
// import { BarCodeScanner } from "expo-barcode-scanner";
import tw from "../twrnc";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  // useEffect(() => {
  //   const getBarCodeScannerPermissions = async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(Boolean(status === "granted"));
  //   };

  //   getBarCodeScannerPermissions();
  // }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={tw`flex-1`}>
      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      /> */}
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
