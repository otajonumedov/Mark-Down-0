import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './App.css'

const STORAGE_KEY = 'md-notes'
const DEFAULT_NOTE = `# Markdown da yozing

## Qisqa qo'llanma
- **Bold** matn \`**matn**\`
- _Italic_ matn \`_matn_\`
- Kod bo'lagi \`\`\`js ... \`\`\`
- [Havola](https://react.dev)

> Markdown matnlaringiz shu yerda saqlanadi.
`

function App() {
  const [content, setContent] = useState(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_NOTE
    }

    return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_NOTE
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, content)
  }, [content])

  const characters = useMemo(() => content.length, [content])

  return (
    <main className="app">
      <header className="app__header">
        <div>
          <p className="eyebrow">Markdown yozuvi</p>
          <h1>Local Markdown noutbuki</h1>
          <p className="muted">
            Matnlaringiz avtomatik tarzda brauzerning local storage qismida
            saqlanadi. Sahifani yangilasangiz ham ma&apos;lumotlar o&apos;chmaydi.
          </p>
        </div>
        <div className="stats-card">
          <span className="stats-card__label">Belgi soni</span>
          <span className="stats-card__value">{characters}</span>
        </div>
      </header>

      <section className="panels">
        <label className="panel">
          <span className="panel__title">Editor</span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            spellCheck="false"
            aria-label="Markdown editor"
          />
        </label>

        <article className="panel">
          <div className="panel__title">Preview</div>
          <div className="preview">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
