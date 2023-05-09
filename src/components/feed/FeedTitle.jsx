import './FeedTitle.css'

const FeedTitle = ({title, caption}) => {
    return (
    <small className="feedTitleContainer" >
        <h1 className="feedTitle" > {title} </h1>
        <h2 className="feedCaption"> {caption} </h2>
    </small>
    )
}

export default FeedTitle