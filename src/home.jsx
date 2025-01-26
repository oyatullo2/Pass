import { useState, useEffect } from "react";

export const Home = () => {
  const [textList, setTextList] = useState([]); // Massiv
  const [textvalue, setTextValue] = useState(""); // Input qiymati

  // Ma'lumotni localStorage-ga saqlash va massivni yangilash
  const handleText = () => {
    if (textvalue.trim()) {
      const updatedList = [...textList, textvalue];
      setTextList(updatedList); // Massivni yangilash
      localStorage.setItem("textList", JSON.stringify(updatedList)); // LocalStorage-ga saqlash
      setTextValue(""); // Inputni tozalash
    }
  };

  // Component yuklanganda localStorage-dan ma'lumotni olish
  useEffect(() => {
    const localStorageText = localStorage.getItem("textList");
    if (localStorageText) {
      setTextList(JSON.parse(localStorageText)); // Ma'lumotni massivga yuklash
    }
  }, []); // Bir marta bajariladi

  return (
    <>
      <div className="w-full h-screen max-h-full flex justify-center items-center">
        <div className="w-full relative flex flex-col items-center max-w-[400px] h-screen max-h-[500px] rounded-md bg-white">
          <p className="font-[600] text-[18px] mb-[20px]">Добро пожаловать</p>
          <div className="flex flex-col">
            {/* LocalStorage'dagi ma'lumotni ko‘rsatish */}
            {textList.map((text, index) => (
              <p key={index} className="border-b py-1 text-[16px]">
                {text}
              </p>
            ))}
          </div>
          <div className="absolute bottom-0 w-full">
            <div className="flex justify-center items-center w-full">
              <input
                type="text"
                onChange={(e) => setTextValue(e.target.value)}
                value={textvalue}
                className="outline-none py-[2px] border-[2px] w-full rounded-md px-[5px] placeholder:font-[600]"
                placeholder="Введите текст"
              />
              <button
                onClick={handleText}
                className="bg-[#000000] text-white py-[2px] font-[600] rounded-md text-[18px] px-[10px] ml-2"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
