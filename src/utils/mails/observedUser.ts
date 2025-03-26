interface IProps {
  comment: string;
  name: string;
}
export const observedUser = ({ comment, name }: IProps) => {
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
    p {
      font-family: Arial, sans-serif;
    }
  </style>
</head>

<body class="body" width="100%"
  style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #FFFFFF;">
  <center style="width: 100%; background-color: #FFFFFF;">
    <table role="presentation"
      style="margin: 0 auto; background-color: #FFFFFF; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px 0px;"
      class="email-container" width="630" cellspacing="0" cellpadding="0" border="0" align="center">
      <tbody>
        <tr>
          <td style="border: 0 none; border-style: hidden; border-spacing: 0; padding: 0; margin: 0; border-width: 0;"
            align="center">
            <a href="http://t.m21.email.samsung.com/r/?id=hfe406c6e,ddea7e47,7d2014fb" _label="00_samsung_logo_image"
              target="_blank" title="S23 Series ">
              <img
                src="https://d1xudobk8itzb0.cloudfront.net/affiliate/mail/header_mailing.jpg"
                alt="Samsung" style="width: 100%; height: auto; margin: auto; display:block;" width=""
                height="" border="0">
            </a>
          </td>
        </tr>

        <tr>
          <td
            style="border: 0 none; padding: 25px 30px; margin: 25px; border-style: hidden; border-spacing: 0;border-width: 0; background: #FFFFFF;"
            align="center">
            <div
              style="padding: 25px 25px 32px; background: #F7F7F7; font-family: Arial, Helvetica, sans-serif; text-align: center; border-radius: 10px 10px 0px 0px; color: #000000;">
              <h1 style="font-size: 32px; margin: 0px 0px 0px; padding-bottom: 16px; border-bottom: 2px solid #000000;">
                Tu solicitud fue observada
              </h1>
            </div>

            <div
              style="padding: 0px 25px 95px; background: #F7F7F7; font-family: Arial, Helvetica, sans-serif; text-align: center; border-radius: 0px 0px 10px 10px; max-width: 630px; color: #000000;">
              <p style="font-size: 16px; text-align: left; margin: 0px 0px 24px;">
                Hola ${name}
              </p>
              <p style="font-size: 16px; text-align: left; margin: 0px 0px 24px;">
                Tenemos una observación con respecto a tu postulación:
              </p>
              <p
                style="font-size: 20px; margin: 0px 0px 49px; padding: 0px; font-weight: 700; word-break: break-word; overflow-wrap: break-word;">
                ${comment}
              </p>
              <p style="font-size: 16px; text-align: left; margin-bottom: 0px 0px 24px;">
                Atentamente,
              </p>
              <p style="font-size: 16px; text-align: left; margin-bottom: 0px 0px 0px;">
                Samsung Partners
              </p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </center>
</body>

</html>
`;
};
