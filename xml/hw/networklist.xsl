<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version='1.0' encoding='UTF-8' indent='yes'/>
  <xsl:template match="/">
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"/>
      </head>
      <body class="container">
        <table class="table table-bordered table-hover table-striped mt-4">
          <tr bgcolor="#9acd32">
            <th align="left"><xsl:value-of select="/Workbook/Table/Header/Data[1]"/></th>
            <th align="left"><xsl:value-of select="/Workbook/Table/Header/Data[2]"/></th>
            <th align="left"><xsl:value-of select="/Workbook/Table/Header/Data[3]"/></th>
            <th align="left"><xsl:value-of select="/Workbook/Table/Header/Data[4]"/></th>
            <th align="left"><xsl:value-of select="/Workbook/Table/Header/Data[5]"/></th>
            <th align="left"><xsl:value-of select="/Workbook/Table/Header/Data[6]"/></th>
          </tr>
          <xsl:for-each select="/Workbook/Table/Row">
            <tr>
              <td><xsl:value-of select="Network"/></td>
              <td><xsl:value-of select="Owner"/></td>
              <td><xsl:value-of select="Feeds"/></td>
              <td><xsl:value-of select="Notes"/></td>
              <td><xsl:value-of select="HomePage"/></td>
              <td><xsl:value-of select="Logo"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>