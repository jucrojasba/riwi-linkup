'use client'

import Image from 'next/image';
import './ProfileHeader.css';
import { capitalizeSentece } from '@/utilities/CapitalizeSentence';


// Defining the interface for the HeaderProfile component props
interface IHeaderProfile {
    language: boolean;
    companyName: string | undefined;
    sector: string;
    imageProfile: string;
    isDarkMode: boolean;
}

// Defining the Sector type
type Sector = 'tecnología' | 'finanzas' | 'salud' | 'educación' | 'manufactura';

// Defining the translations for the sectors
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

// Defining the HeaderProfile component
const HeaderProfile: React.FC<IHeaderProfile> = ({ language, companyName, sector, imageProfile, isDarkMode }) => {
    // Translating the sector based on the language
    const translatedSector = sectorTranslations[sector as Sector]?.[language ? 'es' : 'en']
        || capitalizeSentece(sector);

    // Rendering the header profile
    return (
        // Applying different styles based on the isDarkMode prop
        <div className={isDarkMode?'header-profile-dark':"header-profile"}>
            {/* Rendering the profile image */}
            <Image className='profile-image-config' src={imageProfile} alt="image profile" width={'100'} height={'100'} />
            <div className="profile-greetings">
                {/* Rendering the company name */}
                <h3>{companyName}</h3>
                {/* Rendering the translated sector */}
                <p>{translatedSector}</p>
            </div>
        </div>
    );
};

export default HeaderProfile;