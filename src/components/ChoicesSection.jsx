import { useState } from 'react';
import ChooseSection from './ChooseSection'
import mergeImages from 'merge-images';
import { useEffect } from 'react';
import ImageSection from './ImageSection';




function ChoicesSection()
{

    console.log("im here")

    function init(){

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };

        try{

        fetch('/app',requestOptions)
          .then((response) => {
            console.log("inside then1")
            response.json()})
          .then((data) => {
            console.log("inside then2")
              setAllChoices(data)
              let tempTypes=Object.keys(data)
              setTypes(tempTypes)
              setCurrentType(tempTypes[0])
              setValues(data[tempTypes[0]])
            
              let tempImage={}
              tempTypes.forEach((item)=>{
              const rand=Math.floor(Math.random()*data[item].length)
              const cand=data[item][rand]
              tempImage[item]="alpaca/"+item+"/"+cand
              if(item===currentType) setCurrentValue(cand.substring(0,cand.lastIndexOf('.')))
              setImage(tempImage)
              })
        

          })
        }catch(error){
            console.log("error")
            console.log(error)
        }
    }

    const [allChoices,setAllChoices] = useState(()=>{init()},{}),
          [types,setTypes] = useState([]),
          [values,setValues] = useState([]),
          [image,setImage] = useState({}),
          [currentType,setCurrentType]=useState(""),
          [currentValue,setCurrentValue]=useState("")

    useEffect(()=>{
         if(image && Object.keys(image) && Object.keys(image).length) mergeImages([image.backgrounds,image.neck,image.hair,image.ears,image.eyes,image.leg,image.mouth,image.nose,image.accessories])
        .then((b64) => {
            document.getElementById('image').src = b64
            document.getElementById('link').href = b64
        });
        },[image])

    useEffect(()=>{
        let prev=document.querySelector('[class="checkedType"]')
        prev && prev.classList.remove("checkedType")
        currentType && document.querySelector('[name='+currentType+']') && document.querySelector('[name='+currentType+']').classList.add("checkedType")
        if(currentType && image[currentType]) setCurrentValue(image[currentType].substring(image[currentType].lastIndexOf('/')+1,image[currentType].lastIndexOf('.')))
    },[currentType])

    useEffect(()=>{
        let prev=document.querySelector('[class="checkedValue"]')
        prev && prev.classList.remove("checkedValue")
        currentValue && document.querySelector('[name='+currentValue+']') && document.querySelector('[name='+currentValue+']').classList.add("checkedValue")
    },[currentValue])
  
    function updateValues(newType)
    {
        setValues(allChoices[newType])
        setCurrentType(newType)
    }

    function updateImage(newValue)
    {
        setCurrentValue(newValue)
        setImage({...image,[currentType]:"alpaca/"+currentType+"/"+newValue+".png"})
    }

    function randomImage()
    {
        let temp=image
        types.forEach((item)=>{
            const rand=Math.floor(Math.random()*allChoices[item].length)
            const cand=allChoices[item][rand]
            temp[item]="alpaca/"+item+"/"+cand
            if(item===currentType) setCurrentValue(cand.substring(0,cand.lastIndexOf('.')))
        })
        setImage({...image,temp})
    }

    return(
        <div className='row'>
            <div className='col-sm'>
            <ImageSection onRandom={randomImage} />
            </div>
            <div className='col-sm'>
            <ChooseSection headText="Accessorize The Alpaca's" fileNames={types} onChoose={updateValues} />
            <ChooseSection headText="Style" fileNames={values} onChoose={updateImage} />
            </div>
        </div>
    )
}

export default ChoicesSection;