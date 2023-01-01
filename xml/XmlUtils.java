package top.quanwei.xml;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.ErrorHandler;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;

import javax.swing.*;
import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.SchemaFactory;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import java.io.*;

public class XmlUtils {
  private static String dir = System.getProperty("user.dir");
  private static String path = dir + "/demo/src/main/java/top/quanwei/xml/dtd/";
  private static String path2 = dir + "/demo/src/main/java/top/quanwei/xml/xsd/";
  private static String path3 = dir + "/demo/src/main/java/top/quanwei/xml/hw/";


  private static void sxdTest() {
    verifyBySchemaPop(path3 + "networklist.xml", path3 + "networklist.xsd");
  }


  private static void dtdTestDrive() {
    String[] fn = new String[]{"TVSCHEDULE.xml", "TVSCHEDULE2.xml", "NEWSPAPER.xml", "NEWSPAPER2.xml", "CATALOG.xml", "CATALOG2.xml"};
    verifyByDTD(path + fn[5]);
  }

  /**
   * 使用 DOM 解析 XML
   *
   * @param filePath XML文件路径
   * @param eName    元素名
   */
  public static void parse(String filePath, String eName) {
    NodeList nodes = null;
    try {
      nodes = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(filePath).getElementsByTagName(eName);
    } catch (SAXException | IOException | ParserConfigurationException e) {
      throw new RuntimeException(e);
    }
    node(nodes);
  }

  private static void node(NodeList list) {
    for (int i = 0; i < list.getLength(); i++) {
      Node node = list.item(i);
      NodeList childNodes = node.getChildNodes();
      for (int j = 0; j < childNodes.getLength(); j++)
        if (childNodes.item(j).getNodeType() == Node.ELEMENT_NODE)
          System.out.println(childNodes.item(j).getNodeName() + ":" + childNodes.item(j).getFirstChild().getNodeValue());
    }
  }

  /**
   * 使用DTD(Document Type Definition)验证XML文件是否合法
   * <p>
   * 合法：没有输出
   * 不合法：错误信息提示不合法的位置
   *
   * @param filePath XML 文件的路径
   */
  public static void verifyByDTD(String filePath) {
    try {
      DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
      // 设置验证
      dbf.setValidating(true);
      // 开始验证
      DocumentBuilder db = dbf.newDocumentBuilder();
      // 精确到错误程度
      db.setErrorHandler(new ErrorHandler() {
        @Override
        public void error(SAXParseException exception) throws SAXException {
          System.out.println(exception.toString().replace(';', '\n'));
          throw exception;
        }

        @Override
        public void fatalError(SAXParseException exception) throws SAXException {
          System.out.println(exception.toString().replace(';', '\n'));
          throw exception;
        }

        @Override
        public void warning(SAXParseException exception) throws SAXException {
          System.out.println(exception.toString().replace(';', '\n'));
          throw exception;
        }
      });
      db.parse(filePath);
    } catch (Exception e) {
      JOptionPane.showMessageDialog(null, e.toString().replace(';', '\n') + "\n不合法!!!");
      return;
    }
    JOptionPane.showMessageDialog(null, filePath + "\n是一个合法的XML文件");
  }

  /**
   * 使用 XSD(XML Schema Definition)
   * 验证 XML 文件是否是合法的、形式良好的、正确的
   * <p>
   * 控制台：
   * 成功：没有输出
   * 失败：输出错误信息
   *
   * @param xmlFile 待验证的 xml 文件
   * @param xsdFile 验证使用的 xsd 文件
   */
  public static void verifyBySchemaPop(String xmlFile, String xsdFile) {
    try {
      SchemaFactory
              // 获取 SchemaFactory 的实例
              .newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI)
              // 根据传入的 xsd 文件(File,StreamSource也可以)获取 Schema 的实例
              .newSchema(new File(xsdFile))
              // Schema 对象创建验证器
              .newValidator()
              // 使用验证器验证 xml 文件
              .validate(new StreamSource(xmlFile));
    } catch (Exception e) {
      String msg = e.getMessage().replace(". ", "\n");
      JOptionPane.showMessageDialog(null,
              "%s\n经过 %s 的验证\n%s 不合法!!!".formatted(msg, xsdFile, xmlFile));
      System.out.println(msg);
      return;
    }
    JOptionPane.showMessageDialog(null,
            "通过 %s 的验证\n%s 是一个合法的XML文件".formatted(xsdFile, xmlFile));
  }

  public String xml2Html(InputStream inputStream)
          throws ParserConfigurationException, IOException,
          SAXException, XPathExpressionException {

    var bais = new ByteArrayInputStream(inputStream.readAllBytes());

    var xmlStream = new StreamSource(bais);
    var path = "/home/quanwei/workspaceFolder/java-web/demo/src/main/java/top/quanwei/xml/hw/";
    var xsdStream = new StreamSource(path + "networklist.xsd");

    // 验证
    validate(xmlStream, xsdStream);
    bais.reset();

    // 解析
    var doc = parse(bais);
    // 生成html
    var html = generate(doc);

    File file = new File(path + "g.html");
    // 保持到文件(opt)
    write(html, file);
    return html;
  }

  private void write(String html, File file) throws IOException {
    file.createNewFile();
    FileOutputStream fos = new FileOutputStream(file);
    fos.write(html.getBytes());
    fos.close();
  }

  private Document parse(InputStream inputStream)
          throws SAXException, IOException, ParserConfigurationException {
    return DocumentBuilderFactory
            .newInstance()
            .newDocumentBuilder()
            .parse(inputStream);
  }

  private void validate(StreamSource xmlStream, StreamSource xsdStream)
          throws SAXException, IOException {
    SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI)
            .newSchema(xsdStream)
            .newValidator()
            .validate(xmlStream);
  }

  // todo 使用xpath
  private String generate(Document doc) throws XPathExpressionException {
    var xpath = XPathFactory
            .newInstance()
            .newXPath();
    // 什么元素 有几个
    var table = "<table><tr>";
    var data = (NodeList) xpath.evaluate("/Workbook/Table/Header/Data", doc, XPathConstants.NODESET);
    for (int i = 1; i <= data.getLength(); ++i) {
      var dt = xpath.evaluate("/Workbook/Table/Header/Data[%d]/text()".formatted(i),
              doc, XPathConstants.STRING);
      if (dt.equals("")) continue;
      table += "<th>%s</th>".formatted(dt);
    }
    table += "</tr>";
    var ls = (NodeList) xpath.evaluate("/Workbook/Table/Row", doc, XPathConstants.NODESET);
    for (int i = 1; i <= ls.getLength(); ++i) {
      var ne = xpath.evaluate("/Workbook/Table/Row[%d]/Network".formatted(i), doc, XPathConstants.STRING);
      if (ne.equals("")) continue;
      var ow = xpath.evaluate("/Workbook/Table/Row[%d]/Owner".formatted(i), doc, XPathConstants.STRING);
      var fe = xpath.evaluate("/Workbook/Table/Row[%d]/Feeds".formatted(i), doc, XPathConstants.STRING);
      var no = xpath.evaluate("/Workbook/Table/Row[%d]/Notes".formatted(i), doc, XPathConstants.STRING);
      var ho = xpath.evaluate("/Workbook/Table/Row[%d]/HomePage".formatted(i), doc, XPathConstants.STRING);
      var lo = xpath.evaluate("/Workbook/Table/Row[%d]/Logo".formatted(i), doc, XPathConstants.STRING);
      table += "<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><td>%s</td><tr>"
              .formatted(ne, ow, fe, no, ho, lo);
    }
    table += "</table>";
    return table;
  }

  public static void main(String[] args) throws Exception {
    var path = "/home/quanwei/workspaceFolder/java-web/demo/src/main/java/top/quanwei/xml/hw/";
    XmlUtils u = new XmlUtils();
    u.xml2Html(new FileInputStream(path + "networklist.xml"));

  }
}