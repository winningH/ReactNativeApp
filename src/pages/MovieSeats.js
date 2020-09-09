import React from 'react'
import { Alert } from 'react-native'
import WebView from 'react-native-webview'

const uri = 'https://m.mtime.cn/#!/onlineticket/597839309/'

const INJECT_JS = (window, document) => {
  let submitBtn
  function waitForBtnRender() {
    submitBtn = document.getElementById('submitBtn')
    if (!submitBtn) {
      // 提交按钮渲染了吗？没有的话我过两秒再来问
      setTimeout(waitForBtnRender, 2000)
    } else {
      submitBtn.onclick = () => {
        const seats = []
        document.querySelectorAll('.seat_selected').forEach((node) => {
          seats.push(node.getAttribute('name'))
        })
        window.ReactNativeWebView.postMessage(seats.join(', '))
      }
    }
  }
  waitForBtnRender()
}

export default function App() {
  return (
    <WebView
      source={{ uri }}
      injectedJavaScript={`(${INJECT_JS.toString()})(window, document)`}
      onMessage={(e) => {
        Alert.alert('您选中的座位是：' + e.nativeEvent.data)
      }}
    />
  )
}
