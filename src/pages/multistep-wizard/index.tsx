import MultiStepWizard from "./multistep-wizard";
import MultiStepWizardMotion from "./multistep-wizard-motion";

export default function MultiStepWizardPage(): JSX.Element {
  return (
    <div className="flex min-h-screen items-start bg-gradient-to-r from-blue-500 to-blue-600 pt-40">
      <div className="w-full flex flex-col gap-10">
        <h1 className="text-center text-2xl font-bold text-white">No animations</h1>
        <MultiStepWizard />
        <h1 className="text-center text-2xl font-bold text-white">With framer motion</h1>
        <MultiStepWizardMotion />
      </div>
    </div>
  );
}
