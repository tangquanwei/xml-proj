import { useEffect, useRef } from "react";
import * as echarts from "echarts";

// prop中有来自服务端的数据hero
export default function LineBarChart(props) {
  console.log(props);

  const chartRef = useRef(null);
  let name = [];
  let attack = [];
  let defense = [];
  let magic = [];
  let difficulty = [];
  let couponPrice = [];
  let goldPrice = [];
  const { hero } = props
  for (let e of hero) {
    name.push(e.name);
    attack.push(e.attack);
    defense.push(e.defense);
    magic.push(e.magic);
    difficulty.push(e.difficulty);
    couponPrice.push(e.couponPrice);
    goldPrice.push(e.goldPrice);
  }

  console.log(name);

  useEffect(() => {
    let chartInstance = echarts.init(chartRef.current);


    const option = {
      legend: {
        data: [
          "攻击",
          "防御",
          "魔法",
          "难度",
          "金币价格",
          "点券价格",
        ],
      },
      xAxis: {
        type: "category",
        data: name,
      },
      yAxis: [
        { type: "value" },
        {
          type: "value",
          name: "%",
          nameTextStyle: {
            color: "#ccc",
            padding: [0, 0, 10, -30],
          },
          splitNumber: 5,
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              width: 1,
              color: ["#ccc", "#ccc"],
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 12,
            },
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          color: "#fff",
          align: "left",
          fontSize: 14,
        },
        backgroundColor: "rgba(0,0,0,0.8)",
      },
      series: [
        {
          name: "攻击",
          data: attack,
          type: "bar",

        },
        {
          name: "防御",
          data: defense,
          type: "bar",
        },
        {
          name: "魔法",
          data: magic,
          type: "bar",
        },
        {
          name: "难度",
          data: difficulty,
          type: "bar",
        },
        {
          name: "金币价格",
          data: goldPrice,
          yAxisIndex: 1,
          type: "line",
          smooth: true,
        },
        {
          name: "点券价格",
          data: couponPrice,
          yAxisIndex: 1,
          type: "line",
          smooth: true,
        },
      ],
    };
    chartInstance.setOption(option);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>英雄参数对比</h2>
      <div ref={chartRef} style={{ height: "400px" }}></div>
    </div>
  );
}

