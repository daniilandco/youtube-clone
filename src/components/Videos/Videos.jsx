import './Videos.css'
import { ChannelCard, VideoCard } from '..'

const Videos = ({ videos }) => {
    return (
        <div className="videos">
            {videos.map((item, index) =>
                item.id.videoId ? (
                    <VideoCard key={index} video={item} />
                ) : (
                    <ChannelCard key={index} channel={item} />
                )
            )}
        </div>
    )
}

export default Videos
