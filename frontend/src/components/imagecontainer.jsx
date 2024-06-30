export default function ImageContainer({url}){
    return (
    <a href={url}>
        <div className="image-container">
            <img src={url}/>
        </div>
    </a>
    )
}