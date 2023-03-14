import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState } from "react";

// @ts-ignore
import useKeyPress from "react-use-keypress";

const images = [
  "/images/1.jpeg",
  "/images/2.jpeg",
  "/images/3.jpeg",
  "/images/4.jpeg",
  "/images/5.jpeg",
  "/images/6.jpeg",
];

const collapsedAspectRatio = 1 / 2;
const fullAspectRatio = 3 / 2;
const margin = 12;
const gap = 2;

export default function Page() {
  const [index, setIndex] = useState(0);

  useKeyPress("ArrowRight", () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  });

  useKeyPress("ArrowLeft", () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  });

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="h-screen bg-black">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div
              // Animate the slider to the left by the index of the slide multiplied by 100%
              // which will be the width of the slider
              animate={{ x: `-${index * 100}%` }}
              // Transition the slider to the left by the index of the slide multiplied by 100%
              className="flex"
            >
              {images.map((image, i) => (
                <motion.img
                  key={i}
                  src={image}
                  animate={{ opacity: i === index ? 1 : 0.3 }}
                  className="aspect-[3/2] object-cover"
                />
              ))}
            </motion.div>

            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  // Set the initial opacity to 0
                  initial={{ opacity: 0 }}
                  // Make the opacity 0.7 when the animation starts
                  animate={{ opacity: 0.7 }}
                  // Make the opacity 0 when the animation ends
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  // Make the opacity 1 when the mouse hovers over the item
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white hover:bg-white/80"
                  onClick={() => setIndex(index - 1)}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  // Set the initial opacity to 0
                  initial={{ opacity: 0 }}
                  // Make the opacity 0.7 when the animation starts
                  animate={{ opacity: 0.7 }}
                  // Make the opacity 0 when the animation ends
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  // Make the opacity 1 when the mouse hovers over the item
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white hover:bg-white/80"
                  onClick={() => setIndex(index + 1)}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <div className="absolute inset-x-0 bottom-6 flex h-28 justify-center overflow-hidden">
            <motion.div
              initial={false}
              animate={{
                x: `-${
                  // calculate the total width of the previous items
                  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
                  // add the margin for the current item
                  margin +
                  // add the gap for the current item
                  index +
                  gap
                }%`,
              }}
              style={{
                // set the aspect ratio for the current item
                aspectRatio: fullAspectRatio,
                // set the gap between items
                gap: `${gap}%`,
              }}
              className="flex h-14"
            >
              {images.map((image, i) => (
                <motion.button
                  initial={false}
                  className="shrink-0"
                  key={image}
                  whileHover={{ opacity: 1 }}
                  animate={i === index ? "active" : "inactive"}
                  onClick={() => setIndex(i)}
                  variants={{
                    /* 1. Declare the `active` and `inactive` variants. */
                    active: {
                      /* 2. Set the `active` variant to use the `fullAspectRatio`. */
                      aspectRatio: fullAspectRatio,
                      /* 3. Set the `active` variant to use the `margin`. */
                      marginLeft: `${margin}%`,
                      marginRight: `${margin}%`,
                      /* 4. Set the `active` variant to use an opacity of 1. */
                      opacity: 1,
                    },
                    inactive: {
                      /* 5. Set the `inactive` variant to use the `collapsedAspectRatio`. */
                      aspectRatio: collapsedAspectRatio,
                      /* 6. Set the `inactive` variant to use zero margins. */
                      marginLeft: 0,
                      marginRight: 0,
                      /* 7. Set the `inactive` variant to use an opacity of 0.5. */
                      opacity: 0.5,
                    },
                  }}
                >
                  <img
                    src={image}
                    className="aspect-[3/2] h-full object-cover"
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
