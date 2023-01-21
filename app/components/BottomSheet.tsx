import React from "react";

// import BottomSheetBackDrop from "./BottomSheetBackDrop";
// import BottomSheetHeader from "./BottomSheetHeader";

import {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";

import tw from "../twrnc";
import { View } from "react-native";

const BottomSheet = ({
  bottomSheetModalRef,
  children,
  onDismiss,
}: {
  bottomSheetModalRef: React.Ref<BottomSheetModal>;
  children: React.ReactNode;
  onDismiss?: () => void;
}) => {
  const initialSnapPoints = React.useMemo(() => ["CONTENT_HEIGHT"], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      backdropComponent={BottomSheetBackDrop}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      snapPoints={animatedSnapPoints}
      enablePanDownToClose
      enableDismissOnClose
      handleIndicatorStyle={tw`bg-black dark:bg-white`}
      style={tw`rounded-t-3xl overflow-hidden`}
      onDismiss={onDismiss}
      backgroundComponent={({ style }) => (
        <View style={[style, tw`dark:bg-black bg-white`]} />
      )}
    >
      <BottomSheetView
        style={tw`dark:bg-black bg-white`}
        onLayout={handleContentLayout}
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomSheet;

const BottomSheetBackDrop = (props: BottomSheetBackdropProps) => {
  return (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );
};
