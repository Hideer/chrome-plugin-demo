const windowChanger = (): void => {
  const anotherFunc = (): number => {
    return 42
  }

  // 获取上月第一天
  const getFirstDay = ()=>{
    let date:any = new Date();
    let month:any = parseInt(date.getMonth());
    if(month === 0){
      // 如果是1月，年份需要
      month = 12
      date.setFullYear(date.getFullYear()-1)
    }
    date.setDate(1);
    let day:any = date.getDate();
    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    return date.getFullYear() + '-' + month + '-' + day // 格式：2020-01-01
  }

  // 获取上月最后一天
  const getLastDay = ()=>{
    var endDate = new Date();
    var currentMonth = endDate.getMonth();
    if(currentMonth===0){
      endDate.setFullYear(endDate.getFullYear()-1)
    }
    var currentMonthFirstDay:any = new Date(endDate.getFullYear(),currentMonth,1)
    var oneDay = 1000*60*60*24;
    var lastTime:any = new Date(currentMonthFirstDay-oneDay);
    var endMonth:any = parseInt(lastTime.getMonth()+1);
    var endDay:any = lastTime.getDate();
    if (endMonth < 10) {
        endMonth = '0' + endMonth
    }
    if (endDay < 10) {
        endDay = '0' + endDay
    }
    //格式：2020-12-30
    return endDate.getFullYear() + '-' + endMonth + '-' + endDay
  }

  // Here's an example where we can reference the window object
  // and add a new property to it
  window._AutoPunch = {
    world: "from injected content script",

    coolNumber: anotherFunc(),
    // you can call other functions from the injected script
    // but they must be declared inside the injected function
    // or be present in the global scope

    run: function(){
      const params = {startDate:getFirstDay(),endDate:getLastDay()};
      console.log("补卡接口请求参数:",params);
      jQuery.ajax({
        url:"/weaver/sunmi.attendance.cmd.AbnormalAttendanceCmd",
        type:"post",
        async:true,
        cache:false,
        dataType:"json",
        data:params,
        success: function(data){
          console.log('补卡接口请求成功结果:',data);
          const { abnormalDay,endTime,startTime} = data;
          $("#bodyiframe").contents().find("#oTable0").find("input[type='checkbox']").click();
          document.getElementById("bodyiframe").contentWindow.deleteRow0(0,1);
          
          for(var i=0;i<abnormalDay.length;i++){
          document.getElementById("bodyiframe").contentWindow.addRow0(0);
          var rowIndex = $("#bodyiframe").contents().find(".excelDetailTable").find("tr").last().attr("_rowindex");
          $("#bodyiframe").contents().find("#field28313_"+rowIndex).val(abnormalDay[i]);//开始日期
          $("#bodyiframe").contents().find("#field28315_"+rowIndex).val(abnormalDay[i]);//结束日期
          
          $("#bodyiframe").contents().find("#field28314_"+rowIndex).val(startTime);
          $("#bodyiframe").contents().find("#field28316_"+rowIndex).val(endTime);
          $("#bodyiframe").contents().find("#field28317_"+rowIndex).val("忘记打卡");
          }
          document.getElementById("bodyiframe").contentWindow.doSave_nNew();
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log('补卡接口请求失败结果:',jqXHR, textStatus, errorThrown);
        }
        })
    }
  }
  // Here's an example where we show you can reference the DOM
  // This console.log will show within the tab you injected into
  // console.log(document.getElementsByTagName("html"))
  // document.body.setAttribute('data-fp', fp)

  const PunchInDOM = document.createElement('Button')
  PunchInDOM.innerHTML = "立即补卡"
  PunchInDOM.setAttribute('style', `position: fixed;
  top: 28px;
  right: 340px;
  padding: 4px 8px;
  background: #30b5ff;
  color: #FFF;
  z-index: 99999;`);
  document.body.appendChild(PunchInDOM)
  PunchInDOM.addEventListener("click",function(){
    window._AutoPunch.run();
  })
}

export default windowChanger