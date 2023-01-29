import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({
  categoriesData = [],
  title = 'title',
  colorTitle = 'blue',
  label = 'label',
}) {
  const data = {
    labels: categoriesData.map((category) => category.categoryName),
    datasets: [
      {
        label: label,
        data: categoriesData.map((category) => category.categoryTotalAmount),

        backgroundColor: categoriesData.map(
          (category) => category.categoryColor
        ),
        borderWidth: 1.25,
        hoverOffset: 15,
      },
    ],
  };

  const option = {
    plugins: {
      title: {
        color: colorTitle,
        fullSize: true,
        font: { size: 15 },
        display: true,
        text: title,
      },
      legend: { display: true, position: 'top' },
    },
    responsive: true,
  };

  return <Pie data={data} options={option} />;
}

export default PieChart;
