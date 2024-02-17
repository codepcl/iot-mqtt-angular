import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.scss'
})
export class TemperatureComponent implements OnInit, OnChanges {

  @Input() temp: number = 0;


  ngOnInit(): void {
    this.setTemperature();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setTemperature();
  }
  
  setTemperature() {
    let temperature = document.getElementById("temperature");
    temperature!.style.height = (this.temp / 28) * 100 + "%";
    temperature!.dataset['value'] = this.temp+ '°C';
  }
  

}
