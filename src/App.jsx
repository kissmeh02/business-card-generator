import HomePage from './pages/HomePage.jsx'
import { cardCss } from './templates/cardStyles.js'
import './styles/app.css'

function App() {
  return (
    <>
      <style>{cardCss}</style>
      <HomePage />
    </>
  )
}

export default App
