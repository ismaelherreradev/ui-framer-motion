import MultiStepWizardMotion from "./multistep-wizard-motion";

export default function MultiStepWizardPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-600 px-4 pt-20">
      <div className="flex w-full flex-wrap justify-center gap-16">
        <div className="w-full max-w-md">
          <MultiStepWizardMotion />
        </div>
      </div>
    </div>
  );
}
