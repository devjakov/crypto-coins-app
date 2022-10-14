import { useState } from "react";
import AddAssetModal from "../../components/PortfolioModal";
import { Title } from "../../styles/Title.styled";
import { Wrapper } from "../../styles/Wrapper.styled";
import { PortfolioAssets } from "../../components/PortfolioAssets";


export default function Portfolio(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [portfolioAssets, setPortfolioAssets] = useState([])

    const handleSaveAndSubmit = (asset) => {
        if (portfolioAssets.some(e => e.coinID === asset.coinID)) {
            return
        }

        const assets = portfolioAssets
        assets.push(asset)
        console.log(assets)
        setPortfolioAssets(assets)
    }

    return (
        <Wrapper maxWidth={1800}>
            <button onClick={() => setIsOpen(!isOpen)}>Add Asset</button>
            <AddAssetModal handleSaveAndSubmit={handleSaveAndSubmit} isOpen={isOpen} handleClose={setIsOpen} />
            <Title>Your statistics</Title>
            <PortfolioAssets portfolioAssets={portfolioAssets} />
        </Wrapper>
    )
}
