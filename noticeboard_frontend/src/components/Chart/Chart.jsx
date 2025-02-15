import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Week 1", Notices: 5 },
  { name: "Week 2", Notices: 8 },
  { name: "Week 3", Notices: 4 },
  { name: "Week 4", Notices: 7 },
  { name: "Week 5", Notices: 6 },
];

const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title || "Office Notices Overview"}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="noticesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4caf50" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#555" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", borderRadius: "5px" }} />
          <Area
            type="monotone"
            dataKey="Notices"
            stroke="#4caf50"
            fillOpacity={1}
            fill="url(#noticesGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
