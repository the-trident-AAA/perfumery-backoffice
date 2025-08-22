import { RHFListField } from "@/components/form/rhf-components/rhf-list-field/rhf-list-field";
import React from "react";
import StackStatisticalTip from "../../stacks/stack-statistical-tip";
import StackInformationTip from "../../stacks/stack-information-tip";

export default function HomeBannerAdditionalInformationSection() {
  return (
    <div className="flex flex-col gap-4">
      <RHFListField<{ statistics: string; info: string }>
        name="statisticalTips"
        label="Tips Estadísticos"
        StackComponent={StackStatisticalTip}
        newItem={{
          statistics: "",
          info: "",
        }}
      />
      <RHFListField<{ name: string }>
        name="infoTips"
        label="Tips Informativos"
        StackComponent={StackInformationTip}
        newItem={{
          name: "",
        }}
      />
    </div>
  );
}
