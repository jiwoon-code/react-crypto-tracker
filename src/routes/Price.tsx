import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";

const PriceBox = styled.div``;
const MarketCap = styled.div``;
const Volume = styled.div``;

const PercentChange = styled.div``;

interface PriceData {
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <>
          <PriceBox>
            <MarketCap>
              <span>Market Cap: ${tickersData?.quotes.USD.market_cap}</span>{" "}
              <br></br>
              <span>
                Market Cap 24h: {tickersData?.quotes.USD.market_cap_change_24h}%
              </span>
              <br></br>
            </MarketCap>
            <Volume>
              <span>
                Volume: ${tickersData?.quotes.USD.volume_24h.toFixed(3)}
              </span>
              <br></br>
              <span>
                Volume 24h: {tickersData?.quotes.USD.volume_24h_change_24h}%
              </span>
              <br></br>
            </Volume>
            <PercentChange>
              <span>
                Percent from all time high:
                {tickersData?.quotes.USD.percent_from_price_ath}%
              </span>
              <br></br>
            </PercentChange>
          </PriceBox>
        </>
      )}
    </div>
  );
}

export default Price;
