import { motion } from "framer-motion";
import { useState } from "react";

const tabs = [
  { id: "world", label: "World" },
  { id: "ny", label: "N.Y" },
  { id: "business", label: "Business" },
  { id: "arts", label: "Arts" },
  { id: "science", label: "Science" },
];

export default function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="h-screen bg-[#171717]">
      <div className="mx-auto w-fit">
        <div className="flex justify-center space-x-1 pt-40">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id ? "" : "hover:opacity-50"
              } relative rounded-full px-3 py-1.5 text-sm font-medium text-white outline-2 outline-sky-400 focus-visible:outline`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white"
                  style={{ borderRadius: 9999 }}
                />
              )}
              <span className="relative z-10 mix-blend-exclusion">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
