import {
  useScroll,
  motion,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";

export default function Header() {
  // useScroll() hook returns the scrollY position.
  let { scrollY } = useScroll();
  // height is a MotionValue that will be used to animate the header height.
  let height = useMotionValue(80);

  useMotionValueEvent(scrollY, "change", (currentValue) => {
    // get the previous value of scrollY
    let previusValue = scrollY.getPrevious();
    // calculate how much the scrollY value changed
    let diff = currentValue - previusValue;
    // Get the current height of the window
    let newHeight = height.get() - diff;

    // Set the new height, but make sure it is within the allowed range
    height.set(Math.min(Math.max(newHeight, 50), 80));
  });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden text-slate-600">
      <div className="z-0 flex-1 overflow-y-scroll">
        <motion.header
          style={{ height }}
          className="fixed inset-x-0 flex h-20 bg-white shadow"
        >
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
            <p className="flex origin-left items-center text-xl font-semibold uppercase">
              <span className="-ml-1.5 inline-block -rotate-90 text-[10px] leading-[0]">
                The
              </span>
              <span className="-ml-1 text-2xl tracking-[-.075em]">
                Boring Header
              </span>
            </p>
            <nav className="flex space-x-4 text-xs font-medium text-slate-400">
              <a href="#">News</a>
              <a href="#">Sports</a>
              <a href="#">Culture</a>
            </nav>
          </div>
        </motion.header>

        <main className="px-8 pt-28">
          <h1 className="h-10 w-4/5 rounded bg-slate-200 text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {[...Array.from(Array(2).keys())].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
            <div className="h-64 rounded bg-slate-200"></div>
            {[...Array.from(Array(90).keys())].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-200" />
                <p className="h-4 rounded bg-slate-200" />
                <p className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
