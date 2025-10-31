'use client'
import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const getVideo = async () => {
    if (!url) return alert('URL daal bhai!')
    setLoading(true)
    const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`)
    const json = await res.json()
    setData(json)
    setLoading(false)
  }

  const download = (link: string, name: string) => {
    const a = document.createElement('a')
    a.href = link
    a.download = name
    a.click()
  }

  return (
    <div style={{padding: '1.5rem', fontFamily: 'Arial', background: '#0f0f0f', color: '#fff', minHeight: '100vh'}}>
      <h1 style={{textAlign:'center', fontSize:'2.2rem', marginBottom:'5px'}}>
        📥 YT Downloader by <span style={{color:'#ff0000'}}>Unit Bahi</span>
      </h1>
      <p style={{textAlign:'center', fontSize:'1rem', color:'#aaa'}}>
        Fast • Free • No Ads
      </p>

      {/* Must Join Channel */}
      <div style={{textAlign:'center', margin:'1.5rem 0'}}>
        <a 
          href="https://whatsapp.com/channel/0029VafzmV3KLaHtGZL2C81A" 
          target="_blank"
          style={{color:'#25D366', fontWeight:'bold', fontSize:'1.1rem'}}
        >
          ⚠️ Join Channel First (Lazmi!) 👈
        </a>
      </div>

      <div style={{maxWidth:'600px', margin:'2rem auto'}}>
        <input 
          type="text" 
          placeholder="YouTube URL paste kar..." 
          value={url} 
          onChange={e=>setUrl(e.target.value)}
          style={{width:'100%', padding:'14px', fontSize:'1rem', borderRadius:'12px', border:'none', marginBottom:'10px'}}
        />
        <button 
          onClick={getVideo} 
          disabled={loading}
          style={{width:'100%', padding:'14px', background:'#ff0000', color:'#fff', border:'none', borderRadius:'12px', fontWeight:'bold', fontSize:'1.1rem'}}
        >
          {loading ? '⏳ Wait...' : '🚀 Get Download Links'}
        </button>
      </div>

      {data && (
        <div style={{textAlign:'center', marginTop:'2rem'}}>
          <img src={data.thumbnail} style={{width:'100%', maxWidth:'400px', borderRadius:'16px', margin:'1rem 0'}} />
          <h2 style={{fontSize:'1.5rem', margin:'10px 0'}}>{data.title}</h2>
          
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))', gap:'12px', marginTop:'20px'}}>
            {data.medias.map((m:any, i:number) => (
              <button 
                key={i} 
                onClick={()=>download(m.url, `${data.title} - ${m.quality}.${m.extension}`)} 
                style={{padding:'14px', background:'#28a745', color:'#fff', border:'none', borderRadius:'10px', fontWeight:'bold'}}
              >
                {m.quality} • {m.extension}
              </button>
            ))}
          </div>

          <p style={{marginTop:'2rem', color:'#666', fontSize:'0.9rem'}}>
            Made with ❤️ by <b>Unit Bahi</b>
          </p>
        </div>
      )}
    </div>
  )
}
