import { useState } from "react"
import { Button, Divider } from 'antd'
// import $ from 'jQuery'

import './main.less'

export function Main({ name = "Extension" }) {
  const [data, setData] = useState("")

  const onEnterAutoPunchIn = ()=>{
    chrome.tabs.create({url: 'https://oa.sunmi.com/workflow/request/AddRequest.jsp?workflowid=14417'});
  }

  const onAutoPunchIn = ()=>{
    alert('我是测试')
    // console.log('插件',bg, window, window._AutoPunch);
    // var bg = chrome.extension.getBackgroundPage();
    // setData(data + 1)
    // setData(JSON.stringify(bg))
    // console.log(document.body.getAttribute('data-fp'));
    // setData(document.body.getAttribute('data-fp'))
    // window._AutoPunch.run();
  }

  return (
    <div className="wrapper">
      <Button type="text" onClick={onEnterAutoPunchIn}>进入补卡</Button>
      {/* <Divider style={{
        padding:0,
        margin:0,
      }}/> */}
      {/* <Button type="text" onClick={onAutoPunchIn}>测试按钮{data}</Button> */}
      {/* <Divider orientation="left">Left Text</Divider> */}
    </div>
  )
}
