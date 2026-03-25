import React, { useState, useCallback, useEffect, useRef } from 'react'
import { getOrderedCategories } from './parts'
import Thumbnail from './components/Thumbnail'
import { shouldShowField, generateFullHTML, downloadHTML, downloadAsZip, DEFAULT_GLOBAL_COLOR } from './utils/helpers'

const DEVICES = [
  { key: 'pc', label: 'PC', icon: '🖥', width: '100%' },
  { key: 'tablet', label: 'Tablet', icon: '📱', width: '768px' },
  { key: 'mobile', label: 'Mobile', icon: '📲', width: '375px' },
]

export default function App() {
  const [parts, setParts] = useState([])
  const [editing, setEditing] = useState(null)
  const [vars, setVars] = useState({})
  const [globalColor, setGlobalColor] = useState({ ...DEFAULT_GLOBAL_COLOR })
  const [openCats, setOpenCats] = useState({})
  const [showGlobalPanel, setShowGlobalPanel] = useState(false)
  const [device, setDevice] = useState('pc')
  const iframeRef = useRef(null)

  const categories = getOrderedCategories()

  const add = (p) => {
    const iid = `${p.id}-${Date.now()}`
    const defs = {}
    p.fields.forEach(f => { defs[f.key] = f.default })
    setParts(pr => [...pr, { ...p, iid }])
    setVars(pr => ({ ...pr, [iid]: defs }))
    setEditing(iid)
  }

  const remove = (iid) => {
    setParts(pr => pr.filter(p => p.iid !== iid))
    setVars(pr => { const n = { ...pr }; delete n[iid]; return n })
    if (editing === iid) setEditing(null)
  }

  const move = (i, d) => setParts(pr => {
    const a = [...pr], ni = i + d
    if (ni < 0 || ni >= a.length) return a
    ;[a[i], a[ni]] = [a[ni], a[i]]
    return a
  })

  const upd = (iid, k, val) => setVars(pr => ({ ...pr, [iid]: { ...pr[iid], [k]: val } }))

  const genHTML = useCallback(
    () => generateFullHTML(parts, vars, globalColor),
    [parts, vars, globalColor]
  )

  useEffect(() => {
    if (iframeRef.current && parts.length > 0) {
      iframeRef.current.srcdoc = genHTML()
    }
  }, [genHTML, parts.length])

  const handleDownload = () => downloadHTML(genHTML())
  const handleDownloadZip = () => downloadAsZip(parts, vars, globalColor)

  const editPart = parts.find(p => p.iid === editing)
  const editVals = editing ? vars[editing] : null
  const currentDevice = DEVICES.find(d => d.key === device)

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      {/* ===== LEFT: CATALOG ===== */}
      <div style={{ width: 220, borderRight: '1px solid var(--bdr)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '12px 10px 8px', borderBottom: '1px solid var(--bdr)', display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, var(--acc), var(--acc2))' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#d0d0dc' }}>パーツ</span>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 4 }}>
          {categories.map(({ name: cat, parts: items }) => (
            <div key={cat} style={{ marginBottom: 2 }}>
              <div
                onClick={() => setOpenCats(p => ({ ...p, [cat]: !p[cat] }))}
                style={{ padding: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 4, fontSize: 10, fontWeight: 700, color: '#909098', userSelect: 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span>{cat} <span style={{ fontWeight: 400, color: 'var(--dim)' }}>({items.length})</span></span>
                <span style={{ fontSize: 8, color: 'var(--dim)', transition: 'transform .2s', transform: openCats[cat] ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
              </div>
              {openCats[cat] && (
                <div style={{ padding: '0 4px 4px' }}>
                  {items.map(p => (
                    <div key={p.id} onClick={() => add(p)}
                      style={{ marginBottom: 4, borderRadius: 6, overflow: 'hidden', border: '1px solid var(--bdr)', cursor: 'pointer', background: 'var(--bg2)', transition: 'all .12s' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = '#3a3a4a'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bdr)'}
                    >
                      <div style={{ aspectRatio: '16/10' }}>
                        <Thumbnail type={p.thumb} color={globalColor.primary} />
                      </div>
                      <div style={{ padding: '4px 6px' }}>
                        <div style={{ fontSize: 9, fontWeight: 600, color: '#c8c8d4' }}>{p.name}</div>
                        <div style={{ fontSize: 8, color: 'var(--dim)' }}>{p.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== CENTER: PARTS LIST + EDITOR ===== */}
      <div style={{ width: 320, borderRight: '1px solid var(--bdr)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--bdr)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 10, color: 'var(--dim)' }}>
            構成 <span style={{ color: 'var(--acc)', fontWeight: 700 }}>{parts.length}</span>
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setShowGlobalPanel(!showGlobalPanel)}
              style={{ padding: '4px 8px', background: showGlobalPanel ? '#2a1e3e' : 'var(--bg3)', color: showGlobalPanel ? 'var(--acc2)' : 'var(--dim)', border: `1px solid ${showGlobalPanel ? '#4a2e6e' : 'var(--bdr)'}`, borderRadius: 4, fontSize: 9, fontWeight: 600, cursor: 'pointer' }}>
              🎨 配色
            </button>
            <button onClick={handleDownloadZip} disabled={!parts.length}
              style={{ padding: '4px 8px', background: parts.length ? 'linear-gradient(135deg, var(--acc), var(--acc2))' : 'var(--bg3)', color: '#fff', border: 'none', borderRadius: 4, fontSize: 9, fontWeight: 600, cursor: parts.length ? 'pointer' : 'not-allowed', opacity: parts.length ? 1 : .4 }}>
              ↓ ZIP
            </button>
            <button onClick={handleDownload} disabled={!parts.length}
              style={{ padding: '4px 8px', background: parts.length ? 'var(--bg3)' : 'var(--bg3)', color: parts.length ? 'var(--dim)' : 'var(--dim)', border: '1px solid var(--bdr)', borderRadius: 4, fontSize: 9, fontWeight: 600, cursor: parts.length ? 'pointer' : 'not-allowed', opacity: parts.length ? 1 : .4 }}>
              HTML
            </button>
          </div>
        </div>

        {showGlobalPanel && (
          <div style={{ padding: 10, borderBottom: '1px solid var(--bdr)', background: '#12121e' }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--acc2)', marginBottom: 8, letterSpacing: 1 }}>グローバル配色</div>
            {[
              { k: 'primary', l: 'プライマリ' },
              { k: 'accent', l: 'アクセント' },
              { k: 'bg', l: '背景（ダーク）' },
              { k: 'bgLight', l: '背景（ライト）' },
            ].map(({ k, l }) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
                <input type="color" value={globalColor[k]} onChange={e => setGlobalColor(p => ({ ...p, [k]: e.target.value }))}
                  style={{ width: 22, height: 22, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 3, padding: 0 }} />
                <span style={{ fontSize: 9, color: 'var(--dim)', width: 80 }}>{l}</span>
                <input type="text" value={globalColor[k]} onChange={e => setGlobalColor(p => ({ ...p, [k]: e.target.value }))}
                  style={{ flex: 1, padding: '3px 4px', background: 'var(--bg3)', border: '1px solid var(--bdr)', borderRadius: 3, color: '#808090', fontSize: 9, fontFamily: 'monospace' }} />
              </div>
            ))}
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 8, borderBottom: editing ? '1px solid var(--bdr)' : 'none' }}>
            {!parts.length ? (
              <div style={{ padding: '40px 0', textAlign: 'center', color: '#2a2a38', fontSize: 11, lineHeight: 1.7 }}>
                ← カテゴリを開いて<br />パーツを追加
              </div>
            ) : parts.map((p, i) => (
              <div key={p.iid} onClick={() => setEditing(p.iid)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: 6, marginBottom: 2, borderRadius: 5,
                  border: editing === p.iid ? '1px solid rgba(108,140,255,.25)' : '1px solid transparent',
                  background: editing === p.iid ? '#14142a' : 'var(--bg2)', cursor: 'pointer',
                }}>
                <div style={{ width: 48, aspectRatio: '16/10', borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
                  <Thumbnail type={p.thumb} color={globalColor.primary} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#b8b8c8' }}>{p.name}</div>
                  <div style={{ fontSize: 8, color: '#44445a' }}>{p.category}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1, flexShrink: 0 }}>
                  <button onClick={e => { e.stopPropagation(); move(i, -1) }}
                    style={{ width: 16, height: 16, background: 'var(--bg3)', border: '1px solid var(--bdr)', borderRadius: 2, color: 'var(--dim)', fontSize: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▲</button>
                  <button onClick={e => { e.stopPropagation(); move(i, 1) }}
                    style={{ width: 16, height: 16, background: 'var(--bg3)', border: '1px solid var(--bdr)', borderRadius: 2, color: 'var(--dim)', fontSize: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▼</button>
                </div>
                <button onClick={e => { e.stopPropagation(); remove(p.iid) }}
                  style={{ width: 16, height: 16, background: '#1c1218', border: '1px solid #331a22', borderRadius: 2, color: '#ff5555', fontSize: 9, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>×</button>
              </div>
            ))}
          </div>

          {editPart && editVals && (
            <div style={{ padding: '8px 10px', flex: 1, overflowY: 'auto' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#a0a0b0', marginBottom: 3 }}>{editPart.name}</div>
              <div style={{ fontSize: 8, color: 'var(--dim)', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid var(--bdr)' }}>
                変更はリアルタイムでプレビューに反映
              </div>
              {editPart.fields.filter(f => shouldShowField(f, editVals)).map(f => (
                <div key={f.key} style={{ marginBottom: 10 }}>
                  <label style={{ fontSize: 8, color: 'var(--dim)', fontWeight: 600, display: 'block', marginBottom: 3 }}>{f.label}</label>

                  {f.type === 'color' && (
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                      <input type="color" value={editVals[f.key] || globalColor.primary} onChange={e => upd(editing, f.key, e.target.value)}
                        style={{ width: 24, height: 24, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 3, padding: 0 }} />
                      <input type="text" value={editVals[f.key] || ''} placeholder="グローバル設定" onChange={e => upd(editing, f.key, e.target.value)}
                        style={{ flex: 1, padding: '3px 5px', background: 'var(--bg3)', border: '1px solid var(--bdr)', borderRadius: 3, color: '#909098', fontSize: 9, fontFamily: 'monospace' }} />
                    </div>
                  )}

                  {f.type === 'toggle' && (
                    <div className={`toggle-track ${editVals[f.key] ? 'on' : 'off'}`} onClick={() => upd(editing, f.key, !editVals[f.key])}>
                      <div className="toggle-knob" />
                    </div>
                  )}

                  {f.type === 'select' && (
                    <div style={{ display: 'flex', gap: 2 }}>
                      {f.options.map(opt => (
                        <button key={opt} onClick={() => upd(editing, f.key, opt)}
                          style={{
                            flex: 1, padding: '4px 2px', fontSize: 9, fontWeight: 600,
                            background: editVals[f.key] === opt ? 'var(--acc)' : 'var(--bg3)',
                            color: editVals[f.key] === opt ? '#fff' : 'var(--dim)',
                            border: `1px solid ${editVals[f.key] === opt ? 'var(--acc)' : 'var(--bdr)'}`,
                            borderRadius: 3, cursor: 'pointer',
                          }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {f.type === 'text' && (
                    <input type="text" value={editVals[f.key] || ''} onChange={e => upd(editing, f.key, e.target.value)}
                      style={{ width: '100%', padding: '4px 6px', background: 'var(--bg3)', border: '1px solid var(--bdr)', borderRadius: 3, color: '#a0a0ac', fontSize: 9 }} />
                  )}

                  {f.type === 'textarea' && (
                    <textarea value={editVals[f.key] || ''} onChange={e => upd(editing, f.key, e.target.value)} rows={3}
                      style={{ width: '100%', padding: '4px 6px', background: 'var(--bg3)', border: '1px solid var(--bdr)', borderRadius: 3, color: '#a0a0ac', fontSize: 9, resize: 'vertical', lineHeight: 1.6, fontFamily: "'Noto Sans JP', sans-serif" }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== RIGHT: LIVE PREVIEW with device toggle ===== */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <div style={{ padding: '6px 12px', borderBottom: '1px solid var(--bdr)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 10, color: 'var(--dim)' }}>ライブプレビュー</span>
          <div style={{ display: 'flex', gap: 2 }}>
            {DEVICES.map(d => (
              <button
                key={d.key}
                onClick={() => setDevice(d.key)}
                style={{
                  padding: '4px 10px',
                  fontSize: 9,
                  fontWeight: 600,
                  background: device === d.key ? 'var(--acc)' : 'var(--bg3)',
                  color: device === d.key ? '#fff' : 'var(--dim)',
                  border: `1px solid ${device === d.key ? 'var(--acc)' : 'var(--bdr)'}`,
                  borderRadius: 3,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  transition: 'all .15s',
                }}
              >
                <span>{d.icon}</span> {d.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{
          flex: 1,
          background: parts.length ? '#1a1a22' : 'var(--bg)',
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: device === 'pc' ? 'stretch' : 'flex-start',
          padding: device === 'pc' ? 0 : '20px 0',
        }}>
          {parts.length ? (
            <div style={{
              width: currentDevice.width,
              maxWidth: '100%',
              height: device === 'pc' ? '100%' : 'auto',
              minHeight: device !== 'pc' ? '100%' : undefined,
              background: '#fff',
              boxShadow: device !== 'pc' ? '0 0 40px rgba(0,0,0,.4)' : 'none',
              borderRadius: device !== 'pc' ? '12px' : 0,
              overflow: device !== 'pc' ? 'hidden' : 'auto',
              position: 'relative',
              transition: 'width .3s ease, border-radius .3s ease',
            }}>
              {device !== 'pc' && (
                <div style={{
                  height: 28,
                  background: '#111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  flexShrink: 0,
                }}>
                  <div style={{ width: device === 'mobile' ? 40 : 8, height: device === 'mobile' ? 4 : 8, borderRadius: 4, background: '#333' }} />
                </div>
              )}
              <iframe
                ref={iframeRef}
                style={{
                  width: '100%',
                  height: device === 'pc' ? '100%' : 'calc(100% - 28px)',
                  minHeight: device !== 'pc' ? '600px' : undefined,
                  border: 'none',
                  display: 'block',
                }}
                title="preview"
              />
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#2a2a38', fontSize: 12 }}>
              パーツを追加するとプレビューが表示されます
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
