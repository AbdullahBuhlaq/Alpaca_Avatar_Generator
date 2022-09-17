import Image from "./Image";

function ImageSection(props)
{

    return(
        <div className="col">
            <div className="row">
            <Image />
            </div>
            <div>
            <button onClick={()=>{props.onRandom()}} className="col imageButton">Random</button>
            <button className="col imageButton"><a href="#" download="name.png" id="link" >Download</a></button>
            </div>
        </div>
        )
}

export default ImageSection;