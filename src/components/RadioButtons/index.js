import React from "react"
import { RadioLabel } from "../../styles/coin/radioLabel.styled"
import { RadioWrapper } from "../../styles/coin/RadioWrapper.styled"

export default function RadioButtons({ radioButtons, handleSelectedTimeframe }) {
    return (
        <RadioWrapper>
            {radioButtons.map((buttonValue) =>
                <RadioLabel for={`"${buttonValue}"`}>
                    <input defaultChecked={buttonValue === 1} id={`"${buttonValue}"`} type="radio" name="timeframe" onClick={() => handleSelectedTimeframe(buttonValue)} />
                    <div></div>
                    {buttonValue === 1 ? `24h` : buttonValue > 0 ? `${buttonValue}d` : buttonValue[0].toUpperCase() + buttonValue.substring(1)}
                </RadioLabel>
            )}
        </RadioWrapper>
    )
} 