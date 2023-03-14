import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useState } from "react";

const images = [
  "/images/1.jpeg",
  "/images/2.jpeg",
  "/images/3.jpeg",
  "/images/4.jpeg",
  "/images/5.jpeg",
  "/images/6.jpeg",
];

export default function Page() {
  const [index, setIndex] = useState(0);

  return (
    // Change the duration to 0.5 seconds and set the ease to the ease-in-out
    // curve in the Framer Motion docs
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
                <img
                  key={i}
                  src={image}
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
        </div>
      </div>
    </MotionConfig>
  );
}
