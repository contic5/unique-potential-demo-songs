import './mystyle.css'

function SongElement(props)
{
    function seconds_to_time(seconds)
    {
        const written_minutes=(Math.floor(seconds/60)).toString()
        let written_seconds=(seconds%60).toString();
        if(written_seconds.length<2)
        {
            written_seconds="0"+written_seconds;
        }
        //console.log(res);
        return written_minutes+":"+written_seconds;
    }

    let song=props.song;
    const src=`https://www.youtube.com/embed/${song.Video_ID}?si=GhQ9apUa2I1n7zyR&amp;start=${song.Start}`;
    const song_iframe=(
    <iframe width="560" height="315" 
    src={src} title="YouTube video player" 
    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
    gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    );
    return (
        <div className="border">
        <h2>{song.ID} {song.Name}</h2>
        <h3>Rank: {song.Rank}</h3>
        <p>{song.Seconds} Seconds</p> 
        <p>{seconds_to_time(song.Start)} - {seconds_to_time(song.End)}</p>
        <p>Spotify<br/>
        <a href={song.Spotify}>{song.Spotify}</a>
        </p>
        <p>Youtube<br/>
        <a href={song.Youtube_Link}>{song.Youtube_Link}</a>
        </p>
        <p>Context<br/>
        <a href={song.Context}>{song.Context}</a>
        </p>
        {song_iframe}
        </div>
    )
}
export default SongElement;