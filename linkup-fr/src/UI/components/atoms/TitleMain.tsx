import {useTranslation} from "react-i18next";
interface ITitleMainProps{
    className: string,
    title: string,
    subtitle?: string
}

export default function TitleMain({className, title, subtitle}: ITitleMainProps):React.ReactNode{
    const {t} = useTranslation();
    return(
        <div className={className}>
            <h2 className="title-main">{title}</h2>
            <h4 className="main-subtitle">{subtitle}</h4>
        </div>
    )
}