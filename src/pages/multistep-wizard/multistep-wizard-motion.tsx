import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { clsx } from "clsx";

type StepProps = {
  step: number;
  currentStep: number;
};

const time = (value: number) => 1 * value;

const backgroundTransition = { duration: time(0.2) };
const backgroundVariants = {
  inactive: {
    background: "var(--white)",
    borderColor: "var(--slate-200)",
    color: "var(--slate-400)",
  },
  active: {
    background: "var(--white)",
    borderColor: "var(--blue-500)",
    color: "var(--blue-500)",
  },
  complete: {
    background: "var(--blue-500)",
    borderColor: "var(--blue-500)",
  },
};

const rippleTransition = {
  duration: time(0.6),
  delay: time(0.2),
  type: "tween",
  ease: "circOut",
};

const rippleVariants = {
  inactive: {
    background: "var(--blue-200)",
  },
  active: {
    background: "var(--blue-200)",
    scale: 1,
    transition: {
      duration: time(0.3),
      type: "tween",
      ease: "circOut",
    },
  },
  complete: {
    background: "var(--blue-200)",
    scale: 1.25,
  },
};

const checkIconTransition = {
  ease: "easeOut",
  type: "tween",
  delay: time(0.2),
  duration: time(0.3),
};

const checkIconVariants = {
  complete: {
    pathLength: [0, 1],
  },
};

function Step({ step, currentStep }: StepProps): JSX.Element {
  const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  return (
    <motion.div animate={status} className="relative">
      <motion.div
        variants={rippleVariants}
        transition={rippleTransition}
        className="absolute inset-0 rounded-full bg-blue-200"
      />
      <motion.div
        initial={false}
        variants={backgroundVariants}
        transition={backgroundTransition}
        className={clsx("relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold", {
          "border-blue-500 bg-white text-blue-500": status === "active",
          "border-blue-500 bg-blue-500": status === "complete",
          "border-slate-200 bg-white text-slate-400": status === "inactive",
        })}
      >
        <div className="relative flex items-center justify-center">
          <AnimatePresence>
            {status === "complete" ? (
              <CheckIcon className="h-6 w-6 text-white" />
            ) : (
              <motion.span key="step" animate={{ opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="absolute">
                {step}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">): JSX.Element {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <motion.path
        variants={checkIconVariants}
        transition={checkIconTransition}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

export default function MultiStepWizardMotion(): JSX.Element {
  const [step, setStep] = useState(1);

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
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
