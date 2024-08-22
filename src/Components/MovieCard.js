import { Button, Card, Radio } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { decrementLikes, getAndRemoveMovie, incrementLikes } from '../JS/Actions'
import './MovieCard.css'

const MovieCard = ({movie}) => {
    const dispatch = useDispatch()
    const { title, category, likes, dislikes } = movie;
    const total = likes + dislikes;
    const likesRatio = total ? ((likes / total) * 100).toFixed(1) : 0;
    const dislikesRatio = total ? ((dislikes / total) * 100).toFixed(1) : 0;

  return (
    <>
     <Card title={title}  extra={<Button type="primary" onClick={() => dispatch(getAndRemoveMovie(movie.id))} className='card' danger>
      Delete
    </Button>} style={{ width: 300 }}>
    <p className="category"><span style={{fontWeight:500}}>Category:</span> {category}</p>
    <p style={{fontWeight:500}}>Likes Ratio:</p>
      <div className="gauge">
        <div className="likes" style={{ width: `${likesRatio}%` }}> <span> {likesRatio}%</span> </div>
        {dislikes !== 0 &&
                <div className="dislikes" style={{ width: `${dislikesRatio}%` }}><span>{dislikesRatio}%</span></div>
        }
      </div>
      <Radio.Group  defaultValue={0}>
      <Radio.Button value={1} onClick={() => dispatch(incrementLikes(movie.id))}>Like</Radio.Button>
      <Radio.Button value={2} onClick={() => dispatch(decrementLikes(movie.id))}>Dislike</Radio.Button>
    </Radio.Group>
    </Card>
    </>
  )
}

export default MovieCard
