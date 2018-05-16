const admin = require('firebase-admin');

module.exports = (req, res) => {
  if(!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'Phone and code must be provided' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  const code = parseInt(req.body.code);

  admin.auth().getUser(phone)
    .then(() => {
      admin.database().ref('users/' + phone).on('value', snapshot => {
        admin.database().ref('users/' + phone).off();
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: 'Code not valid' });
        }

        admin.database().ref('users/' + phone).update({ codeValid: false });
        admin.auth().createCustomToken(phone)
        .then(token => res.send({ token: token }))
        .catch(() => res.status(422).send({ error: err }));

        return null;
      });

      return null;
    })
    .catch(() => res.status(422).send({ error: err }));
  return null;
}
