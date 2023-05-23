import { useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { MdOutlineFileCopy } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ConvertNumberBase } from "./ConvertNumberBase";
import toast, { Toaster } from "react-hot-toast";

const Convert = () => {
  const [inputDropdown, setInputDropdown] = useState(false);
  const [outputDropdown, setOutputDropdown] = useState(false);

  const [inputDropval, setInputDropval] = useState("🪀 Decimal");
  const [outputDropval, setOutputDropval] = useState("🐋 Binary");

  const [number, setNumber] = useState({
    input: "",
    output: "",
  });

  const handleChange = (e) => {
    setNumber((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEnter = (e) => {
    // check if e is enter key
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inp = number.input;

    if (inp == "" || inp == null || inp == undefined) {
      toast.error("Please enter a valid value");
      return;
    } else if (inp < 0) {
      toast.error(`${inputDropval} input must be a positive number`);
      return;
    } else if (["🪀 Decimal", "🐋 Binary", "🐙 Octal"].includes(inputDropval)) {
      if (isNaN(inp)) {
        toast.error(`${inputDropval} input must be a number`);
        return;
      } else {
        inp = Number(inp);
        const op = ConvertNumberBase(inp, inputDropval, outputDropval);
        setNumber({ input: inp, output: op });
        console.log(inp);
      }
    } else if (["🍝 Hexadecimal"].includes(inputDropval)) {
      if (inp >= 0 && inp <= 9) {
        inp = Number(inp);
        const op = ConvertNumberBase(inp, inputDropval, outputDropval);
        setNumber({ input: inp, output: op });
      } else if ((inp >= "A" && inp <= "F") || (inp >= "a" && inp <= "f")) {
        inp = String(inp);
        const op = ConvertNumberBase(inp, inputDropval, outputDropval);
        setNumber({ input: inp, output: op });
      } else {
        toast.error(`${inputDropval} input must be a [0 - 9] or [A - F]`);
        return;
      }
    }
  };

  return (
    <section className="lg:max-w-3xl md:max-w-2xl mx-auto mt-20 grid md:grid-cols-2 gap-x-14 relative mb-20 md:px-0 px-4">
      {/* ====== Left ======= */}
      <div>
        <div
          className={`border border-[#D2D5DF] dark:border-[#616465] flex justify-between items-center px-4 py-1.5 rounded-xl cursor-pointer text-[#423E3E] dark:text-[#E2E3E4] hover:bg-gray-100 dark:hover:bg-[#202024] relative text-lg ${
            inputDropdown == true ? "bg-gray-100 dark:bg-[#202024]" : ""
          }`}
          onClick={() => setInputDropdown(!inputDropdown)}
        >
          <span> {inputDropval} </span>
          <span
            className={`${
              inputDropdown == true ? "rotate-180" : "rotate-0"
            } transition`}
          >
            <GoTriangleDown />
          </span>
          {/* ===== Dropdown ======== */}
          <ul
            className={`absolute bg-[#F6F8FF] dark:bg-[#26272b] shadow-lg w-full top-11 left-0 z-10 border border-[#d2d5df] dark:border-[#616465] rounded-lg py-3 ${
              inputDropdown == false ? "hidden" : ""
            } transition`}
          >
            <li
              className="flex justify-between py-1.5 px-4 pr-5 hover:bg-gray-100 dark:hover:bg-[#202024]"
              onClick={() => setInputDropval("🪀 Decimal")}
            >
              <span>
                {" "}
                {inputDropval == "🪀 Decimal" ? "✔️" : null} Decimal{" "}
              </span>
              <span> 🪀 </span>
            </li>
            <li
              className="flex justify-between py-1.5 px-4 pr-5 hover:bg-gray-100 dark:hover:bg-[#202024]"
              onClick={() => setInputDropval("🐋 Binary")}
            >
              <span> {inputDropval == "🐋 Binary" ? "✔️" : null} Binary </span>
              <span> 🐋 </span>
            </li>
            <li
              className="flex justify-between py-1.5 px-4 pr-5 hover:bg-gray-100 dark:hover:bg-[#202024]"
              onClick={() => setInputDropval("🍝 Hexadecimal")}
            >
              <span>
                {" "}
                {inputDropval == "🍝 Hexadecimal"
                  ? "✔️"
                  : null} Hexadecimal{" "}
              </span>
              <span> 🍝 </span>
            </li>
            <li
              className="flex justify-between py-1.5 px-4 pr-5 hover:bg-gray-100 dark:hover:bg-[#202024]"
              onClick={() => setInputDropval("🐙 Octal")}
            >
              <span> {inputDropval == "🐙 Octal" ? "✔️" : null} Octal </span>
              <span> 🐙 </span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ==== Toast ==== */}
          <Toaster />

          {/* ======== Input ======== */}
          <div className="mt-2.5">
            <textarea
              name="input"
              id="input"
              rows="6"
              className="flex flex-grow w-full rounded-xl py-4 px-4 text-xl resize-none bg-[#ffffff] dark:bg-[#393A3F] outline-none focus:outline-[#a8d0e6]"
              placeholder="Enter Number"
              onChange={handleChange}
              onKeyDown={handleEnter}
            />
          </div>

          {/* ========== Submit Button ========= */}
          <button
            type="submit"
            className="py-2 px-5 bg-[#BAE6FD] text-lg text-[#423E3E] font-[600] rounded-xl border-b-[6px] border-[#655F5F] mt-4 hover:border-b-4 hover:bg-[#b3dcf3]"
          >
            convert
          </button>
        </form>
      </div>

      {/* ====== Right ======= */}
      <div className="md:mt-0 mt-10">
        <div
          className={`border border-[#D2D5DF] dark:border-[#616465] flex justify-between items-center px-4 py-1.5 rounded-xl cursor-pointer text-[#423E3E] dark:text-[#E2E3E4] hover:bg-gray-100 dark:hover:bg-[#202024] relative text-lg ${
            outputDropdown == true ? "bg-gray-100 dark:bg-[#202024]" : ""
          }`}
          onClick={() => setOutputDropdown(!outputDropdown)}
        >
          <span> {outputDropval} </span>
          <span
            className={`${
              outputDropdown == true ? "rotate-180" : "rotate-0"
            } transition`}
          >
            <GoTriangleDown />
          </span>

          {/* ===== Dropdown ======== */}
          <ul
            className={`absolute bg-[#F6F8FF] dark:bg-[#26272b] shadow-lg w-full top-11 left-0 z-10 border border-[#d2d5df] dark:border-[#616465] rounded-lg py-3 ${
              outputDropdown == false ? "hidden" : ""
            } transition`}
          >
            <li
              className="flex justify-between py-1.5 px-4 pr-5 hover:bg-gray-100 dark:hover:bg-[#202024]"
              onClick={() => setOutputDropval("🪀 Decimal")}
            >
              <span>
                {" "}
                {outputDropval == "🪀 Decimal" ? "✔️" : null} Decimal{" "}
              </span>
              <span> 🪀 </span>
            </li>
            <li
              className="flex justify-between py-1.5 px-4 pr-5 hover:bg-gray-100 dark:hover:bg-[#202024]"
              onClick={() => setOutputDropval("🐋 Binary")}
            >
              <span> {outputDropval == "🐋 Binary" ? "✔️" : null} Binary </span>
              <span> 🐋 </span>
            </li>
            <li
              className="flex justify-between py-1.5 px-4 pr-5 hover:bg-gray-100 dark:hover:bg-[#202024]"
              onClick={() => setOutputDropval("🍝 Hexadecimal")}
            >
              <span>
                {" "}
                {outputDropval == "🍝 Hexadecimal"
                  ? "✔️"
                  : null} Hexadecimal{" "}
              </span>
              <span> 🍝 </span>
            </li>
            <li
              className="flex justify-between py-1.5 px-4 pr-5 hover:bg-gray-100 dark:hover:bg-[#202024]"
              onClick={() => setOutputDropval("🐙 Octal")}
            >
              <span> {outputDropval == "🐙 Octal" ? "✔️" : null} Octal </span>
              <span> 🐙 </span>
            </li>
          </ul>
        </div>

        {/* ======== Input ======== */}
        <div className="mt-2.5 relative">
          <textarea
            name="input"
            id="input"
            rows="6"
            className="flex flex-grow w-full rounded-xl py-4 px-4 text-xl resize-none bg-[#F8F9FA] dark:bg-[#313238] outline-none outline-[#D2D5DF] dark:outline-[#616465]"
            placeholder="Converter"
            disabled
            value={number.output}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
          <CopyToClipboard text={number.output}>
            <MdOutlineFileCopy className="absolute bottom-3 left-5 text-[#AAADBA] cursor-pointer hover:text-[#423E3E]" />
          </CopyToClipboard>
        </div>
      </div>
    </section>
  );
};

export default Convert;
