import { useState } from "react";
import { Switch } from "react-aria-components";

export default function AnimatedTogle() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#171717] px-6 text-center">
      <div className="flex w-72 flex-col text-white">
        <Switch onChange={setSelected} isSelected={selected} className="group inline-flex">
          <div className="mr-5 h-6 w-9 rounded-full border-2 border-transparent transition bg-zinc-600 group-data-[selected]:bg-green-500 duration-300 group-data-[focus-visible]:ring-2 ring-offset-2 ring-offset-zinc-900">
            <div className="h-5 w-5 group-data-[pressed]:w-6 group-data-[selected]:ml-3 rounded-full bg-white translate-all duration-300 shadow group-data-[selected]:group-data-[pressed]:ml-2"></div>
          </div> 
          <span>Airplane Mode: {selected ? 'On' : 'Off'}</span>
        </Switch>
      </div>
    </div>
  );
}
