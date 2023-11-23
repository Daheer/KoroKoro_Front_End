"use client";

import Link from "next/link";
import { Typewriter } from 'react-simple-typewriter'

export default function App() {
  return (
    <div style={{
      marginTop: '4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: '2.5rem',
      fontStyle: 'bold',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    }}>Welcome to KoroKoro
      <br />
      ----------------
      <div>
        <Typewriter
          words={['A novel way to view items for sale!']}
          loop={0}
          cursor
          cursorStyle='|'
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </div>
      <br />
      <br />
      <br />
      <Link href="/products" style={{
        textDecoration: 'none',
        color: 'black',
        padding: '1rem',
        borderRadius: '1rem',
        transition: 'box-shadow 0.5s',
        fontSize: '1.5rem',
        border: '0.1rem solid rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.5)',
        cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>👀</text></svg>")
        16 0, auto`,
        '&:hover': {
          boxShadow: '0 0.4rem 0.8rem rgba(0, 0, 0, 0.5);'
        },
      }}>View Products with your KoroKoro Eyes</Link>

    </div>
  )
}