import { useEffect, useState } from "react";
import Button from "../Actions/Button";
import { applyTheme } from "@/Utils/ApplyTheme";
import _ from "lodash";
import { setTheme } from "@/APIs/Theme/setTheme";
import { useDispatch, useSelector } from "react-redux";



const colorPalettes = {
    Light: {
        pri: "#FFFFFF",
        sec: "#121212",
        acc: "#F3F3F3",
        txt: "#000000",
        ltxt: "#4b4949",
        wtxt: "#ffffff",
    },
    ModernDark: {
        pri: "#121212",
        sec: "#292929",
        acc: "#3A3A3A",
        txt: "#FFFFFF",
        ltxt: "#A8A8A8",
        wtxt: "#ffffff",
    },
    MiltBlue: {
        pri: "#ffffff",
        sec: "#03113a",
        acc: "#f0fcff",
        txt: "#040849",
        ltxt: "#4b4949",
        wtxt: "#ffffff",
    },
    SoftBreeze: {
        pri: "#F8FAFC",
        sec: "#002c47",
        acc: "#A2D2FF",
        txt: "#374151",
        ltxt: "#64748B",
        wtxt: "#FFFFFF",
    }
};




const initialTheme = {
    pri: "#FFFFFF",
    sec: "#121212",
    acc: "#F3F3F3",
    txt: "#000000",
    ltxt: "#121212BF",
    wtxt: "#ffffff",
}

export default function ThemeSelector() {
    const [isModified, setIsModified] = useState(false);
    const dispatch = useDispatch();
    const { currUser } = useSelector((state) => state.currentUser);
    const { theme , themeloading} = useSelector((state) => state.theme);
                
    const [tempTheme, setTempTheme] = useState({
        pri: "#FFFFFF",
        sec: "#121212",
        acc: "#F3F3F3",
        txt: "#000000",
        ltxt: "#121212BF",
        wtxt: "#ffffff",
    });

    const handleChange = (e) => {
        setTempTheme({ ...theme, [e.target.name]: e.target.value });
        document.documentElement.style.setProperty(`--tmp-${e.target.name}`, e.target.value);
    };

    const handleSave = async () => {
        try {
            await setTheme(tempTheme, currUser?.token, dispatch);
        } catch (err) {
            console.error("Theme update failed:", err.message);
        }
    };

    useEffect(() => {
        console.log(initialTheme, theme, "././././");

        setIsModified(!_.isEqual(initialTheme, theme));
    }, [theme, initialTheme]);

    return (
        <div className="w-full bg-backgroundC p-4 rounded-md customBoxShadow">

            <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Color Palettes</h2>
                <div className="flex justify-between flex-wrap my-[20px] gap-4 ">
                    {Object.entries(colorPalettes).map(([name, palette]) => (
                        <div key={name} className="bg-secondaryC p-3 flex flex-col items-center gap-4">
                            <div
                                onClick={() => { setTempTheme(palette); applyTheme(palette); }}
                                className="flex flex-col border border-textTC shadow-md w-[100px] h-[120px] gap-[1px] bg-secondaryC cursor-pointer hover:scale-105 transition-all"
                            >
                                {["pri", "acc", "ltxt", "txt", "sec"].map((key) => (
                                    <div key={key} style={{ backgroundColor: palette[key] }} className="w-full h-[20px] first:h-[40px]"></div>
                                ))}
                            </div>
                            <p className="text-[12px] text-textTC">{name}</p>
                        </div>
                    ))}

                </div>

            </div>
            <div className="flex flex-col">

                <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Select Your Theme</h2>

                <div className="flex justify-between flex-wrap my-[20px]">
                    <ColorPicker label="Primary" name="pri" value={tempTheme.pri} onChange={handleChange} />
                    <ColorPicker label="Secondary" name="sec" value={tempTheme.sec} onChange={handleChange} />
                    <ColorPicker label="Accent" name="acc" value={tempTheme.acc} onChange={handleChange} />
                    <ColorPicker label="Text" name="txt" value={tempTheme.txt} onChange={handleChange} />
                    <ColorPicker label="Light Text" name="ltxt" value={tempTheme.ltxt} onChange={handleChange} />
                    <ColorPicker label="White Text" name="wtxt" value={tempTheme.wtxt} onChange={handleChange} />
                </div>

                <Button
                    active={isModified}
                    action={handleSave}
                    label="Save Theme"
                    loading={themeloading}
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

