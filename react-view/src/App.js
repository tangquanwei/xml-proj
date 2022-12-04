import 'bootstrap/dist/css/bootstrap.min.css';
import { Get } from 'react-axios';
import { Input } from 'antd';
import {
  Badge, ProgressBar, Container, Row, Col, Card, Button,
  ButtonGroup, OverlayTrigger, Popover
} from 'react-bootstrap';
import { useState } from 'react';

const { Search } = Input;
/**
 * 整个页面
 * @returns vdom
 */
function App() {
  // 函数式组件没有状态
  const [index, setIndex] = useState(1);
  // 下面是 JSX(JavaScriptXML)一个 JavaScript 的语法扩展
  // ()里面的Html代码是其语法糖，会被编译成JS
  // {}里面是JS代码
  return <>
    <Container>
      {/* 
      这里使用Axios,功能和Ajax几乎一模一样
      这里只不过是包装成了组件
      每次状态变化都会更新组件
      */}
      <Get url="http://quanwei.fun/hero"
        params={{ index: index, num: 6 }}>
        {(error, response, isLoading, makeRequest, axios) => {
          if (isLoading) {
            return (<div>Loading...</div>)
          } else if (response !== null) {
            // 正常返回的情况
            return (<>
              <Row>
                {/* 添加一个搜索框 */}
                <Search
                  className='col-lg-6 my-3'
                  placeholder="请输入关键字"
                  allowClear
                  size='large'
                  enterButton="搜索"
                  onSearch={(str) => {
                    console.log("q:" + str);
                    makeRequest({ params: { index: index, num: 6, q: str } });
                  }} />
                <ButtonGroup className='my-3 lg mx-auto col-lg-6'>
                  <Button
                    // 给点击事件赋值
                    onClick={() => {
                      // 防卫
                      if (index !== 1)
                        setIndex(index - 1)
                      makeRequest({ params: { index: index, num: 6 } })
                    }}>
                    上一页
                  </Button>
                  <Button
                    onClick={() => makeRequest({ params: { index: index, num: 6 } })}
                    variant="info">
                    刷新
                  </Button>
                  <Button
                    onClick={() => {
                      setIndex(index + 1)
                      makeRequest({ params: { index: index, num: 6 } })
                    }}>
                    下一页
                  </Button>
                </ButtonGroup>

              </Row>
              {/* 要展示的数据都在下面 */}
              <Row>
                {handleData(response.data.hero)}
              </Row>
            </>)
          }
          return (<div>Default message before request is made.</div>)
        }}
      </Get>
    </Container>
  </>
}

/**
 * 展示数据
 * @param {Array} hero 
 * @returns vdom
 */
const handleData = (hero) => hero.map((e, i) =>
  // 上面的map有返回值，就是下面的Html代码
  // bootstrap的组件，相比CSS不过是class变成的tag
  <Col lg={2} sm={6} key={i.toString()} >
    <Card className='my-1 text-center'>
      {/* 弹出菜单的触发组件 */}
      <OverlayTrigger placement="bottom" overlay={popover(e)}>
        <Card.Img src={e.imgUrl} />
      </OverlayTrigger>
      <Card.Body>
        <Card.Title>{e.name}</Card.Title>
        <Card.Text>{e.title}</Card.Text>
        <audio id='audio'></audio>
        <Button onClick={() => {
          // 目的是实现点击播放音乐（不是一种好的用法）
          const audio = document.getElementById('audio')
          audio.src = e.selectAudio;// 英雄被选中的音效
          audio.play();
        }} variant="outline-primary">Select</Button>
        <Button onClick={() => {
          const audio = document.getElementById('audio')
          audio.src = e.banAudio;// 英雄被禁止的音效
          audio.play();
        }} className="mx-1" variant="outline-primary">Ban</Button>
      </Card.Body>
    </Card>
  </Col>
)

/**
 * 弹出菜单 显示英雄的属性
 * @param {hero} e 一个英雄
 * @returns 英雄的属性的html
 */
const popover = (e) => (
  <Popover id="popover-basic" e={e}>
    <Popover.Header as="h3">{e.name + e.alias}</Popover.Header>
    {/* 把进度条当作条状图 */}
    <Popover.Body>
      <ProgressBar variant="danger" now={e.attack + '0'} label='攻' />
      <ProgressBar variant="success" now={e.defence + '0'} label='防' />
      <ProgressBar variant="info" now={e.magic + '0'} label='魔' />
      <ProgressBar variant="warning" now={e.difficulty + '0'} label='难度' />
      {e.roles.map((r, i) => <Badge key={i.toString()} bg="primary" className='my-2 mx-1'>{r}</Badge>)}
    </Popover.Body>
  </Popover>
);

// 导出组件
export default App;
