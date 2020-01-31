import app from '../app';
import sequelize from '../models';

const PORT = 5000;

sequelize
    .sync()
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Wallet service listening on port ${PORT}`))
    )
    .catch(console.log);