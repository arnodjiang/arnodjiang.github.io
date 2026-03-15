import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import theme from './theme'
import Layout from './components/Layout'
import Home from './components/Home'
import { siteConfig } from './site.config'
import './styles/globals.css'

/* Lazy-load page components — only bundled when the feature is enabled */
import Publications from './components/Publications'
import Projects from './components/Projects'
import Articles from './components/Articles'
import Experience from './components/Experience'
import GuideLanding from './components/GuideLanding'
import GuideDocs from './components/GuideDocs'

function App() {
  const features = siteConfig.features as Record<string, boolean>

  return (
    <ChakraProvider theme={theme}>
      <Router basename={import.meta.env.BASE_URL}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            {features.publications && <Route path="/publications" element={<Publications />} />}
            {features.projects && <Route path="/projects" element={<Projects />} />}
            {features.articles && <Route path="/articles" element={<Articles />} />}
            {features.experience && <Route path="/experience" element={<Experience />} />}
            {features.guide !== false && <Route path="/guide" element={<GuideLanding />} />}
            {features.guide !== false && <Route path="/docs" element={<GuideDocs />} />}
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  )
}

export default App
