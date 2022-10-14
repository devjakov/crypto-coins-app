export function PortfolioAssets({ portfolioAssets }) {

    return (
        <div>
            {portfolioAssets.map(asset =>
                <div>
                    <p>{asset.coinID}</p>
                    <p>{asset.purchasedAmount}</p>
                    <p>{asset.purchasedPrice}</p>
                </div>
            )}
        </div>
    )
}