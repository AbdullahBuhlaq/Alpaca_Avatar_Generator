function Buttons(props){


    return(
        
        <div>
            {props.fileNames && props.fileNames.map((item,index)=>{
                let it=item
                if(item.indexOf('.')!==-1) it=item.substring(0,item.lastIndexOf('.'))
                return <button key={index} name={it} onClick={()=>{props.onChoose(it)}}>{it}</button>
            })}
        </div>
        
    )
}

export default Buttons;