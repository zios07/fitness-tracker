import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { FoodTrackerService } from '../../../services/food-tracker.service';
import { ExerciseTrackerService } from '../../../services/exercise-tracker.service';
import { FoodEaten } from '../../../models/FoodEaten';
import { DatePipe } from '@angular/common';
import { ExercisePerformed } from '../../../models/ExercisePerformed';
import {Observable} from 'rxjs/Rx';
import { DeltaCalories } from '../../../models/DeltaCalories';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  private chart: am4charts.XYChart;
  private foods: FoodEaten[] = [];
  private exercises: ExercisePerformed[] = [];

  constructor(private zone: NgZone,
              private datePipe: DatePipe,
              private foodTracker: FoodTrackerService,
              private exerciseTracker: ExerciseTrackerService) {}

  ngAfterViewInit() {
    this.activate();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  
  tabChanged(event) {
    let index = event.index;
    switch(index) {
      case 0: this.initCaloriesEatenChart(); break;
      case 1: this.initCaloriesBurnedChart(); break;
      case 2: this.initDeltaCaloriesChart(); break;
    }
  }

  activate() {
    let foods$ = this.foodTracker.getFoods();
    let exercises$ = this.exerciseTracker.getExercises();
    Observable.zip(foods$, exercises$, (foods: FoodEaten[], exercises: ExercisePerformed[]) => ({foods, exercises}))
    .subscribe(pair => {
      this.foods = pair.foods;
      this.exercises = pair.exercises;
      this.initCharts();
    })
  }

  initCharts() {
    this.initCaloriesEatenChart();
    // this.initCaloriesBurnedChart();
  }

  initCaloriesEatenChart() {

    am4core.useTheme(am4themes_animated);
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("caloriesEaten", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      this.foods.forEach(food => {
        let d = new Date(food.date);
        data.push({ date: new Date(d.getFullYear(), d.getMonth(), d.getDate()), caloriesEaten: food.caloriesEaten });
      });

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      chart.yAxes.push(new am4charts.ValueAxis());

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "caloriesEaten";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

  
  initCaloriesBurnedChart() {

    am4core.useTheme(am4themes_animated);
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("caloriesBurned", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      this.exercises.forEach(exercise => {
        let d = new Date(exercise.date);
        data.push({ date: new Date(d.getFullYear(), d.getMonth(), d.getDate()), caloriesBurned: exercise.caloriesBurned });
      });

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      chart.yAxes.push(new am4charts.ValueAxis());

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "caloriesBurned";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

  initDeltaCaloriesChart() {
    am4core.useTheme(am4themes_animated);
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("deltaCalories", am4charts.XYChart);

      chart.paddingRight = 20;

      let deltas: DeltaCalories[] = [];

      this.exercises.forEach(exercise => {
        let d = new Date(exercise.date);
        let date:Date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        deltas.push(new DeltaCalories(date, exercise.caloriesBurned, 0, 0 - exercise.caloriesBurned));
      });

      this.foods.forEach(food => {
        let foundMatch = false;
        let d = new Date(food.date);
        let date:Date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        deltas.forEach((item: DeltaCalories) => {
          if(item.date.getDate() === d.getDate() &&
            item.date.getMonth() === d.getMonth() &&
            item.date.getFullYear() === d.getFullYear()) {
            foundMatch = true;
            item.caloriesEaten = food.caloriesEaten;
            item.delta = item.caloriesEaten - item.caloriesBurned;
          }
        })
        if(!foundMatch)
          deltas.push(new DeltaCalories(date, 0, food.caloriesEaten, food.caloriesEaten - 0));
      });
      
      chart.data = deltas;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      chart.yAxes.push(new am4charts.ValueAxis());

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "delta";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

}
