import React, {useState, useEffect} from 'react';
import {VictoryPie} from 'victory-native';
import {useTheme} from '_theme/ThemeContext';
import {pieSize} from '_utils/useDimensions';

function PieChart() {
  const {colors} = useTheme();

  const graphicColor = [colors.white.focus, colors.white.main]; // Colors
  const wantedGraphicData = [{y: 60}, {y: 40}]; // Data that we want to display
  const defaultGraphicData = [{y: 0}, {y: 100}]; // Data used to make the animate prop work

  const [graphicData, setGraphicData] = useState(defaultGraphicData);

  useEffect(() => {
    setGraphicData(wantedGraphicData); // Setting the data that we want to display
  }, []);

  return (
    <>
      <VictoryPie
        animate={{easing: 'exp'}}
        data={graphicData}
        width={pieSize}
        height={pieSize}
        colorScale={graphicColor}
        innerRadius={70}
        style={{labels: {display: 'none'}}}
        padding={{top: 15, bottom: 15, right: 15, left: 15}}
      />
    </>
  );
}

export default PieChart;
