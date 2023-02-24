import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const excepData = data ?? [];
  const chartData = excepData?.map((price) => {
    return {
      x: price.time_close,
      y: [price.open, price.high, price.low, price.close],
    };
  });
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: chartData,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "light" : "dark",
            },

            chart: {
              type: "candlestick",
              height: 300,
              width: 400,
              background: "#35383bea",

              toolbar: {
                show: false,
              },
            },

            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close),
              labels: {
                style: {
                  colors: "white",
                },
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#D24F45",
                  downward: "#0062DF",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
