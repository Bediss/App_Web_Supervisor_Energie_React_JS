import { useState, useEffect } from "react"

const Clock = ({ className = "", textFontSize = "14px", dateTimeFontSize = "14px" }) => {

    const getDate = () => {
        const date = new Date()
        return date.toLocaleString()
    }
    const [date, setDate] = useState(() => getDate())
    useEffect(() => {
        const id = setInterval(() => {
            setDate(getDate)
        }, 1000);
        return function cleanup() {
            clearInterval(id)
        }
    }, [])
    return <div className={className}>
        {
            date ? <>
                <span style={{ fontSize: textFontSize }} >maintenant: </span>
                <span style={{ fontSize: dateTimeFontSize }} >{date}</span>
            </>
                : <></>
        }
    </div>
}


export default Clock; 