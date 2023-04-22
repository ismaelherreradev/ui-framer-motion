import { stagger, useAnimate } from "framer-motion";
import { useState } from "react";
import { ListBulletIcon } from "@heroicons/react/20/solid";

export default function TrelloChecklist() {
  const [items, setItems] = useState([
    { id: "1", text: "One", checked: true },
    { id: "2", text: "Two", checked: true },
    { id: "3", text: "Three", checked: true },
    { id: "4", text: "Four", checked: false },
    { id: "5", text: "Five", checked: true },
    { id: "6", text: "Six", checked: true },
    { id: "7", text: "Seven", checked: true },
  ]);

  const [ref, animate] = useAnimate();

  function handleChange(id: string) {
    let newItems = items.map((item) => ({
      ...item,
      checked: item.id === id ? !item.checked : item.checked,
    }));

    setItems(newItems);

    if (newItems.every((item) => item.checked)) {
      const lastCompletedItem = items.findIndex((item) => !item.checked);

      // bounce
      animate(
        "input",
        { scale: [1, 0.5, 1] },
        { duration: 0.35, delay: stagger(0.075, { from: lastCompletedItem }) }
      );

      // shimmy
      animate(
        "input",
        { x: [0, 2, -2, 0] },
        { duration: 0.4, delay: stagger(0.1, { from: lastCompletedItem }) }
      );

      // shake
      animate(
        "input",
        { rotate: [0, 10, -10, 0] },
        { duration: 0.4, delay: stagger(0.1, { from: lastCompletedItem }) }
      );
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#171717]">
      <div className="flex w-full max-w-sm flex-col rounded bg-gray-100 px-3 py-4 shadow-xl">
        <p className="ml-2 flex items-center text-lg font-semibold text-gray-700">
          <ListBulletIcon className="mr-3 h-5 w-5" />
          Checklist
        </p>

        {/*
          🟢 Attach the ref from `useAnimate()` to scope the animate() function to this subtree.
        */}
        <div ref={ref} className="mt-4">
          {items.map((item) => (
            <label
              key={item.id}
              className={`group flex w-full cursor-pointer select-none items-center rounded p-2 text-sm font-medium transition-colors duration-300 checked:text-gray-300 hover:bg-gray-200 ${
                item.checked ? "text-gray-400 line-through" : "text-gray-800"
              }`}
            >
              <input
                onChange={() => handleChange(item.id)}
                checked={item.checked}
                type="checkbox"
                className="mr-4 h-4 w-4 rounded-sm border-2 border-gray-300 text-sky-600 transition-colors duration-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-sky-600/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 group-active:border-sky-600 group-active:checked:text-sky-600/25"
              />
              {item.text}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
