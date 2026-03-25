import React, { useState, useCallback, useEffect, useRef } from 'react'
import { getOrderedCategories } from './parts'
import Thumbnail from './components/Thumbnail'
import { shouldShowField, generateFullHTML, downloadHTML, downloadAsZip, DEFAULT_GLOBAL_COLOR } from './utils/helpers'

const DEVICES = [
  { key: 'pc', label: 'PC', icon: '🖥', width: '100%' },
  { key: 'tablet', label: 'Tablet', icon: '📱', width: '768px' },
  { key: 'mobile', label: 'Mobile', icon: '📲', width: '375px' },
]

/* ============================================================
   SHARED SUB-COMPONENTS
   ============================================================ */

function CatalogPanel({ categories, openCats, setOpenCats, onAdd, globalColor }) {
  return (
    <div style={{ padding: 6 }}>
      {categories.map(({ name: cat, parts: items }) => (
        <div key={cat} style={{ marginBottom: 2 }}>
          <div onClick={() => setOpenCats(p => ({ ...p, [cat]: !p[cat] }))}
            style={{ padding: 10, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 8, fontSize: 12, fontWeight: 700, color: '#909098', userSelect: 'none' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span>{cat} <span style={{ fontWeight: 400, color: 'var(--dim)', fontSize: 11 }}>({items.length})</span></span>
            <span style={{ fontSize: 10, color: 'var(--dim)', transition: 'transform .2s', transform: openCats[cat] ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
          </div>
          {openCats[cat] && (
            <div style={{ padding: '0 4px 8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {items.map(p => (
                <div key={p.id} onClick={() => onAdd(p)}
                  style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid var(--bdr)', cursor: 'pointer', background: 'var(--bg2)', transition: 'all .12s', WebkitTapHighlightColor: 'transparent' }}>
                  <div style={{ aspectRatio: '16/10' }}><Thumbnail type={p.thumb} color={globalColor.primary} /></div>
                  <div style={{ padding: '5px 8px' }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: '#c8c8d4' }}>{p.name}</div>
                    <div style={{ fontSize: 9, color: 'var(--dim)' }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function PartsListPanel({ parts, editing, setEditing, move, remove, globalColor }) {
  if (!parts.length) return (
    <div style={{ padding: '60px 20px', textAlign: 'center', color: '#2a2a38' }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>📦</div>
      <div style={{ fontSize: 13, lineHeight: 1.7 }}>カタログからパーツを追加してください</div>
    </div>
  )
  return (
    <div style={{ padding: 8 }}>
      {parts.map((p, i) => (
        <div key={p.iid} onClick={() => setEditing(p.iid)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, marginBottom: 4, borderRadius: 8,
            border: editing === p.iid ? '1px solid rgba(108,140,255,.3)' : '1px solid transparent',
            background: editing === p.iid ? '#14142a' : 'var(--bg2)', cursor: 'pointer' }}>
          <div style={{ width: 52, aspectRatio: '16/10', borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
            <Thumbnail type={p.thumb} color={globalColor.primary} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#b8b8c8' }}>{p.name}</div>
            <div style={{ fontSize: 10, color: '#44445a' }}>{p.category}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
            <button onClick={e => { e.stopPropagation(); move(i, -1) }}
              style={{ width: 24, height: 24, background: 'var(--bg3)', border: '1px solid var(--bdr)', borderRadius: 4, color: 'var(--dim)', fontSize: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▲</button>
            <button onClick={e => { e.stopPropagation(); move(i, 1) }}
              style={{ width: 24, height: 24, background: 'var(--bg3)', border: '1px solid var(--bdr)', borderRadius: 4, color: 'var(--dim)', fontSize: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▼</button>
          </div>
          <button onClick={e => { e.stopPropagation(); remove(p.iid) }}
            style={{ width: 24, height: 24, background: '#1c1218', border: '1px solid #331a22', borderRadius: 4, color: '#ff5555', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>×</button>
        </div>
      ))}
    </div>
  )
}

function EditorPanel({ editPart, editVals, editing, upd, globalColor }) {
  if (!editPart || !editVals) return (
    <div style={{ padding: '40px 20px', textAlign: 'center', color: '#2a2a38', fontSize: 12 }}>パーツを選択して編集</div>
  )
  return (
    <div style={{ padding: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#a0a0b0', marginBottom: 4 }}>{editPart.name}</div>
      <div style={{ fontSize: 10, color: 'var(--dim)', marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid var(--bdr)' }}>変更はリアルタイムでプレビューに反映</div>
      {editPart.fields.filter(f => shouldShowField(f, editVals)).map(f => (
        <div key={f.key} style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 10, color: 'var(--dim)', fontWeight: 600, display: 'block', marginBottom: 4 }}>{f.label}</label>
          {f.type === 'color' && (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <input type="color" value={editVals[f.key] || globalColor.primary} onChange={e => upd(editing, f.key, e.target.value)}
                style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 4 }} />
              <input type="text" value={editVals[f.key] || ''} placeholder="グローバル" onChange={e => upd(editing, f.key, e.target.value)}
                style={{ flex: 1, padding: '6px 8px', background: 'var(--bg3)', border: '1px solid var(--bdr)', borderRadius: 6, color: '#909098', fontSize: 11, fontFamily: 'monospace' }} />
            </div>
          )}
          {f.type === 'toggle' && (
            <div className={`tog ${editVals[f.key] ? 'on' : 'off'}`} onClick={() => upd(editing, f.key, !editVals[f.key])}><i /></div>
          )}
          {f.type === 'select' && (
            <div style={{ display: 'flex', gap: 4 }}>
              {f.options.map(opt => (
                <button key={opt} onClick={() => upd(editing, f.key, opt)}
                  style={{ flex: 1, padding: '6px 4px', fontSize: 11, fontWeight: 600, background: editVals[f.key] === opt ? 'var(--acc)' : 'var(--bg3)', color: editVals[f.key] === opt ? '#fff' : 'var(--dim)', border: `1px solid ${editVals[f.key] === opt ? 'var(--acc)' : 'var(--bdr)'}`, borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {opt}
                </button>
              ))}
            </div>
          )}
          {f.type === 'text' && (
            <input type="text" value={editVals[f.key] || ''} onChange={e => upd(editing, f.key, e.target.value)}
              style={{ width: '100%', padding: '8px 10px', background: 'var(--bg3)', border: '1px solid var(--bdr)', borderRadius: 6, color: '#a0a0ac', fontSize: 12, fontFamily: 'inherit' }} />
          )}
          {f.type === 'textarea' && (
            <textarea value={editVals[f.key] || ''} onChange={e => upd(editing, f.key, e.target.value)} rows={3}
              style={{ width: '100%', padding: '8px 10px', background: 'var(--bg3)', border: '1px solid var(--bdr)', borderRadius: 6, color: '#a0a0ac', fontSize: 12, resize: 'vertical', lineHeight: 1.6, fontFamily: 'inherit' }} />
          )}
        </div>
      ))}
    </div>
  )
}

function GlobalColorPanel({ globalColor, setGlobalColor }) {
  return (
    <div style={{ padding: 12, borderBottom: '1px solid var(--bdr)', background: '#12121e' }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--acc2)', marginBottom: 10, letterSpacing: 1 }}>グローバル配色</div>
      {[{ k: 'primary', l: 'プライマリ' }, { k: 'accent', l: 'アクセント' }, { k: 'bg', l: '背景ダーク' }, { k: 'bgLight', l: '背景ライト' }].map(({ k, l }) => (
        <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <input type="color" value={globalColor[k]} onChange={e => setGlobalColor(p => ({ ...p, [k]: e.target.value }))}
            style={{ width: 28, height: 28, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 4 }} />
          <span style={{ fontSize: 10, color: 'var(--dim)', width: 72 }}>{l}</span>
          <input type="text" value={globalColor[k]} onChange={e => setGlobalColor(p => ({ ...p, [k]: e.target.value }))}
            style={{ flex: 1, padding: '4px 6px', background: 'var(--bg3)', border: '1px solid var(--bdr)', borderRadius: 4, color: '#808090', fontSize: 10, fontFamily: 'monospace' }} />
        </div>
      ))}
    </div>
  )
}

function PreviewContent({ parts, iframeRef, device, setDevice, compact }) {
  const currentDevice = DEVICES.find(d => d.key === device)
  return (
    <>
      <div style={{ padding: '6px 12px', borderBottom: '1px solid var(--bdr)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: 'var(--dim)' }}>プレビュー</span>
        <div style={{ display: 'flex', gap: 3 }}>
          {DEVICES.map(d => (
            <button key={d.key} onClick={() => setDevice(d.key)}
              style={{ padding: '4px 8px', fontSize: 10, fontWeight: 600, background: device === d.key ? 'var(--acc)' : 'var(--bg3)', color: device === d.key ? '#fff' : 'var(--dim)', border: `1px solid ${device === d.key ? 'var(--acc)' : 'var(--bdr)'}`, borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'inherit' }}>
              {d.icon}{!compact && ` ${d.label}`}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, background: parts.length ? '#1a1a22' : 'var(--bg)', overflow: 'auto', display: 'flex', justifyContent: 'center', alignItems: device === 'pc' ? 'stretch' : 'flex-start', padding: device === 'pc' ? 0 : '12px 0' }}>
        {parts.length ? (
          <div style={{ width: currentDevice.width, maxWidth: '100%', height: device === 'pc' ? '100%' : 'auto', minHeight: device !== 'pc' ? '100%' : undefined, background: '#fff', boxShadow: device !== 'pc' ? '0 0 30px rgba(0,0,0,.4)' : 'none', borderRadius: device !== 'pc' ? '16px' : 0, overflow: device !== 'pc' ? 'hidden' : 'auto', transition: 'width .3s' }}>
            {device !== 'pc' && (
              <div style={{ height: 24, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: device === 'mobile' ? 36 : 6, height: device === 'mobile' ? 4 : 6, borderRadius: 4, background: '#333' }} />
              </div>
            )}
            <iframe ref={iframeRef} style={{ width: '100%', height: device === 'pc' ? '100%' : 'calc(100% - 24px)', minHeight: device !== 'pc' ? '600px' : undefined, border: 'none', display: 'block' }} title="preview" />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#2a2a38', fontSize: 13 }}>パーツを追加</div>
        )}
      </div>
    </>
  )
}

/* ============================================================
   MAIN APP
   ============================================================ */

export default function App() {
  const [parts, setParts] = useState([])
  const [editing, setEditing] = useState(null)
  const [vars, setVars] = useState({})
  const [globalColor, setGlobalColor] = useState({ ...DEFAULT_GLOBAL_COLOR })
  const [openCats, setOpenCats] = useState({})
  const [showGlobalPanel, setShowGlobalPanel] = useState(false)
  const [device, setDevice] = useState('pc')
  const [mobileTab, setMobileTab] = useState('catalog')

  // Two refs: one for desktop, one for mobile — both get updated
  const desktopIframeRef = useRef(null)
  const mobileIframeRef = useRef(null)

  const categories = getOrderedCategories()

  const add = (p) => {
    const iid = `${p.id}-${Date.now()}`
    const defs = {}; p.fields.forEach(f => { defs[f.key] = f.default })
    setParts(pr => [...pr, { ...p, iid }])
    setVars(pr => ({ ...pr, [iid]: defs }))
    setEditing(iid)
  }
  const remove = (iid) => {
    setParts(pr => pr.filter(p => p.iid !== iid))
    setVars(pr => { const n = { ...pr }; delete n[iid]; return n })
    if (editing === iid) setEditing(null)
  }
  const move = (i, d) => setParts(pr => { const a = [...pr], ni = i + d; if (ni < 0 || ni >= a.length) return a; [a[i], a[ni]] = [a[ni], a[i]]; return a })
  const upd = (iid, k, val) => setVars(pr => ({ ...pr, [iid]: { ...pr[iid], [k]: val } }))

  const genHTML = useCallback(() => generateFullHTML(parts, vars, globalColor), [parts, vars, globalColor])

  // Update BOTH iframes whenever content changes
  useEffect(() => {
    const html = genHTML()
    if (desktopIframeRef.current && parts.length > 0) desktopIframeRef.current.srcdoc = html
    if (mobileIframeRef.current && parts.length > 0) mobileIframeRef.current.srcdoc = html
  }, [genHTML, parts.length])

  // Also update mobile iframe when switching to preview tab
  useEffect(() => {
    if (mobileTab === 'preview' && mobileIframeRef.current && parts.length > 0) {
      mobileIframeRef.current.srcdoc = genHTML()
    }
  }, [mobileTab, genHTML, parts.length])

  const handleDownload = () => downloadHTML(genHTML())
  const handleDownloadZip = () => downloadAsZip(parts, vars, globalColor)

  const editPart = parts.find(p => p.iid === editing)
  const editVals = editing ? vars[editing] : null
  const hasParts = parts.length > 0

  const catalogProps = { categories, openCats, setOpenCats, onAdd: add, globalColor }
  const listProps = { parts, editing, setEditing, move, remove, globalColor }
  const editorProps = { editPart, editVals, editing, upd, globalColor }

  return (
    <div className="app">

      {/* =============== MOBILE LAYOUT =============== */}
      <div className="mobile-only" style={{ flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        {/* Top bar */}
        <div className="topbar">
          <div className="brand"><i /><span>Site Builder</span></div>
          <div className="actions">
            <button className="btn-color" onClick={() => setShowGlobalPanel(!showGlobalPanel)}>🎨</button>
            <button className={`btn-zip${hasParts ? '' : ' btn-disabled'}`} onClick={handleDownloadZip}>↓ ZIP</button>
            <button className={`btn-html${hasParts ? '' : ' btn-disabled'}`} onClick={handleDownload}>HTML</button>
          </div>
        </div>

        {showGlobalPanel && <GlobalColorPanel globalColor={globalColor} setGlobalColor={setGlobalColor} />}

        {/* Tab content */}
        <div className="tab-content">
          {mobileTab === 'catalog' && <CatalogPanel {...catalogProps} />}
          {mobileTab === 'build' && (
            <>
              <PartsListPanel {...listProps} />
              {editing && <div style={{ borderTop: '1px solid var(--bdr)' }}><EditorPanel {...editorProps} /></div>}
            </>
          )}
          {mobileTab === 'preview' && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <PreviewContent parts={parts} iframeRef={mobileIframeRef} device={device} setDevice={setDevice} compact />
            </div>
          )}
        </div>

        {/* Bottom tab bar */}
        <div className="tab-bar">
          <button className={mobileTab === 'catalog' ? 'active' : ''} onClick={() => setMobileTab('catalog')}>
            <span className="tab-icon">📦</span><span className="tab-label">カタログ</span>
          </button>
          <button className={mobileTab === 'build' ? 'active' : ''} onClick={() => setMobileTab('build')}>
            <span className="tab-icon">🔧</span><span className="tab-label">構成</span>
            {hasParts && <span className="badge">{parts.length}</span>}
          </button>
          <button className={mobileTab === 'preview' ? 'active' : ''} onClick={() => setMobileTab('preview')}>
            <span className="tab-icon">👁</span><span className="tab-label">プレビュー</span>
          </button>
        </div>
      </div>

      {/* =============== DESKTOP LAYOUT (3 columns) =============== */}
      <div className="desktop-only" style={{ flex: 1 }}>
        {/* Left: Catalog */}
        <div style={{ width: 220, borderRight: '1px solid var(--bdr)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '12px 10px 8px', borderBottom: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, var(--acc), var(--acc2))' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#d0d0dc' }}>パーツ</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}><CatalogPanel {...catalogProps} /></div>
        </div>

        {/* Center: Build + Edit */}
        <div style={{ width: 320, borderRight: '1px solid var(--bdr)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--bdr)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 10, color: 'var(--dim)' }}>構成 <span style={{ color: 'var(--acc)', fontWeight: 700 }}>{parts.length}</span></span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn-color" onClick={() => setShowGlobalPanel(!showGlobalPanel)} style={{ padding: '4px 8px', borderRadius: 4, fontSize: 9, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>🎨</button>
              <button className={`btn-zip${hasParts ? '' : ' btn-disabled'}`} onClick={handleDownloadZip} style={{ padding: '4px 8px', borderRadius: 4, fontSize: 9, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>↓ ZIP</button>
              <button className={`btn-html${hasParts ? '' : ' btn-disabled'}`} onClick={handleDownload} style={{ padding: '4px 8px', borderRadius: 4, fontSize: 9, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>HTML</button>
            </div>
          </div>
          {showGlobalPanel && <GlobalColorPanel globalColor={globalColor} setGlobalColor={setGlobalColor} />}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ borderBottom: editing ? '1px solid var(--bdr)' : 'none' }}><PartsListPanel {...listProps} /></div>
            <div style={{ flex: 1, overflowY: 'auto' }}><EditorPanel {...editorProps} /></div>
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <PreviewContent parts={parts} iframeRef={desktopIframeRef} device={device} setDevice={setDevice} />
        </div>
      </div>
    </div>
  )
}
