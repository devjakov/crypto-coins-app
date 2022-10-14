import { Modal } from "../../styles/Modal.styled"
import { ModalContent } from "../../styles/ModalContent.styled"
import { useClickOutside } from "../../utilities/useClickOutside/useClickOutside"
import { connect } from "react-redux"
import { portfolioGetSelectedCoin } from "../../store/portfolioSelectedCoin/portfolioSelectedCoinActions"
import { useSelector } from "react-redux"
import PortfolioSearch from "./PortfolioSearch"
import { useState } from "react"

export const AddAssetModal = ({ isOpen, handleClose, portfolioGetSelectedCoin, handleSaveAndSubmit }) => {
    const { coin, isLoading } = useSelector(state => state.portfolioSelectedCoin)

    const modalRef = useClickOutside(handleClose, isOpen)

    const handleSelectedCoin = (id) => {
        console.log(id)
        portfolioGetSelectedCoin(id)
    }

    const handleFormSubmit = (e) => {
        handleClose(!isOpen)
        e.preventDefault()
        const purchasedPrice = e.target[1]._valueTracker.getValue()
        const purchasedAmount = e.target[2]._valueTracker.getValue()
        const addedAsset = {
            coinID: coin.id,
            purchasedAmount: purchasedAmount,
            purchasedPrice: purchasedPrice
        }
        handleSaveAndSubmit(addedAsset)
    }

    console.log(coin)

    return (
        <Modal show={isOpen}>
            <ModalContent ref={modalRef} >
                <h1>Add Asset</h1>
                {isLoading ? <h1>Loading...</h1> : coin && <img src={coin.image.thumb} alt="coin logo" />}
                <form onSubmit={handleFormSubmit}>
                    <PortfolioSearch handleSelectedCoin={handleSelectedCoin} />
                    <input type="number" name="price" min="0" step="0.01" title="Currency" pattern="^\d+(?:\.\d{1,2})?$" placeholder="Purchased Price" required />
                    <input type="number" placeholder="Purchased Amount" required />
                    <button onClick={() => handleClose(!isOpen)}>
                        Close
                    </button>
                    <input type="submit" />
                </form>

            </ModalContent>
        </Modal>
    )
}
const mapDispatchToProps = {
    portfolioGetSelectedCoin,
}

export default connect(null, mapDispatchToProps)(AddAssetModal)

// GOTEMM guy clicks on link from portfolio search
// GOTEMM onclick a dispatch gets called from addassetmodal to fetch pic of coin
// GOTEMM display loading when clicking to get coin from portfolio search, then display coin
// GOTEMM Create redux store portfolioGetSelectedCoin
// GOTEMM Instead of getting date, get price at which coins were bought
// GOTEMM enable save and close button if all the input fields are filled and valid
// after clicking save and continue, the necessary info gets saved into its own object in portfolio state

// then i just need to figure out how to make the isolated component call API to update


// when user is done inputing all other info, they click save and continue, on dispatch it gets added into portfolio array