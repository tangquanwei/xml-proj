import express from 'express';
import { open } from 'node:fs/promises';

const fn = '../share-file/lol_hero.json'

// 异步读取文件
const read = async (fn) => {
  const file = await open(fn);
  let ctx = "";
  for await (const line of file.readLines()) {
    ctx += line;
  }
  // console.log(ctx);
  return ctx;
}

// 创建express对象
const app = express();

// 读取文件
const data = await read(fn);

// string -> JSON
const jd = JSON.parse(data);// JS Data

// 配置路由
app.get('/hero', async (req, resp) => {
  // 设置响应头
  resp.setHeader('Access-Control-Allow-Origin', '*');

  // 获取请求参数
  const { index, num, q } = req.query
  console.log("index: " + index);// 页号

  let ret = []; //返回值
  if (q === undefined) {  // 分页
    for (let i = (index - 1) * num; i < index * num; ++i) {
      ret.push(jd.hero[i])
    }
  } else {// 处理关键字搜索
    console.log("keyword: " + q);// 关键词

    for (let i = 0, l = jd.hero.length; i < l; ++i) {
      if (jd.hero[i].keywords.includes(q))
        ret.push(jd.hero[i]);
      if (ret.length == num) break;
    }
  }

  let ret_str = JSON.stringify({ hero: ret })// 响应JSON str
  resp.send(ret_str);
});

app.use(express.static('../react-view/build'));

// 启动程序监听4000端口
app.listen(4000);
