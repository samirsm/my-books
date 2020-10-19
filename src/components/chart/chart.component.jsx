import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import styled from "styled-components";

import { getBooksFromStorage } from "../../services/storage.service";
am4core.useTheme(am4themes_animated);

const Chart = ({ year }) => {
	const chart = useRef(null);

	useLayoutEffect(() => {
		let chart = am4core.create("chartdiv", am4charts.RadarChart);
		chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

		let label = chart.createChild(am4core.Label);
		label.text = "Drag slider to change radius";
		label.exportable = false;
		const currentYear = new Date().getFullYear();

		/////////////////////////////////////////////////
		///////////////formating data//////////////////////
		///////////////////////////////////////////////
		const monthByNumber = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];
		const dataObj = {};
		getBooksFromStorage().map(book => {
			const date = new Date(book.read_date);
			const month = date.getMonth();
			const year = date.getFullYear();
			if (year == currentYear)
				return dataObj[month] ? dataObj[month]++ : (dataObj[month] = 1);
		});
		chart.data = Object.keys(dataObj)
			.map(month => {
				return {
					category: monthByNumber[month],
					month: month,
					value1: dataObj[month],
				};
			})
			.sort((a, b) => a.month - b.month);

		/////////////////////////////////////////////////
		///////////end formating data///////////////////////
		////////////////////////////////////////////////

		chart.radius = am4core.percent(95);
		chart.startAngle = 270 - 180;
		chart.endAngle = 270 + 180;
		chart.innerRadius = am4core.percent(60);

		let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.dataFields.category = "category";
		categoryAxis.renderer.labels.template.location = 0.5;
		categoryAxis.renderer.grid.template.strokeOpacity = 0.1;
		categoryAxis.renderer.axisFills.template.disabled = true;
		categoryAxis.mouseEnabled = false;

		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.tooltip.disabled = true;
		valueAxis.renderer.grid.template.strokeOpacity = 0.05;
		valueAxis.renderer.axisFills.template.disabled = true;
		valueAxis.renderer.axisAngle = 260;
		valueAxis.renderer.labels.template.horizontalCenter = "right";
		valueAxis.min = 0;

		let series1 = chart.series.push(new am4charts.RadarColumnSeries());
		series1.columns.template.radarColumn.strokeOpacity = 1;
		series1.name = "Books";
		series1.dataFields.categoryX = "category";
		series1.columns.template.tooltipText = "{name}: {valueY.value}";
		series1.dataFields.valueY = "value1";
		series1.stacked = true;

		chart.seriesContainer.zIndex = -1;

		let slider = chart.createChild(am4core.Slider);
		slider.start = 0.5;
		slider.exportable = false;
		slider.events.on("rangechanged", function() {
			let start = slider.start;

			chart.startAngle = 270 - start * 179 - 1;
			chart.endAngle = 270 + start * 179 + 1;

			valueAxis.renderer.axisAngle = chart.startAngle;
		});
	}, []);

	return <ContainerChart id='chartdiv'></ContainerChart>;
};

export default Chart;

const ContainerChart = styled.div`
	width: 90%;
	height: 60vh;
	max-width: 600px;
	margin-top: 50px;
`;
