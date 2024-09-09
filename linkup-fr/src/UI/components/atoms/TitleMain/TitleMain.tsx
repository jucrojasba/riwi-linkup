import './TitleMain.css'

interface ITitleMainProps{
    title: string,
    subtitle?: string
}

export default function TitleMain({ title, subtitle}: ITitleMainProps):React.ReactNode{
    return(
        <div className='title-container'>
            <h1 className="title-main">{title}</h1>
            <p className="main-subtitle">{subtitle}</p>
        </div>
    )
}