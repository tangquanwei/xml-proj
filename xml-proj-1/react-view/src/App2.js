import 'bootstrap/dist/css/bootstrap.min.css';
import { Get } from 'react-axios';
import { Container } from 'react-bootstrap';
import { useState } from "react";
import HandleResp from './Handle';

/**
 * 整个页面
 * @returns vdom 虚拟dom
 */
export default function App() {
  // 函数式组件没有状态
  const [index, setIndex] = useState(1);
  // 下面是 JSX(JavaScriptXML)一个 JavaScript 的语法扩展
  // ()里面的Html代码是其语法糖，会被编译成JS
  // {}里面是JS代码
  return <>
    <Container>
      <Get url="http://quanwei.fun/hero"
        params={{ index: 1, num: 6 }}>
        {(error, response, isLoading, makeRequest, axios) => {
          if (isLoading) {
            return (<div>Loading...</div>)
          } else if (response !== null) {// 正常返回的情况
            // 将数据处理函数重构成组件
            return <HandleResp 
            p={[makeRequest, index, setIndex, response.data.hero]} />;
          }
          return (<div>Default message before request is made.</div>)
        }}
      </Get>
    </Container>
  </>
}



