// Importing services from various files for handling different functionalities
import { getClansService } from "./clanService"; // Service to get clans
import { getLanguagesService } from "./languageService"; // Service to get languages
import { getSoftSkillsService } from "./softSkillService"; // Service to get soft skills
import { getTechnicalSkillsService } from "./technicalSkillService"; // Service to get technical skills
import { authLoginService, authRegisterService } from "./authService"; // Services for authentication (login and registration)
import { 
    getCodersService, 
    deleteCoderService, 
    getCodersInTraining, 
    getCodersFrontend, 
    getCodersBackend 
} from "./coderService"; // Services for handling coder-related functionalities
import { filterService } from "./filterService"; // Service for filtering coders based on criteria
import { getCompaniesByMonth } from "./clientServices"; // Service to get companies by month

// Re-exporting all the imported services for easy access in other parts of the application
export {
    getClansService,
    getLanguagesService,
    getSoftSkillsService,
    getTechnicalSkillsService,
    authLoginService,
    authRegisterService,
    getCodersBackend,
    getCodersFrontend,
    getCodersInTraining,
    getCodersService,
    deleteCoderService,
    getCompaniesByMonth,
    filterService
};
