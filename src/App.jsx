import { useEffect, useState } from 'react'
import './App.css'

const VERSION = 'v1' // on bumpe à v2 pendant la démo d'invalidation

function Home() {
  return (
    <>
      <h1>Welcome</h1>
      <p>
        build <strong>{VERSION}</strong>
      </p>
    </>
  )
}

function About() {
  return (
    <>
      <h1>About</h1>
      <p>Cette route n'existe pas dans S3.</p>
    </>
  )
}

export default function App() {
  const [path, setPath] = useState(location.pathname)

  useEffect(() => {
    const onPop = () => setPath(location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const go = (event, to) => {
    event.preventDefault()
    history.pushState(null, '', to)
    setPath(to)
  }

  return (
    <>
      {path === '/' ? <Home /> : path === '/about' ? <About /> : <h1>404</h1>}
      <nav>
        <a href="/" onClick={(event) => go(event, '/')}>
          home
        </a>
        {' · '}
        <a href="/about" onClick={(event) => go(event, '/about')}>
          about
        </a>
      </nav>
    </>
  )
}
