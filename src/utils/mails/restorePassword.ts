export const restorePasswordEmail = (url: string) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tipo2</title>
</head>
<body>

    <style>
        .content{
            max-width: 600px;
            border: 1px solid #888;
            border-spacing: 0px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            margin: 0 auto;
        }
        .content .logo{
            height: 70px;
            background-color: #111213;
        }
        .content .logo img{
            margin-left: 20px;
            width: 165px;
            height: auto;
        }
        .content .Description{
            margin: 15px 50px;
            display: block;
        }
        .content .Description td h1{
            margin: 0;
            font-style: italic;
            color: #111213;
        }
        .content .Description td p{
            margin: 0;
            text-align: justify;
            color: #262626;
        }
        .content .order{
            background: #e7e7e7;
        }
        .content .order td{
            background: #fff;
            margin: 15px 166px;
            display: block;
            padding: 15px;
            text-align: center;
            border-radius: 15px;
            box-shadow: 0px 6px 7px -5px;
        }
        .content .infoP{
            margin: 15px 50px;
            display: block;
        }
        .content .infoP .td-w{
            width: 100%;
            display: block;
        }
        .content .infoP td table{
            width: 100%;
            border-top: 1px solid #919191;
            border-right: 1px solid #919191;
            border-left: 1px solid #919191;
            border-spacing: 0px;
        }
        .content .infoP td table tr{
          border-bottom: 1px solid #919191;
          padding: 0;
        }
        .content .infoP td table tr td{
            height: 30px;
            display: block;
            padding: 4px 8px
        }
        .content .infoP td table tr .td1{
            display: block;
            float: left;
            width: 50%;
            margin: 0 15px 0 0;
            border-right: 1px solid #919191;
            padding: 4px 8px;
        }
        .content .infoP td table tr{
            position: relative;
            display: block;

        }
        .content .consultas{
            text-align: center;
            display: block;
            margin: 15px 50px;
        }
        .content .consultas td ul li{
            text-align: left;
        }
    </style>

    <div class="content">
        Para restablecer su contraseña ingrese al siguiente enlace  <a href='${url}'> Restablecer contraseña </a>
    </a> 
    
</body>
</html>
`;
};
