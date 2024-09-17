'use client'

import Image from 'next/image';
import './ProfileHeader.css';
import { capitalizeSentece } from '@/utilities/CapitalizeSentence';


interface IHeaderProfile {
    language: boolean; // true = español, false = inglés
    companyName: string;
    sector: string;
    imageProfile: string;
    isDarkMode: boolean;
}

// Definir los sectores y sus traducciones como un tipo
type Sector = 'tecnología' | 'finanzas' | 'salud' | 'educación' | 'manufactura';

const sectorTranslations: Record<Sector, { es: string; en: string }> = {
    tecnología: {
        es: 'Tecnología',
        en: 'Technology'
    },
    finanzas: {
        es: 'Finanzas',
        en: 'Finance'
    },
    salud: {
        es: 'Salud',
        en: 'Health'
    },
    educación: {
        es: 'Educación',
        en: 'Education'
    },
    manufactura: {
        es: 'Manufactura',
        en: 'Manufacturing'
    }
};

const HeaderProfile: React.FC<IHeaderProfile> = ({ language, companyName, sector, imageProfile, isDarkMode }) => {
    // Obtener la traducción o usar el sector con la primera letra en mayúscula
    const translatedSector = sectorTranslations[sector as Sector]?.[language ? 'es' : 'en']
        || capitalizeSentece(sector);

    return (
        <div className={isDarkMode?'header-profile-dark':"header-profile"}>
            <Image className='profile-image-config' src={imageProfile} alt="image profile" width={'100'} height={'100'} />
            <div className="profile-greetings">
                <h3>{companyName}</h3>
                <p>{translatedSector}</p>
            </div>
        </div>
    );
};

export default HeaderProfile;

