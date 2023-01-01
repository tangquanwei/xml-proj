<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/">
    <html>
      <body>
        <h2>获取权威的新闻 BY XSLT</h2>
        <button type="button" onclick="document.location='/'">返回</button>

        <table border="1">
          <tr>
            <th>通过XML</th>
            <th>标题</th>
            <th>来源</th>
            <th>时间</th>
          </tr>
          <xsl:for-each select="infomation/info">
            <tr>
              <td>
                <img>
                  <xsl:attribute name="src">
                    img/<xsl:value-of select="img" />
                  </xsl:attribute>
                  <xsl:attribute name="width">
                    100px
                  </xsl:attribute>
                </img>
              </td>
              <td>
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="link" />
                  </xsl:attribute>
                  <xsl:value-of select="title" />
                </a>
              </td>
              <td>
                <xsl:value-of select="come" />
              </td>
              <td>
                <xsl:value-of select="time" />
              </td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>