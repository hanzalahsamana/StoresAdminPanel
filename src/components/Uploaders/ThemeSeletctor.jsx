"use client";
import { colorPalettes } from "@/Structure/DefaultStructures";
import { applyTheme } from "@/Utils/ApplyTheme";
import { IoCheckmarkOutline } from "react-icons/io5";



// Utility to compare theme objects
const isThemeEqual = (a, b) => {
  return Object.keys(a).every((key) => a[key]?.toLowerCase() === b[key]?.toLowerCase());
};

export default function ThemeSelector({ theme, setTheme }) {
  const handleChange = (e) => {
    const updatedTheme = { ...theme, [e.target.name]: e.target.value };
    setTheme(updatedTheme);
    applyTheme(updatedTheme);
  };

  return (
    <div className="w-full flex flex-col gap-3 ">
      <div className="flex flex-col border border-borderC p-4">
        <h2 className="text-lg text-gray-600 ">Default Color Palettes</h2>
        <div className="flex justify-between flex-wrap mt-[20px] gap-4">
          {Object.entries(colorPalettes).map(([name, palette]) => {
            const isSelected = isThemeEqual(theme, palette);
            return (
              <div key={name} className=" border p-2 flex flex-col items-center gap-2">
                <div
                  onClick={() => {
                    setTheme(palette);
                    applyTheme(palette);
                  }}
                  className="relative flex flex-col border border-textTC w-[60px] h-[70px] cursor-pointer "
                >
                  {isSelected && (
                    <div className="absolute w-full h-full z-10 bg-[#00000058] text-white text-[20px] flex items-center justify-center">
                      <IoCheckmarkOutline />
                    </div>
                  )}
                  {["pri", "acc", "ltxt", "txt", "sec"].map((key) => (
                    <div
                      key={key}
                      style={{ backgroundColor: palette[key] }}
                      className="w-full h-[10px] first:h-[20px]"
                    ></div>
                  ))}
                </div>
                <p className="text-[12px] text-textC">{name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col border border-borderC p-4">
        <h2 className="text-lg text-gray-600">Customize Your Theme</h2>
        <div className="flex justify-between flex-wrap mt-[20px]">
          <ColorPicker label="Primary" name="pri" value={theme?.pri} onChange={handleChange} />
          <ColorPicker label="Secondary" name="sec" value={theme?.sec} onChange={handleChange} />
          <ColorPicker label="Accent" name="acc" value={theme?.acc} onChange={handleChange} />
          <ColorPicker label="Text" name="txt" value={theme?.txt} onChange={handleChange} />
          <ColorPicker label="Light Text" name="ltxt" value={theme?.ltxt} onChange={handleChange} />
          <ColorPicker label="White Text" name="wtxt" value={theme?.wtxt} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}

function ColorPicker({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col items-center justify-between gap-3 p-2 bg-backgroundC">
      <div className="relative flex w-full">
        <label
          style={{ backgroundColor: value }}
          className="w-12 h-12 border rounded-full border-[#d1cece8e] cursor-pointer"
          onClick={() => document.getElementById(name)?.click()}
        ></label>

        <input
          id={name}
          type="color"
          name={name}
          value={value}
          onChange={onChange}
          className="absolute bottom-0 right-0 opacity-0 w-0 h-0"
        />
      </div>
      <label className="text-textC text-[11px]">{label}</label>
    </div>
  );
}
