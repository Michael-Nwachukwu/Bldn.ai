import React from 'react'
import { Box } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import useTokenDetailsStore from './Stores/tokenDetailsStore';

const Chart = () => {
  const tokenChartJsonData = useTokenDetailsStore(state => state.tokenChart);
  
  const dataPoints = tokenChartJsonData.map(([timestamp, price]) => ({
      x: new Date(timestamp),
      y: price,
  }));
  // console.log(dataPoints);
  const labelFontColor = useColorModeValue('gray', '#dfe5ed');

  useEffect(() => {
    // Sample CanvasJS chart code
    const chart = new window.CanvasJS.Chart("chartContainer", {
      // Your chart configuration options
      backgroundColor: 'transparent', 
      axisX: {
        lineThickness: 0,
        labelFontColor: labelFontColor, // Change color of X-axis labels
        valueFormatString: 'DD MMM',
      },
      axisY: {
        gridColor: 'rgba(145, 162, 184, 0.2)',
        lineThickness: 0,
        labelFontColor: labelFontColor, // Change color of X-axis labels
      },
      animationEnabled: true,
      zoomEnabled: true,
      data: [
        {
          type: 'area',
          fillOpacity: 0.1,
          color: '#912f13',
          dataPoints: dataPoints,
        },
      ],
    });

    chart.render();
  }, [dataPoints]);
  
  return (
    <Box p={{ md:3 }} minW={'100%'}>
      <div id="chartContainer" style={{ height: "400px", minWidth:"100%" }}></div>
    </Box>
  );
}

export default Chart