<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"
              version='1.0'
              encoding='UTF-8'
              indent='yes'/>
  <xsl:template match="/">
    <html>
      <head>
        <!-- 引入Bootstrap-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
              rel="stylesheet"/>
      </head>
      <body class="container">
        <!-- y轴方向外边距为2-->
        <h2 class="my-2">Quanwei's Plant Catalog</h2>
        <!-- 加上表格特有的css-->
        <table class="table table-bordered
        table-hover table-striped mt-4">
          <!-- 表头 -->
          <tr bgcolor="#9acd32">
            <th align="left">COMMON</th>
            <th align="left">BOTANICAL</th>
            <th align="left">ZONE</th>
            <th align="left">LIGHT</th>
            <th align="left">PRICE</th>
            <th align="left">AVAILABILITY</th>
          </tr>
          <!-- 使用for-each选取CATALOG中PLANT节点集中的每个元素-->
          <xsl:for-each select="CATALOG/PLANT">
            <!--
            截取子串(下标从1开始)目的是去掉'$'
            而后与5.00比较
            -->
            <xsl:sort select="PRICE"/>
            <xsl:if test="substring(PRICE,2) &gt; 5.00">
              <tr>
                <td>
                  <!-- 使用value-of获取select指定元素的值-->
                  <xsl:value-of select="COMMON"/>
                </td>
                <td>
                  <xsl:value-of select="BOTANICAL"/>
                </td>
                <td>
                  <xsl:value-of select="ZONE"/>
                </td>
                <td>
                  <xsl:value-of select="LIGHT"/>
                </td>
                <td>
                  <xsl:value-of select="PRICE"/>
                </td>
                <td>
                  <xsl:value-of select="AVAILABILITY"/>
                </td>
              </tr>
            </xsl:if>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>