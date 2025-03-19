import { useState } from "react";
import Button from "../Actions/Button";

const colorPalettes = [
    {
        pri: "#FFFFFF",
        sec: "#121212",
        acc: "#F3F3F3",
        txt: "#000000",
        ltxt: "#121212BF",
    },
    {
        name: "Light",
        pri: "#FFFFFF",  // Primary (Background)
        sec: "#F4F4F4",  // Secondary
        acc: "#E0E0E0",  // Accent
        txt: "#333333",  // Text
        ltxt: "#666666", // Light Text
    },
    {
        name: "Dark",
        pri: "#121212",  // Primary (Background)
        sec: "#1E1E1E",  // Secondary
        acc: "#2D2D2D",  // Accent
        txt: "#E0E0E0",  // Text
        ltxt: "#A0A0A0", // Light Text
    },
    {
        name: "Blue Theme",
        pri: "#E3F2FD",  // Primary (Background)
        sec: "#09143C",  // Secondary
        acc: "#90CAF9",  // Accent
        txt: "#0D47A1",  // Text
        ltxt: "#1976D2", // Light Text
    },
    {
        name: "Green Theme",
        pri: "#E8F5E9",  // Primary (Background)
        sec: "#C8E6C9",  // Secondary
        acc: "#A5D6A7",  // Accent
        txt: "#1B5E20",  // Text
        ltxt: "#388E3C", // Light Text
    },
    {
        name: "Warm Theme",
        pri: "#FFF3E0",  // Primary (Background)
        sec: "#FFE0B2",  // Secondary
        acc: "#FFCC80",  // Accent
        txt: "#E65100",  // Text
        ltxt: "#F57C00", // Light Text
    },
    {
        name: "Purple Theme",
        pri: "#F3E5F5",  // Primary (Background)
        sec: "#E1BEE7",  // Secondary
        acc: "#CE93D8",  // Accent
        txt: "#4A148C",  // Text
        ltxt: "#6A1B9A", // Light Text
    }
];



export default function ThemeSelector() {
    const [theme, setTheme] = useState({
        primaryColor: "#FFFFFF",
        secondaryColor: "#121212",
        accentColor: "#F3F3F3",
        textColor: "#000000",
        lightTextColor: "#121212BF",
    });

    const handleChange = (e) => {
        setTheme({ ...theme, [e.target.name]: e.target.value });
        document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value);
    };

    const handleSave = () => {
        console.log("Saved Theme:", theme);
    };

    return (
        <div className="w-full bg-backgroundC p-4">

            <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Color Plates</h2>
                <div className="flex flex-wrap my-[20px] gap-4 ">
                    {colorPalettes.map((colorPlate , i)=>(
                        <div className="flex flex-col border border-textTC shadow-md w-[100px] h-[120px]">
                            <div style={{backgroundColor:colorPlate?.pri}} className="w-full h-[40px]"></div>
                            <div style={{backgroundColor:colorPlate?.acc}} className="w-full h-[20px]"></div>
                            <div style={{backgroundColor:colorPlate?.ltxt}} className="w-full h-[20px]"></div>
                            <div style={{backgroundColor:colorPlate?.txt}} className="w-full h-[20px]"></div>
                            <div style={{backgroundColor:colorPlate?.sec}} className="w-full h-[20px]"></div>

                        </div>
                    ))}
                </div>

            </div>
            <div className="flex flex-col">

                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">🎨 Select Your Theme</h2>

                <div className="flex justify-between my-[20px]">
                    <ColorPicker label="Primary" name="primaryColor" value={theme.primaryColor} onChange={handleChange} />
                    <ColorPicker label="Secondary" name="secondaryColor" value={theme.secondaryColor} onChange={handleChange} />
                    <ColorPicker label="Accent" name="accentColor" value={theme.accentColor} onChange={handleChange} />
                    <ColorPicker label="Text" name="textColor" value={theme.textColor} onChange={handleChange} />
                    <ColorPicker label="Light Text" name="lightTextColor" value={theme.lightTextColor} onChange={handleChange} />
                </div>

                <Button
                    action={handleSave}
                    label="Save Theme"
                />
            </div>
        </div>
    );
}

function ColorPicker({ label, name, value, onChange }) {
    return (
        <div className="flex flex-col items-center justify-between gap-3 p-2 bg-backgroundC">
            <div className="relative flex w-full ">
                <label
                    style={{ backgroundColor: value }}
                    className="w-14 h-14 border rounded-full border-[#d1cece8e] cursor-pointer "
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
            <label className="text-textTC text-[11px]">{label}</label>

        </div>
    );
}

