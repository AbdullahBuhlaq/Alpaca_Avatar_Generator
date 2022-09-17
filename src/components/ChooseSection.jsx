import Buttons from './Buttons'

function ChooseSection(props)
{
    return(
        <div className='section'>
            <h4>{props.headText}</h4>
            <Buttons fileNames={props.fileNames} onChoose={props.onChoose}  />
        </div>
    )
}

export default ChooseSection;