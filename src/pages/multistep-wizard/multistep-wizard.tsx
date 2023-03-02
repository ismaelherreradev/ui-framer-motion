import { useState } from "react";
import { clsx } from "clsx";

type StepProps = {
  step: number;
  currentStep: number;
};

function Step({ step, currentStep }: StepProps): JSX.Element {
  let status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  return (
    <div
      className={clsx("relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold", {
        "border-blue-500 bg-white text-blue-500": status === "active",
        "border-blue-500 bg-blue-500": status === "complete",
        "border-slate-200 bg-white text-slate-400": status === "inactive",
      })}
    >
      <div className="flex items-center justify-center">
        {status === "complete" ? <CheckIcon className="h-6 w-6 text-white" /> : <span>{step}</span>}
      </div>
    </div>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">): JSX.Element {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function MultiStepWizard() {
  let [step, setStep] = useState(1);

  return (
    <div className="w-full max-w-md rounded-2xl bg-white">
      <div className="flex justify-between rounded p-8">
        <Step step={1} currentStep={step} />
        <Step step={2} currentStep={step} />
        <Step step={3} currentStep={step} />
        <Step step={4} currentStep={step} />
      </div>
      <div className="px-8 pb-8">
        <div>
          <div className="mt-2 h-6 w-40 rounded bg-slate-100" />
          <div className="mt-4 space-y-2">
            <div className="h-4 w-5/6 rounded bg-slate-100" />
            <div className="h-4 rounded bg-slate-100" />
            <div className="h-4 w-4/6 rounded bg-slate-100" />
          </div>
        </div>

        <div className="mt-10 flex justify-between">
          <button
            onClick={() => setStep(step < 2 ? step : step - 1)}
            className="rounded px-2 py-1 text-slate-400 hover:text-slate-700"
          >
            Back
          </button>
          <button
            onClick={() => setStep(step > 4 ? step : step + 1)}
            className={clsx(
              "flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700",
              { "pointer-events-none opacity-50": step > 4 }
            )}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
