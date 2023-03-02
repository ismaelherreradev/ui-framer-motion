import MultiStepWizard from "./multistep-wizard";
import MultiStepWizardMotion from "./multistep-wizard-motion";

export default function MultiStepWizardPage(): JSX.Element {
  return (
    <div className="px-10 min-h-screen bg-gradient-to-r from-blue-500 to-blue-600 pt-20">
      <div className="flex flex-wrap w-full justify-center gap-16">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-5">Base</h1>
          <MultiStepWizard />
        </div>
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-5">With framer motion</h1>
          <MultiStepWizardMotion />
        </div>
      </div>
    </div>
  );
}
