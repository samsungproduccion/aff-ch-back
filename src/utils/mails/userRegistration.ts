interface IProps {
  name: string;
}
export const userRegistration = ({ name }: IProps) => {
  return `
  <!DOCTYPE html>
  <html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title></title>
    <style>
      table,
      td,
      div,
      h1,
      h3,
      p {
        font-family: Arial, sans-serif;
      }
    </style>
  </head>

  <body style="margin:0;padding:0;">
    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
      <tr>
        <td align="center" style="padding:0;">
          <table role="presentation"
            style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
            <tr>
              <td
                style="border: 0 none; border-style: hidden; border-spacing: 0; padding: 0; margin: 0; border-width: 0; background-color: #000;"
                align="center">
                <h1 style="color: #fff;">Afiliados</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 30px 42px 30px;">
                <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                  <tr>
                    <td style="padding:0 0 36px 0;color:#153643;">
                      <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                        Se ha completado el registro del usuario: 
                      </p>
                      <h3 style="text-align: center; font-size: 20px">${name}</h3>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:25px 30px;background:black;">
                <table role="presentation"
                  style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                  <tr>
                    <td style="padding:0;width:50%;" align="left">
                      <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                        &reg; Samsung, 2024
                      </p>
                    </td>
                    <td style="padding:0;width:50%;" align="right">
                      <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                        <tr>
                          <td style="padding:0 0 0 10px;width:38px;">
                            <a href="https://www.samsung.com.pe/" style="color:#ffffff;"><img
                                src="https://d1xudobk8itzb0.cloudfront.net/affiliate/mail/logo-samsung-blanco.png"
                                alt="Facebook" width="150" style="height:auto;display:block;border:0;" /></a>
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
