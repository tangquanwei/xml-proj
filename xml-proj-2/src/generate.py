import requests
from lxml import etree


def get_html(url: str):
    # GET请求URL（因为我们访问的时候也是用的GET method）
    resp = requests.get(url=url)
    html = etree.HTML(resp.content)
    return html


def extract_form_html_to_dict(html: etree._Element):
    """
    从html中提取需要的数据
    参数 html: 即 html
    """
    dct = dict()
    prefix = 'https://www.thepaper.cn'
    for i in range(1, 15):
        title = html.xpath(
            f'/html/body/div[1]/main/div[3]/div[1]/div[2]/div[2]/div/div[1]/div[{i}]/div/div/div/div[1]/a/h2/text()')
        img = html.xpath(
            f'/html/body/div[1]/main/div[3]/div[1]/div[2]/div[2]/div/div[1]/div[{i}]/div/div/div/div[1]/a/div/img/@src')
        come = html.xpath(
            f'/html/body/div[1]/main/div[3]/div[1]/div[2]/div[2]/div/div[1]/div[{i}]/div/div/div/div[2]/div/p[1]/span[1]/a/text()')
        time = html.xpath(
            f'/html/body/div[1]/main/div[3]/div[1]/div[2]/div[2]/div/div[1]/div[{i}]/div/div/div/div[2]/div/p[1]/span[2]/text()')
        link = html.xpath(
            f'/html/body/div[1]/main/div[3]/div[1]/div[2]/div[2]/div/div[1]/div[{i}]/div/div/div/div[1]/a/@href')

        dct[i] = {"title": title[0], "img": img[0],
                  "come": come[0], "time": time[0], "link": prefix+link[0]}

    return dct


def downloadImage(dct: dict):
    # 下载图片
    for j, i in dct.items():
        url = (str)(i['img'])
        fix = url[url.rfind('.'):url.rfind('?')]
        print(url, fix)
        img = requests.get(url)
        with open(f'../data/img/{j}{fix}', 'wb') as f:
            f.write(img.content)


def dict2xml(dct: dict):
    """
    python字典转xml
    参数 dct: python字典
    """
    with open('../data/info.xml', 'w') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>')
        f.write('<infomation>')
        for j, i in dct.items():
            url = i['img']
            fix = url[url.rfind('.'):url.rfind('?')]
            # print(i)
            f.write(f"""
            <info>
            <title>{i['title']}</title>
            <img>{j}{fix}</img>
            <come>{i['come']}</come>
            <time>{i['time']}</time>
            <link>{i['link']}</link>
            </info>
             """)
        f.write('</infomation>')


def dict2json(dct: dict):
    """
    python字典转json
    参数 dct: python字典
    """
    with open('../data/info.json', 'w') as f:
        f.write('{"infomation":[')
        for j, i in dct.items():
            url = i['img']
            fix = url[url.rfind('.'):url.rfind('?')]
            f.write(f"""
          {{
          "title":"{i['title']}",
          "img":"{j}{fix}",
          "come":"{i['come']}",
          "time":"{i['time']}",
          "link":"{i['link']}"
          }}{',' if j!=len(dct)else ''}
            """)
        f.write(']}')


# 待爬取JSON的URL
url = "https://www.thepaper.cn/channel_25950"

# 爬到的html
html = get_html(url)

# 提取信息到dict
dct = extract_form_html_to_dict(html)

# 持久化到xml
dict2xml(dct)

# 持久化到json
dict2json(dct)
