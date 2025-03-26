export const approveUserTemplate = (url: string) => {
  return `
  <!DOCTYPE html>
  <html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title></title>
    <style>
      table, td, div, h1, p {font-family: Arial, sans-serif;}
    </style>
  </head>
  <body style="margin:0;padding:0;">
    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
      <tr>
        <td align="center" style="padding:0;">
          <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
            <tr>
              <td style="padding:36px 30px 42px 30px;">
                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                  <tr>
                    <td style="padding:0 0 36px 0;color:#153643;">
                      <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Se aprobo tu solicitud</h1>
                      <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">Para acceder a la plataforma ingrese al siguiente enlace: </p>
                      <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;text-align:center;margin-top:20px;"><a href="${url}" 
                        style="color:#153643;text-decoration:none;color:white;background-color:#3e67ed; padding: 10px; margin-left:auto; margin-top:auto; width:50px; border-radius:10px"
                         >Ir a la pagina de afiliados</a></p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;background:black;">
                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                  <tr>
                    <td style="padding:0;width:50%;" align="left">
                      <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                        &reg; Samsung, 2022
                      </p>
                    </td>
                    <td style="padding:0;width:50%;" align="right">
                      <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                        <tr>
                          <td style="padding:0 0 0 10px;width:38px;">
                            <a href="https://www.samsung.com.pe/" style="color:#ffffff;"><img src="https://d1xudobk8itzb0.cloudfront.net/affiliate/mail/logo-samsung-blanco.png" alt="Facebook" width="150" style="height:auto;display:block;border:0;" /></a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
};
