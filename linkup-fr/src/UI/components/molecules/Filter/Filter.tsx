import { ReactNode, useState } from "react";
import InputFilter from "../../atoms/InputFilter/InputFilter";
import "./filterStyles.css";

export default function Filter():ReactNode{
    const initialState = {
        checkedJava: false,
        checkedCSharp: false,
        checkedNextjs: false,
        checkedTeamwork:false,
        checkedCommunication:false,
        checkedLeaderShip:false
    }
    const [checkedStates, setCheckedStates] = useState(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, checked} = event.target;
        console.log(name,checked);
    }
    return(
        <div className="filter">
            <div className="filter-languages">
                <h3 className="languages-title">Languages</h3>
                <div className="languages-options">
                    <InputFilter 
                    label="C# - ASP.NET"
                    name="csharp"
                    onChange={handleChange}
                    checked={checkedStates.checkedCSharp}
                    />
                    <InputFilter 
                    label="Java"
                    name="java"
                    onChange={handleChange}
                    checked={checkedStates.checkedJava}
                    />
                    <InputFilter 
                    label="Next.js"
                    name="nextjs"
                    onChange={handleChange}
                    checked={checkedStates.checkedNextjs}
                    />
                </div>
            </div>
            <div className="filter-skills">
                <h3 className="skills-title">Soft Skills</h3>
                <div className="skills-options">
                    <InputFilter 
                    label="Teamwork"
                    name="teamwork"
                    onChange={handleChange}
                    checked={checkedStates.checkedTeamwork}
                    />
                    <InputFilter 
                    label="Communication"
                    name="communication"
                    onChange={handleChange}
                    checked={checkedStates.checkedCommunication}
                    />
                    <InputFilter 
                    label="LeaderShip"
                    name="leadership"
                    onChange={handleChange}
                    checked={checkedStates.checkedLeaderShip}
                    />
                </div>
            </div>
            
        </div>
    )
}