import { useEffect, useState } from 'react';

const products = {
  '/fm': {
    title: 'FM — Learn sentence by sentence',
    lead: 'A friendly collection of learning tools for practicing language in context.',
    images: ['views/img/sayitout9.png', 'views/img/addTrack.png', 'views/img/learning.png', 'views/img/eSayItOut.png'],
    video: 'views/img/cx.mov'
  },
  '/eQuicker24': {
    title: 'eQuicker24',
    lead: 'A quick, playful card experience for everyday practice.',
    images: ['views/img/weq1.PNG', 'views/img/weq2.PNG', 'views/img/weq3.PNG', 'views/img/weq4.PNG', 'views/img/weq5.PNG']
  },
  '/showace': {
    title: 'ShowAce',
    lead: 'Turn your photos and videos into a warm, personal presentation.',
    images: ['views/img/showbest1.jpg', 'views/img/showbest2.jpg', 'views/img/showbest.png'],
    video: 'views/img/cx.mov'
  }
};

const lumaNest = {
  name: 'LumaNest',
  tagline: '把灵感、学习和下一步，放在同一个安静空间。',
  description: 'LumaNest 是一个为 Mac、iPhone 和 iPad 设计的个人学习与想法整理 App。它把零散的笔记变成可继续行动的小卡片。',
  image: 'views/img/virtual-app/lumanest-platform.png'
};

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function Link({ href, children, className = '' }) {
  return <a className={className} href={href} onClick={(event) => { event.preventDefault(); navigate(href); }}>{children}</a>;
}

function Layout({ children }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link href="/" className="brand">GoByStep</Link>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/message">Message</Link>
          <Link href="/about">About</Link>
          <Link href="/uploadFiles">Upload</Link>
          <Link href="/lumanest">LumaNest</Link>
        </nav>
      </header>
      <main className="page-container">{children}</main>
      <footer className="site-footer">Copyright © GoByStep 2016–2026</footer>
    </div>
  );
}

function Home() {
  const cards = [
    { image: 'views/img/sayitout1.png', title: 'Learning Sentence By Sentence', text: 'Practice language in small, memorable steps.', href: '/fm' },
    { image: 'views/img/eQuicker24.jpg', title: "Let's get more close", text: 'A playful way to make everyday practice easier.', href: '/eQuicker24' },
    { image: 'views/img/sa0.jpg', title: 'Memories on the table', text: 'Make photos and videos feel more special and caring.', href: '/showace' }
  ];
  return <>
    <section className="hero"><p className="eyebrow">WELCOME TO GOBYSTEP</p><h1>Small tools for curious minds.</h1><p>Explore the apps, share a message, and discover a few projects from the archive.</p></section>
    <div className="card-grid">{cards.map((card) => <article className="feature-card" key={card.href}>
      <img src={card.image} alt="" /><div className="card-body"><h2>{card.title}</h2><p>{card.text}</p><Link href={card.href} className="button">Learn more <span aria-hidden="true">→</span></Link></div>
    </article>)}</div>
    <section className="app-promo"><div><p className="eyebrow">NEW FICTIONAL APP</p><h2>LumaNest</h2><p>同一套学习空间，陪你在 Mac 上整理，在 iPad 上深入，在 iPhone 上随时捕捉。</p><Link href="/lumanest" className="button">了解 LumaNest <span aria-hidden="true">→</span></Link></div><img src={lumaNest.image} alt="LumaNest 在 Mac、iPad 和 iPhone 上运行的示意图" /></section>
  </>;
}

function LumaNest() {
  const steps = [
    ['01', '在 Mac 上整理', '用键盘快速记录课程、会议或阅读中的想法，把内容拆成可以完成的小卡片。'],
    ['02', '在 iPad 上深入', '打开专注画布，用 Apple Pencil 标注重点，把卡片拖成清晰的学习路径。'],
    ['03', '在 iPhone 上捕捉', '看到灵感就快速添加，稍后回到 Mac 或 iPad 继续完成，不让好想法停在脑海里。']
  ];
  return <section className="lumanest-page"><div className="lumanest-hero"><div><p className="eyebrow">A FICTIONAL APP FOR APPLE PLATFORMS</p><h1>{lumaNest.name}</h1><p className="lumanest-tagline">{lumaNest.tagline}</p><p className="intro">{lumaNest.description}</p><div className="platform-pills"><span>Mac</span><span>iPhone</span><span>iPad</span></div></div><img src={lumaNest.image} alt="LumaNest 在 Mac、iPad 和 iPhone 上的产品示意图" /></div><div className="lumanest-section"><p className="eyebrow">HOW IT WORKS</p><h2>三台设备，一条连续的使用路径</h2><div className="steps-grid">{steps.map(([number, title, text]) => <article key={number} className="step-card"><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div><div className="lumanest-section use-case"><div><p className="eyebrow">A SIMPLE ROUTINE</p><h2>从记录到行动</h2><p>早上用 iPhone 记下一句话；下午在 iPad 上补充资料；晚上回到 Mac，把它整理成明天可以执行的一步。</p></div><div className="routine"><span>Capture</span><i>→</i><span>Shape</span><i>→</i><span>Continue</span></div></div><div className="lumanest-note"><strong>说明</strong><p>LumaNest 是本网站中的虚拟示例产品，用来演示 Apple 平台 App 的介绍和使用方式，并非真实上架的 App。</p></div></section>;
}

function About() {
  const items = [
    ['Say It Out', 'views/img/sayitout.png'], ['eQuicker24', 'views/img/eQuicker24.png'], ['ShowAce', 'views/img/showbest.png'], ['Learning', 'views/img/learning.png']
  ];
  return <section className="content-section"><p className="eyebrow">ABOUT</p><h1>GoByStep</h1><p className="intro">A small independent collection of software experiments and learning ideas.</p><div className="about-grid">{items.map(([title, image]) => <div className="about-tile" key={title}><img src={image} alt={title} /><h2>{title}</h2></div>)}</div><p className="contact">Questions or ideas? <a href="mailto:GoByStep@outlook.com">GoByStep@outlook.com</a></p></section>;
}

function Messages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { fetch('/messages').then((response) => response.ok ? response.json() : Promise.reject(new Error('Message service unavailable'))).then(setMessages).catch((reason) => setError(reason.message)); }, []);
  return <section className="content-section"><div className="section-heading"><div><p className="eyebrow">COMMUNITY</p><h1>Messages</h1></div><Link href="/newMessage" className="button">New message</Link></div>{error && <p className="notice error">{error}</p>}{!error && messages.length === 0 && <p className="empty-state">No messages yet. Start the conversation.</p>}<div className="message-list">{messages.map((item, index) => <article className="message-card" key={`${item.time || item.username}-${index}`}><div className="message-meta"><strong>{item.username || 'Anonymous'}</strong><span>{item.tgroup || 'General'}</span></div><p>{item.message}</p>{item.contact && <small>{item.contact}</small>}</article>)}</div></section>;
}

function NewMessage() {
  const [form, setForm] = useState({ iName: '', iContact: '', iGroup: '', iMessage: '' });
  const [status, setStatus] = useState('');
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  async function submit(event) { event.preventDefault(); setStatus(''); if (Object.values(form).some((value) => !value.trim())) return setStatus('Please complete every field.'); const response = await fetch('/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }); if (response.ok) navigate('/message'); else setStatus('Unable to save this message.'); }
  return <section className="content-section narrow"><p className="eyebrow">COMMUNITY</p><h1>New message</h1><form className="message-form" onSubmit={submit}>{[['iName', 'Your name'], ['iContact', 'Contact'], ['iGroup', 'Group']].map(([field, label]) => <label key={field}>{label}<input value={form[field]} onChange={update(field)} required /></label>)}<label>Message<textarea rows="6" value={form.iMessage} onChange={update('iMessage')} required /></label>{status && <p className="notice error">{status}</p>}<div className="form-actions"><button className="button" type="submit">Save message</button><button className="button secondary" type="button" onClick={() => setForm({ iName: '', iContact: '', iGroup: '', iMessage: '' })}>Clear</button></div></form></section>;
}

function UploadFiles() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  async function upload(event) { event.preventDefault(); if (!file) return setStatus('Choose a file first.'); const data = new FormData(); data.append('myFile', file); const response = await fetch('/upload', { method: 'POST', body: data }); setStatus(response.ok ? 'Upload complete.' : 'Upload failed.'); }
  return <section className="content-section narrow"><p className="eyebrow">FILES</p><h1>Upload</h1><p className="intro">Upload a file to the local project archive.</p><form className="upload-form" onSubmit={upload}><input type="file" onChange={(event) => setFile(event.target.files?.[0] || null)} /><button className="button" type="submit">Upload file</button>{status && <p className="notice">{status}</p>}</form><hr /><h2>Available downloads</h2><div className="download-list"><a href="/uploads/1.txt" target="_blank" rel="noreferrer">1.txt</a><a href="/uploads/u01-1.mp3" target="_blank" rel="noreferrer">u01-1.mp3</a></div></section>;
}

function ProductPage({ product }) {
  return <section className="content-section"><p className="eyebrow">PROJECT</p><h1>{product.title}</h1><p className="intro">{product.lead}</p><div className="media-grid">{product.images.map((image) => <img src={image} alt="" key={image} />)}{product.video && <video src={product.video} controls />}</div></section>;
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => { const onPopState = () => setPath(window.location.pathname); window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState); }, []);
  let page = path === '/' ? <Home /> : path === '/about' ? <About /> : path === '/message' ? <Messages /> : path === '/newMessage' ? <NewMessage /> : path === '/uploadFiles' ? <UploadFiles /> : path === '/lumanest' ? <LumaNest /> : products[path] ? <ProductPage product={products[path]} /> : <Home />;
  return <Layout>{page}</Layout>;
}

export default App;
