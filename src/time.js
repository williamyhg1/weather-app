import React, {useState, useEffect} from 'react'

const RealTime = () => {
    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      const timer = setInterval(()=>setTime(new Date()),1000)
      return function cleanup(){
        clearInterval(timer)
      }
    });
    return <div>
              <p className="time">{time.toLocaleTimeString()}</p>
            </div>
  
    }

export default RealTime