import './HomeComponent.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]

const d = new Date();
let year = d.getFullYear();
// let month = months[d.getMonth()];
let numericalMonth = d.getMonth() + 1;
let day = d.getDate();
let dayOfTheWeek = weekday[d.getDay()];

export default function HomeComponent() {
  const [eventOfDay, setEventOfDay] = useState('No events scheduled for the day!')
  const [noteOfDay, setNoteOfDay] = useState('No notes for the day!')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(('/api/entries/1'), { method: 'GET', mode: 'no-cors' })
        if (!res.ok) throw new Error(`fetch Error ${res.status}`)
        const getEntry = await res.json()
        const getEvent = getEntry.eventDescription
        const getNote = getEntry.notes
        const getStart = getEntry.startTime
        const getEnd = getEntry.endTime
        if (getEvent === '' || getEvent === undefined) {
          setEventOfDay(eventOfDay)
        } else if (getNote === '' || getNote === undefined) {
          setNoteOfDay(noteOfDay)
        } else if (getStart === '' || getStart === undefined) {
          setStartTime(startTime)
        } else if (getEnd === '' || getEnd === undefined) {
          setEndTime(endTime)
        }
        setEventOfDay(getEvent)
        setNoteOfDay(getNote)
        setStartTime(getStart)
        setEndTime(getEnd)
      }
      catch (err) {
        console.error(err)
      }
    }

    fetchEvent();

  }, [eventOfDay, noteOfDay, startTime, endTime])


  return (
    <div className='day-content shadow mx-4 text-center mt-4 mb-4'>
      <h3 className='py-2'>{dayOfTheWeek} {`${numericalMonth}/${day}/${year}`}</h3>
      <div className='text-height my-4'>
        <h4 className='fw-bold'>Events:</h4>
        <p className='fs-6 mx-3'>{`${startTime}-${endTime}: ${eventOfDay}`}</p>
      </div>
      <div className='text-height mb-4'>
        <h4 className='fst-italic fw-bold'>Daily Note:</h4>
        <p className='fs-6 mx-3'>{noteOfDay}</p>
      </div>
      <Link to={`year/${year}%2c%20${numericalMonth}/${day}`}>
        <button id='view-the-day-button' className='mb-5 py-3 px-3 fw-bold shadow' type='button' >View The Day</button>
      </Link>
    </div>
  )
}
