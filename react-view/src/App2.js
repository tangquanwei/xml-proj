import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Badge, ProgressBar, Container, Row, Col, Card, Button,
  ButtonGroup, OverlayTrigger, Popover
} from 'react-bootstrap';
import { useState } from 'react';
import $ from 'jquery';
/**
 * 整个页面
 * @returns vdom
 */
function App() {
  const [index, setIndex] = useState(1);
  return <>
    <Container>
      <ButtonGroup>
        <Button onClick={() => {
          $.getJSON({
            url: "http://localhost:4000/hero",
            data: { index: index, num: 6 },
            success: (resp) => {
              console.log(resp);
              $('#row').html(handleHero(resp.hero))
              console.log('ok');
            }
          })
        }}>刷新</Button>
        <Button
          onClick={() => {
            setIndex(index + 1)
            $.getJSON({
              url: "http://localhost:4000/hero",
              data: { index: index, num: 6 },
              success: (resp) => {
                console.log(resp);
                $('#row').html(handleHero(resp.hero))
                console.log('ok');
              }
            })
          }}
        >下一页</Button>
      </ButtonGroup>
      <Row id='row'></Row>
    </Container>
  </>
}

/**
 * 展示数据
 * @param {array} hero
 * @returns vdom
 */
const handleHero = (hero) => hero.map((e, i) =>
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
      {e.roles.map((r, i) => <Badge bg="primary" className='my-2 mx-1'>{r}</Badge>)}
    </Popover.Body>
  </Popover>
);

// 导出组件
export default App;

