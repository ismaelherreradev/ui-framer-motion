import {
  useScroll,
  motion,
  useMotionValueEvent,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function useBoundedScroll(bounds: number) {
  // Get the scrollY motion value from Framer motion
  let { scrollY } = useScroll();

  // Create a motion value that will be the bounded scroll
  let srollYBounded = useMotionValue(0);

  // Create a motion value that will be the bounded scroll progress
  let scrollYBoundedProgress = useTransform(srollYBounded, [0, bounds], [0, 1]);

  // Subscribe to the scrollY motion value changes
  useMotionValueEvent(scrollY, "change", (currentValue) => {
    // Get the previous scrollY value
    let previusValue = scrollY.getPrevious();

    // Calculate the difference between the current and previous values
    let diff = currentValue - previusValue;

    // Calculate the new scrollY bounded value
    let newScrollBounded = srollYBounded.get() + diff;

    // Set the new bounded scroll value
    srollYBounded.set(clamp(newScrollBounded, 0, bounds));
  });

  return { srollYBounded, scrollYBoundedProgress };
}

export default function Header() {
  // get scroll progress
  let { scrollYBoundedProgress } = useBoundedScroll(400);
  // get scroll progress, but only when it's over 75%
  let scrollYBoundedProgressThrotted = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  );

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden text-slate-600">
      <div className="z-0 flex-1 overflow-y-scroll">
        <motion.header
          style={{
            // The height of the header is animated based on the scroll progress.
            height: useTransform(
              scrollYBoundedProgressThrotted,
              [0, 1],
              [80, 50]
            ),
            // The background color of the header is set to white with a
            // transparency based on the scroll progress.
            backgroundColor: useMotionTemplate`rgb(255 255 255 / ${useTransform(
              scrollYBoundedProgressThrotted,
              [0, 1],
              [1, 0.1]
            )})`,
          }}
          className="fixed inset-x-0 flex h-20 shadow backdrop-blur-md"
        >
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
            <motion.p
              style={{
                // Scale the content up and down
                scale: useTransform(
                  scrollYBoundedProgressThrotted,
                  [0, 1],
                  [1, 0.9]
                ),
              }}
              className="flex origin-left items-center text-xl font-semibold uppercase"
            >
              <span className="-ml-1.5 inline-block -rotate-90 text-[10px] leading-[0]">
                The
              </span>
              <span className="-ml-1 text-2xl tracking-[-.075em]">
                Boring Header
              </span>
            </motion.p>
            <motion.nav
              style={{
                opacity: useTransform(
                  scrollYBoundedProgressThrotted,
                  [0, 1],
                  [1, 0]
                ),
              }}
              className="flex space-x-4 text-xs font-medium text-slate-400"
            >
              <a href="#">News</a>
              <a href="#">Sports</a>
              <a href="#">Culture</a>
            </motion.nav>
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
