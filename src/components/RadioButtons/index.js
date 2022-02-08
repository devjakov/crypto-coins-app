
import React from "react"
import { RadioLabel } from "../../styles/coin/radioLabel.styled"
import { RadioWrapper } from "../../styles/coin/RadioWrapper.styled"

const RadioButtons = (buttons, handleClick) => {

    console.log(buttons, handleClick)

    return (
        <RadioWrapper>
            {buttons.map((buttonValue) =>

                <RadioLabel for={`"${buttonValue}"`}>
                    <input id={`"${buttonValue}"`} type="radio" name="timeframe" onClick={() => handleClick(buttonValue)} />
                    <div></div>
                    {buttonValue === 1 ? `24h` : buttonValue > 0 ? `${buttonValue}d` : buttonValue[0].toUpperCase() + buttonValue.substring(1)}
                </RadioLabel>
            )}
        </RadioWrapper>
    )
}

export default RadioButtons