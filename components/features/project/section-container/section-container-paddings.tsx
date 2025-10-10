"use client";

import { Padding } from "./section-container";
import SectionContainerPadding from "./section-container-padding";

type Props = {
  paddings: Padding;
  onPaddingChange: (callback: (state: Padding) => Padding) => void;
};

const SectionContainerPaddings = ({
  paddings: {
    paddingTop, paddingBottom
  },
  onPaddingChange
}: Props) => {
  return (
    <>
    <SectionContainerPadding
        position="top"
        padding={paddingTop}
        onIncrement={() => {
          onPaddingChange((prev) => ({
            ...prev,
            paddingTop: prev.paddingTop + 10,
          }));
        }}
        onDecrement={() => {
          onPaddingChange((prev) => ({
            ...prev,
            paddingTop: prev.paddingTop - 10,
          }));
        }}
      />
      <SectionContainerPadding
        position="bottom"
        padding={paddingBottom}
        onIncrement={() => {
          onPaddingChange((prev) => ({
            ...prev,
            paddingBottom: prev.paddingBottom + 10,
          }));
        }}
        onDecrement={() => {
          onPaddingChange((prev) => ({
            ...prev,
            paddingBottom: prev.paddingBottom - 10,
          }));
        }}
      />
    </>
  );
};

export default SectionContainerPaddings;
