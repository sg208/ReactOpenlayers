import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '../fonts'
import '../index.scss'

import AccessibilityPage from './AccessibilityPage'
import NotFoundPage from './NotFoundPage'
import PrivacyPage from './PrivacyPage'
import TermsPage from './TermsPage'

const PAGES = {
    accessibility: AccessibilityPage,
    'not-found': NotFoundPage,
    privacy: PrivacyPage,
    terms: TermsPage,
}

const rootElement = document.getElementById('root')
const Page = PAGES[rootElement.dataset.page] ?? NotFoundPage

createRoot(rootElement).render(
    <StrictMode>
        <Page />
    </StrictMode>,
)
