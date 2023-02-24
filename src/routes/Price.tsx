import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";

const PriceBox = styled.div`
  margin: 0 auto;
`;
const PriceDetail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const MarketCap = styled.div`
  text-align: start;
  font-size: 16px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 12px 10px;
  border-radius: 10px;
  text-justify: distribute-all-lines;
  line-height: 200%;
`;
const Volume = styled.div`
  text-align: start;
  font-size: 16px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 12px 10px;
  border-radius: 10px;
  text-justify: distribute-all-lines;
  line-height: 200%;
`;

const PercentChange = styled.div`
  text-align: center;

  font-size: 20px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 12px 0px;
  border-radius: 10px;
`;

interface PriceData {
  quotes?: {
    USD?: {
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
        <PriceBox>
          <PriceDetail>
            <MarketCap>
              <span>
                Market Cap:
                <br></br>$ {tickersData?.quotes?.USD?.market_cap}
                <br></br> {tickersData?.quotes?.USD?.market_cap_change_24h}%
              </span>
            </MarketCap>
            <Volume>
              <span>
                Volume:
                <br></br>$ {tickersData?.quotes?.USD?.volume_24h.toFixed(3)}
                <br></br> {tickersData?.quotes?.USD?.volume_24h_change_24h}%
              </span>
            </Volume>
          </PriceDetail>
          <PercentChange>
            <span>
              Percent from all time high:{" "}
              {tickersData?.quotes?.USD?.percent_from_price_ath}%
            </span>
            <br></br>
          </PercentChange>
        </PriceBox>
      )}
    </div>
  );
}

export default Price;
