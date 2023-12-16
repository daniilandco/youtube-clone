import './Videos.css'
import { ChannelCard, VideoCard } from '..'
const Videos = ({ videos, direction }) => {

    return (
        <ul className="videos" style={{ flexDirection: direction || 'row' }}>
            {videos.map((item, index) =>
                item.id.videoId ? (
                    <VideoCard key={index} video={item} />
                ) : (
                    <ChannelCard key={index} channel={item} />
                )
            )}
        </ul>
    )
}

export default Videos
