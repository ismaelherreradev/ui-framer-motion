import { useState } from "react";
import { EnvelopeIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";

import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

let titles = [
  ["Apple's newest iPhone is here", "Watch our July event"],
  [
    "Nintendo's Newsletter for July",
    "Introducing Strike, a 5-on-5 soccer game",
  ],
  ["Your funds have been processed", "See your latest deposit online"],
  ["This Week in Sports", "The finals are heating up"],
  ["Changelog update", "Edge subroutines and more"],
  ["React Hawaii is here!", "Time for fun in the sun"],
];

let time = (value: number) => 1 * value;

export default function EmailClientMotion(): JSX.Element {
  // Create a state variable called `messages` and initialize it to an array
  // of numbers from 0 to 8, which is the length of the array minus 1.
  const [messages, setMessages] = useState<number[]>([
    ...Array.from(Array(9).keys()),
  ]);

  // Set the initial state of the selected messages to an empty array
  const [selectedMessage, setSelectedMessage] = useState<any[]>([]);

  // Create a function that takes in a message ID
  function toggleMessage(mid: number) {
    // If the selected message ID is included in the array of selected messages
    if (selectedMessage.includes(mid)) {
      // Remove the message ID from the array of selected messages
      setSelectedMessage((messages) => messages.filter((id) => id !== mid));
    } else {
      // Otherwise, add the message ID to the array of selected messages
      setSelectedMessage((messages) => [...messages, mid]);
    }
  }

  // Create an `addMessage` function that will add a new message to the array
  // of messages. It will use the `setMessages` function to update the
  // `messages` state variable.
  function addMessage() {
    // The new message ID is the last message ID plus 1.
    let newId = (messages.at(-1) || 0) + 1;
    // Update the `messages` state variable with the new message ID.
    setMessages((messages: number[]) => [...messages, newId]);
  }

  function archiveSelectedMessages() {
    // Create a new array of messages, excluding the selected ones.
    setMessages((messages) =>
      messages.filter((id) => !selectedMessage.includes(id))
    );

    // Reset the selected messages.
    setSelectedMessage([]);
  }

  return (
    <div className="flex h-2/3 flex-col  justify-center overscroll-y-contain py-8 px-6">
      <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden rounded-2xl bg-white">
        <div className="flex w-[45%] flex-col bg-slate-50 py-2">
          <div className="border-b px-5">
            <div className="flex justify-between py-2 text-right">
              <button
                onClick={addMessage}
                className="-mx-2 rounded px-2 py-1 text-slate-400 hover:text-slate-500 active:bg-slate-200"
              >
                <EnvelopeIcon className="h-5 w-5 " />
              </button>
              <button
                onClick={archiveSelectedMessages}
                className="-mx-2 rounded px-2 py-1 text-slate-400 hover:text-slate-500 active:bg-slate-200"
              >
                <ArchiveBoxIcon className="h-5 w-5 " />
              </button>
            </div>
          </div>
          <ul className="overflow-y-scroll px-3 pt-2">
            <AnimatePresence initial={false}>
              {[...messages].reverse().map((mid) => (
                <motion.li
                  // Starting state: The element is invisible and collapsed
                  initial={{ opacity: 0, height: 0 }}
                  // When the element is visible, animate its height and opacity.
                  animate={{ opacity: 1, height: "auto" }}
                  // When the element is not visible, animate its height and opacity.
                  exit={{ opacity: 0, height: 0 }}
                  // Transition between the start and end state
                  transition={{ opacity: { duration: 0.2 } }}
                  key={mid}
                  className="relative"
                >
                  <div className="py-0.5">
                    <button
                      onClick={() => toggleMessage(mid)}
                      className={clsx(
                        "block w-full cursor-pointer truncate rounded py-3 px-3 text-left",
                        {
                          "bg-blue-500": selectedMessage.includes(mid),
                          "hover:bg-slate-200": !selectedMessage.includes(mid),
                        }
                      )}
                    >
                      <p
                        className={clsx("truncate text-sm font-medium", {
                          "text-white": selectedMessage.includes(mid),
                          "text-slate-500": !selectedMessage.includes(mid),
                        })}
                      >
                        {titles[mid % titles.length][0]}
                      </p>
                      <p
                        className={clsx("truncate text-xs", {
                          "text-blue-200": selectedMessage.includes(mid),
                          "text-slate-400": !selectedMessage.includes(mid),
                        })}
                      >
                        {titles[mid % titles.length][1]}
                      </p>
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
        <div className="flex-1 overflow-y-scroll border-l px-8 py-8">
          <h1 className="h-8 rounded bg-slate-100 text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {[...Array.from(Array(9).keys())].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-100" />
                <p className="h-4 rounded bg-slate-100" />
                <p className="h-4 w-4/6 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
