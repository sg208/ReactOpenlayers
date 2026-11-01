import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '../index.scss'

import AccessibilityPage from './AccessibilityPage'
import PrivacyPage from './PrivacyPage'
import TermsPage from './TermsPage'

const PAGES = {
    accessibility: AccessibilityPage,
    privacy: PrivacyPage,
    terms: TermsPage,
}

const rootElement = document.getElementById('root')
const Page = PAGES[rootElement.dataset.page] ?? TermsPage

createRoot(rootElement).render(
    <StrictMode>
        <Page />
    </StrictMode>,
)
