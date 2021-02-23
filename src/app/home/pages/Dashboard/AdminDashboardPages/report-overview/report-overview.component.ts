import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../../../../core/services/shared-service/shared.service';
import {UserService} from '../../../../../core/services/users-service/user-service';
import {ErrorService} from '../../../../../core/services/error_service/error.service';

@Component({
  selector: 'app-report-overview',
  templateUrl: './report-overview.component.html',
  styleUrls: ['./report-overview.component.scss']
})
export class ReportOverviewComponent implements OnInit {
  errorResponse: any;
  pageTitle = 'Dashboard';
  public adminsTotal: number;
  public activeAdminsTotal: number;
  public blockedAdminsTotal: number;
  public inactiveAdminsTotal: number;
  public admins: any;
  public isTransactionsLoading: boolean;
  public dashboardData: any = {
    activeAdmins: 0,
    activeAgents: 0,
    activeCustomers : 0,
    admins: 0,
    agents: 0,
    customers: 0,
    failedTrans: 0,
    inActiveAdmin: 0,
    blockedAgents: 0,
    inActiveCustomers: 0,
    pendingTrans: 0,
    successfulTran: 0,
    transactionCount: 0
  };
  public isLoadingCharts = true;



  // general chart configuration
  public ChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    height: 50,
    devicePixelRatio: 1,
    maintainAspectRatio: true,
    responsiveAnimationDuration: 400
  };


  public pieChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    height: 100,
    width: 200,
    responsiveAnimationDuration: 500
  };

  public networkChartColors: Array<any> = [
    { // mtn
      backgroundColor: 'rgba(252,204,7,0.8)',
      borderColor: 'rgba(252,204,7,1)',
      pointBackgroundColor: 'rgba(252,204,7,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(252,204,7,.4)'
    },
    { // glo
      backgroundColor: 'rgba(14,163,5,0.6)',
      borderColor: 'rgba(14,163,5,1)',
      pointBackgroundColor: 'rgba(14,163,5,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(14,163,5,1)'
    },
    { // airtel
      backgroundColor: 'rgba(244, 72, 79,0.8)',
      borderColor: 'rgba(244, 72, 79,1)',
      pointBackgroundColor: 'rgba(244, 72, 79,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(244, 72, 79,1)'
    },
    { // 9mobile
      backgroundColor: 'rgba(136,145,29,0.6)',
      borderColor: 'rgba(136,145,29,1)',
      pointBackgroundColor: 'rgba(136,145,29,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(136,145,29,1)'
    }

  ];

  // networkPieChartColors mtn glo airtel 9mobile
  networkPieChartColors: any[] = [{ backgroundColor: ['rgba(252,204,7,0.8)', 'rgba(14,163,5,0.6)',  'rgba(244, 72, 79,0.8)' , 'rgba(136,145,29,0.6)'] }];
  channelPieChartColors: any[] = [{ backgroundColor: ['rgba(33, 192, 252,0.8)', 'rgba(46, 65, 154,0.8)', 'rgba(259,179,100,0.6)'] }];


  public channelsChartColors: Array<any> = [
    { // web
      backgroundColor: 'rgba(33, 192, 252,0.8)',
      borderColor: 'rgba(33, 192, 252,1)',
      pointBackgroundColor: 'rgba(33, 192, 252,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(33, 192, 252,1)'
    },

    { // Mobile
      backgroundColor: 'rgba(46, 65, 154,0.8)',
      borderColor: 'rgba(46, 65, 154,1)',
      pointBackgroundColor: 'rgba(46, 65, 154,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(46, 65, 154,1)'
    },

    { // ussd
      backgroundColor: 'rgba(259,179,100,0.6)',
      borderColor: 'rgba(234,30,34,1)',
      pointBackgroundColor: 'rgba(234,30,34,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(234,30,34,1)'
    }
  ];
  public usersChartColors: Array<any> = [
    { // customer
      backgroundColor: 'rgba(90, 154, 244,0.8)',
      borderColor: 'rgba(90, 154, 244,1)',
      pointBackgroundColor: 'rgba(90, 154, 244,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(90, 154, 244,1)'
    },
    { // agent
      backgroundColor: 'rgba(46, 65, 154,0.8)',
      borderColor: 'rgba(46, 65, 154,1)',
      pointBackgroundColor: 'rgba(46, 65, 154,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(46, 65, 154,1)'
    },
    { // guest
      backgroundColor: 'rgba(191, 82, 189,0.8)',
      borderColor: 'rgba(191, 82, 189,1)',
      pointBackgroundColor: 'rgba(191, 82, 189,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(191, 82, 189,1)'
    }
  ];
  public agentsChartColors: Array<any> = [
    { // agent 1
      backgroundColor: 'rgba(140, 198, 63,0.8)',
      borderColor: 'rgba(140, 198, 63,1)',
      pointBackgroundColor: 'rgba(140, 198, 63,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(140, 198, 63,1)'
    },
    { // agent 2
      backgroundColor: 'rgba(0, 173, 177,0.8)',
      borderColor: 'rgba(0, 173, 177,1)',
      pointBackgroundColor: 'rgba(0, 173, 177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 173, 177,1)'
    },
    { // agent 3
      backgroundColor: 'rgba(153, 145, 211,0.8)',
      borderColor: 'rgba(153, 145, 211,1)',
      pointBackgroundColor: 'rgba(153, 145, 211,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(153, 145, 211,1)'
    }
  ];

  public barChartType = 'bar';
  public pieChartType = 'pie';
  public lineChartType = 'line';
  public ChartLegend = true;

  // top selling agents of the month
  public topSellingAgentsOfTheMonth: any[] = [];

  // Last 12month Airtime transactions Chart
  public last12MonthsAirtimeTransactionsLabels: string[] = [];
  public Last12MonthsTransactionChartData: any[] = [
    {
      data: [],
      label: 'MTN',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Glo',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: '9-Moblie',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Airtel',
      borderWidth: 1,
      pointRadius: 1
    }
  ];


  // Last 7 days Airtime transactions Chart
  public last7DaysAirtimeTransactionsLabels: string[] = [];
  public Last7DaysTransactionChartData: any[] = [
    {
      data: [],
      label: 'MTN',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Glo',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: '9-Moblie',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Airtel',
      borderWidth: 1,
      pointRadius: 1
    }
  ];


  // Last 12 days Airtime transactions Chart
  public last12MonthsAirtimeTransactionsByChannelLabels: string[] = [];
  public last12MonthsAirtimeTransactionsByChannelChartData: any[] = [
    {
      data: [],
      label: 'Web',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Mobile',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Ussd',
      borderWidth: 1,
      pointRadius: 1
    }
  ];


  // Last 12 months by User Type (FROM TYPE)
  public last12MonthAirtimeTransactionsByFromTypeLabels: string[] = [];
  public last12MonthAirtimeTransactionsByFromTypeChartData: any[] = [
    {
      data: [],
      label: 'CUSTOMER',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'AGENT',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'GUEST',
      borderWidth: 1,
      pointRadius: 1
    }
  ];

  // Last 24 hours Channels Transactions by Value Chart
  public last24HoursChannelsTransactionsValueLabels: string[] = [];
  public last24HoursChannelsTransactionsValueChartData: any[] = [
    {
      data: [],
      label: 'Web',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Mobile',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Ussd',
      borderWidth: 1,
      pointRadius: 1
    }
  ];

  // Last 24 hours Channels Transactions by Volume Chart
  public last24HoursChannelsTransactionsVolumeLabels: string[] = [];
  public last24HoursChannelsTransactionsVolumeChartData: any[] = [
    {
      data: [],
      label: 'Web',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Mobile',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Ussd',
      borderWidth: 1,
      pointRadius: 1
    }
  ];

  // Last 24 hours Networks Transactions by Value Chart
  public last24HoursNetworksTransactionsValueLabels: string[] = [];
  public last24HoursNetworksTransactionsValueChartData: any[] = [
    {
      data: [],
      label: 'MTN',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Glo',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: '9-Moblie',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Airtel',
      borderWidth: 1,
      pointRadius: 1
    }
  ];

  // Last 24 hours Networks Transactions by Volume Chart
  public last24HoursNetworksTransactionsVolumeLabels: string[] = [];
  public last24HoursNetworksTransactionsVolumeChartData: any[] = [
    {
      data: [],
      label: 'MTN',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Glo',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: '9-Moblie',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'Airtel',
      borderWidth: 1,
      pointRadius: 1
    }
  ];


  // Pie Charts
  // airtime tranx by networks value
  public pieChartAirtimeTransactionsPerNetworkValueLabels: string[] = [];
  public pieChartAirtimeTransactionsPerNetworkValueChartData =
    {yesterday: [], today: [], thisWeek: [], lastWeek: [], thisMonth: [], lastMonth : []};
  public pieChartAirtimeTransactionsPerNetworkValueChartDataView = [];
  public pieChartAirtimeTransactionsPerNetworkValueIsDataAvailable: boolean;
  public pieChartAirtimeTransactionsPerNetworkValuePeriod: string;

  // airtime tranx per network volume
  public pieChartAirtimeTransactionsPerNetworkVolumeLabels: string[] = [];
  public pieChartAirtimeTransactionsPerNetworkVolumeChartData =
    {yesterday: [], today: [], thisWeek: [], lastWeek: [], thisMonth: [], lastMonth : []};
  public pieChartAirtimeTransactionsPerNetworkVolumeChartDataView = [];
  public pieChartAirtimeTransactionsPerNetworkVolumeIsDataAvailable: boolean;
  public pieChartAirtimeTransactionsPerNetworkVolumePeriod: string;


  // airtime tranx per channel value
  public pieChartAirtimeTransactionsPerChannelValueLabels: string[] = [];
  public pieChartAirtimeTransactionsPerChannelValueChartData =
    {yesterday: [], today: [], thisWeek: [], lastWeek: [], thisMonth: [], lastMonth : []};
  public pieChartAirtimeTransactionsPerChannelValueChartDataView = [];
  public pieChartAirtimeTransactionsPerChannelValueIsDataAvailable: boolean;
  public pieChartAirtimeTransactionsPerChannelValuePeriod: string;

  // airtime tranx per channel volume
  public pieChartAirtimeTransactionsPerChannelVolumeLabels: string[] = [];
  public pieChartAirtimeTransactionsPerChannelVolumeChartData =
    {yesterday: [], today: [], thisWeek: [], lastWeek: [], thisMonth: [], lastMonth : []};
  public pieChartAirtimeTransactionsPerChannelVolumeChartDataView = [];
  public pieChartAirtimeTransactionsPerChannelVolumeIsDataAvailable: boolean;
  public pieChartAirtimeTransactionsPerChannelVolumePeriod: string;



  // Last 12 months by User Type Top 3 Agents (FROM TYPE)
  public last12MonthAirtimeTransactionsByTop3AgentsLabels: string[] = [];
  public last12MonthAirtimeTransactionsByTop3AgentsChartData: any[] = [
    {
      data: [],
      label: 'CUSTOMER',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'AGENT',
      borderWidth: 1,
      pointRadius: 1
    },
    {
      data: [],
      label: 'GUEST',
      borderWidth: 1,
      pointRadius: 1
    }
  ];


  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   req.open('GET', 'assets/table-data.json');
  //
  //   req.onload = () => {
  //     cb(JSON.parse(req.response));
  //   };
  //
  //   req.send();
  // }

  constructor(public sharedService: SharedService, public adminService: UserService, public error: ErrorService) {
    this.sharedService.emitChange(this.pageTitle);
    this.adminsTotal = 0;
    this.activeAdminsTotal = 0;
    this.blockedAdminsTotal = 0;
    this.inactiveAdminsTotal = 0;
    this.pieChartAirtimeTransactionsPerNetworkValuePeriod = 'today';
    this.pieChartAirtimeTransactionsPerNetworkVolumePeriod = 'today';

    this.pieChartAirtimeTransactionsPerChannelValuePeriod = 'today';
    this.pieChartAirtimeTransactionsPerChannelVolumePeriod = 'today';

    this.dashboardData.activeAdmins = 0;
    this.dashboardData.activeAgents = 0;
    this.dashboardData.activeCustomers = 0;
    this.dashboardData.admins = 0;
    this.dashboardData.agents = 0;
    this.dashboardData.customers = 0;
    this.dashboardData.failedTrans = 0;
    this.dashboardData.inActiveAdmin = 0;
    this.dashboardData.blockedAgents = 0;
    this.dashboardData.inActiveCustomers = 0;
    this.dashboardData.pendingTrans = 0;
    this.dashboardData.successfulTran = 0;
    this.dashboardData.transactionCount = 0;

    this.isTransactionsLoading = true;

  }

  // pie charts

  // airtime transactions per networks value
  getPieChartAirtimeTransactionsPerNetworkValueStatistics = (response) => {
    // this.last24HoursNetworksTransactionsVolumeChartData = [];
    const pieChartAirtimeTransactionsPerNetworkValueLabels = response.todayAirtimeTransactionsPerNetwork.label;
    this.pieChartAirtimeTransactionsPerNetworkValueChartData.today = response.todayAirtimeTransactionsPerNetwork.data;
    this.pieChartAirtimeTransactionsPerNetworkValueChartData.yesterday = response.yesterdayAirtimeTransactionsPerNetwork.data;
    this.pieChartAirtimeTransactionsPerNetworkValueChartData.thisWeek = response.thisWeekAirtimeTransactionsPerNetwork.data;
    this.pieChartAirtimeTransactionsPerNetworkValueChartData.lastWeek = response.lastWeekAirtimeTransactionsPerNetwork.data;
    this.pieChartAirtimeTransactionsPerNetworkValueChartData.thisMonth = response.thisMonthAirtimeTransactionsPerNetwork.data;
    this.pieChartAirtimeTransactionsPerNetworkValueChartData.lastMonth = response.lastMonthAirtimeTransactionsPerNetwork.data;

    for (const element of pieChartAirtimeTransactionsPerNetworkValueLabels){
      this.pieChartAirtimeTransactionsPerNetworkValueLabels.push(element);
    }

    console.log('pieChartAirtimeTransactionsPerNetworkValueLabels', this.pieChartAirtimeTransactionsPerNetworkValueLabels);
    console.log('pieChartAirtimeTransactionsPerNetworkValueChartData', this.pieChartAirtimeTransactionsPerNetworkValueChartData);
  }
  renderPieChartAirtimeTransactionsPerNetworkValueStatistics(): void{
    this.pieChartAirtimeTransactionsPerNetworkValueChartDataView = [];
    if (this.pieChartAirtimeTransactionsPerNetworkValuePeriod === 'today'){
      for (const element of  this.pieChartAirtimeTransactionsPerNetworkValueChartData.today){
        this.pieChartAirtimeTransactionsPerNetworkValueChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerNetworkValuePeriod === 'yesterday'){
       for (const element of  this.pieChartAirtimeTransactionsPerNetworkValueChartData.yesterday){
        this.pieChartAirtimeTransactionsPerNetworkValueChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerNetworkValuePeriod === 'this week'){
      for (const element of  this.pieChartAirtimeTransactionsPerNetworkValueChartData.thisWeek){
        this.pieChartAirtimeTransactionsPerNetworkValueChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerNetworkValuePeriod === 'last week'){
      for (const element of  this.pieChartAirtimeTransactionsPerNetworkValueChartData.lastWeek){
        this.pieChartAirtimeTransactionsPerNetworkValueChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerNetworkValuePeriod === 'this month'){
      for (const element of  this.pieChartAirtimeTransactionsPerNetworkValueChartData.thisMonth){
        this.pieChartAirtimeTransactionsPerNetworkValueChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerNetworkValuePeriod === 'last month'){
      for (const element of  this.pieChartAirtimeTransactionsPerNetworkValueChartData.lastMonth){
        this.pieChartAirtimeTransactionsPerNetworkValueChartDataView.push(element);
      }
    }

    // console.log('this.pieChartAirtimeTransactionsPerNetworkValueChartDataView',
    // this.pieChartAirtimeTransactionsPerNetworkValueChartDataView);

    const reducer = (accumulator= 0, currentValue) => accumulator + currentValue;
    if (this.pieChartAirtimeTransactionsPerNetworkValueChartDataView.length > 0) {
      this.pieChartAirtimeTransactionsPerNetworkValueIsDataAvailable =
        this.pieChartAirtimeTransactionsPerNetworkValueChartDataView.reduce(reducer) > 0;
    }
  }

  // airtime transactions per networks volume
  getPieChartAirtimeTransactionsPerNetworkVolumeStatistics = (response) => {
    const pieChartAirtimeTransactionsPerNetworkVolumeLabels = response.todayAirtimeTransactionsCountPerNetwork.label;
    this.pieChartAirtimeTransactionsPerNetworkVolumeChartData.today = response.todayAirtimeTransactionsCountPerNetwork.data;
    this.pieChartAirtimeTransactionsPerNetworkVolumeChartData.yesterday = response.yesterdayAirtimeTransactionsCountPerNetwork.data;
    this.pieChartAirtimeTransactionsPerNetworkVolumeChartData.thisWeek = response.thisWeekAirtimeTransactionsCountPerNetwork.data;
    this.pieChartAirtimeTransactionsPerNetworkVolumeChartData.lastWeek = response.lastWeekAirtimeTransactionsCountPerNetwork.data;
    this.pieChartAirtimeTransactionsPerNetworkVolumeChartData.thisMonth = response.thisMonthAirtimeTransactionsCountPerNetwork.data;
    this.pieChartAirtimeTransactionsPerNetworkVolumeChartData.lastMonth = response.lastMonthAirtimeTransactionsCountPerNetwork.data;

    for (const element of pieChartAirtimeTransactionsPerNetworkVolumeLabels){
      this.pieChartAirtimeTransactionsPerNetworkVolumeLabels.push(element);
    }

    console.log('pieChartAirtimeTransactionsPerNetworkVolumeLabels', this.pieChartAirtimeTransactionsPerNetworkVolumeLabels);
    console.log('pieChartAirtimeTransactionsPerNetworkVolumeChartData', this.pieChartAirtimeTransactionsPerNetworkVolumeChartData);
  }
  renderPieChartAirtimeTransactionsPerNetworkVolumeStatistics(): void {
    this.pieChartAirtimeTransactionsPerNetworkVolumeChartDataView = [];
    if (this.pieChartAirtimeTransactionsPerNetworkVolumePeriod === 'today'){
      for (const element of  this.pieChartAirtimeTransactionsPerNetworkVolumeChartData.today){
        this.pieChartAirtimeTransactionsPerNetworkVolumeChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerNetworkVolumePeriod === 'yesterday'){
      for (const element of  this.pieChartAirtimeTransactionsPerNetworkVolumeChartData.yesterday){
        this.pieChartAirtimeTransactionsPerNetworkVolumeChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerNetworkVolumePeriod === 'this week'){
      for (const element of  this.pieChartAirtimeTransactionsPerNetworkVolumeChartData.thisWeek){
        this.pieChartAirtimeTransactionsPerNetworkVolumeChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerNetworkVolumePeriod === 'last week'){
      for (const element of  this.pieChartAirtimeTransactionsPerNetworkVolumeChartData.lastWeek){
        this.pieChartAirtimeTransactionsPerNetworkVolumeChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerNetworkVolumePeriod === 'this month'){
      for (const element of  this.pieChartAirtimeTransactionsPerNetworkVolumeChartData.thisMonth){
        this.pieChartAirtimeTransactionsPerNetworkVolumeChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerNetworkVolumePeriod === 'last month'){
      for (const element of  this.pieChartAirtimeTransactionsPerNetworkVolumeChartData.lastMonth){
        this.pieChartAirtimeTransactionsPerNetworkVolumeChartDataView.push(element);
      }
    }

    // console.log('this.pieChartAirtimeTransactionsPerNetworkVolumeChartDataView',
    // this.pieChartAirtimeTransactionsPerNetworkVolumeChartDataView);

    const reducer = (accumulator = 0, currentValue) => accumulator + currentValue;
    if (this.pieChartAirtimeTransactionsPerNetworkVolumeChartDataView.length > 0) {

      this.pieChartAirtimeTransactionsPerNetworkVolumeIsDataAvailable =
        this.pieChartAirtimeTransactionsPerNetworkVolumeChartDataView.reduce(reducer) > 0;
    }
  }

  // airtime transactions per channels value
  getPieChartAirtimeTransactionsPerChannelValueStatistics = (response) => {
    const pieChartAirtimeTransactionsPerChannelsValueLabels = response.todayAirtimeTransactionsPerChannel.label;
    this.pieChartAirtimeTransactionsPerChannelValueChartData.today = response.todayAirtimeTransactionsPerChannel.data;
    this.pieChartAirtimeTransactionsPerChannelValueChartData.yesterday = response.yesterdayAirtimeTransactionsPerChannel.data;
    this.pieChartAirtimeTransactionsPerChannelValueChartData.thisWeek = response.thisWeekAirtimeTransactionsPerChannel.data;
    this.pieChartAirtimeTransactionsPerChannelValueChartData.lastWeek = response.lastWeekAirtimeTransactionsPerChannel.data;
    this.pieChartAirtimeTransactionsPerChannelValueChartData.thisMonth = response.thisMonthAirtimeTransactionsPerChannel.data;
    this.pieChartAirtimeTransactionsPerChannelValueChartData.lastMonth = response.lastMonthAirtimeTransactionsPerChannel.data;

    for (const element of pieChartAirtimeTransactionsPerChannelsValueLabels){
      this.pieChartAirtimeTransactionsPerChannelValueLabels.push(element);
    }

    console.log('pieChartAirtimeTransactionsPerChannelValueLabels', this.pieChartAirtimeTransactionsPerChannelValueLabels);
    console.log('pieChartAirtimeTransactionsPerChannelValueChartData', this.pieChartAirtimeTransactionsPerChannelValueChartData);
  }
  renderPieChartAirtimeTransactionsPerChannelValueStatistics(): void {
    this.pieChartAirtimeTransactionsPerChannelValueChartDataView = [];
    if (this.pieChartAirtimeTransactionsPerChannelValuePeriod === 'today'){
      for (const element of  this.pieChartAirtimeTransactionsPerChannelValueChartData.today){
        this.pieChartAirtimeTransactionsPerChannelValueChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerChannelValuePeriod === 'yesterday'){
      for (const element of  this.pieChartAirtimeTransactionsPerChannelValueChartData.yesterday){
        this.pieChartAirtimeTransactionsPerChannelValueChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerChannelValuePeriod === 'this week'){
      for (const element of  this.pieChartAirtimeTransactionsPerChannelValueChartData.thisWeek){
        this.pieChartAirtimeTransactionsPerChannelValueChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerChannelValuePeriod === 'last week'){
      for (const element of  this.pieChartAirtimeTransactionsPerChannelValueChartData.lastWeek){
        this.pieChartAirtimeTransactionsPerChannelValueChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerChannelValuePeriod === 'this month'){
      for (const element of  this.pieChartAirtimeTransactionsPerChannelValueChartData.thisMonth){
        this.pieChartAirtimeTransactionsPerChannelValueChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerChannelValuePeriod === 'last month'){
      for (const element of  this.pieChartAirtimeTransactionsPerChannelValueChartData.lastMonth){
        this.pieChartAirtimeTransactionsPerChannelValueChartDataView.push(element);
      }
    }

    // console.log('this.pieChartAirtimeTransactionsPerChannelValueChartDataView',
    // this.pieChartAirtimeTransactionsPerChannelValueChartData);

    const reducer = (accumulator = 0, currentValue) => accumulator + currentValue;
    if (this.pieChartAirtimeTransactionsPerChannelValueChartDataView.length > 0) {
      this.pieChartAirtimeTransactionsPerChannelValueIsDataAvailable =
        this.pieChartAirtimeTransactionsPerChannelValueChartDataView.reduce(reducer) > 0;
      // console.log('this.pieChartAirtimeTransactionsPerChannelValueIsDataAvailable',
      //   this.pieChartAirtimeTransactionsPerChannelValueIsDataAvailable);
    }
  }

  // airtime transactions per channels volume
  getPieChartAirtimeTransactionsPerChannelVolumeStatistics = (response) => {
    const pieChartAirtimeTransactionsPerChannelVolumeLabels = response.todayAirtimeTransactionsCountPerChannel.label;
    this.pieChartAirtimeTransactionsPerChannelVolumeChartData.today = response.todayAirtimeTransactionsCountPerChannel.data;
    this.pieChartAirtimeTransactionsPerChannelVolumeChartData.yesterday = response.yesterdayAirtimeTransactionsCountPerChannel.data;
    this.pieChartAirtimeTransactionsPerChannelVolumeChartData.thisWeek = response.thisWeekAirtimeTransactionsCountPerChannel.data;
    this.pieChartAirtimeTransactionsPerChannelVolumeChartData.lastWeek = response.lastWeekAirtimeTransactionsCountPerChannel.data;
    this.pieChartAirtimeTransactionsPerChannelVolumeChartData.thisMonth = response.thisMonthAirtimeTransactionsCountPerChannel.data;
    this.pieChartAirtimeTransactionsPerChannelVolumeChartData.lastMonth = response.lastMonthAirtimeTransactionsCountPerChannel.data;

    for (const element of pieChartAirtimeTransactionsPerChannelVolumeLabels){
      this.pieChartAirtimeTransactionsPerChannelVolumeLabels.push(element);
    }

    console.log('pieChartAirtimeTransactionsPerChannelVolumeLabels', this.pieChartAirtimeTransactionsPerChannelVolumeLabels);
    console.log('pieChartAirtimeTransactionsPerChannelVolumeChartData', this.pieChartAirtimeTransactionsPerChannelVolumeChartData);
  }
  renderPieChartAirtimeTransactionsPerChannelVolumeStatistics(): void{
    this.pieChartAirtimeTransactionsPerChannelVolumeChartDataView = [];
    if (this.pieChartAirtimeTransactionsPerChannelVolumePeriod === 'today'){
      for (const element of  this.pieChartAirtimeTransactionsPerChannelVolumeChartData.today){
        this.pieChartAirtimeTransactionsPerChannelVolumeChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerChannelVolumePeriod === 'yesterday'){
      for (const element of  this.pieChartAirtimeTransactionsPerChannelVolumeChartData.yesterday){
        this.pieChartAirtimeTransactionsPerChannelVolumeChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerChannelVolumePeriod === 'this week'){
      for (const element of  this.pieChartAirtimeTransactionsPerChannelVolumeChartData.thisWeek){
        this.pieChartAirtimeTransactionsPerChannelVolumeChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerChannelVolumePeriod === 'last week'){
      for (const element of  this.pieChartAirtimeTransactionsPerChannelVolumeChartData.lastWeek){
        this.pieChartAirtimeTransactionsPerChannelVolumeChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerChannelVolumePeriod === 'this month'){
      for (const element of  this.pieChartAirtimeTransactionsPerChannelVolumeChartData.thisMonth){
        this.pieChartAirtimeTransactionsPerChannelVolumeChartDataView.push(element);
      }
    }
    else if (this.pieChartAirtimeTransactionsPerChannelVolumePeriod === 'last month'){
      for (const element of  this.pieChartAirtimeTransactionsPerChannelVolumeChartData.lastMonth){
        this.pieChartAirtimeTransactionsPerChannelVolumeChartDataView.push(element);
      }
    }

    // console.log('this.pieChartAirtimeTransactionsPerChannelVolumeChartDataView',
    // this.pieChartAirtimeTransactionsPerChannelVolumeChartDataView);

    const reducer = (accumulator = 0, currentValue) => accumulator + currentValue;
    if (this.pieChartAirtimeTransactionsPerChannelVolumeChartDataView.length > 0) {

      this.pieChartAirtimeTransactionsPerChannelVolumeIsDataAvailable =
        this.pieChartAirtimeTransactionsPerChannelVolumeChartDataView.reduce(reducer) > 0;
      // console.log('this.pieChartAirtimeTransactionsPerChannelVolumeIsDataAvailable',
      // this.pieChartAirtimeTransactionsPerChannelVolumeIsDataAvailable);
    }
  }

  // bar charts
  getLast24HoursNetworksTransactionsVolumeStatistics = (response) => {
    this.last24HoursNetworksTransactionsVolumeChartData = [];
    const last24HoursNetworksTransactionsVolumeLabels = response.last24HoursAirtimeTransactionsCount.categories;
    const last24HoursNetworksTransactionsVolumeLabelsSeries = response.last24HoursAirtimeTransactionsCount.series;

    for (const element of last24HoursNetworksTransactionsVolumeLabels){
      this.last24HoursNetworksTransactionsVolumeLabels.push(element);
    }

    for (const element of last24HoursNetworksTransactionsVolumeLabelsSeries){
      const reversedElementData = element.data;
      const ele = {
        data: reversedElementData,
        label: element.name,
        borderWidth: 1,
        pointRadius: 1
      };
      this.last24HoursNetworksTransactionsVolumeChartData.push(ele);
    }
    console.log('last24HoursNetworksTransactionsVolumeChartData', this.last24HoursNetworksTransactionsVolumeChartData);
  }

  getLast24HoursNetworksTransactionsValueStatistics = (response) => {
    this.last24HoursNetworksTransactionsValueChartData = [];
    const last24HoursNetworksTransactionsValueLabels = response.last24HoursAirtimeTransactions.categories;
    const last24HoursNetworksTransactionsValueLabelsSeries = response.last24HoursAirtimeTransactions.series;

    for (const element of last24HoursNetworksTransactionsValueLabels){
      this.last24HoursNetworksTransactionsValueLabels.push(element);
    }

    for (const element of last24HoursNetworksTransactionsValueLabelsSeries){
      const reversedElementData = element.data;
      const ele = {
        data: reversedElementData,
        label: element.name,
        borderWidth: 1,
        pointRadius: 1
      };
      this.last24HoursNetworksTransactionsValueChartData.push(ele);
    }
    console.log('last24HoursNetworksTransactions', this.last24HoursNetworksTransactionsValueChartData);
  }

  getLast24HoursChannelsTransactionsValueStatistics = (response) => {
    this.last24HoursChannelsTransactionsValueChartData = [];
    const last24HoursChannelsTransactionsValueLabels = response.last24HoursAirtimeTransactionsPerChannel.categories;
    const last24HoursChannelsTransactionsValueSeries = response.last24HoursAirtimeTransactionsPerChannel.series;

    for (const element of last24HoursChannelsTransactionsValueLabels){
      this.last24HoursChannelsTransactionsValueLabels.push(element);
    }

    for (const element of last24HoursChannelsTransactionsValueSeries){
      const reversedElementData = element.data;
      const ele = {
        data: reversedElementData,
        label: element.name,
        borderWidth: 1,
        pointRadius: 1
      };
      this.last24HoursChannelsTransactionsValueChartData.push(ele);
    }
    console.log('last24HoursChannelsTransactions', this.last24HoursChannelsTransactionsValueChartData);
  }

  getLast24HoursChannelsTransactionsVolumeStatistics = (response) => {
    this.last24HoursChannelsTransactionsVolumeChartData = [];
    const last24HoursChannelsTransactionsVolumeLabels = response.last24HoursAirtimeTransactionsCountPerChannel.categories;
    const last24HoursChannelsTransactionsVolumeSeries = response.last24HoursAirtimeTransactionsCountPerChannel.series;

    for (const element of last24HoursChannelsTransactionsVolumeLabels){
      this.last24HoursChannelsTransactionsVolumeLabels.push(element);
    }

    for (const element of last24HoursChannelsTransactionsVolumeSeries){
      const reversedElementData = element.data;
      const ele = {
        data: reversedElementData,
        label: element.name,
        borderWidth: 1,
        pointRadius: 1
      };
      this.last24HoursChannelsTransactionsVolumeChartData.push(ele);
    }
    console.log('last24HoursChannelsTransactionsVolumeChartData', this.last24HoursChannelsTransactionsVolumeChartData);
  }

  getLast12MonthsAirtimeStatistics = (response) => {
    this.Last12MonthsTransactionChartData = [];
    const last12MonthsTransactionsLabels = response.last12MonthsAirtimeTransactions.categories.reverse();
    const last12MonthsTransactionsseries = response.last12MonthsAirtimeTransactions.series;

    for (const element of last12MonthsTransactionsLabels){
      this.last12MonthsAirtimeTransactionsLabels.push(element);
    }

    for (const element of last12MonthsTransactionsseries){
      const reversedElementData = element.data.reverse();
      const ele = {
        data: reversedElementData,
        label: element.name,
        borderWidth: 1,
        pointRadius: 1
      };
      this.Last12MonthsTransactionChartData.push(ele);
    }
    console.log('Last12MonthsTransactionChartData', this.Last12MonthsTransactionChartData);
  }

  getLast7DaysAirtimeStatistics = (response) => {
    this.Last7DaysTransactionChartData = [];
    const last7DaysTransactionsLabels = response.last7DaysAirtimeTransactions.categories.reverse();
    const last7DaysTransactionsSeries = response.last7DaysAirtimeTransactions.series;

    for (const element of last7DaysTransactionsLabels){
      this.last7DaysAirtimeTransactionsLabels.push(element);
    }

    for (const element of last7DaysTransactionsSeries){
      const reversedElementData = element.data.reverse();
      const ele = {
        data: reversedElementData,
        label: element.name,
        borderWidth: 1,
        pointRadius: 1
      };
      this.Last7DaysTransactionChartData.push(ele);
    }
    console.log('Last7DaysTransactionChartData', this.Last7DaysTransactionChartData);
    console.log('Last7DaysTransactionLabels', this.last7DaysAirtimeTransactionsLabels);
  }

  getLast12MonthsAirtimeTransactionsByChannelStatistics = (response) => {
    this.last12MonthsAirtimeTransactionsByChannelChartData = [];
    const last12MonthsAirtimeTransactionsByChannelLabels = response.last12MonthsAirtimeTransactionsByChannel.categories.reverse();
    const last12MonthsAirtimeTransactionsByChannelSeries = response.last12MonthsAirtimeTransactionsByChannel.series;

    for (const element of last12MonthsAirtimeTransactionsByChannelLabels){
      this.last12MonthsAirtimeTransactionsByChannelLabels.push(element);
    }

    for (const element of last12MonthsAirtimeTransactionsByChannelSeries){
      const reversedElementData = element.data.reverse();
      const ele = {
        data: reversedElementData,
        label: element.name,
        borderWidth: 1,
        pointRadius: 1
      };
      this.last12MonthsAirtimeTransactionsByChannelChartData.push(ele);
    }
    console.log('last12MonthsAirtimeTransactionsByChannelChartData', this.last12MonthsAirtimeTransactionsByChannelChartData);
  }

  getLast12MonthAirtimeTransactionsByFromTypeStatistics = (response) => {
    this.last12MonthAirtimeTransactionsByFromTypeChartData = [];
    const last12MonthTransactionsByFromTypeLabels = response.last12MonthAirtimeTransactionsByFromType.categories.reverse();
    const last12MonthsAirtimeTransactionsByFromTypeSeries = response.last12MonthAirtimeTransactionsByFromType.series;

    for (const element of last12MonthTransactionsByFromTypeLabels){
      this.last12MonthAirtimeTransactionsByFromTypeLabels.push(element);
    }

    for (const element of last12MonthsAirtimeTransactionsByFromTypeSeries){
      const reversedElementData = element.data.reverse();
      const ele = {
        data: reversedElementData,
        label: element.name,
        borderWidth: 1,
        pointRadius: 1
      };
      this.last12MonthAirtimeTransactionsByFromTypeChartData.push(ele);
    }
    console.log('last12MonthAirtimeTransactionsByFromTypeChartData', this.last12MonthAirtimeTransactionsByFromTypeChartData);
  }

  getTopSellingAgentsOfTheMonth = (response) => {
    this.topSellingAgentsOfTheMonth = response.thisMonthAgentAirtimeTransactions;

    console.log('topSellingAgentsOfTheMonth', this.topSellingAgentsOfTheMonth);
  }

  // getLast12MonthAirtimeTransactionsByTop3AgentsStatistics = (response) => {
  //   this.last12MonthAirtimeTransactionsByTop3AgentsChartData = [];
  //   const last12MonthTransactionsByTop3AgentsLabels = response.lastMonthTop3AgentAirtimeTranx.label;
  //   const last12MonthsAirtimeTransactionsByTop3AgentsSeries = response.lastMonthTop3AgentAirtimeTranx.data;
  //
  //   for(const element of last12MonthTransactionsByTop3AgentsLabels){
  //     this.last12MonthAirtimeTransactionsByTop3AgentsLabels.push(element);
  //   }
  //
  //   for(const element of last12MonthsAirtimeTransactionsByTop3AgentsSeries){
  //     const reversedElementData = element ;
  //     const ele = {
  //       data: reversedElementData,
  //       label: element.label,
  //       borderWidth: 1,
  //       pointRadius: 1
  //     }
  //     this.last12MonthAirtimeTransactionsByTop3AgentsChartData.push(ele);
  //   }
  //   console.log('last12MonthAirtimeTransactionsByTop3AgentsChartData', this.last12MonthAirtimeTransactionsByTop3AgentsChartData);
  // }


  getChartStatistics = () => {
    this.adminService.getChartStatistics().subscribe(
      response => {

        console.log('******* CHART response *******');
        console.log(response);
        this.getLast12MonthsAirtimeStatistics(response);
        this.getLast7DaysAirtimeStatistics(response);
        this.getLast12MonthsAirtimeTransactionsByChannelStatistics(response);
        this.getLast12MonthAirtimeTransactionsByFromTypeStatistics(response);
        this.getLast24HoursNetworksTransactionsValueStatistics(response);
        this.getLast24HoursNetworksTransactionsVolumeStatistics(response);
        this.getLast24HoursChannelsTransactionsValueStatistics(response);
        this.getLast24HoursChannelsTransactionsVolumeStatistics(response);

        this.getPieChartAirtimeTransactionsPerNetworkValueStatistics(response);
        this.renderPieChartAirtimeTransactionsPerNetworkValueStatistics();

        this.getPieChartAirtimeTransactionsPerNetworkVolumeStatistics(response);
        this.renderPieChartAirtimeTransactionsPerNetworkVolumeStatistics();

        this.getPieChartAirtimeTransactionsPerChannelValueStatistics(response);
        this.renderPieChartAirtimeTransactionsPerChannelValueStatistics();

        this.getPieChartAirtimeTransactionsPerChannelVolumeStatistics(response);
        this.renderPieChartAirtimeTransactionsPerChannelVolumeStatistics();

        this.getTopSellingAgentsOfTheMonth(response);

        // this.getLast12MonthAirtimeTransactionsByTop3AgentsStatistics(response);



        this.isLoadingCharts = false;
      },
      err => {
        console.log(err);
        this.errorResponse = this.error.errorHandlerWithText(this.getChartStatistics, err);
        console.log('errorResp', this.errorResponse);
      }
    );
  }

  getStatistics = () => {
    this.adminService.getStatistics().subscribe(
    response => {
      const statisticsData = response;

      if(response.transactionCount) {
        this.dashboardData.admins = statisticsData.admins;
        this.dashboardData.activeAdmins = statisticsData.activeAdmins;
        this.dashboardData.inActiveAdmin = statisticsData.inActiveAdmin;

        this.dashboardData.agents = statisticsData.agents;
        this.dashboardData.activeAgents = statisticsData.activeAgents;
        this.dashboardData.inActiveAgents = statisticsData.blockedAgents;

        this.dashboardData.customers = statisticsData.customers;
        this.dashboardData.activeCustomers = statisticsData.activeCustomers;
        this.dashboardData.inActiveCustomers = statisticsData.inActiveCustomers;

        this.dashboardData.transactionCount = statisticsData.transactionCount;
        this.dashboardData.successfulTran = statisticsData.successfulTran;
        this.dashboardData.pendingTrans = statisticsData.pendingTrans;
        this.dashboardData.failedTrans = statisticsData.failedTrans;
      }
      // console.log(this.dashboardData);

    },
    err => {
      console.log(err);
      this.errorResponse = this.error.errorHandlerWithText(this.getStatistics, err);
      console.log(this.errorResponse);

    }
  );
}

  ngOnInit(): void {
    this.getStatistics();
    this.getChartStatistics();
  }

}
