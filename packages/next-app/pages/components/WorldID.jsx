import { WidgetProps } from "@worldcoin/id";
import dynamic from "next/dynamic";

const WorldIDWidget = dynamic(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);
const widgetProps = {
  actionId: "wid_staging_7919c463dab9a1b7ba9d4e836d4a6018",
  signal: "user-id-1",
  enableTelemetry: true,
  appName: "sobr",
  signalDescription: "Proof of Personhood",
  theme: "light",
  debug: true, // DO NOT SET TO `true` IN PRODUCTION
  onSuccess: (verificationResponse) => {
    console.log(verificationResponse);
    // call contract.verifyAndExecute(...result,tokenId)
  },
  onError: ({ code, detail }) => console.log({ code, detail }),
  onInitSuccess: () => console.log("Init successful"),
  onInitError: (error) => console.log("Error while initialization World ID", error),
};

export function WorldID() {
  return (
    <div>
      <header>
        {/* World ID component below */}
        <WorldIDWidget {...widgetProps} />
      </header>
    </div>
  );
}
