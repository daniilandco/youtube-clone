import { Link } from 'react-router-dom'
import {
    demoThumbnailUrl,
    demoVideoUrl,
    demoVideoTitle,
    demoChannelUrl,
    demoChannelTitle,
    checkCircleIcon
} from '../../utils/consts'
import './VideoCard.css'

const VideoCard = ({
    video: {
        id: { videoId },
        snippet
    }
}) => {
    return (
        <div className="videoCard">
            <Link
                to={videoId ? `/video/${videoId}` : demoVideoUrl}
                className="videoImageLink"
            >
                <img
                    src={snippet?.thumbnails?.medium?.url}
                    alt={snippet?.title}
                />
            </Link>

            <div className="videoCardContent">
                <Link
                    to={videoId ? `/video/${videoId}` : demoVideoUrl}
                    className="videoLink"
                >
                    <p>
                        {snippet?.title.slice(0, 60) ||
                            demoVideoTitle.slice(0, 60)}
                    </p>
                </Link>

                <Link
                    to={
                        snippet?.channelId
                            ? `/channel/${snippet?.channelId}`
                            : demoChannelUrl
                    }
                    className="channelLink"
                >
                    <p>{snippet?.channelTitle || demoChannelTitle}</p>
                    <img src={checkCircleIcon} alt="checked" />
                </Link>
            </div>
        </div>
    )
}

export default VideoCard
