import jwt from "jsonwebtoken";

export const generateJWT = (uid: string, expirationTime: string = '4h') => {
  const SECRET = process.env.SECRET || '';

  // console.log({user_id: uid})
  const payload = {
    uid
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET!, {
        expiresIn: expirationTime,
      }, (err, token) => {
        if (err) {
          // console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const verifyJWT = (token: string):string => {
  const SECRET = process.env.SECRET || '';
  const { uid } = jwt.verify(token, SECRET!) as {uid: string};
  return uid;
}
