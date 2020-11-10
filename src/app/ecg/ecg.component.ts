import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import {DataService} from '../data.service';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
@Component({
  selector: 'app-ecg',
  templateUrl: './ecg.component.html',
  styleUrls: ['./ecg.component.css']
})
export class EcgComponent implements OnInit {
  title = 'Ecg';
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;
  private datas = [
    {  "ECGWaveform": [6749, 6878, 6980, 7090, 7210, 7319, 7418, 7519, 7624, 7709] },
    {  "ECGWaveform": [7757, 7782, 7807, 7845, 7904, 7984, 8085, 8180, 8247, 8307] },
    {  "ECGWaveform": [8365, 8413, 8447, 8482, 8522, 8562, 8587, 8597, 8603, 8612] },
    {  "ECGWaveform": [8986, 8984, 8975, 8970, 8961, 8942, 8917, 8900, 8892, 8876] },
    {  "ECGWaveform": [8521, 8492, 8464, 8438, 8415, 8395, 8370, 8345, 8328, 8317] },
    {  "ECGWaveform": [8182, 8181, 8182, 8186, 8192, 8192, 8184, 8178, 8183, 8193] },
    {  "ECGWaveform": [8182, 8183, 8187, 8195, 8205, 8211, 8204, 8186, 8179, 8190] },
    {  "ECGWaveform": [8192, 8196, 8191, 8188, 8189, 8189, 8187, 8182, 8180, 8181] },
    {  "ECGWaveform": [8202, 8209, 8207, 8200, 8206, 8219, 8225, 8219, 8208, 8205] },
    {  "ECGWaveform": [8183, 8182, 8171, 8167, 8177, 8189, 8192, 8183, 8174, 8159] },
    {  "ECGWaveform": [9166, 9236, 9200, 9066, 8839, 8527, 8223, 8015, 7919, 7915] },
    {  "ECGWaveform": [8041, 8060, 8077, 8081, 8079, 8084, 8087, 8085, 8084, 8088] },
    {  "ECGWaveform": [8118, 8123, 8124, 8127, 8141, 8161, 8172, 8172, 8172, 8174] },
    {  "ECGWaveform": [8208, 8214, 8233, 8250, 8259, 8265, 8274, 8279, 8282, 8295] },
    {  "ECGWaveform": [8192, 8201, 8201, 8193, 8189, 8187, 8186, 8180, 8182, 8198] },
    {  "ECGWaveform": [8389, 8352, 8233, 7965, 7538, 7061, 6669, 6442, 6347, 6331] },
    {  "ECGWaveform": [7984, 8085, 8180, 8247, 8307, 8365, 8413, 8447, 8482, 8522] },
    {  "ECGWaveform": [8562, 8587, 8597, 8603, 8612, 8629, 8653, 8679, 8705, 8728] },
    {  "ECGWaveform": [8744, 8761, 8785, 8809, 8822, 8836, 8863, 8889, 8906, 8916] },
    {  "ECGWaveform": [8233, 8220, 8213, 8211, 8205, 8194, 8189, 8189, 8189, 8186]},
    {  "ECGWaveform": [8190, 8196, 8197, 8191, 8186, 8182, 8181, 8182, 8186, 8192]},
    {  "ECGWaveform": [8192, 8184, 8178, 8183, 8193, 8195, 8194, 8193, 8189, 8180]},
    {  "ECGWaveform": [8172, 8178, 8189, 8187, 8181, 8182, 8183, 8187, 8195, 8205]},
    {  "ECGWaveform": [8211, 8204, 8186, 8179, 8190, 8197, 8191, 8183, 8184, 8187]},
    {  "ECGWaveform": [8187, 8189, 8187, 8182, 8185, 8187, 8191, 8199, 8199, 8192]},
    {  "ECGWaveform": [8187, 8186, 8183, 8178, 8181, 8192, 8196, 8191, 8188, 8189]},
    {  "ECGWaveform": [8189, 8187, 8182, 8180, 8181, 8178, 8178, 8182, 8186, 8187]},
    {  "ECGWaveform": [8190, 8199, 8204, 8202, 8200, 8202, 8209, 8207, 8200, 8206]},
    {  "ECGWaveform": [8219, 8225, 8219, 8208, 8205, 8208, 8202, 8192, 8189, 8189]},
    {  "ECGWaveform": [8186, 8181, 8178, 8180, 8177, 8172, 8180, 8199, 8208, 8203]},
    {  "ECGWaveform": [8192, 8180, 8172, 8169, 8174, 8183, 8182, 8171, 8167, 8177]},
    {  "ECGWaveform": [8189, 8192, 8183, 8174, 8159, 8142, 8156, 8208, 8287, 8379]},
    {  "ECGWaveform": [8488, 8615, 8752, 8891, 9034, 9166, 9236, 9200, 9066, 8839]},
    {  "ECGWaveform": [8527, 8223, 8015, 7919, 7915, 7945, 7964, 7978, 8007, 8035]},
    {  "ECGWaveform": [8037, 8026, 8025, 8031, 8034, 8041, 8060, 8077, 8081, 8079]},
    {  "ECGWaveform": [8084, 8087, 8085, 8084, 8088, 8093, 8093, 8092, 8091, 8088]},
    {  "ECGWaveform": [8085, 8088, 8092, 8093, 8089, 8091, 8102, 8111, 8114, 8120]},
    {  "ECGWaveform": [8125, 8128, 8131, 8128, 8120, 8118, 8123, 8124, 8127, 8141]},
    {  "ECGWaveform": [8161, 8172, 8172, 8172, 8174, 8178, 8182, 8189, 8195, 8197]},
    {  "ECGWaveform": [8274, 8265, 8260, 8264, 8269, 8267, 8264, 8269, 8270, 8255]},
    {  "ECGWaveform": [8235, 8224, 8208, 8191, 8187, 8192, 8201, 8201, 8193, 8189]},
    {  "ECGWaveform": [8187, 8186, 8180, 8182, 8198, 8216, 8237, 8259, 8277, 8305]},
    {  "ECGWaveform": [8341, 8373, 8390, 8395, 8395, 8389, 8352, 8233, 7965, 7538]},
    {  "ECGWaveform": [7061, 6669, 6442, 6347, 6331, 6271, 6305, 6361, 6447, 6589]},
    {  "ECGWaveform": [6749, 6878, 6980, 7090, 7210, 7319, 7418, 7519, 7624, 7709]},
    {  "ECGWaveform": [7757, 7782, 7807, 7845, 7904, 7984, 8085, 8180, 8247, 8307]},
    {  "ECGWaveform": [8365, 8413, 8447, 8482, 8522, 8562, 8587, 8597, 8603, 8612]},
    {  "ECGWaveform": [8629, 8653, 8679, 8705, 8728, 8744, 8761, 8785, 8809, 8822]},
    {  "ECGWaveform": [8836, 8863, 8889, 8906, 8916, 8929, 8947, 8962, 8971, 8978]},
    {  "ECGWaveform": [8986, 8984, 8975, 8970, 8961, 8942, 8917, 8900, 8892, 8876]},
    {  "ECGWaveform": [8521, 8492, 8464, 8438, 8415, 8395, 8370, 8345, 8328, 8317]},
    {  "ECGWaveform": [8304, 8284, 8267, 8256, 8246, 8233, 8220, 8213, 8211, 8205]},
    {  "ECGWaveform": [8194, 8189, 8189, 8189, 8186, 8190, 8196, 8197, 8191, 8186]},
    {  "ECGWaveform": [8182, 8181, 8182, 8186, 8192, 8192, 8184, 8178, 8183, 8193]},
    {  "ECGWaveform": [8195, 8194, 8193, 8189, 8180, 8172, 8178, 8189, 8187, 8181]},
    {  "ECGWaveform": [8182, 8183, 8187, 8195, 8205, 8211, 8204, 8186, 8179, 8190]},
    {  "ECGWaveform": [8197, 8191, 8183, 8184, 8187, 8187, 8189, 8187, 8182, 8185]},
    {  "ECGWaveform": [8187, 8191, 8199, 8199, 8192, 8187, 8186, 8183, 8178, 8181]},
    {  "ECGWaveform": [8192, 8196, 8191, 8188, 8189, 8189, 8187, 8182, 8180, 8181]},
    {  "ECGWaveform": [8178, 8178, 8182, 8186, 8187, 8190, 8199, 8204, 8202, 8200]},
    {  "ECGWaveform": [8202, 8209, 8207, 8200, 8206, 8219, 8225, 8219, 8208, 8205]},
    {  "ECGWaveform": [8208, 8202, 8192, 8189, 8189, 8186, 8181, 8178, 8180, 8177]},
    {  "ECGWaveform": [8172, 8180, 8199, 8208, 8203, 8192, 8180, 8172, 8169, 8174]},
    {  "ECGWaveform": [8183, 8182, 8171, 8167, 8177, 8189, 8192, 8183, 8174, 8159]},
    {  "ECGWaveform": [8142, 8156, 8208, 8287, 8379, 8488, 8615, 8752, 8891, 9034] },
    {  "ECGWaveform": [9166, 9236, 9200, 9066, 8839, 8527, 8223, 8015, 7919, 7915]},
    {  "ECGWaveform": [7945, 7964, 7978, 8007, 8035, 8037, 8026, 8025, 8031, 8034]},
    {  "ECGWaveform": [8041, 8060, 8077, 8081, 8079, 8084, 8087, 8085, 8084, 8088]},
    {  "ECGWaveform": [8093, 8093, 8092, 8091, 8088, 8085, 8088, 8092, 8093, 8089]},
    {  "ECGWaveform": [8091, 8102, 8111, 8114, 8120, 8125, 8128, 8131, 8128, 8120]},
    {  "ECGWaveform": [8118, 8123, 8124, 8127, 8141, 8161, 8172, 8172, 8172, 8174]},
    {  "ECGWaveform": [8178, 8182, 8189, 8195, 8197, 8188, 8186, 8200, 8214, 8214]},
    {  "ECGWaveform": [8208, 8214, 8233, 8250, 8259, 8265, 8274, 8279, 8282, 8295]},
    {  "ECGWaveform": [8304, 8301, 8290, 8281, 8277, 8274, 8265, 8260, 8264, 8269]},
    {  "ECGWaveform": [8267, 8264, 8269, 8270, 8255, 8235, 8224, 8208, 8191, 8187]},
    {  "ECGWaveform": [8192, 8201, 8201, 8193, 8189, 8187, 8186, 8180, 8182, 8198]},
    {  "ECGWaveform": [8216, 8237, 8259, 8277, 8305, 8341, 8373, 8390, 8395, 8395]},
    {  "ECGWaveform": [8389, 8352, 8233, 7965, 7538, 7061, 6669, 6442, 6347, 6331]},
    {  "ECGWaveform": [6271, 6305, 6361, 6447, 6589, 6749, 6878, 6980, 7090, 7210]},
    {  "ECGWaveform": [7319, 7418, 7519, 7624, 7709, 7757, 7782, 7807, 7845, 7904]},
    {  "ECGWaveform": [7984, 8085, 8180, 8247, 8307, 8365, 8413, 8447, 8482, 8522]},
    {  "ECGWaveform": [8562, 8587, 8597, 8603, 8612, 8629, 8653, 8679, 8705, 8728]},
    {  "ECGWaveform": [8744, 8761, 8785, 8809, 8822, 8836, 8863, 8889, 8906, 8916]},
    {  "ECGWaveform": [8929, 8947, 8962, 8971, 8978, 8986, 8984, 8975, 8970, 8961]},
    {  "ECGWaveform": [8942, 8917, 8900, 8892, 8876, 8843, 8810, 8787, 8768, 8741]},
    {  "ECGWaveform": [8395, 8370, 8345, 8328, 8317, 8304, 8284, 8267, 8256, 8246]},
    {  "ECGWaveform": [8233, 8220, 8213, 8211, 8205, 8194, 8189, 8189, 8189, 8186]},
    {  "ECGWaveform": [8190, 8196, 8197, 8191, 8186, 8182, 8181, 8182, 8186, 8192]},
    {  "ECGWaveform": [8192, 8184, 8178, 8183, 8193, 8195, 8194, 8193, 8189, 8180]},
    {  "ECGWaveform": [8172, 8178, 8189, 8187, 8181, 8182, 8183, 8187, 8195, 8205]},
    {  "ECGWaveform": [8211, 8204, 8186, 8179, 8190, 8197, 8191, 8183, 8184, 8187]},
    {  "ECGWaveform": [8187, 8189, 8187, 8182, 8185, 8187, 8191, 8199, 8199, 8192]},
    {  "ECGWaveform": [8187, 8186, 8183, 8178, 8181, 8192, 8196, 8191, 8188, 8189]},
    {  "ECGWaveform": [8189, 8187, 8182, 8180, 8181, 8178, 8178, 8182, 8186, 8187]},
    {  "ECGWaveform": [8190, 8199, 8204, 8202, 8200, 8202, 8209, 8207, 8200, 8206]},
    {  "ECGWaveform": [8219, 8225, 8219, 8208, 8205, 8208, 8202, 8192, 8189, 8189]},
    {  "ECGWaveform": [8186, 8181, 8178, 8180, 8177, 8172, 8180, 8199, 8208, 8203]},
    {  "ECGWaveform": [8192, 8180, 8172, 8169, 8174, 8183, 8182, 8171, 8167, 8177]},
    {  "ECGWaveform": [8189, 8192, 8183, 8174, 8159, 8142, 8156, 8208, 8287, 8379]},
    {  "ECGWaveform": [8488, 8615, 8752, 8891, 9034, 9166, 9236, 9200, 9066, 8839]},
    {  "ECGWaveform": [8527, 8223, 8015, 7919, 7915, 7945, 7964, 7978, 8007, 8035]},
    {  "ECGWaveform": [8037, 8026, 8025, 8031, 8034, 8041, 8060, 8077, 8081, 8079]},
    {  "ECGWaveform": [8084, 8087, 8085, 8084, 8088, 8093, 8093, 8092, 8091, 8088] },
    {  "ECGWaveform": [8085, 8088, 8092, 8093, 8089, 8091, 8102, 8111, 8114, 8120] },
    {  "ECGWaveform": [8125, 8128, 8131, 8128, 8120, 8118, 8123, 8124, 8127, 8141] },
  ];
  private path:any;
  private pathlength: any;
  private a: any[] = [];
  private data: any[] = [];
  private focus: any;

  constructor(private dataService: DataService, private dataService2: DataService) {
    this.width = 500 - this.margin.left - this.margin.right;
    this.height = 125 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.dataService.onMessage().subscribe(
      msg => {
          this.data=msg;
          //console.log(this.data);

          this.data.forEach((d, i) => {
            for (let j = 0; j < 10; j++) {
              this.a.push({
                ecg_x: i * 10 + j,
                ecg_y: d.ECGWaveform[j]
              })
            }
          })
          //console.log(this.a);
          this.getHistory();
          this.initSvg();
          this.initAxis();
          this.drawAxis();
          this.drawLine();
      },
      err => console.log(err),
      () => console.log('end')
    );
  }

  getHistory(){
    this.dataService.get().subscribe((response:any) =>{
      console.log(response);
    });
  }



  private initSvg() {
    this.svg = d3.select('.ecg')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
     ;
  }

  private initAxis() {
    this.xScale = d3Scale.scaleLinear()
      .domain([0, 1000])
      .range([0, this.width]);
    this.yScale = d3Scale.scaleLinear()
      .domain([5000, 10000])
      .range([this.height, 0]);

  }

  private drawAxis() {

    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.xScale));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.yScale))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');
  }

  private drawLine() {
    
    this.line = d3Shape.line()
      .x((d: any,i) => this.xScale(d.ecg_x))
      .y((d: any,i) => this.yScale(d.ecg_y));
    
    this.path=this.svg.append('path')
      .datum(this.a)
      .attr('class', 'line')
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", "2px")
      .attr('d', this.line)
      .attr("transform", "translate(" + this.xScale(-100) + ",0)");

      this.pathlength = this.path.node().getTotalLength();
            
      this.path
          .attr("stroke-dashoffset", this.pathlength)
          .attr("stroke-dasharray", this.pathlength)
          .transition()
          .ease(d3.easeSin)
          .duration(10000)
          .attr("stroke-dashoffset", 0); 
     
  }

  
}
