import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";


export interface VariableInputProps {
    value: number
    onChange: (value: number) => void

}

// variable input with plus and minus buttons
export function VariableInput({value, onChange}: VariableInputProps) {
    return (
        <div className={"flex flex-row items-center space-x-4 align-middle"}>
            <button onClick={() => {
                onChange(value + 1)

            }} className={"w-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center justify-center"}>
                <FontAwesomeIcon icon={faPlus}/>
            </button>
            {/* hide input arrows */}
            <span className={"w-4"}>
                {value}
            </span>
            <button onClick={() => {
                onChange(value - 1)
            }} className={"w-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-row items-center justify-center"}>
                <FontAwesomeIcon icon={faMinus} />
            </button>
        </div>

    )
}