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
        <h2>Quanwei's CD Collection</h2>
        <table class="table table-bordered table-hover table-striped mt-4">
          <tr bgcolor="#9acd32">
            <th align="left">Title</th>
            <th align="left">Artist</th>
            <th align="left">Country</th>
            <th align="left">Company</th>
            <th align="left">Price</th>
            <th align="left">Year</th>
          </tr>
          <xsl:for-each select="catalog/cd[price &gt; 10 ]">
            <tr>
              <td><xsl:value-of select="title"/></td>
              <td><xsl:value-of select="artist"/></td>
              <td><xsl:value-of select="country"/></td>
              <td><xsl:value-of select="company"/></td>
              <td><xsl:value-of select="price"/></td>
              <td><xsl:value-of select="year"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>