interface IProps {
  url: string;
  name: string;
}
export const registerComplete = ({ url, name }: IProps) => {
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
  <body class="body" width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #FFFFFF;">
    <center style="width: 100%; background-color: #FFFFFF;">
      <table role="presentation" style="margin: 0 auto; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px 0px;" class="email-container" width="630" cellspacing="0" cellpadding="0" border="0" align="center">
        <tbody>
          <tr>
            <td style="border: 0 none; border-style: hidden; border-spacing: 0; padding: 0; margin: 0; border-width: 0;" align="center">
                <a href="${url}" _label="welcome-affiliate" target="_blank" title="Affiliate">
                  <img src="https://cheil-repo.s3.us-east-2.amazonaws.com/affiliate/images/mailing-1.jpg" alt="Samsung" style="width: 100%; height: auto; margin: auto; display: block;" width="" height="" border="0">
                </a>
            </td>
          </tr>
          <tr>
            <td style="border: 0 none; border-style: hidden; border-spacing: 0; padding: 0; margin: 0; border-width: 0;" align="center">
                  <img src="https://cheil-repo.s3.us-east-2.amazonaws.com/affiliate/images/mailing-2.jpg" alt="Samsung" style="width: 100%; height: auto; margin: auto; display: block;" width="" height="" border="0">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px;">
              <a href="${url}" target="_blank" style="background-color: #0838A5; padding: 10px 20px; text-decoration: none; color: #fff; border-radius: 15px; font-size: 13px;">¡EMPEZAR AHORA!</a>
            </td>
          </tr>
          <tr>
            <td style="border: 0 none; border-style: hidden; border-spacing: 0; padding: 0; margin: 0; border-width: 0;" align="center">
                  <img src="https://cheil-repo.s3.us-east-2.amazonaws.com/affiliate/images/mailing-3.jpg" alt="Samsung" style="width: 100%; height: auto; margin: auto; display: block;" width="" height="" border="0">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px;">
              <a href="${url}" target="_blank" style="background-color: #0838A5; padding: 10px 20px; text-decoration: none; color: #fff; border-radius: 15px; font-size: 13px;">CONOCE LAS OFERTAS</a>
            </td>
          </tr>
          <tr>
            <td style="border: 0 none; border-style: hidden; border-spacing: 0; padding: 0; margin: 0; border-width: 0;" align="center">
                  <img src="https://cheil-repo.s3.us-east-2.amazonaws.com/affiliate/images/mailing-4.jpg" alt="Samsung" style="width: 100%; height: auto; margin: auto; display: block;" width="" height="" border="0">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 20px;"> 
              <a href="${url}" target="_blank" style="background-color: #0838A5; padding: 10px 20px; text-decoration: none; color: #fff; border-radius: 15px; font-size: 13px;">¡EMPEZAR AHORA!</a>
            </td>
          </tr>
          <tr>
            <td style="border: 0 none; border-style: hidden; border-spacing: 0; padding: 20px 0px 0px; margin: 0; border-width: 0;" align="center">
                  <img src="https://cheil-repo.s3.us-east-2.amazonaws.com/affiliate/images/mailing-5.png" alt="Samsung" style="width: 100%; height: auto; margin: auto; display: block;" width="" height="" border="0">
            </td>
          </tr>
        </tbody> 
      </table>
    </center>
  </body>
</html>
`;
};
