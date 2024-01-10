import { useState } from "react";
import ChooseSection from "./ChooseSection";
import mergeImages from "merge-images";
import { useEffect } from "react";
import ImageSection from "./ImageSection";

function ChoicesSection() {
  function init() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };

    fetch("/getType", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setAllChoices(data);
        console.log(data);
        let tempTypes = Object.keys(data);
        setTypes(tempTypes);
        setCurrentType(tempTypes[0]);
        setValues(data[tempTypes[0]]);

        let tempImage = {};
        tempTypes.forEach((item) => {
          const rand = Math.floor(Math.random() * data[item].length);
          const cand = data[item][rand];
          tempImage[item] = "alpaca/" + item + "/" + cand;
          if (item === currentType) setCurrentValue(cand.substring(0, cand.lastIndexOf(".")));
          setImage(tempImage);
        });
      });
  }

  const [allChoices, setAllChoices] = useState({
      accessories: ["earings.png", "flower.png", "glasses.png", "headphone.png"],
      backgrounds: ["blue50.png", "blue60.png", "blue70.png", "darkblue30.png", "darkblue50.png", "darkblue70.png", "green50.png", "green60.png", "green70.png", "grey40.png", "grey70.png", "grey80.png", "red50.png", "red60.png", "red70.png", "yellow50.png", "yellow60.png", "yellow70.png"],
      ears: ["default-ear.png", "tilt-backward.png", "tilt-forward.png"],
      eyes: ["angry.png", "default-eyes.png", "naughty.png", "panda.png", "smart.png", "star.png"],
      hair: ["bang.png", "curls.png", "default.png", "elegant.png", "fancy.png", "quiff.png", "short.png"],
      leg: ["bubble-tea.png", "cookie.png", "default-leg.png", "game-console.png", "tilt-backward.png", "tilt-forward.png"],
      mouth: ["astonished.png", "default.png", "eating.png", "laugh.png", "tongue.png"],
      neck: ["bend-backward.png", "bend-forward.png", "default-neck.png", "thick.png"],
      nose: ["default-nose.png"],
    }),
    [types, setTypes] = useState(["accessories", "backgrounds", "ears", "eyes", "hair", "leg", "mouth", "neck", "nose"]),
    [values, setValues] = useState(["earings.png", "flower.png", "glasses.png", "headphone.png"]),
    [image, setImage] = useState({}),
    [currentType, setCurrentType] = useState("accessories"),
    [currentValue, setCurrentValue] = useState("earings");

  useEffect(() => {
    let tempImage = {};
    types.forEach((item) => {
      const rand = Math.floor(Math.random() * allChoices[item].length);
      const cand = allChoices[item][rand];
      tempImage[item] = "alpaca/" + item + "/" + cand;
      if (item === currentType) setCurrentValue(cand.substring(0, cand.lastIndexOf(".")));
      setImage(tempImage);
    });
  }, []);

  useEffect(() => {
    if (image && Object.keys(image) && Object.keys(image).length)
      mergeImages([image.backgrounds, image.neck, image.hair, image.ears, image.eyes, image.leg, image.mouth, image.nose, image.accessories]).then((b64) => {
        document.getElementById("image").src = b64;
        document.getElementById("link").href = b64;
      });
  }, [image]);

  useEffect(() => {
    let prev = document.querySelector('[class="checkedType"]');
    prev && prev.classList.remove("checkedType");
    currentType && document.querySelector("[name=" + currentType + "]") && document.querySelector("[name=" + currentType + "]").classList.add("checkedType");
    if (currentType && image[currentType]) setCurrentValue(image[currentType].substring(image[currentType].lastIndexOf("/") + 1, image[currentType].lastIndexOf(".")));
  }, [currentType]);

  useEffect(() => {
    let prev = document.querySelector('[class="checkedValue"]');
    prev && prev.classList.remove("checkedValue");
    currentValue && document.querySelector("[name=" + currentValue + "]") && document.querySelector("[name=" + currentValue + "]").classList.add("checkedValue");
  }, [currentValue]);

  function updateValues(newType) {
    setValues(allChoices[newType]);
    setCurrentType(newType);
  }

  function updateImage(newValue) {
    setCurrentValue(newValue);
    setImage({ ...image, [currentType]: "alpaca/" + currentType + "/" + newValue + ".png" });
  }

  function randomImage() {
    let temp = image;
    types.forEach((item) => {
      const rand = Math.floor(Math.random() * allChoices[item].length);
      const cand = allChoices[item][rand];
      temp[item] = "alpaca/" + item + "/" + cand;
      if (item === currentType) setCurrentValue(cand.substring(0, cand.lastIndexOf(".")));
    });
    setImage({ ...image, temp });
  }

  return (
    <div className="row  app-container">
      <div className="col-sm">
        <ImageSection onRandom={randomImage} />
      </div>
      <div className="col-sm">
        <ChooseSection headText="Accessorize The Alpaca's" fileNames={types} onChoose={updateValues} />
        <ChooseSection headText="Style" fileNames={values} onChoose={updateImage} />
      </div>
    </div>
  );
}

export default ChoicesSection;
