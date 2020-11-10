import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Ease from 'd3-ease';
import {DataService} from '../data.service';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import {HostListener} from '@angular/core';
import {SvgServiceService} from '../svg-service.service'
@Component({
  selector: 'app-respiration',
  templateUrl: './respiration.component.html',
  styleUrls: ['./respiration.component.css']
})
export class RespirationComponent implements OnInit {

  title = 'RespirationSignal';

  private datas1 = [
    {"DeviceNumber":"00101","RespirationSignal":[7495],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:37.798","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7524],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"RespirationRate":[10],"Time":"2020-08-13 12:02:37.868","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7527],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:37.925","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7329],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"Temperature":[286],"Time":"2020-08-13 12:02:38.019","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7182],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"MotionStatus":[2],"Time":"2020-08-13 12:02:38.116","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7334],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:38.222","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7452],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:38.314","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7371],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"RRInterval":[708],"Time":"2020-08-13 12:02:38.412","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7271],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:38.530","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7274],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:38.601","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7413],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:38.698","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7597],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"HeartRate":[84],"Time":"2020-08-13 12:02:38.807","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7656],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:38.896","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7475],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:39.007","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[7219],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"MotionStatus":[2],"Time":"2020-08-13 12:02:39.097","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7183],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"Apnea":[0],"Time":"2020-08-13 12:02:39.244","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7023],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:39.363","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7005],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"LeadIStValue":[96],"Time":"2020-08-13 12:02:39.368","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7051],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:39.384","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7706],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"ArrhythmiaCode":[19],"Time":"2020-08-13 12:02:39.442","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[8002],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:39.570","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8486],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"ArrhythmiaCode":[19],"Time":"2020-08-13 12:02:39.581","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8624],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:39.642","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8523],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"FWVersion":[108],"Time":"2020-08-13 12:02:39.647","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8350],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"HeartRate":[84],"Time":"2020-08-13 12:02:39.707","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8149],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"ArrhythmiaCode":[19],"Time":"2020-08-13 12:02:39.713","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7944],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"RespirationRate":[10],"Time":"2020-08-13 12:02:39.785","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7779],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:39.790","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7689],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:39.849","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7672],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"ArrhythmiaCode":[19],"Time":"2020-08-13 12:02:39.866","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7714],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"Temperature":[286],"Time":"2020-08-13 12:02:39.907","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7802],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:39.965","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7925],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"MotionStatus":[3],"Time":"2020-08-13 12:02:39.973","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8061],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"ArrhythmiaCode":[19],"Time":"2020-08-13 12:02:40.043","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8204],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"Apnea":[0],"Time":"2020-08-13 12:02:40.062","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8372],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:40.118","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8552],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"BatteryCheck":[406],"Time":"2020-08-13 12:02:40.136","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8684],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"ArrhythmiaCode":[19],"Time":"2020-08-13 12:02:40.182","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8747],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"LeadIStValue":[96],"Time":"2020-08-13 12:02:40.216","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8773],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:40.282","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[8791],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"RRInterval":[708],"Time":"2020-08-13 12:02:40.301","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8821],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"ArrhythmiaCode":[19],"Time":"2020-08-13 12:02:40.361","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8902],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"ArrhythmiaCode":[19],"Time":"2020-08-13 12:02:40.418","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9029],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:40.425","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9144],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:40.478","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9165],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"ArrhythmiaCode":[19],"Time":"2020-08-13 12:02:40.525","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9075],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"HWVersion":[101],"Time":"2020-08-13 12:02:40.570","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8908],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:40.575","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8738],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"FWVersion":[108],"Time":"2020-08-13 12:02:40.618","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8606],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"HeartRate":[84],"Time":"2020-08-13 12:02:40.666","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8520],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"ArrhythmiaCode":[19],"Time":"2020-08-13 12:02:40.720","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8473],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"RespirationRate":[10],"Time":"2020-08-13 12:02:40.734","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8461],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:40.782","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[8427],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:40.828","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8361],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:40.870","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8300],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"Temperature":[293],"Time":"2020-08-13 12:02:40.916","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8273],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:40.929","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8263],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"MotionStatus":[2],"Time":"2020-08-13 12:02:40.995","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8253],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:41.031","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8234],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"Apnea":[0],"Time":"2020-08-13 12:02:41.049","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8190],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:41.094","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8113],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"BatteryCheck":[407],"Time":"2020-08-13 12:02:41.143","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8001],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:41.207","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7879],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"LeadIStValue":[96],"Time":"2020-08-13 12:02:41.215","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7778],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:41.262","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7718],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"RRInterval":[708],"Time":"2020-08-13 12:02:41.300","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7725],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:41.354","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7803],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:41.406","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7895],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:41.411","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7994],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:41.463","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8059],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:41.498","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8049],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"HWVersion":[101],"Time":"2020-08-13 12:02:41.546","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7986],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:41.612","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7930],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"FWVersion":[108],"Time":"2020-08-13 12:02:41.618","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7851],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"HeartRate":[84],"Time":"2020-08-13 12:02:41.678","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7769],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:41.723","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[7728],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"RespirationRate":[10],"Time":"2020-08-13 12:02:41.734","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7712],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:41.770","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7698],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:41.820","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7705],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:41.872","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7750],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"Temperature":[293],"Time":"2020-08-13 12:02:41.937","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7836],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:41.944","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7933],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"MotionStatus":[2],"Time":"2020-08-13 12:02:42.001","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8013],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:42.010","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8071],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"Apnea":[0],"Time":"2020-08-13 12:02:42.066","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8102],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:42.143","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8100],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"BatteryCheck":[405],"Time":"2020-08-13 12:02:42.152","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8099],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:42.216","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[8136],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"LeadIStValue":[96],"Time":"2020-08-13 12:02:42.219","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8191],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:42.273","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8207],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"RRInterval":[708],"Time":"2020-08-13 12:02:42.318","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8178],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:42.324","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8113],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:42.395","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8010],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:42.433","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7876],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:42.444","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7770],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:42.509","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7686],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"HWVersion":[101],"Time":"2020-08-13 12:02:42.534","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7609],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:42.570","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7572],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"FWVersion":[108],"Time":"2020-08-13 12:02:42.615","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7572],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"HeartRate":[84],"Time":"2020-08-13 12:02:42.664","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7551],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:42.684","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7485],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"RespirationRate":[10],"Time":"2020-08-13 12:02:42.739","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7412],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:42.804","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7318],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:42.812","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7220],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:42.868","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7184],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"Temperature":[293],"Time":"2020-08-13 12:02:42.947","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7245],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:42.952","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7406],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"MotionStatus":[0],"Time":"2020-08-13 12:02:43.031","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7651],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"ArrhythmiaCode":[41],"Time":"2020-08-13 12:02:43.035","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7980],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"Apnea":[0],"Time":"2020-08-13 12:02:43.046","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8345],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:43.106","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[8751],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"BatteryCheck":[405],"Time":"2020-08-13 12:02:43.177","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9187],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:43.183","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9637],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"LeadIStValue":[96],"Time":"2020-08-13 12:02:43.247","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10094],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:43.250","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10590],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"RRInterval":[708],"Time":"2020-08-13 12:02:43.308","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11084],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:43.362","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11495],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:43.373","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11772],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:43.442","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11909],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:43.451","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11830],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:43.506","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11612],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"HWVersion":[101],"Time":"2020-08-13 12:02:43.570","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11289],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:43.577","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10910],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"FWVersion":[108],"Time":"2020-08-13 12:02:43.648","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[10559],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"HeartRate":[84],"Time":"2020-08-13 12:02:43.653","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10335],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:43.720","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10210],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"RespirationRate":[10],"Time":"2020-08-13 12:02:43.728","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10224],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"ArrhythmiaAnnotation":[3],"Time":"2020-08-13 12:02:43.782","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10378],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:43.837","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10581],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:43.844","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10813],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"Temperature":[293],"Time":"2020-08-13 12:02:43.891","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11064],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"ArrhythmiaAnnotation":[3],"Time":"2020-08-13 12:02:43.941","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11330],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"MotionStatus":[0],"Time":"2020-08-13 12:02:43.984","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11600],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:44.034","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11883],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"Apnea":[0],"Time":"2020-08-13 12:02:44.049","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12216],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"ArrhythmiaAnnotation":[3],"Time":"2020-08-13 12:02:44.083","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12611],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"BatteryCheck":[406],"Time":"2020-08-13 12:02:44.144","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13025],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:44.183","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13462],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"LeadIStValue":[96],"Time":"2020-08-13 12:02:44.198","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13967],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"ArrhythmiaAnnotation":[3],"Time":"2020-08-13 12:02:44.245","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14503],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"RRInterval":[708],"Time":"2020-08-13 12:02:44.295","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14975],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:44.337","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15379],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:44.380","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15762],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"ArrhythmiaAnnotation":[3],"Time":"2020-08-13 12:02:44.430","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:44.440","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:44.483","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"HWVersion":[101],"Time":"2020-08-13 12:02:44.544","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:44.560","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"FWVersion":[108],"Time":"2020-08-13 12:02:44.624","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"HeartRate":[84],"Time":"2020-08-13 12:02:44.688","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:44.692","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"RespirationRate":[10],"Time":"2020-08-13 12:02:44.751","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15778],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:44.760","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15380],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:44.827","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14945],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:44.886","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14525],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"Temperature":[293],"Time":"2020-08-13 12:02:44.890","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14151],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"ArrhythmiaAnnotation":[0],"Time":"2020-08-13 12:02:44.948","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13847],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"MotionStatus":[0],"Time":"2020-08-13 12:02:44.965","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13600],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:45.013","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[13381],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"Apnea":[0],"Time":"2020-08-13 12:02:45.077","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13212],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:45.085","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13154],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"BatteryCheck":[406],"Time":"2020-08-13 12:02:45.153","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13230],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:45.164","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13467],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"LeadIStValue":[96],"Time":"2020-08-13 12:02:45.221","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13866],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:45.236","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14386],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"RRInterval":[708],"Time":"2020-08-13 12:02:45.286","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14912],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:45.344","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15333],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:45.356","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15589],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:45.414","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15693],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:45.471","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15644],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:45.477","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15488],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"HWVersion":[101],"Time":"2020-08-13 12:02:45.536","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15300],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:45.609","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15159],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"FWVersion":[108],"Time":"2020-08-13 12:02:45.614","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15063],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"HeartRate":[84],"Time":"2020-08-13 12:02:45.669","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15000],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:45.684","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14920],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"RespirationRate":[60],"Time":"2020-08-13 12:02:45.720","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14729],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:45.765","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14378],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:45.813","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13910],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:45.835","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13334],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"Temperature":[293],"Time":"2020-08-13 12:02:45.880","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12686],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:45.926","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[12041],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"MotionStatus":[0],"Time":"2020-08-13 12:02:45.967","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11448],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:46.014","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10833],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"Apnea":[0],"Time":"2020-08-13 12:02:46.063","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10161],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:46.074","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9448],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"BatteryCheck":[407],"Time":"2020-08-13 12:02:46.126","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8683],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:46.166","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7781],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"LeadIStValue":[96],"Time":"2020-08-13 12:02:46.210","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6746],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:46.244","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5660],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"RRInterval":[708],"Time":"2020-08-13 12:02:46.278","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4547],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:46.316","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3485],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:46.365","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2636],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:46.403","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2124],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:46.450","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[1907],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:46.516","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1948],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"HWVersion":[101],"Time":"2020-08-13 12:02:46.520","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2264],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:46.577","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2777],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"FWVersion":[108],"Time":"2020-08-13 12:02:46.600","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3363],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"HeartRate":[84],"Time":"2020-08-13 12:02:46.635","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3941],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:46.699","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4533],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"RespirationRate":[60],"Time":"2020-08-13 12:02:46.767","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5078],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:46.770","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5533],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:46.832","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5923],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:46.845","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6282],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"Temperature":[293],"Time":"2020-08-13 12:02:46.916","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6555],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:46.925","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6677],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"MotionStatus":[0],"Time":"2020-08-13 12:02:46.997","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6601],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:47.001","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6303],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"Apnea":[0],"Time":"2020-08-13 12:02:47.079","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5831],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:47.085","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5257],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"BatteryCheck":[406],"Time":"2020-08-13 12:02:47.154","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4724],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:47.160","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4359],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"LeadIStValue":[96],"Time":"2020-08-13 12:02:47.213","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4174],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:47.231","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4142],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"RRInterval":[708],"Time":"2020-08-13 12:02:47.281","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4274],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:47.326","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4495],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:47.350","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[4777],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:47.403","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5111],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:47.476","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5499],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:47.480","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5849],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"HWVersion":[101],"Time":"2020-08-13 12:02:47.555","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6074],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:47.563","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6117],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"FWVersion":[108],"Time":"2020-08-13 12:02:47.616","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6030],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"HeartRate":[84],"Time":"2020-08-13 12:02:47.636","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5878],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:47.681","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5791],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"RespirationRate":[53],"Time":"2020-08-13 12:02:47.754","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5839],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:47.760","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5957],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:47.815","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6125],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:47.831","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[6190],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"Temperature":[293],"Time":"2020-08-13 12:02:47.882","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6030],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:47.934","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5671],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"MotionStatus":[0],"Time":"2020-08-13 12:02:47.951","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5266],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:48.013","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4820],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"Apnea":[0],"Time":"2020-08-13 12:02:48.026","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4444],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:48.077","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4224],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"BatteryCheck":[406],"Time":"2020-08-13 12:02:48.131","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4153],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:48.145","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4160],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"LeadIStValue":[96],"Time":"2020-08-13 12:02:48.197","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4183],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:48.256","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4154],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"RRInterval":[708],"Time":"2020-08-13 12:02:48.264","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4055],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:48.309","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3892],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:48.356","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3609],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:48.394","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3247],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:48.444","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2857],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:48.493","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2405],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"HWVersion":[101],"Time":"2020-08-13 12:02:48.530","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1913],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:48.549","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1521],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"FWVersion":[108],"Time":"2020-08-13 12:02:48.606","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1259],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"HeartRate":[84],"Time":"2020-08-13 12:02:48.644","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1135],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:48.677","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1165],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"RespirationRate":[53],"Time":"2020-08-13 12:02:48.715","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1355],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:48.745","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[1644],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:48.806","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1994],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:48.842","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2395],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"Temperature":[293],"Time":"2020-08-13 12:02:48.877","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2774],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:48.909","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3050],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"MotionStatus":[0],"Time":"2020-08-13 12:02:48.954","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3134],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:49.024","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3021],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"Apnea":[0],"Time":"2020-08-13 12:02:49.032","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2763],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:49.081","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2501],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"BatteryCheck":[407],"Time":"2020-08-13 12:02:49.147","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2320],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:49.152","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2274],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"LeadIStValue":[96],"Time":"2020-08-13 12:02:49.215","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2386],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:49.226","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2675],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"RRInterval":[708],"Time":"2020-08-13 12:02:49.278","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[3090],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:49.330","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3506],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:49.351","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3946],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:49.395","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4454],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:49.444","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4920],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:49.494","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5253],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"HWVersion":[101],"Time":"2020-08-13 12:02:49.544","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5505],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:49.548","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5569],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"FWVersion":[108],"Time":"2020-08-13 12:02:49.606","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5406],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"HeartRate":[84],"Time":"2020-08-13 12:02:49.656","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5080],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:49.663","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4619],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"RespirationRate":[49],"Time":"2020-08-13 12:02:49.714","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4026],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:49.783","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3418],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:49.787","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2868],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:49.848","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2403],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"Temperature":[293],"Time":"2020-08-13 12:02:49.916","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2033],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:49.920","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1780],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"MotionStatus":[0],"Time":"2020-08-13 12:02:49.981","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1576],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:49.990","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1251],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"Apnea":[0],"Time":"2020-08-13 12:02:50.045","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[756],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:50.094","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[154],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"BatteryCheck":[407],"Time":"2020-08-13 12:02:50.138","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:50.145","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"LeadIStValue":[96],"Time":"2020-08-13 12:02:50.193","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:50.234","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"RRInterval":[708],"Time":"2020-08-13 12:02:50.286","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:50.339","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:50.350","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:50.390","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:50.431","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[386],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:50.483","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[512],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"HWVersion":[101],"Time":"2020-08-13 12:02:50.500","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[509],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:50.550","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[345],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"FWVersion":[108],"Time":"2020-08-13 12:02:50.603","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"HeartRate":[84],"Time":"2020-08-13 12:02:50.620","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:50.666","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[100],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"RespirationRate":[49],"Time":"2020-08-13 12:02:50.706","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:50.753","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:50.803","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[294],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:50.814","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[800],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"Temperature":[296],"Time":"2020-08-13 12:02:50.860","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1335],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:50.916","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1790],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"MotionStatus":[0],"Time":"2020-08-13 12:02:50.936","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2139],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:50.983","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2452],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"Apnea":[0],"Time":"2020-08-13 12:02:51.032","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2706],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:51.070","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2798],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"BatteryCheck":[406],"Time":"2020-08-13 12:02:51.120","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2673],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:51.170","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2344],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"LeadIStValue":[96],"Time":"2020-08-13 12:02:51.176","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1827],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:51.220","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1289],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"RRInterval":[708],"Time":"2020-08-13 12:02:51.268","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[769],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:51.325","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[224],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:51.380","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:51.387","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:51.442","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:51.484","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"HWVersion":[101],"Time":"2020-08-13 12:02:51.531","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:51.540","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"FWVersion":[108],"Time":"2020-08-13 12:02:51.581","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[100],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"HeartRate":[84],"Time":"2020-08-13 12:02:51.634","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:51.699","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"RespirationRate":[42],"Time":"2020-08-13 12:02:51.708","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[408],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:51.780","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[912],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:51.785","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1345],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:51.849","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1700],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"Temperature":[296],"Time":"2020-08-13 12:02:51.868","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1906],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:51.906","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1832],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"MotionStatus":[0],"Time":"2020-08-13 12:02:51.949","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1441],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:52.000","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[876],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"Apnea":[0],"Time":"2020-08-13 12:02:52.016","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[209],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:52.073","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"BatteryCheck":[408],"Time":"2020-08-13 12:02:52.109","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:52.135","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"LeadIStValue":[96],"Time":"2020-08-13 12:02:52.189","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:52.235","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"RRInterval":[708],"Time":"2020-08-13 12:02:52.286","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:52.299","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:52.330","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:52.390","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[518],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:52.425","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1209],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:52.449","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1814],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"HWVersion":[101],"Time":"2020-08-13 12:02:52.494","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2245],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:52.555","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2551],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"FWVersion":[108],"Time":"2020-08-13 12:02:52.569","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2742],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"HeartRate":[84],"Time":"2020-08-13 12:02:52.626","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2894],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:52.693","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3132],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"RespirationRate":[42],"Time":"2020-08-13 12:02:52.697","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3554],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:52.754","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4099],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:52.798","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4801],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:52.809","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5708],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"Temperature":[296],"Time":"2020-08-13 12:02:52.872","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6789],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:52.917","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7912],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"MotionStatus":[0],"Time":"2020-08-13 12:02:52.929","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9036],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:52.989","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10064],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"Apnea":[0],"Time":"2020-08-13 12:02:53.037","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[10772],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:53.051","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10973],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"BatteryCheck":[407],"Time":"2020-08-13 12:02:53.097","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10788],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:53.147","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10287],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"LeadIStValue":[96],"Time":"2020-08-13 12:02:53.213","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9506],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:53.223","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8541],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"RRInterval":[708],"Time":"2020-08-13 12:02:53.283","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7484],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:53.292","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6334],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:53.359","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5199],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:53.408","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4156],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:53.415","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3266],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:53.461","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2609],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"HWVersion":[101],"Time":"2020-08-13 12:02:53.500","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[2179],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:53.545","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1869],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"FWVersion":[108],"Time":"2020-08-13 12:02:53.609","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1652],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"HeartRate":[84],"Time":"2020-08-13 12:02:53.665","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1549],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:53.670","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1587],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"RespirationRate":[42],"Time":"2020-08-13 12:02:53.720","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1821],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:53.771","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2328],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:53.781","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3081],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:53.833","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4093],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"Temperature":[296],"Time":"2020-08-13 12:02:53.849","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5337],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:53.896","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6607],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"MotionStatus":[0],"Time":"2020-08-13 12:02:53.936","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7743],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:53.986","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8642],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"Apnea":[0],"Time":"2020-08-13 12:02:54.030","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9243],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:54.075","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9522],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"BatteryCheck":[407],"Time":"2020-08-13 12:02:54.083","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9602],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:54.140","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9535],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"LeadIStValue":[96],"Time":"2020-08-13 12:02:54.199","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9460],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:54.205","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9402],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"RRInterval":[708],"Time":"2020-08-13 12:02:54.252","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9388],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:54.299","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9368],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:54.342","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9415],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:54.368","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9492],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:54.420","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[9542],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:54.446","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9591],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"HWVersion":[101],"Time":"2020-08-13 12:02:54.490","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9760],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:54.537","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10031],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"FWVersion":[108],"Time":"2020-08-13 12:02:54.578","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10299],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"HeartRate":[84],"Time":"2020-08-13 12:02:54.621","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10636],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:54.674","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11041],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"RespirationRate":[37],"Time":"2020-08-13 12:02:54.714","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11464],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:54.729","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11924],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:54.775","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12516],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:54.827","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13117],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"Temperature":[296],"Time":"2020-08-13 12:02:54.874","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13594],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:54.927","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13894],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"MotionStatus":[0],"Time":"2020-08-13 12:02:54.931","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[13978],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:54.983","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13786],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"Apnea":[0],"Time":"2020-08-13 12:02:55.035","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13434],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:55.045","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13050],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"BatteryCheck":[407],"Time":"2020-08-13 12:02:55.102","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12677],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:55.157","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12290],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"LeadIStValue":[96],"Time":"2020-08-13 12:02:55.208","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11967],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:55.217","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11610],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"RRInterval":[708],"Time":"2020-08-13 12:02:55.261","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11127],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:55.307","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10540],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:55.358","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9932],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:55.365","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9298],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:55.410","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8682],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:55.456","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8128],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"HWVersion":[101],"Time":"2020-08-13 12:02:55.506","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7615],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:55.527","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7136],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"FWVersion":[108],"Time":"2020-08-13 12:02:55.576","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6673],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"HeartRate":[84],"Time":"2020-08-13 12:02:55.623","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6265],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:55.670","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5922],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"RespirationRate":[37],"Time":"2020-08-13 12:02:55.717","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5638],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:55.727","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5410],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:55.773","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5254],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:55.818","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5127],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"Temperature":[296],"Time":"2020-08-13 12:02:55.869","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[5043],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:55.894","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4980],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"MotionStatus":[0],"Time":"2020-08-13 12:02:55.947","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4968],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:55.987","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5041],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"Apnea":[0],"Time":"2020-08-13 12:02:56.045","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5207],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:56.052","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5517],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"BatteryCheck":[405],"Time":"2020-08-13 12:02:56.113","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6045],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:56.126","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6757],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"LeadIStValue":[96],"Time":"2020-08-13 12:02:56.181","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7628],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:56.203","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8693],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"RRInterval":[708],"Time":"2020-08-13 12:02:56.246","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9883],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:56.293","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11118],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:56.334","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[12155],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:56.375","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12812],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:56.413","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13062],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:56.461","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12916],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"HWVersion":[101],"Time":"2020-08-13 12:02:56.486","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12433],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:56.530","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11694],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"FWVersion":[108],"Time":"2020-08-13 12:02:56.578","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10901],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"HeartRate":[84],"Time":"2020-08-13 12:02:56.624","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10177],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:56.685","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9631],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"RespirationRate":[32],"Time":"2020-08-13 12:02:56.690","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9242],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:56.748","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9062],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:56.804","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9054],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:56.808","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9113],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"Temperature":[296],"Time":"2020-08-13 12:02:56.859","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9165],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:56.927","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9227],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"MotionStatus":[0],"Time":"2020-08-13 12:02:56.940","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9375],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:56.995","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9527],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"Apnea":[0],"Time":"2020-08-13 12:02:57.001","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9673],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:57.043","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9708],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"BatteryCheck":[408],"Time":"2020-08-13 12:02:57.087","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9532],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:57.143","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9134],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"LeadIStValue":[96],"Time":"2020-08-13 12:02:57.188","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8591],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:57.237","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7970],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"RRInterval":[708],"Time":"2020-08-13 12:02:57.241","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[7370],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:57.287","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6938],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:57.334","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6702],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:57.391","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6621],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:57.400","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6632],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:57.445","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6728],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"HWVersion":[101],"Time":"2020-08-13 12:02:57.487","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6784],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:57.533","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6766],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"FWVersion":[108],"Time":"2020-08-13 12:02:57.588","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6739],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"HeartRate":[84],"Time":"2020-08-13 12:02:57.595","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6728],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:57.644","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6626],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"RespirationRate":[39],"Time":"2020-08-13 12:02:57.688","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6412],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:57.742","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6053],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:57.790","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[5540],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:57.849","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4904],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"Temperature":[296],"Time":"2020-08-13 12:02:57.852","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4278],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:57.903","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3673],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"MotionStatus":[0],"Time":"2020-08-13 12:02:57.951","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3195],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:57.958","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2869],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"Apnea":[0],"Time":"2020-08-13 12:02:58.004","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2712],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:58.054","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2674],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"BatteryCheck":[405],"Time":"2020-08-13 12:02:58.104","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2846],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:58.119","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3147],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"LeadIStValue":[96],"Time":"2020-08-13 12:02:58.166","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3569],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:58.203","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4080],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"RRInterval":[708],"Time":"2020-08-13 12:02:58.251","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4638],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:58.311","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5170],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:58.317","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5642],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:58.363","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5982],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:58.409","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6143],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:58.457","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6207],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"HWVersion":[101],"Time":"2020-08-13 12:02:58.500","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6140],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:58.548","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5965],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"FWVersion":[108],"Time":"2020-08-13 12:02:58.554","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5684],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"HeartRate":[84],"Time":"2020-08-13 12:02:58.599","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5248],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:58.631","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4647],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"RespirationRate":[42],"Time":"2020-08-13 12:02:58.687","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[3930],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:58.741","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3103],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:58.751","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2222],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:58.796","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1433],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"Temperature":[296],"Time":"2020-08-13 12:02:58.844","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[799],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:58.892","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[378],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"MotionStatus":[0],"Time":"2020-08-13 12:02:58.936","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[251],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:58.986","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[459],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"Apnea":[0],"Time":"2020-08-13 12:02:58.994","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[964],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:59.050","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1702],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"BatteryCheck":[406],"Time":"2020-08-13 12:02:59.106","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2599],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:02:59.112","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3515],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"LeadIStValue":[96],"Time":"2020-08-13 12:02:59.163","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[4390],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:59.210","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5191],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"RRInterval":[708],"Time":"2020-08-13 12:02:59.252","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5792],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:59.303","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6185],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:59.320","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6451],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:59.353","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6543],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"ECGShapeClassification":[6],"Time":"2020-08-13 12:02:59.407","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6505],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:59.457","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6386],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"HWVersion":[101],"Time":"2020-08-13 12:02:59.470","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6178],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:59.514","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5911],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"FWVersion":[108],"Time":"2020-08-13 12:02:59.559","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5704],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"HeartRate":[84],"Time":"2020-08-13 12:02:59.609","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5542],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:59.658","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5579],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"RespirationRate":[46],"Time":"2020-08-13 12:02:59.708","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5910],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:59.713","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6429],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"LeadOffStatus":[0],"Time":"2020-08-13 12:02:59.757","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7037],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:59.810","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7763],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"Temperature":[296],"Time":"2020-08-13 12:02:59.849","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8516],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:02:59.895","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9201],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"MotionStatus":[0],"Time":"2020-08-13 12:02:59.928","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9836],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:02:59.965","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10425],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"Apnea":[0],"Time":"2020-08-13 12:03:00.023","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10934],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:00.082","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11348],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"BatteryCheck":[405],"Time":"2020-08-13 12:03:00.087","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[11684],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:00.136","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11959],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"LeadIStValue":[96],"Time":"2020-08-13 12:03:00.145","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12201],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:00.190","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12335],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"RRInterval":[708],"Time":"2020-08-13 12:03:00.237","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12292],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:00.284","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12148],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:00.334","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11978],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:00.378","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11805],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:00.384","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11746],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:00.438","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11833],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"HWVersion":[101],"Time":"2020-08-13 12:03:00.476","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12075],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:00.522","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12456],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"FWVersion":[108],"Time":"2020-08-13 12:03:00.573","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12846],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"HeartRate":[84],"Time":"2020-08-13 12:03:00.618","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[13096],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:00.625","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13212],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"RespirationRate":[60],"Time":"2020-08-13 12:03:00.674","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13235],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:00.719","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13189],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:00.781","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13131],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:00.790","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13127],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"Temperature":[296],"Time":"2020-08-13 12:03:00.838","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13236],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:00.887","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13383],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"MotionStatus":[0],"Time":"2020-08-13 12:03:00.935","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13580],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:00.983","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13933],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"Apnea":[0],"Time":"2020-08-13 12:03:00.989","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14400],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:01.035","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14899],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"BatteryCheck":[406],"Time":"2020-08-13 12:03:01.084","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15339],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:01.144","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15651],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"LeadIStValue":[96],"Time":"2020-08-13 12:03:01.152","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15788],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:01.196","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15775],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"RRInterval":[708],"Time":"2020-08-13 12:03:01.243","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15639],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:01.289","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15457],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:01.337","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15310],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:01.347","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15227],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:01.407","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15220],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:01.459","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15205],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"HWVersion":[101],"Time":"2020-08-13 12:03:01.466","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15151],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:01.511","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[14983],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"FWVersion":[108],"Time":"2020-08-13 12:03:01.555","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14622],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"HeartRate":[84],"Time":"2020-08-13 12:03:01.600","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13995],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:01.651","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13209],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"RespirationRate":[60],"Time":"2020-08-13 12:03:01.659","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12282],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:01.722","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11250],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:01.756","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10181],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:01.792","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9246],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"Temperature":[296],"Time":"2020-08-13 12:03:01.842","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8514],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:01.894","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7976],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"MotionStatus":[0],"Time":"2020-08-13 12:03:01.904","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7541],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:01.955","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7144],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"Apnea":[0],"Time":"2020-08-13 12:03:02.004","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[6674],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:02.020","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6043],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"BatteryCheck":[406],"Time":"2020-08-13 12:03:02.065","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5282],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:02.110","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4498],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"LeadIStValue":[96],"Time":"2020-08-13 12:03:02.150","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3749],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:02.201","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3103],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"RRInterval":[708],"Time":"2020-08-13 12:03:02.243","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2645],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:02.276","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2406],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:02.307","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2279],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:02.387","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2184],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:02.393","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2117],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:02.442","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2070],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"HWVersion":[101],"Time":"2020-08-13 12:03:02.487","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2041],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:02.500","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2062],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"FWVersion":[108],"Time":"2020-08-13 12:03:02.545","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2214],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"HeartRate":[84],"Time":"2020-08-13 12:03:02.597","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2534],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:02.639","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3010],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"RespirationRate":[52],"Time":"2020-08-13 12:03:02.689","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3639],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:02.734","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4419],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:02.741","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5182],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:02.788","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5830],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"Temperature":[296],"Time":"2020-08-13 12:03:02.834","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6373],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:02.882","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6810],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"MotionStatus":[0],"Time":"2020-08-13 12:03:02.941","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[7160],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:02.950","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7508],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"Apnea":[0],"Time":"2020-08-13 12:03:02.995","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7913],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:03.036","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8313],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"BatteryCheck":[407],"Time":"2020-08-13 12:03:03.098","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8697],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:03.104","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9148],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"LeadIStValue":[96],"Time":"2020-08-13 12:03:03.165","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9689],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:03.224","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10211],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"RRInterval":[708],"Time":"2020-08-13 12:03:03.229","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10708],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:03.267","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11139],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:03.315","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11427],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:03.383","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11598],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:03.393","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11720],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:03.446","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[11705],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"HWVersion":[101],"Time":"2020-08-13 12:03:03.461","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11562],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:03.511","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11343],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"FWVersion":[108],"Time":"2020-08-13 12:03:03.558","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11088],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"HeartRate":[84],"Time":"2020-08-13 12:03:03.606","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10784],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:03.655","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10530],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"RespirationRate":[52],"Time":"2020-08-13 12:03:03.662","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10334],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:03.700","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10032],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:03.745","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9572],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:03.789","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9004],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"Temperature":[296],"Time":"2020-08-13 12:03:03.824","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8352],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:03.872","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7679],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"MotionStatus":[0],"Time":"2020-08-13 12:03:03.906","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6995],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:03.944","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6360],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"Apnea":[0],"Time":"2020-08-13 12:03:03.997","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5855],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:04.018","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5556],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"BatteryCheck":[406],"Time":"2020-08-13 12:03:04.083","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5454],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:04.139","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5688],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"LeadIStValue":[96],"Time":"2020-08-13 12:03:04.144","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6190],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:04.187","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6842],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"RRInterval":[708],"Time":"2020-08-13 12:03:04.240","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7458],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:04.287","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7921],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:04.301","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8294],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:04.352","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[8569],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:04.412","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8699],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:04.423","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8763],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"HWVersion":[101],"Time":"2020-08-13 12:03:04.471","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8793],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:04.516","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8647],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"FWVersion":[108],"Time":"2020-08-13 12:03:04.581","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8303],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"HeartRate":[84],"Time":"2020-08-13 12:03:04.591","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7861],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:04.643","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7324],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"RespirationRate":[45],"Time":"2020-08-13 12:03:04.686","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6757],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:04.733","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6274],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:04.739","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5894],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:04.785","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5419],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"Temperature":[296],"Time":"2020-08-13 12:03:04.815","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[4761],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:04.855","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3998],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"MotionStatus":[0],"Time":"2020-08-13 12:03:04.912","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3123],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:04.935","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2168],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"Apnea":[0],"Time":"2020-08-13 12:03:04.986","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1291],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:05.041","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[630],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"BatteryCheck":[405],"Time":"2020-08-13 12:03:05.050","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[105],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:05.095","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"LeadIStValue":[96],"Time":"2020-08-13 12:03:05.152","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:05.171","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"RRInterval":[708],"Time":"2020-08-13 12:03:05.220","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:05.266","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:05.329","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:05.337","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:05.390","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:05.447","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"HWVersion":[101],"Time":"2020-08-13 12:03:05.457","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:05.510","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"FWVersion":[108],"Time":"2020-08-13 12:03:05.554","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"HeartRate":[84],"Time":"2020-08-13 12:03:05.601","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:05.663","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"RespirationRate":[45],"Time":"2020-08-13 12:03:05.669","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:05.725","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"LeadOffStatus":[0],"Time":"2020-08-13 12:03:05.772","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[100],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:05.778","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"Temperature":[296],"Time":"2020-08-13 12:03:05.824","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[100],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:05.871","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[298],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"MotionStatus":[0],"Time":"2020-08-13 12:03:05.923","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[660],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:05.936","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1118],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"Apnea":[0],"Time":"2020-08-13 12:03:05.980","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1769],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:06.021","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2602],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"BatteryCheck":[407],"Time":"2020-08-13 12:03:06.067","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3531],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:06.111","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4619],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"LeadIStValue":[96],"Time":"2020-08-13 12:03:06.129","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5889],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:06.176","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7263],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"RRInterval":[708],"Time":"2020-08-13 12:03:06.226","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8585],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:06.281","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[9720],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:06.297","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10551],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:06.347","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11047],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:06.417","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11301],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:06.423","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11442],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"HWVersion":[101],"Time":"2020-08-13 12:03:06.474","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11688],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:06.529","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11997],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"FWVersion":[108],"Time":"2020-08-13 12:03:06.542","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12290],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"HeartRate":[84],"Time":"2020-08-13 12:03:06.593","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12531],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:06.633","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12785],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"RespirationRate":[38],"Time":"2020-08-13 12:03:06.685","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12958],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:06.691","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13076],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:06.734","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13190],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:06.778","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13289],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"Temperature":[296],"Time":"2020-08-13 12:03:06.809","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13287],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:06.849","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13083],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"MotionStatus":[0],"Time":"2020-08-13 12:03:06.906","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12725],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:06.924","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12282],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"Apnea":[0],"Time":"2020-08-13 12:03:06.970","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11830],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:07.029","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11425],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"BatteryCheck":[406],"Time":"2020-08-13 12:03:07.046","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11134],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:07.093","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10917],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"LeadIStValue":[96],"Time":"2020-08-13 12:03:07.139","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10726],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:07.179","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[10576],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"RRInterval":[708],"Time":"2020-08-13 12:03:07.213","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10540],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:07.258","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10652],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:07.286","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10913],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:07.335","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11303],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:07.393","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11786],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:07.438","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12243],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"HWVersion":[101],"Time":"2020-08-13 12:03:07.454","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12686],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:07.498","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13202],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"FWVersion":[108],"Time":"2020-08-13 12:03:07.546","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13759],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"HeartRate":[84],"Time":"2020-08-13 12:03:07.611","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14155],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:07.619","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14375],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"RespirationRate":[34],"Time":"2020-08-13 12:03:07.654","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[14394],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:07.702","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14150],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:07.750","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13715],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:07.765","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13209],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"Temperature":[296],"Time":"2020-08-13 12:03:07.815","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12671],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:07.862","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11986],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"MotionStatus":[0],"Time":"2020-08-13 12:03:07.911","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11066],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:07.950","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9909],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"Apnea":[0],"Time":"2020-08-13 12:03:07.959","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8609],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:08.010","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7166],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"BatteryCheck":[406],"Time":"2020-08-13 12:03:08.054","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5783],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:08.110","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4622],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"LeadIStValue":[96],"Time":"2020-08-13 12:03:08.159","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3749],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:08.206","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3151],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"RRInterval":[708],"Time":"2020-08-13 12:03:08.212","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2820],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:08.251","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2633],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:08.302","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2505],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:08.347","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2312],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:08.365","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2059],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:08.409","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1840],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"HWVersion":[101],"Time":"2020-08-13 12:03:08.443","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1736],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:08.484","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1721],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"FWVersion":[108],"Time":"2020-08-13 12:03:08.552","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1872],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"HeartRate":[84],"Time":"2020-08-13 12:03:08.567","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[2246],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:08.613","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2807],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"RespirationRate":[34],"Time":"2020-08-13 12:03:08.654","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3525],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:08.700","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4419],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:08.751","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5407],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:08.770","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6379],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"Temperature":[296],"Time":"2020-08-13 12:03:08.802","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7217],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:08.845","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7892],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"MotionStatus":[0],"Time":"2020-08-13 12:03:08.895","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8369],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:08.936","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8718],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"Apnea":[0],"Time":"2020-08-13 12:03:08.991","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8927],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:09.042","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9011],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"BatteryCheck":[406],"Time":"2020-08-13 12:03:09.048","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9004],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:09.106","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[8990],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"LeadIStValue":[96],"Time":"2020-08-13 12:03:09.158","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8878],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:09.169","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8706],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"RRInterval":[708],"Time":"2020-08-13 12:03:09.207","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8546],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:09.251","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8428],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:09.285","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8424],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:09.333","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8566],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:09.386","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8715],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:09.400","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8822],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"HWVersion":[101],"Time":"2020-08-13 12:03:09.457","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8882],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:09.497","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8749],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"FWVersion":[108],"Time":"2020-08-13 12:03:09.519","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8452],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"HeartRate":[84],"Time":"2020-08-13 12:03:09.573","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8162],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:09.620","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7920],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"RespirationRate":[39],"Time":"2020-08-13 12:03:09.673","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7712],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:09.685","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7573],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:09.720","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7535],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:09.767","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7582],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"Temperature":[296],"Time":"2020-08-13 12:03:09.816","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7790],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:09.836","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8072],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"MotionStatus":[0],"Time":"2020-08-13 12:03:09.880","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8385],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:09.929","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8694],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"Apnea":[0],"Time":"2020-08-13 12:03:09.972","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8970],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:10.019","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[9117],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"BatteryCheck":[406],"Time":"2020-08-13 12:03:10.072","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9147],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:10.080","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9160],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"LeadIStValue":[96],"Time":"2020-08-13 12:03:10.122","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9258],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:10.170","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9495],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"RRInterval":[708],"Time":"2020-08-13 12:03:10.214","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9926],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:10.262","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10623],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:10.296","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11561],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:10.328","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12709],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:10.361","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14017],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:10.404","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15404],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"HWVersion":[101],"Time":"2020-08-13 12:03:10.436","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:10.487","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"FWVersion":[108],"Time":"2020-08-13 12:03:10.527","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"HeartRate":[84],"Time":"2020-08-13 12:03:10.566","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:10.619","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"RespirationRate":[43],"Time":"2020-08-13 12:03:10.663","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:10.696","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:10.719","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:10.765","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"Temperature":[295],"Time":"2020-08-13 12:03:10.801","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:10.859","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"MotionStatus":[0],"Time":"2020-08-13 12:03:10.899","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:10.915","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"Apnea":[0],"Time":"2020-08-13 12:03:10.963","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:11.000","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"BatteryCheck":[406],"Time":"2020-08-13 12:03:11.050","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:11.101","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"LeadIStValue":[96],"Time":"2020-08-13 12:03:11.117","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:11.159","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"RRInterval":[708],"Time":"2020-08-13 12:03:11.203","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:11.249","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:11.308","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:11.319","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[16000],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:11.355","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[15744],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:11.399","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[15338],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"HWVersion":[101],"Time":"2020-08-13 12:03:11.450","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14854],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:11.469","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14455],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"FWVersion":[108],"Time":"2020-08-13 12:03:11.514","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14199],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"HeartRate":[84],"Time":"2020-08-13 12:03:11.560","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13993],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:11.599","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13711],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"RespirationRate":[43],"Time":"2020-08-13 12:03:11.650","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13349],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:11.704","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12888],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:11.710","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12351],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:11.754","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11817],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"Temperature":[295],"Time":"2020-08-13 12:03:11.811","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11434],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:11.851","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11199],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"MotionStatus":[0],"Time":"2020-08-13 12:03:11.903","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11051],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:11.920","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[10926],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"Apnea":[0],"Time":"2020-08-13 12:03:11.952","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10885],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:12.001","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10943],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"BatteryCheck":[406],"Time":"2020-08-13 12:03:12.047","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11137],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:12.071","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11480],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"LeadIStValue":[96],"Time":"2020-08-13 12:03:12.113","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11946],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:12.171","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12477],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"RRInterval":[708],"Time":"2020-08-13 12:03:12.212","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12988],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:12.241","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13396],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:12.281","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13636],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:12.311","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13788],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:12.362","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13931],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:12.409","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14057],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"HWVersion":[101],"Time":"2020-08-13 12:03:12.455","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14100],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:12.506","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14155],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"FWVersion":[108],"Time":"2020-08-13 12:03:12.557","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14191],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"HeartRate":[84],"Time":"2020-08-13 12:03:12.563","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[14095],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:12.606","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13950],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"RespirationRate":[39],"Time":"2020-08-13 12:03:12.655","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13777],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:12.671","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13472],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:12.716","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13000],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:12.751","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12525],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"Temperature":[295],"Time":"2020-08-13 12:03:12.802","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11902],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:12.850","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[11090],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"MotionStatus":[0],"Time":"2020-08-13 12:03:12.865","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10231],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:12.924","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9401],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"Apnea":[0],"Time":"2020-08-13 12:03:12.967","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8565],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:12.987","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7869],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"BatteryCheck":[405],"Time":"2020-08-13 12:03:13.035","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7463],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:13.077","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7325],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"LeadIStValue":[96],"Time":"2020-08-13 12:03:13.121","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7408],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:13.174","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7651],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"RRInterval":[708],"Time":"2020-08-13 12:03:13.234","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7971],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:13.240","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8279],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:13.285","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8564],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:13.337","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[8909],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:13.346","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9397],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:13.396","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9979],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"HWVersion":[101],"Time":"2020-08-13 12:03:13.439","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10559],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:13.482","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11089],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"FWVersion":[108],"Time":"2020-08-13 12:03:13.535","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11475],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"HeartRate":[84],"Time":"2020-08-13 12:03:13.577","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11643],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:13.586","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11709],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"RespirationRate":[40],"Time":"2020-08-13 12:03:13.634","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11919],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:13.679","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12292],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:13.726","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12757],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:13.771","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13229],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"Temperature":[295],"Time":"2020-08-13 12:03:13.815","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13638],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:13.825","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13844],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"MotionStatus":[0],"Time":"2020-08-13 12:03:13.883","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13824],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:13.938","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13659],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"Apnea":[0],"Time":"2020-08-13 12:03:13.948","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13460],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:13.996","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13284],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"BatteryCheck":[407],"Time":"2020-08-13 12:03:14.042","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13121],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:14.085","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12930],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"LeadIStValue":[96],"Time":"2020-08-13 12:03:14.137","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12773],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:14.145","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12676],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"RRInterval":[708],"Time":"2020-08-13 12:03:14.189","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12701],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:14.256","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[12860],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:14.266","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13147],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:14.321","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13463],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:14.382","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13729],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:14.389","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13806],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"HWVersion":[101],"Time":"2020-08-13 12:03:14.440","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13760],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:14.482","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13611],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"FWVersion":[108],"Time":"2020-08-13 12:03:14.502","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13377],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"HeartRate":[84],"Time":"2020-08-13 12:03:14.545","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[13051],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:14.606","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12633],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"RespirationRate":[40],"Time":"2020-08-13 12:03:14.619","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[12114],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:14.665","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[11502],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:14.724","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[10825],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:14.775","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[10166],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"Temperature":[295],"Time":"2020-08-13 12:03:14.786","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9497],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:14.830","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8832],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"MotionStatus":[0],"Time":"2020-08-13 12:03:14.866","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8403],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:14.937","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8308],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"Apnea":[0],"Time":"2020-08-13 12:03:14.950","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8388],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:14.985","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8521],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"BatteryCheck":[407],"Time":"2020-08-13 12:03:15.041","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8614],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:15.090","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8468],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"LeadIStValue":[96],"Time":"2020-08-13 12:03:15.135","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7935],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:15.145","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7213],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"RRInterval":[708],"Time":"2020-08-13 12:03:15.210","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6534],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:15.219","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5944],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:15.272","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5451],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:15.312","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5115],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:15.357","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4874],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:15.389","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4701],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"HWVersion":[101],"Time":"2020-08-13 12:03:15.434","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4543],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:15.484","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4479],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"FWVersion":[108],"Time":"2020-08-13 12:03:15.505","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4592],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"HeartRate":[84],"Time":"2020-08-13 12:03:15.550","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4841],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:15.584","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5248],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"RespirationRate":[38],"Time":"2020-08-13 12:03:15.646","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5802],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:15.656","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[6377],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:15.706","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6834],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:15.753","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7057],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"Temperature":[295],"Time":"2020-08-13 12:03:15.799","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7022],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:15.822","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6924],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"MotionStatus":[0],"Time":"2020-08-13 12:03:15.865","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6784],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:15.895","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6701],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"Apnea":[0],"Time":"2020-08-13 12:03:15.955","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6871],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:15.999","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7253],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"BatteryCheck":[406],"Time":"2020-08-13 12:03:16.015","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7650],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:16.065","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8002],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"LeadIStValue":[96],"Time":"2020-08-13 12:03:16.114","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8237],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:16.158","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[8327],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"RRInterval":[708],"Time":"2020-08-13 12:03:16.200","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8314],"ECGWaveform":[8395,8370,8345,8328,8317,8304,8284,8267,8256,8246],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:16.250","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8288],"ECGWaveform":[8233,8220,8213,8211,8205,8194,8189,8189,8189,8186],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:16.257","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8248],"ECGWaveform":[8190,8196,8197,8191,8186,8182,8181,8182,8186,8192],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:16.313","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8112],"ECGWaveform":[8192,8184,8178,8183,8193,8195,8194,8193,8189,8180],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:16.382","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7871],"ECGWaveform":[8172,8178,8189,8187,8181,8182,8183,8187,8195,8205],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:16.388","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7567],"ECGWaveform":[8211,8204,8186,8179,8190,8197,8191,8183,8184,8187],"HWVersion":[101],"Time":"2020-08-13 12:03:16.443","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7188],"ECGWaveform":[8187,8189,8187,8182,8185,8187,8191,8199,8199,8192],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:16.485","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6824],"ECGWaveform":[8187,8186,8183,8178,8181,8192,8196,8191,8188,8189],"FWVersion":[108],"Time":"2020-08-13 12:03:16.496","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6627],"ECGWaveform":[8189,8187,8182,8180,8181,8178,8178,8182,8186,8187],"HeartRate":[84],"Time":"2020-08-13 12:03:16.544","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6611],"ECGWaveform":[8190,8199,8204,8202,8200,8202,8209,8207,8200,8206],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:16.595","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6775],"ECGWaveform":[8219,8225,8219,8208,8205,8208,8202,8192,8189,8189],"RespirationRate":[40],"Time":"2020-08-13 12:03:16.637","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7155],"ECGWaveform":[8186,8181,8178,8180,8177,8172,8180,8199,8208,8203],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:16.684","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7691],"ECGWaveform":[8192,8180,8172,8169,8174,8183,8182,8171,8167,8177],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:16.733","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8269],"ECGWaveform":[8189,8192,8183,8174,8159,8142,8156,8208,8287,8379],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:16.739","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8723],"ECGWaveform":[8488,8615,8752,8891,9034,9166,9236,9200,9066,8839],"Temperature":[295],"Time":"2020-08-13 12:03:16.785","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9036],"ECGWaveform":[8527,8223,8015,7919,7915,7945,7964,7978,8007,8035],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:16.829","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9210],"ECGWaveform":[8037,8026,8025,8031,8034,8041,8060,8077,8081,8079],"MotionStatus":[0],"Time":"2020-08-13 12:03:16.881","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9238],"ECGWaveform":[8084,8087,8085,8084,8088,8093,8093,8092,8091,8088],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:16.901","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9131],"ECGWaveform":[8085,8088,8092,8093,8089,8091,8102,8111,8114,8120],"Apnea":[0],"Time":"2020-08-13 12:03:16.947","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8966],"ECGWaveform":[8125,8128,8131,8128,8120,8118,8123,8124,8127,8141],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:16.996","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8605],"ECGWaveform":[8161,8172,8172,8172,8174,8178,8182,8189,8195,8197],"BatteryCheck":[406],"Time":"2020-08-13 12:03:17.058","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7951],"ECGWaveform":[8188,8186,8200,8214,8214,8208,8214,8233,8250,8259],"RPeak":true,"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:17.072","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[7151],"RPeak":true,"ECGWaveform":[8265,8274,8279,8282,8295,8304,8301,8290,8281,8277],"LeadIStValue":[96],"Time":"2020-08-13 12:03:17.113","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6350],"ECGWaveform":[8274,8265,8260,8264,8269,8267,8264,8269,8270,8255],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:17.155","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5586],"ECGWaveform":[8235,8224,8208,8191,8187,8192,8201,8201,8193,8189],"RRInterval":[708],"Time":"2020-08-13 12:03:17.170","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4985],"ECGWaveform":[8187,8186,8180,8182,8198,8216,8237,8259,8277,8305],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:17.215","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4620],"ECGWaveform":[8341,8373,8390,8395,8395,8389,8352,8233,7965,7538],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:17.266","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4438],"ECGWaveform":[7061,6669,6442,6347,6331,6271,6305,6361,6447,6589],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:17.307","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4429],"ECGWaveform":[6749,6878,6980,7090,7210,7319,7418,7519,7624,7709],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:17.360","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4645],"ECGWaveform":[7757,7782,7807,7845,7904,7984,8085,8180,8247,8307],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:17.407","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5104],"ECGWaveform":[8365,8413,8447,8482,8522,8562,8587,8597,8603,8612],"HWVersion":[101],"Time":"2020-08-13 12:03:17.414","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5757],"ECGWaveform":[8629,8653,8679,8705,8728,8744,8761,8785,8809,8822],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:17.456","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6572],"ECGWaveform":[8836,8863,8889,8906,8916,8929,8947,8962,8971,8978],"FWVersion":[108],"Time":"2020-08-13 12:03:17.515","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7476],"ECGWaveform":[8986,8984,8975,8970,8961,8942,8917,8900,8892,8876],"HeartRate":[84],"Time":"2020-08-13 12:03:17.536","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8274],"RPeak":true,"ECGWaveform":[8843,8810,8787,8768,8741,8710,8679,8643,8599,8557],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:17.583","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[8815],"ECGWaveform":[8521,8492,8464,8438,8415,8395,8370,8345,8328,8317],"RespirationRate":[58],"Time":"2020-08-13 12:03:17.637","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9169],"ECGWaveform":[8304,8284,8267,8256,8246,8233,8220,8213,8211,8205],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:17.656","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9362],"ECGWaveform":[8194,8189,8189,8189,8186,8190,8196,8197,8191,8186],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:17.697","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9364],"ECGWaveform":[8182,8181,8182,8186,8192,8192,8184,8178,8183,8193],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:17.741","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9359],"ECGWaveform":[8195,8194,8193,8189,8180,8172,8178,8189,8187,8181],"Temperature":[295],"Time":"2020-08-13 12:03:17.806","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9421],"ECGWaveform":[8182,8183,8187,8195,8205,8211,8204,8186,8179,8190],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:17.815","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9477],"ECGWaveform":[8197,8191,8183,8184,8187,8187,8189,8187,8182,8185],"MotionStatus":[0],"Time":"2020-08-13 12:03:17.863","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9408],"ECGWaveform":[8187,8191,8199,8199,8192,8187,8186,8183,8178,8181],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:17.919","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[9138],"ECGWaveform":[8192,8196,8191,8188,8189,8189,8187,8182,8180,8181],"Apnea":[0],"Time":"2020-08-13 12:03:17.944","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8630],"ECGWaveform":[8178,8178,8182,8186,8187,8190,8199,8204,8202,8200],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:17.989","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7903],"ECGWaveform":[8202,8209,8207,8200,8206,8219,8225,8219,8208,8205],"BatteryCheck":[407],"Time":"2020-08-13 12:03:18.038","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6907],"ECGWaveform":[8208,8202,8192,8189,8189,8186,8181,8178,8180,8177],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:18.082","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5768],"ECGWaveform":[8172,8180,8199,8208,8203,8192,8180,8172,8169,8174],"LeadIStValue":[96],"Time":"2020-08-13 12:03:18.103","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4544],"ECGWaveform":[8183,8182,8171,8167,8177,8189,8192,8183,8174,8159],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:18.133","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3352],"ECGWaveform":[8142,8156,8208,8287,8379,8488,8615,8752,8891,9034],"RRInterval":[708],"Time":"2020-08-13 12:03:18.180","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2308],"ECGWaveform":[9166,9236,9200,9066,8839,8527,8223,8015,7919,7915],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:18.220","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1577],"ECGWaveform":[7945,7964,7978,8007,8035,8037,8026,8025,8031,8034],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:18.250","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1155],"ECGWaveform":[8041,8060,8077,8081,8079,8084,8087,8085,8084,8088],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:18.316","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[998],"ECGWaveform":[8093,8093,8092,8091,8088,8085,8088,8092,8093,8089],"ECGShapeClassification":[6],"Time":"2020-08-13 12:03:18.373","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[941],"ECGWaveform":[8091,8102,8111,8114,8120,8125,8128,8131,8128,8120],"ArrhythmiaCode":[34],"Time":"2020-08-13 12:03:18.381","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[947],"ECGWaveform":[8118,8123,8124,8127,8141,8161,8172,8172,8172,8174],"HWVersion":[101],"Time":"2020-08-13 12:03:18.467","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[925],"ECGWaveform":[8178,8182,8189,8195,8197,8188,8186,8200,8214,8214],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:18.476","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[872],"ECGWaveform":[8208,8214,8233,8250,8259,8265,8274,8279,8282,8295],"RPeak":true,"FWVersion":[108],"Time":"2020-08-13 12:03:18.521","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[929],"ECGWaveform":[8304,8301,8290,8281,8277,8274,8265,8260,8264,8269],"HeartRate":[84],"Time":"2020-08-13 12:03:18.536","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1196],"ECGWaveform":[8267,8264,8269,8270,8255,8235,8224,8208,8191,8187],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:18.580","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[1539],"ECGWaveform":[8192,8201,8201,8193,8189,8187,8186,8180,8182,8198],"RespirationRate":[58],"Time":"2020-08-13 12:03:18.618","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2007],"ECGWaveform":[8216,8237,8259,8277,8305,8341,8373,8390,8395,8395],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:18.671","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[2672],"ECGWaveform":[8389,8352,8233,7965,7538,7061,6669,6442,6347,6331],"LeadOffStatus":[0],"Time":"2020-08-13 12:03:18.686","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[3504],"ECGWaveform":[6271,6305,6361,6447,6589,6749,6878,6980,7090,7210],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:18.730","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[4400],"ECGWaveform":[7319,7418,7519,7624,7709,7757,7782,7807,7845,7904],"Temperature":[295],"Time":"2020-08-13 12:03:18.775","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[5400],"ECGWaveform":[7984,8085,8180,8247,8307,8365,8413,8447,8482,8522],"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:18.817","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[6442],"ECGWaveform":[8562,8587,8597,8603,8612,8629,8653,8679,8705,8728],"MotionStatus":[0],"Time":"2020-08-13 12:03:18.863","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[7346],"ECGWaveform":[8744,8761,8785,8809,8822,8836,8863,8889,8906,8916],"ArrhythmiaCode":[0],"Time":"2020-08-13 12:03:18.918","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8032],"ECGWaveform":[8929,8947,8962,8971,8978,8986,8984,8975,8970,8961],"Apnea":[0],"Time":"2020-08-13 12:03:18.928","setSound":false},
    {"DeviceNumber":"00101","RespirationSignal":[8490],"ECGWaveform":[8942,8917,8900,8892,8876,8843,8810,8787,8768,8741],"RPeak":true,"ArrhythmiaAnnotation":[5],"Time":"2020-08-13 12:03:18.973","setSound":true},
    {"DeviceNumber":"00101","RespirationSignal":[8689],"RPeak":true,"ECGWaveform":[8710,8679,8643,8599,8557,8521,8492,8464,8438,8415],"BatteryCheck":[406],"Time":"2020-08-13 12:03:19.032","setSound":false},
    ];

    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private line: d3Shape.Line<[number, number]>;
    private margin = {top: 15, right: 20, bottom: 30, left: 50};
    private path:any;
    private pathlength: any;
    private data2: Array<any> = new Array();
    private ecgData: any[] = [];
     ecgData1: any;
     ecgData2: any;
     ecgData3: any;
     ecgData4: any;
     ecgData5: any;
    data: any;    
    private svg1: any;
    private svg2: any;
    private svg3:any;
    private svg4: any;
    private svg5: any;

    private focus1: any
    private focus2: any
    private focus3: any
    private focus4: any
    private focus5: any
    index: number;
    private x: any;
    private xScaleValue: any;
    private yScaleValue: any;
    

    constructor(private dataService: DataService) {
        this.width = 2000 - this.margin.left - this.margin.right;
        this.height = 150 - this.margin.top - this.margin.bottom;
        this.index=0;
    }
    
    @HostListener('mousemove', ['$event'])
    onMouseMove(event) {
      // this.xPos=event.clientX;
      // this.yPos=event.clientY;
      // this.scalePointPosition(event,this.focus1);
      // this.scalePointPosition(event,this.focus2);
      // this.scalePointPosition(event,this.focus3);
      // this.scalePointPosition(event,this.focus4);
      // this.scalePointPosition(event,this.focus5);
      this. x = event.offsetX-this.margin.left;


  }
    ngOnInit() { 

      this.datas1.forEach((d, i) => {
        for (let j = 0; j < 10; j++) {
          this.ecgData.push({
            ecg_x: i * 10 + j,
            ecg_y: d.ECGWaveform[j],
            Time: d.Time,
            ArrhythmiaAnnotation: d.ArrhythmiaAnnotation
          })
        }
       
        this.ecgData1 = this.ecgData.slice(0,2000);
        this.ecgData2 = this.ecgData.slice(2000,4000);
        this.ecgData3 = this.ecgData.slice(4000,6000);
        this.ecgData4 = this.ecgData.slice(6000,8000);
        this.ecgData5 = this.ecgData.slice(8000,10000);
      
      })

      this.initSvg();
      this.initAxis();
      this.drawAxis();
      if(this.ecgData.length>0)this.drawLine(this.svg1,this.ecgData1,this.focus1);
      if(this.ecgData.length>2000) this.drawLine(this.svg2,this.ecgData2,this.focus2);
      if(this.ecgData.length>4000) this.drawLine(this.svg3,this.ecgData3,this.focus3);
      if(this.ecgData.length>6000) this.drawLine(this.svg4,this.ecgData4,this.focus4);
      if(this.ecgData.length>8000) this.drawLine(this.svg5,this.ecgData5,this.focus5);
      
      
        // this.dataService.onMessage().subscribe(
        //     msg => {
        //         // console.log(this.data);
        //         //console.log(msg.RespirationSignal);
        //         this.data=msg;
        //         // this.data.push(msg);
        //         // console.log(this.data);
        //         // console.log(this.datas);
        //         this.initSvg();
        //         this.initAxis();
        //         this.drawAxis();
        //         this.drawLine();
        //     },
        //     err => console.log(err),
        //     () => console.log('end')
        //   );
    }
   
    private initSvg() {
        if(this.ecgData.length>0)this.svg1 = d3.select(".respiration").append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        if(this.ecgData.length>2000) this.svg2 = d3.select(".respiration2").append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
        if(this.ecgData.length>4000) this.svg3 = d3.select(".respiration3").append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');  
        if(this.ecgData.length>6000) this.svg4 = d3.select(".respiration4").append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')'); 
        if(this.ecgData.length>8000) this.svg5 = d3.select(".respiration5").append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')'); 
    }

    private initAxis() {
        this.xScale = d3Scale.scaleLinear()
            .domain([0,10000])
            .range([0, this.width]);
        this.yScale = d3Scale.scaleLinear()
            .domain([5000,10000])
            //.domain([0,d3Array.max(this.datas)])
            //.domain(d3Array.extent(this.data, (d) => d.RespirationSignal[0]))
            .range([this.height, 0]);
    }

    private drawAxis() {
      if(this.ecgData.length>0){
        this.svg1.append('g')
                .attr('transform', 'translate(0,' + this.height + ')')
                .call(d3Axis.axisBottom(this.xScale));
        this.svg1.append('g')
                .call(d3Axis.axisLeft(this.yScale));
      }
      if(this.ecgData.length>2000){
        this.svg2.append('g')
                .attr('transform', 'translate(0,' + this.height + ')')
                .call(d3Axis.axisBottom(this.xScale));
        this.svg2.append('g')
                .call(d3Axis.axisLeft(this.yScale));
      }
      if(this.ecgData.length>4000){
        this.svg3.append('g')
                .attr('transform', 'translate(0,' + this.height + ')')
                .call(d3Axis.axisBottom(this.xScale));
        this.svg3.append('g')
                .call(d3Axis.axisLeft(this.yScale));    
      }
      if(this.ecgData.length>6000){
        this.svg4.append('g')
                .attr('transform', 'translate(0,' + this.height + ')')
                .call(d3Axis.axisBottom(this.xScale));
        this.svg4.append('g')
                .call(d3Axis.axisLeft(this.yScale));   
      }
      if(this.ecgData.length>8000){
        this.svg5.append('g')
                .attr('transform', 'translate(0,' + this.height + ')')
                .call(d3Axis.axisBottom(this.xScale));
        this.svg5.append('g')
                  .call(d3Axis.axisLeft(this.yScale));  
      } 
    }

    private drawLine(svg:any, data:any, focus:any) {
      this.line = d3Shape.line()
      .x((d: any,i) => this.xScale(i))
      .y((d: any,i) => this.yScale(d.ecg_y));


      this.path=svg.append('path')
                  .datum(data)
                  .attr('class', 'line')
                  .attr("fill", "none")
                  .attr("stroke", "black")
                  .attr("stroke-width", "1.2px")
                  .attr("width",500)
                  .attr('d', this.line); 
          //Arrhythmia>0 이면 빨간점표시
      svg.selectAll("dot")
          .data(data)
          .enter().append("circle")
          .attr("r", 0.9)
          .attr("cx", (d:any,i) => {return this.xScale(i);})
          .attr("cy", (d:any,i) => {
            if(d.ArrhythmiaAnnotation>0){
                return this.yScale(d.ecg_y);
            } else return this.yScale(0);
            }).style("fill",'red');

      focus = svg.append('g')
                .attr('class', 'focus')
                .style('display', 'none');
      this.renderPoint(focus,svg);
        // if(this.ecgData.length>0){
        //   this.path=this.svg1.append('path')
        //                     .datum(this.ecgData1)
        //                     .attr('class', 'line')
        //                     .attr("fill", "none")
        //                     .attr("stroke", "black")
        //                     .attr("stroke-width", "1.2px")
        //                     .attr("width",500)
        //                     .attr('d', this.line); 
        //   //Arrhythmia>0 이면 빨간점표시
        //   this.svg1.selectAll("dot")
        //     .data(this.ecgData1)
        //     .enter().append("circle")
        //     .attr("r", 1)
        //     .attr("cx", (d:any,i) => {return this.xScale(i);})
        //     .attr("cy", (d:any,i) => {
        //       if(d.ArrhythmiaAnnotation>0){
        //         return this.yScale(d.ecg_y);
        //     } else return this.yScale(0);
        //     }).style("fill",'red');

        //   this.focus1 = this.svg1.append('g')
        //                   .attr('class', 'focus')
        //                   .style('display', 'none');
        //   this.renderPoint(this.focus1,this.svg1);
        // }
        // if(this.ecgData.length>2000){
        //   this.path=this.svg2.append('path')
        //                     .datum(this.ecgData2)
        //                     .attr('class', 'line')
        //                     .attr("fill", "none")
        //                     .attr("stroke", "black")
        //                     .attr("stroke-width", "1.2px")
        //                     .attr("width",500)
        //                     .attr('d', this.line);
        //   //Arrhythmia>0 이면 빨간점표시
        //   this.svg2.selectAll("dot")
        //           .data(this.ecgData2)
        //           .enter().append("circle")
        //           .attr("r", 1)
        //           .attr("cx", (d:any,i) => {return this.xScale(i);})
        //           .attr("cy", (d:any,i) => {
        //             if(d.ArrhythmiaAnnotation>0){
        //               return this.yScale(d.ecg_y);
        //           } else return this.yScale(0);
        //           }).style("fill",'red');
        //   this.focus2 = this.svg2.append('g')
        //                     .attr('class', 'focus')
        //                     .style('display', 'none');
        //   this.renderPoint(this.focus2,this.svg2);
        // }
        // if(this.ecgData.length>4000){
        //   this.path=this.svg3.append('path')
        //                     .datum(this.ecgData3)
        //                     .attr('class', 'line')
        //                     .attr("fill", "none")
        //                     .attr("stroke", "black")
        //                     .attr("stroke-width", "1.5px")
        //                     .attr("width",500)
        //                     .attr('d', this.line);
        //   //Arrhythmia>0 이면 빨간점표시
        //   this.svg3.selectAll("dot")
        //           .data(this.ecgData3)
        //           .enter().append("circle")
        //           .attr("r", 1.2)
        //           .attr("cx", (d:any,i) => {return this.xScale(i);})
        //           .attr("cy", (d:any,i) => {
        //             if(d.ArrhythmiaAnnotation>0){
        //               return this.yScale(d.ecg_y);
        //           } else return this.yScale(0);
        //           }).style("fill",'red');   
        //   this.focus3 = this.svg3.append('g')
        //                           .attr('class', 'focus')
        //                           .style('display', 'none');
        //   this.renderPoint(this.focus3,this.svg3);
        // }
        // if(this.ecgData.length>6000){
        //   this.path=this.svg4.append('path')
        //                     .datum(this.ecgData4)
        //                     .attr('class', 'line')
        //                     .attr("fill", "none")
        //                     .attr("stroke", "black")
        //                     .attr("stroke-width", "1.5px")
        //                     .attr("width",500)
        //                     .attr('d', this.line);
        //                     //Arrhythmia>0 이면 빨간점표시
        //   this.svg4.selectAll("dot")
        //             .data(this.ecgData4)
        //             .enter().append("circle")
        //             .attr("r", 1.2)
        //             .attr("cx", (d:any,i) => {return this.xScale(i);})
        //             .attr("cy", (d:any,i) => {
        //               if(d.ArrhythmiaAnnotation>0){
        //                 return this.yScale(d.ecg_y);
        //             } else return this.yScale(0);
        //             }).style("fill",'red');
        //   this.focus4 = this.svg4.append('g')
        //                         .attr('class', 'focus')
        //                         .style('display', 'none');
        //   this.renderPoint(this.focus4,this.svg4);   
        // }
        // if(this.ecgData.length>8000){
        //   this.path=this.svg5.append('path')
        //                     .datum(this.ecgData5)
        //                     .attr('class', 'line')
        //                     .attr("fill", "none")
        //                     .attr("stroke", "black")
        //                     .attr("stroke-width", "1.5px")
        //                     .attr("width",500)
        //                     .attr('d', this.line);
        //   //Arrhythmia>0 이면 빨간점표시
        //   this.svg5.selectAll("dot")
        //             .data(this.ecgData5)
        //             .enter().append("circle")
        //             .attr("r", 1.2)
        //             .attr("cx", (d:any,i) => {return this.xScale(i);})
        //             .attr("cy", (d:any,i) => {
        //               if(d.ArrhythmiaAnnotation>0){
        //                 return this.yScale(d.ecg_y);
        //             } else return this.yScale(0);
        //             }).style("fill",'red');  
        //   this.focus5 = this.svg5.append('g')
        //                         .attr('class', 'focus')
        //                         .style('display', 'none');
        //   this.renderPoint(this.focus5,this.svg5);
        // }
    }

    private renderPoint(focus: any, svg: any){
        // renders x and y crosshair
        focus.append('rect').attr('width',230).attr('height',70).attr('x',0).attr('y',15)
        .attr('fill','lightsteelblue');
        focus.append('circle').attr('r', 2.5).attr("fill","blue");
        focus.append('text').attr('x',100).attr('y',10);
        focus.append('line').classed('x', true);
        focus.append('line').classed('y', true);
       
      

        svg.append('rect')
            .attr('class', 'overlay')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('opacity',0)
            .on('mouseover', () => {
              focus.style('display', null);
              focus.append("text")
                .attr("x", 10)
                .attr("y", 10)
                .attr("opacity", 1);
                })
            .on('mouseout', () => {
              focus.style('display', 'none');
              focus.selectAll("text").remove();
            })
            .on('mousemove',(d: any) =>{
              this.xScaleValue= this.xScale.invert(this.x);
              const i = Math.round(this.xScaleValue);
              this.yScaleValue=this.data[i];
              //동그라미 위치 이동
              focus.attr('transform', 'translate(' + this.x + ',' + this.yScale(this.yScaleValue.ecg_y) + ')');
              //크로스헤어 표시
              focus.select('line.x')
                    .attr('x1', 0)
                    .attr('x2', this.xScale(this.xScaleValue)- this.width)
                    .attr('y1', 0)
                    .attr('y2', 0);
              focus.select('line.y')
                    .attr('x1', 0)
                    .attr('x2', 0)
                    .attr('y1', 0)
                    .attr('y2', this.height - this.yScale(this.yScaleValue.ecg_y));
              //정보 텍스트 표시
              focus.select('text')
                  .datum(this.yScaleValue)
                  .attr("x", 10)
                  .attr("y", 10)
                  .attr("opacity", 1)
                  .attr("class", "tooltip")
                  .html((d:any) => {
                      if(d.ArrhythmiaAnnotation!=null && d.ArrhythmiaAnnotation>0 )
                      return "<tspan  x='0' dy='1.2em' >" + 'Time: ' + d.Time + "</tspan>" 
                      + "<tspan x='0' dy='1.2em'>" + 'Signal: ' + d.ecg_y + "</tspan>"
                      + "<tspan x='0' dy='1.2em'>" + 'Arrhythmia: ' + d.ArrhythmiaAnnotation + "</tspan>";
                      else
                      return "<tspan  x='0' dy='1.2em' >" + 'Time: ' + d.Time + "</tspan>" 
                      + "<tspan x='0' dy='1.2em'>" + 'Signal: ' + d.ecg_y + "</tspan>";
                  });
            });

           
         d3.select('.overlay').style('fill', 'none');
         d3.select('.overlay').style('pointer-events', 'all');
         d3.selectAll('.focus line').style('fill', 'none');
         d3.selectAll('.focus line').style('stroke', '#67809f');
         d3.selectAll('.focus line').style('stroke-width', '1.5px');
         d3.selectAll('.focus line').style('stroke-dasharray', '3 3'); 
    }
    



    // private scalePointPosition(event,focus:any){
    //     //마우스위치에 따른 그래프 좌표설정
    //     this. x = event.offsetX-this.margin.left;
    //     if (this.x < 0 || this.x > this.width) { return; }
    //     this. xScaleValue = this.xScale.invert(this.x);  //x축 값
    //     const i = Math.round(this.xScaleValue);     //x축 값 반올림
    //     //this.yScaleValue = this.datas[i];
    //     if(this.index==1){
    //       this. yScaleValue = this.ecgData1[i];          //y축 값
    //     }
    //     else if(this.index==2){
    //       this.yScaleValue = this.ecgData2[i];
    //     }
    //     else if(this.index==3){
    //       this.yScaleValue = this.ecgData3[i];
    //     }
    //     else if(this.index==4){
    //       this.yScaleValue = this.ecgData4[i];
    //     }
    //     else if(this.index==5){
    //       this.yScaleValue = this.ecgData5[i];
    //     }
    //     // console.log(this.xScaleValue);
    //     // console.log(this.yScaleValue.RespirationSignal);
    //     focus.attr('transform', 'translate(' + this.x + ',' + this.yScale(this.yScaleValue.ecg_y) + ')');
        
    //    //그래프 좌표에 눈금선 표시
    //     focus.select('line.x')
    //         .attr('x1', 0)
    //         .attr('x2', this.xScale(this.xScaleValue)- this.width)
    //         .attr('y1', 0)
    //         .attr('y2', 0);
    //     focus.select('line.y')
    //         .attr('x1', 0)
    //         .attr('x2', 0)
    //         .attr('y1', 0)
    //         .attr('y2', this.height - this.yScale(this.yScaleValue.ecg_y));
    //    //정보 텍스트 표시
    //    focus.select("text")
    //         .datum(this.yScaleValue)
    //         .attr("x", 10)
    //         .attr("y", 10)
    //         .attr("opacity", 1)
    //         .html((d:any) => {
    //            if(d.ArrhythmiaAnnotation!=null && d.ArrhythmiaAnnotation>0 )
    //             return "<tspan  x='0' dy='1.2em' >" + 'Time: ' + d.Time + "</tspan>" 
    //             + "<tspan x='0' dy='1.2em'>" + 'Signal: ' + d.ecg_y + "</tspan>"
    //             + "<tspan x='0' dy='1.2em'>" + 'Arrhythmia: ' + d.ArrhythmiaAnnotation + "</tspan>";
    //            else
    //             return "<tspan  x='0' dy='1.2em' >" + 'Time: ' + d.Time + "</tspan>" 
    //             + "<tspan x='0' dy='1.2em'>" + 'Signal: ' + d.ecg_y + "</tspan>";
    //         });
    // }
    
   
}